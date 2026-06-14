-- Run this in Supabase SQL Editor

-- Salon profiles (one per user)
create table if not exists salon_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  salon_name text,
  whatsapp_number text,
  whatsapp_connected boolean default false,
  botsailor_api_key text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table salon_profiles enable row level security;

create policy "Users can manage their own profile"
  on salon_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Message history
create table if not exists message_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  message_type text check (message_type in ('followup', 'promo')),
  label_target text,
  message_content text not null,
  recipients_count integer default 0,
  sent_at timestamptz default now()
);

alter table message_history enable row level security;

create policy "Users can manage their own message history"
  on message_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Auto-create salon profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.salon_profiles (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
