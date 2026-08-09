-- purpose: 共通ユーティリティ（updated_at自動更新関数）を作成する
-- affected: utils schema, utils.update_timestamp() function
-- notes: mirai-gikaiの元スキーマにある同種の仕組みを踏襲。以降の全テーブルのupdated_atトリガーで使用する

create schema if not exists utils;

grant usage on schema utils to anon;
grant usage on schema utils to authenticated;

create or replace function utils.update_timestamp()
returns trigger
set search_path = ''
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

grant execute on function utils.update_timestamp() to anon;
grant execute on function utils.update_timestamp() to authenticated;

-- 管理者権限を判定するヘルパー関数
-- auth.usersのraw_app_meta_data->'roles' に "admin" が含まれるユーザーを管理者とみなす
-- (README記載のAdminユーザー作成手順と同じ仕組みに合わせている)
create or replace function utils.is_admin()
returns boolean
set search_path = ''
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'roles') @> '["admin"]'::jsonb,
    false
  );
$$;

grant execute on function utils.is_admin() to anon;
grant execute on function utils.is_admin() to authenticated;
