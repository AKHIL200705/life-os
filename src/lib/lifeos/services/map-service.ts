import { DEMO_MARKERS } from "../demo-data";
import type { MapMarker } from "../types";

/**
 * Map service abstraction so a real provider (Mapbox / Google / MapLibre) can be
 * connected later without touching the UI. Phase 1 returns simulated markers on
 * a normalised 0-100 coordinate space.
 */
export interface MapService {
  readonly providerName: string;
  listMarkers(): Promise<MapMarker[]>;
}

export const mockMapService: MapService = {
  providerName: "LIFEOS Simulated Grid",
  async listMarkers() {
    await new Promise((r) => setTimeout(r, 160));
    return DEMO_MARKERS;
  },
};

export const mapService: MapService = mockMapService;
