-- purpose: 議員の一般質問（登壇単位）を管理するテーブルを作成する
-- affected: public.general_questions
-- notes: 国会の法案データモデルには存在しない、町議会特有のテーブル。
--        会議録では「〇番 議員名の登壇」という単位で一般質問が区切られており、
--        1回の登壇で複数の論点（道路、防災、給食費など）を扱うことが多いため、
--        論点はquestion_topicsに分離する。

create table if not exists public.general_questions (
  id uuid primary key default gen_random_uuid(),
  assembly_id uuid not null references public.assemblies (id) on delete cascade,
  council_member_id uuid not null references public.council_members (id) on delete restrict,
  -- 会議録内での登壇順（例: 1番目の登壇者、2番目...）
  order_number integer not null,
  -- 質問の総タイトル。会議録に明示のタイトルが無い場合は代表論点から生成する
  title text not null,
  -- 会議録PDF内での該当ページ範囲（原文参照用）
  page_start integer,
  page_end integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.general_questions is '議員の一般質問（1回の登壇単位）';
comment on column public.general_questions.order_number is '会議録内での登壇順';

create index if not exists idx_general_questions_assembly_id on public.general_questions (assembly_id);
create index if not exists idx_general_questions_council_member_id on public.general_questions (council_member_id);
create unique index if not exists idx_general_questions_assembly_order
  on public.general_questions (assembly_id, order_number);

create trigger set_updated_at
  before update on public.general_questions
  for each row
  execute function update_updated_at_column();

-- RLS: ポリシーは定義せずデフォルト全拒否。データアクセスはcreateAdminClient()経由、認可はアプリ層で行う
alter table public.general_questions enable row level security;
