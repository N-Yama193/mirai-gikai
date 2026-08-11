-- purpose: 議案・一般質問にAI要約（論点＋結論）カラムを追加する
-- affected: public.agenda_items, public.general_questions
-- notes: docs/Phase3-2_AI要約DB連携_設計仕様.md に基づく。1対1関係のため別テーブル化せず、
--        カラム追加で対応する。既存のagenda_summaries/question_topic_summaries（やさしく/詳しく
--        書き換え用、mode=easy/detail）とは別機能であり、それらは変更しない。

alter table public.agenda_items
  add column ai_summary jsonb,
  add column ai_summary_status text not null default 'none'
    check (ai_summary_status in ('none', 'draft', 'published')),
  add column ai_summary_generated_at timestamptz,
  add column ai_summary_published_at timestamptz,
  add column ai_summary_source_hash text;

comment on column public.agenda_items.ai_summary is 'AI生成の論点＋結論要約（{points: string[], conclusion: string}）';
comment on column public.agenda_items.ai_summary_status is 'none: 未生成 / draft: 下書き / published: 公開済み';
comment on column public.agenda_items.ai_summary_source_hash is '生成元本文（title + proposal_reason）のsha256ハッシュ。再生成要否の判定に使用';

alter table public.general_questions
  add column ai_summary jsonb,
  add column ai_summary_status text not null default 'none'
    check (ai_summary_status in ('none', 'draft', 'published')),
  add column ai_summary_generated_at timestamptz,
  add column ai_summary_published_at timestamptz,
  add column ai_summary_source_hash text;

comment on column public.general_questions.ai_summary is 'AI生成の論点＋結論要約（{points: string[], conclusion: string}）';
comment on column public.general_questions.ai_summary_status is 'none: 未生成 / draft: 下書き / published: 公開済み';
comment on column public.general_questions.ai_summary_source_hash is '生成元本文（title + 配下question_topics.raw_excerptの連結）のsha256ハッシュ。再生成要否の判定に使用';
