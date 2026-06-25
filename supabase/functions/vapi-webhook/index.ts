// Supabase Edge Function: receives Vapi server messages and stores each
// completed call in public.vapi_calls.
//
// Deploy:  supabase functions deploy vapi-webhook --no-verify-jwt
// Then set this function's URL as the assistant's Server URL in Vapi, and make
// sure "end-of-call-report" is in the assistant's server messages.
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by the
// Edge runtime. VAPI_WEBHOOK_SECRET is optional (set it as a function secret
// and as the assistant's Server "secret" header to reject spoofed calls).
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  // Optional shared-secret check.
  const expected = Deno.env.get("VAPI_WEBHOOK_SECRET");
  if (expected && req.headers.get("x-vapi-secret") !== expected) {
    return new Response("unauthorized", { status: 401 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const msg = payload?.message ?? payload;

  // Persist only the final report (has the full transcript + summary).
  if (msg?.type !== "end-of-call-report") {
    return new Response("ok", { status: 200 });
  }

  const call = msg.call ?? {};
  const artifact = msg.artifact ?? {};

  const { error } = await supabase.from("vapi_calls").upsert(
    {
      call_id: call.id ?? null,
      assistant_id: call.assistantId ?? null,
      status: "ended",
      started_at: msg.startedAt ?? null,
      ended_at: msg.endedAt ?? null,
      ended_reason: msg.endedReason ?? null,
      summary: msg.summary ?? msg.analysis?.summary ?? null,
      transcript: msg.transcript ?? artifact.transcript ?? null,
      messages: msg.messages ?? artifact.messages ?? null,
      recording_url: msg.recordingUrl ?? artifact.recordingUrl ?? null,
      page_context: call.assistantOverrides?.variableValues ?? null,
    },
    { onConflict: "call_id" },
  );

  if (error) {
    console.error("[vapi-webhook] insert failed", error);
    return new Response("db error", { status: 500 });
  }
  return new Response("ok", { status: 200 });
});
