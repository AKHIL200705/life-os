import type { Prediction } from "../types";

export interface NotificationService {
  isSupported(): boolean;
  getPermissionStatus(): NotificationPermission;
  requestPermission(): Promise<NotificationPermission>;
  sendAlert(title: string, body: string, targetUrl?: string): Promise<boolean>;
  checkAndNotifyHighFriction(predictions: Prediction[]): Promise<number>;
}

export const notificationService: NotificationService = {
  isSupported(): boolean {
    return typeof window !== "undefined" && "Notification" in window;
  },

  getPermissionStatus(): NotificationPermission {
    if (!this.isSupported()) return "denied";
    return Notification.permission;
  },

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return "denied";
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch {
      return "denied";
    }
  },

  async sendAlert(title: string, body: string, targetUrl = "/predictions"): Promise<boolean> {
    if (!this.isSupported()) return false;

    if (Notification.permission !== "granted") {
      const status = await this.requestPermission();
      if (status !== "granted") return false;
    }

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration && "showNotification" in registration) {
          await registration.showNotification(title, {
            body,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            data: targetUrl,
            vibrate: [200, 100, 200],
          } as any);
          return true;
        }
      }

      // Fallback to standard Notification constructor
      const notif = new Notification(title, {
        body,
        icon: "/favicon.ico",
        data: targetUrl,
      });
      notif.onclick = () => {
        window.focus();
        window.location.href = targetUrl;
      };
      return true;
    } catch (err) {
      console.warn("[LIFEOS Notification] Error triggering notification:", err);
      return false;
    }
  },

  /**
   * Evaluates predictions against the alert threshold (probability > 85% & high/critical severity)
   * and triggers system push alerts for newly detected high-friction events.
   */
  async checkAndNotifyHighFriction(predictions: Prediction[]): Promise<number> {
    if (!this.isSupported() || Notification.permission !== "granted") {
      return 0;
    }

    const highFrictionEvents = predictions.filter(
      (p) => p.probability >= 0.85 && (p.severity === "high" || p.severity === "critical")
    );

    let notifiedCount = 0;
    for (const event of highFrictionEvents) {
      const title = `⚠️ High Risk: ${event.problem}`;
      const body = `${Math.round(event.probability * 100)}% Probability · ${event.recommendedAction}`;
      const sent = await this.sendAlert(title, body, "/predictions");
      if (sent) notifiedCount++;
    }

    return notifiedCount;
  },
};
