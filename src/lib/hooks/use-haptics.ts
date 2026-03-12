"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error";

type ImpactType = "light" | "medium" | "heavy";
type NotifyType = "success" | "warning" | "error";
type Mode = "native" | "web" | "none";
type LogFn = (msg: string) => void;

export type UseHapticFn = ((type?: HapticType) => Promise<void>) & {
  enabled: boolean;
  mode: Mode;
  reason: string | null;
  impact: (type: ImpactType, log?: LogFn) => Promise<void>;
  notify: (type: NotifyType, log?: LogFn) => Promise<void>;
  selection: (log?: LogFn) => Promise<void>;
  vibrateFallback: (log?: LogFn) => void;
  test: (log?: LogFn) => Promise<void>;
};

async function getCapacitor() {
  try {
    const mod = await import("@capacitor/core");
    return mod.Capacitor;
  } catch {
    return null;
  }
}

export function useHaptic(): UseHapticFn {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("none");
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const Capacitor = await getCapacitor();

      if (!Capacitor || !Capacitor.isNativePlatform()) {
        const canVibrate =
          typeof navigator !== "undefined" && !!navigator.vibrate;
        setEnabled(canVibrate);
        setMode(canVibrate ? "web" : "none");
        setReason(
          canVibrate
            ? "Web fallback (navigator.vibrate)"
            : "No native haptics + no vibrate support"
        );
        return;
      }

      const pluginAvailable =
        typeof (Capacitor as any).isPluginAvailable === "function"
          ? (Capacitor as any).isPluginAvailable("Haptics")
          : null;

      setEnabled(pluginAvailable !== false);
      setMode(pluginAvailable === false ? "none" : "native");
      setReason(
        pluginAvailable === false
          ? "Capacitor reports Haptics plugin unavailable"
          : null
      );
    })();
  }, []);

  const vibrateFallback = useCallback((log?: LogFn) => {
    if (typeof navigator === "undefined" || !navigator.vibrate) {
      log?.("[fallback] vibrate not available");
      return;
    }
    navigator.vibrate([10, 20, 10]);
    log?.("[fallback] vibrated");
  }, []);

  const impact = useCallback(async (type: ImpactType, log?: LogFn) => {
    const Capacitor = await getCapacitor();
    const isNative = Capacitor?.isNativePlatform() ?? false;

    if (isNative) {
      try {
        // webpackIgnore: true - package may not be installed in web-only builds
        const mod = await import(/* webpackIgnore: true */ "@capacitor/haptics");
        const { Haptics, ImpactStyle } = mod as any;
        const style =
          ImpactStyle?.[type.charAt(0).toUpperCase() + type.slice(1)] ??
          ImpactStyle?.[type] ??
          type;
        await Haptics.impact({ style });
        log?.(`[impact:${type}] ok`);
        return;
      } catch (e: any) {
        log?.(`[impact:${type}] native failed: ${e?.message ?? String(e)}`);
      }
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(type === "light" ? 10 : type === "medium" ? 20 : 30);
      log?.(`[impact:${type}] web vibrate fallback`);
      return;
    }

    log?.(`[impact:${type}] no-op`);
  }, []);

  const notify = useCallback(async (type: NotifyType, log?: LogFn) => {
    const Capacitor = await getCapacitor();
    const isNative = Capacitor?.isNativePlatform() ?? false;

    if (isNative) {
      try {
        const mod = await import(/* webpackIgnore: true */ "@capacitor/haptics");
        const { Haptics, NotificationType } = mod as any;
        const key = type.charAt(0).toUpperCase() + type.slice(1);
        const nt = NotificationType?.[key] ?? NotificationType?.[type] ?? type;
        await Haptics.notification({ type: nt });
        log?.(`[notify:${type}] ok`);
        return;
      } catch (e: any) {
        log?.(`[notify:${type}] native failed: ${e?.message ?? String(e)}`);
      }
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(
        type === "success"
          ? [10, 20, 10]
          : type === "warning"
            ? [20, 20, 20]
            : [30, 10, 30]
      );
      log?.(`[notify:${type}] web vibrate fallback`);
      return;
    }

    log?.(`[notify:${type}] no-op`);
  }, []);

  const selection = useCallback(async (log?: LogFn) => {
    const Capacitor = await getCapacitor();
    const isNative = Capacitor?.isNativePlatform() ?? false;

    if (isNative) {
      try {
        const mod = await import(/* webpackIgnore: true */ "@capacitor/haptics");
        const { Haptics } = mod as any;

        if (Haptics.selectionStart && Haptics.selectionChanged && Haptics.selectionEnd) {
          await Haptics.selectionStart();
          await Haptics.selectionChanged();
          await Haptics.selectionEnd();
          log?.("[selection] ok (start/changed/end)");
          return;
        }

        if (Haptics.selectionChanged) {
          await Haptics.selectionChanged();
          log?.("[selection] ok");
          return;
        }
      } catch (e: any) {
        log?.(`[selection] native failed: ${e?.message ?? String(e)}`);
      }
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(8);
      log?.("[selection] web vibrate fallback");
      return;
    }

    log?.("[selection] no-op");
  }, []);

  const trigger = useCallback(
    async (type: HapticType = "light") => {
      if (type === "light" || type === "medium" || type === "heavy") {
        return impact(type, undefined);
      }
      return notify(type, undefined);
    },
    [impact, notify]
  );

  const test = useCallback(
    async (log?: LogFn) => {
      log?.("[test] begin");
      await impact("heavy", log);
      await new Promise((r) => setTimeout(r, 120));
      await notify("error", log);
      await new Promise((r) => setTimeout(r, 120));
      await selection(log);
      log?.("[test] end");
    },
    [impact, notify, selection]
  );

  const fn = useMemo(() => {
    const f: any = trigger;
    f.enabled = enabled;
    f.mode = mode;
    f.reason = reason;
    f.impact = impact;
    f.notify = notify;
    f.selection = selection;
    f.vibrateFallback = vibrateFallback;
    f.test = test;
    return f as UseHapticFn;
  }, [trigger, enabled, mode, reason, impact, notify, selection, vibrateFallback, test]);

  return fn;
}
