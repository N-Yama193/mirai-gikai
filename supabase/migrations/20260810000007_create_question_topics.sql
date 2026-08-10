-- purpose: 一般質問の中の個別論点（トピック）と、AI要約・原文抜粋を管理するテーブルを作成する
-- affected: public.question_topics
-- notes: 1件の一般質問が複数論点にまたがる場合の分割単位。
--        agenda_summariesと同様にeasy/detailの要約を持たせるが、
--        論点ごとに担当課(department)が異なるため、その情報もここで保持する。

create table if not exists public.question_topics (
  id uuid primary key default gen_random_uuid(),
  general_question_id uuid not null references public.general_questions (id) on delete cascade,
  topic_title text not null,
  -- 会議録からの原文抜粋（要約生成の元データ、原典参照用に保持）
  raw_excerpt text not null,
  -- 主に答弁した町の担当課（例: 建設課、子ども課）。複数課にまたがる場合はカンマ区切り等、運用ルールに応じて調整
  department text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.question_topics is '一般質問内の個別論点と原文抜粋';
comment on column public.question_topics.department is '主に答弁した町の担当課';

create index if not exists idx_question_topics_general_question_id on public.question_topics (general_question_id);

create trigger set_updated_at
  before update on public.question_topics
  for each row
  execute function update_updated_at_column();

-- RLS: ポリシーは定義せずデフォルト全拒否。データアクセスはcreateAdminClient()経由、認可はアプリ層で行う
alter table public.question_topics enable row level security;

-- 論点ごとのAI要約（やさしく/詳しく）。agenda_summariesと同構造だが対象がquestion_topicsのため別テーブルにしている
create table if not exists public.question_topic_summaries (
  id uuid primary key default gen_random_uuid(),
  question_topic_id uuid not null references public.question_topics (id) on delete cascade,
  mode text not null check (mode in ('easy', 'detail')),
  content text not null,
  generated_by text,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint question_topic_summaries_unique_mode unique (question_topic_id, mode)
);

comment on table public.question_topic_summaries is '一般質問の論点ごとのAI要約（やさしく/詳しく）';

create index if not exists idx_question_topic_summaries_topic_id on public.question_topic_summaries (question_topic_id);

create trigger set_updated_at
  before update on public.question_topic_summaries
  for each row
  execute function update_updated_at_column();

-- RLS: ポリシーは定義せずデフォルト全拒否。データアクセスはcreateAdminClient()経由、認可はアプリ層で行う
alter table public.question_topic_summaries enable row level security;
