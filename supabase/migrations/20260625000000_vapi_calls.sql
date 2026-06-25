-- Stores one row per Vapi voice call (written by the vapi-webhook Edge Function
-- using the service role, which bypasses RLS).
create table if not exists public.vapi_calls (
  id            uuid primary key default gen_random_uuid(),
  call_id       text unique,
  assistant_id  text,
  status        text,
  started_at    timestamptz,
  ended_at      timestamptz,
  ended_reason  text,
  summary       text,
  transcript    text,
  messages      jsonb,
  recording_url text,
  page_context  jsonb,
  created_at    timestamptz not null default now()
);

-- RLS on, with NO anon/authenticated policies: the table is private. Only the
-- service role (the Edge Function) can read/write. Add a SELECT policy scoped
-- to an admin role later if you build a dashboard to read these.
alter table public.vapi_calls enable row level security;

create index if not exists vapi_calls_started_at_idx
  on public.vapi_calls (started_at desc);
