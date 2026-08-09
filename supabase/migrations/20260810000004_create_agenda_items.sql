-- purpose: 定例会に提出される議案（条例改正・補正予算・人事案件など）を管理するテーブルを作成する
-- affected: public.agenda_items
-- notes: mirai-gikaiのbillsテーブルに相当する中核テーブル。
--        国会法案の「衆参の別」「審議中の委員会」といった項目は不要になる一方、
--        町議会特有の「議案区分（条例/予算/人事など）」「採決結果」を持たせている。

create table if not exists public.agenda_items (
  id uuid primary key default gen_random_uuid(),
  assembly_id uuid not null references public.assemblies (id) on delete cascade,
  -- 会議録記載の議案番号（例: "議案第1号"）
  item_number text not null,
  title text not null,
  -- 決算認定 / 報告 / 人事案件 / 条例の制定 / 条例の改正 /
  -- 補正予算 / 規約変更 / その他 など
  category text not null,
  -- 提案理由（会議録の要旨。原文からの抜粋を想定）
  proposal_reason text,
  -- 可決 / 否決 / 継続審査 / 撤回 / 未審議
  status text not null default '未審議'
    check (status in ('可決', '否決', '継続審査', '撤回', '未審議')),
  decided_on date,
  -- 提出議案リストの表示順
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.agenda_items is '定例会・臨時会に提出される議案';
comment on column public.agenda_items.category is '議案区分: 決算認定/報告/人事案件/条例の制定/条例の改正/補正予算/規約変更/その他';
comment on column public.agenda_items.status is '審議結果: 可決/否決/継続審査/撤回/未審議';

create index if not exists idx_agenda_items_assembly_id on public.agenda_items (assembly_id);
create index if not exists idx_agenda_items_category on public.agenda_items (category);
create index if not exists idx_agenda_items_status on public.agenda_items (status);

create trigger set_updated_at
  before update on public.agenda_items
  for each row
  execute function utils.update_timestamp();

alter table public.agenda_items enable row level security;

create policy "agenda_items_select_anon" on public.agenda_items
  for select to anon using (true);

create policy "agenda_items_select_authenticated" on public.agenda_items
  for select to authenticated using (true);

create policy "agenda_items_insert_admin" on public.agenda_items
  for insert to authenticated with check (utils.is_admin());

create policy "agenda_items_update_admin" on public.agenda_items
  for update to authenticated using (utils.is_admin()) with check (utils.is_admin());

create policy "agenda_items_delete_admin" on public.agenda_items
  for delete to authenticated using (utils.is_admin());
