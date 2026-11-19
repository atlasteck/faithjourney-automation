-- Supabase schema for Faith Journey automation

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  quiz_completed_at timestamptz,
  lead_created_at timestamptz default now(),
  meta_event_id text
);

create table if not exists quiz_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  answers jsonb not null,
  faith_score int,
  peace_score int,
  total_score int,
  result_bucket text,
  created_at timestamptz default now()
);

create table if not exists app_usage (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  event_name text not null,
  page text,
  check_in_sentiment text,
  created_at timestamptz default now()
);

create table if not exists email_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  email_type text,
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz
);
