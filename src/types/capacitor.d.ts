// Type stubs for Capacitor - dynamically imported in use-haptics.ts
// The actual packages are not installed; runtime falls back to web vibration.
declare module "@capacitor/core" {
  export const Capacitor: {
    isNativePlatform: () => boolean;
    isPluginAvailable?: (name: string) => boolean;
  };
}

declare module "@capacitor/haptics" {
  export const Haptics: {
    impact: (options: { style: string }) => Promise<void>;
    notification: (options: { type: string }) => Promise<void>;
    selectionStart?: () => Promise<void>;
    selectionChanged?: () => Promise<void>;
    selectionEnd?: () => Promise<void>;
  };
  export const ImpactStyle: Record<string, string>;
  export const NotificationType: Record<string, string>;
}
