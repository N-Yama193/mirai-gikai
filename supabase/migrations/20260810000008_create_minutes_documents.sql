-- purpose: 会議録PDF原本のメタ情報を管理するテーブルを作成する
-- affected: public.minutes_documents
-- notes: 国会の法案モデルには存在しない概念。町議会は会議録が公式サイトにPDFで
--        個別公開されているため、出典として原本を紐づけておく必要がある。
--        将来的にPDF全文をテキスト化してベクトル検索する場合の拡張余地として
--        full_text列を用意しているが、初期は空でよい。

create table if not exists public.minutes_documents (
  id uuid primary key default gen_random_uuid(),
  assembly_id uuid not null references public.assemblies (id) on delete cascade,
  -- 広川町議会公式サイトで公開されているPDFの原本URL
  source_pdf_url text not null,
  published_date date,
  page_count integer,
  -- PDFから抽出した全文（任意。抽出済みの場合のみ格納。要約生成の再現性のため）
  full_text text,
  -- 抽出処理の実行状態: pending / extracted / failed
  extraction_status text not null default 'pending'
    check (extraction_status in ('pending', 'extracted', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.minutes_documents is '会議録PDF原本のメタ情報とテキスト抽出結果';
comment on column public.minutes_documents.full_text is 'PDFから抽出した全文（未抽出の場合はnull）';

create index if not exists idx_minutes_documents_assembly_id on public.minutes_documents (assembly_id);

create trigger set_updated_at
  before update on public.minutes_documents
  for each row
  execute function utils.update_timestamp();

alter table public.minutes_documents enable row level security;

create policy "minutes_documents_select_anon" on public.minutes_documents
  for select to anon using (true);

create policy "minutes_documents_select_authenticated" on public.minutes_documents
  for select to authenticated using (true);

create policy "minutes_documents_insert_admin" on public.minutes_documents
  for insert to authenticated with check (utils.is_admin());

create policy "minutes_documents_update_admin" on public.minutes_documents
  for update to authenticated using (utils.is_admin()) with check (utils.is_admin());

create policy "minutes_documents_delete_admin" on public.minutes_documents
  for delete to authenticated using (utils.is_admin());
