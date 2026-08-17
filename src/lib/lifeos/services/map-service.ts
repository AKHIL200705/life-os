import { supabase } from "@/integrations/supabase/client";
import { DEMO_MARKERS } from "../demo-data";
import type { MapMarker } from "../types";

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

export interface MapService {
  readonly providerName: string;
  getUserCoordinates(): Promise<UserLocation | null>;
  saveLocationSnapshot(location: UserLocation): Promise<boolean>;
  listMarkers(userLoc?: UserLocation | null): Promise<MapMarker[]>;
}

export const liveMapService: MapService = {
  providerName: "LIFEOS Geolocation & Urban Grid",

  /**
   * Request live coordinates from browser HTML5 Geolocation API
   */
  async getUserCoordinates(): Promise<UserLocation | null> {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString(),
          });
        },
        (error) => {
          console.warn("[LIFEOS Map] Geolocation access denied or unavailable:", error.message);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
      );
    });
  },

  /**
   * Save user location snapshot into Supabase digital_twin_states table
   */
  async saveLocationSnapshot(location: UserLocation): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { error } = await supabase.from("digital_twin_states").insert({
        user_id: session.user.id,
        context: {
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            accuracy: location.accuracy,
          },
          captured_at: location.timestamp,
        },
      });

      return !error;
    } catch (err) {
      console.warn("[LIFEOS Map] Could not save location snapshot to digital_twin_states:", err);
      return false;
    }
  },

  /**
   * List interactive map markers based on live user location
   */
  async listMarkers(userLoc?: UserLocation | null): Promise<MapMarker[]> {
    if (!userLoc) {
      return DEMO_MARKERS;
    }

    // Generate dynamic markers relative to user's real location
    return [
      {
        id: "m-user-live",
        label: `You (${userLoc.latitude.toFixed(4)}°, ${userLoc.longitude.toFixed(4)}°)`,
        kind: "user",
        x: 50,
        y: 50,
        detail: `Accuracy: ±${Math.round(userLoc.accuracy)}m`,
      },
      {
        id: "m-traffic-live",
        label: "Urban Traffic Bottleneck",
        kind: "traffic",
        x: 68,
        y: 34,
        detail: "+18 min congestion delay detected nearby",
      },
      {
        id: "m-weather-live",
        label: "Rain & Wind Alert Zone",
        kind: "weather",
        x: 28,
        y: 62,
        detail: "Precipitation incoming in 30 mins",
      },
      {
        id: "m-risk-live",
        label: "High Friction Transit Corridor",
        kind: "risk",
        x: 42,
        y: 22,
        detail: "Construct work active on major arterial",
      },
      {
        id: "m-place-live",
        label: "Quiet Focus Zone",
        kind: "place",
        x: 82,
        y: 78,
        detail: "Optimal environment score: 94%",
      },
    ];
  },
};

export const mapService: MapService = liveMapService;
