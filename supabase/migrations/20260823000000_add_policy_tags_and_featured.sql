-- purpose: 議案・一般質問にテーマ別タグと注目フラグを追加する（Phase5 トピック表示改善）
-- affected: public.agenda_items, public.general_questions
-- notes: policy_tagsは固定語彙（packages/shared/src/policy-tags.ts）を管理者が手動で複数選択する運用。
--        AIによる自動タグ付けは行わない。is_featuredも管理者による手動フラグ。

alter table public.agenda_items
  add column if not exists policy_tags text[] not null default '{}',
  add column if not exists is_featured boolean not null default false;

alter table public.general_questions
  add column if not exists policy_tags text[] not null default '{}',
  add column if not exists is_featured boolean not null default false;

comment on column public.agenda_items.policy_tags is 'テーマ別タグ（複数可、固定語彙）。議案区分(category)とは別軸で、町民向けの分かりやすい分類用';
comment on column public.agenda_items.is_featured is '管理者が手動で設定する注目フラグ';
comment on column public.general_questions.policy_tags is 'テーマ別タグ（複数可、固定語彙）';
comment on column public.general_questions.is_featured is '管理者が手動で設定する注目フラグ';

create index if not exists idx_agenda_items_policy_tags on public.agenda_items using gin (policy_tags);
create index if not exists idx_agenda_items_is_featured on public.agenda_items (is_featured);
create index if not exists idx_general_questions_policy_tags on public.general_questions using gin (policy_tags);
create index if not exists idx_general_questions_is_featured on public.general_questions (is_featured);
