-- purpose: 議案ごとのAI要約（やさしく/詳しく）を保存するテーブルを作成する
-- affected: public.agenda_summaries
-- notes: mirai-gikaiのbill_summaries相当。構造はほぼそのまま流用できる部分。
--        1議案につき easy/detail の最大2件を想定し、一意制約で重複生成を防ぐ。

create table if not exists public.agenda_summaries (
  id uuid primary key default gen_random_uuid(),
  agenda_item_id uuid not null references public.agenda_items (id) on delete cascade,
  -- easy = やさしく表示 / detail = 詳しく表示
  mode text not null check (mode in ('easy', 'detail')),
  content text not null,
  -- 生成に使用したモデル名（将来的なモデル差し替え時の追跡用）
  generated_by text,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agenda_summaries_unique_mode unique (agenda_item_id, mode)
);

comment on table public.agenda_summaries is '議案のAI要約（やさしく/詳しく）';
comment on column public.agenda_summaries.mode is 'easy: やさしく表示 / detail: 詳しく表示';

create index if not exists idx_agenda_summaries_agenda_item_id on public.agenda_summaries (agenda_item_id);

create trigger set_updated_at
  before update on public.agenda_summaries
  for each row
  execute function utils.update_timestamp();

alter table public.agenda_summaries enable row level security;

create policy "agenda_summaries_select_anon" on public.agenda_summaries
  for select to anon using (true);

create policy "agenda_summaries_select_authenticated" on public.agenda_summaries
  for select to authenticated using (true);

-- 要約の生成・再生成は管理者、またはサーバー側のservice roleから行う想定
create policy "agenda_summaries_insert_admin" on public.agenda_summaries
  for insert to authenticated with check (utils.is_admin());

create policy "agenda_summaries_update_admin" on public.agenda_summaries
  for update to authenticated using (utils.is_admin()) with check (utils.is_admin());

create policy "agenda_summaries_delete_admin" on public.agenda_summaries
  for delete to authenticated using (utils.is_admin());
