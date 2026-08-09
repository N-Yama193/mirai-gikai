-- purpose: 定例会・臨時会（会期）を管理するテーブルを作成する
-- affected: public.assemblies
-- notes: mirai-gikaiのbillsに紐づく「会期」概念を独立テーブルとして整理したもの。
--        議案(agenda_items)・一般質問(general_questions)・会議録PDF(minutes_documents)は
--        すべてこのassembliesを起点にぶら下がる。

create table if not exists public.assemblies (
  id uuid primary key default gen_random_uuid(),
  -- 例: "令和6年第3回定例会"
  name text not null,
  -- 定例会 / 臨時会 の区分
  session_type text not null check (session_type in ('定例会', '臨時会')),
  -- 令和6年度の「第3回」のような回次（表示・並び替え用）
  session_number integer not null,
  fiscal_year integer not null,
  start_date date not null,
  end_date date not null,
  -- 提出議案の総数（会議録冒頭の記載をそのまま保持。集計値のキャッシュ用途）
  total_agenda_items integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint assemblies_date_check check (end_date >= start_date)
);

comment on table public.assemblies is '定例会・臨時会の会期情報';
comment on column public.assemblies.session_type is '定例会 or 臨時会';
comment on column public.assemblies.total_agenda_items is '会議録冒頭に記載された提出議案の総数（表示用キャッシュ）';

create index if not exists idx_assemblies_fiscal_year on public.assemblies (fiscal_year);
create unique index if not exists idx_assemblies_year_type_number
  on public.assemblies (fiscal_year, session_type, session_number);

create trigger set_updated_at
  before update on public.assemblies
  for each row
  execute function utils.update_timestamp();

-- RLS: 誰でも閲覧可能、書き込みは管理者のみ
alter table public.assemblies enable row level security;

create policy "assemblies_select_anon" on public.assemblies
  for select to anon using (true);

create policy "assemblies_select_authenticated" on public.assemblies
  for select to authenticated using (true);

create policy "assemblies_insert_admin" on public.assemblies
  for insert to authenticated with check (utils.is_admin());

create policy "assemblies_update_admin" on public.assemblies
  for update to authenticated using (utils.is_admin()) with check (utils.is_admin());

create policy "assemblies_delete_admin" on public.assemblies
  for delete to authenticated using (utils.is_admin());
