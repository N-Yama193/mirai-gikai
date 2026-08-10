-- purpose: 広川町議会議員のマスタテーブルを作成する
-- affected: public.council_members
-- notes: mirai-gikaiのdiet_members相当。国会議員特有の項目（政党・選挙区・衆参の別）は
--        町議会には存在しないため、座席番号・会派・在任期間に絞って簡素化している。

create table if not exists public.council_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- 会議録に記載される議席番号（議長は0や null で区別してもよい）
  seat_number integer,
  -- 議長 / 副議長 / 一般 の役職区分
  role text not null default '一般' check (role in ('議長', '副議長', '一般')),
  -- 会派（広川町議会では会派が無い場合もあるためnull許容）
  party_group text,
  term_start date,
  term_end date,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.council_members is '広川町議会議員マスタ';
comment on column public.council_members.seat_number is '会議録記載の議席番号';

create index if not exists idx_council_members_seat_number on public.council_members (seat_number);

create trigger set_updated_at
  before update on public.council_members
  for each row
  execute function update_updated_at_column();

-- RLS: ポリシーは定義せずデフォルト全拒否。データアクセスはcreateAdminClient()経由、認可はアプリ層で行う
alter table public.council_members enable row level security;
