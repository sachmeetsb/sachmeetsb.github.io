import { useCallback, useEffect, useRef, useState } from "react";

const PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

/**
 * Drives a Vapi voice call from the orb. The SDK is dynamically imported so it
 * stays out of the initial bundle and only loads when a call is first started.
 *
 * status: 'idle' | 'connecting' | 'active' | 'error'
 * `speaking` is true while the assistant is talking (for orb feedback).
 *
 * Page context is supplied to a dashboard-configured assistant via
 * assistantOverrides.variableValues ({{pageContent}}, {{currentSection}}), and
 * live scroll updates are pushed mid-call with sendContext().
 */
export function useVapiCall() {
  const vapiRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [speaking, setSpeaking] = useState(false);

  const ensureClient = useCallback(async () => {
    if (vapiRef.current) return vapiRef.current;
    if (!PUBLIC_KEY) {
      console.warn("[vapi] Missing VITE_VAPI_PUBLIC_KEY — set it in .env");
      return null;
    }
    const { default: Vapi } = await import("@vapi-ai/web");
    const vapi = new Vapi(PUBLIC_KEY);
    vapi.on("call-start", () => setStatus("active"));
    vapi.on("call-end", () => {
      setStatus("idle");
      setSpeaking(false);
    });
    vapi.on("speech-start", () => setSpeaking(true));
    vapi.on("speech-end", () => setSpeaking(false));
    vapi.on("error", (e) => {
      console.error("[vapi] error", e);
      setStatus("error");
      setSpeaking(false);
    });
    vapiRef.current = vapi;
    return vapi;
  }, []);

  const start = useCallback(
    async ({ pageContent, currentSection }) => {
      const vapi = await ensureClient();
      if (!vapi) return;
      if (!ASSISTANT_ID) {
        console.warn("[vapi] Missing VITE_VAPI_ASSISTANT_ID — set it in .env");
        return;
      }
      setStatus("connecting");
      try {
        await vapi.start(ASSISTANT_ID, {
          variableValues: { pageContent, currentSection },
        });
      } catch (e) {
        console.error("[vapi] start failed", e);
        setStatus("error");
      }
    },
    [ensureClient]
  );

  const stop = useCallback(() => {
    vapiRef.current?.stop?.();
  }, []);

  /** Inject a live system note (e.g. the user scrolled) into an active call. */
  const sendContext = useCallback((text) => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    try {
      vapi.send({
        type: "add-message",
        message: { role: "system", content: text },
      });
    } catch {
      /* not connected yet — ignore */
    }
  }, []);

  // Hang up if the component unmounts mid-call.
  useEffect(() => () => vapiRef.current?.stop?.(), []);

  return {
    status,
    speaking,
    start,
    stop,
    sendContext,
    configured: Boolean(PUBLIC_KEY && ASSISTANT_ID),
  };
}
