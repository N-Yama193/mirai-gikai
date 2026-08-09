-- purpose: 動作確認用のサンプルデータを投入する（令和6年第3回定例会 実データより一部抜粋）
-- affected: assemblies, council_members, general_questions, question_topics, minutes_documents
-- notes: このファイルは開発環境の動作確認専用。本番投入時は削除するか、
--        supabase/seed.sql に移してpnpm db:resetの対象にすること。

do $$
declare
  v_assembly_id uuid;
  v_member_takeshita uuid;
  v_member_eto uuid;
  v_member_shimoda uuid;
  v_gq1 uuid;
  v_gq2 uuid;
  v_gq3 uuid;
begin

  insert into public.assemblies (name, session_type, session_number, fiscal_year, start_date, end_date, total_agenda_items)
  values ('令和6年第3回定例会', '定例会', 3, 2024, '2024-09-03', '2024-09-18', 27)
  returning id into v_assembly_id;

  insert into public.council_members (name, seat_number, role)
  values ('竹下英治', 5, '一般')
  returning id into v_member_takeshita;

  insert into public.council_members (name, seat_number, role)
  values ('江藤美代子', 9, '一般')
  returning id into v_member_eto;

  insert into public.council_members (name, seat_number, role)
  values ('下田めぐみ', 1, '一般')
  returning id into v_member_shimoda;

  insert into public.minutes_documents (assembly_id, source_pdf_url, published_date, extraction_status)
  values (
    v_assembly_id,
    'https://www.town.hirokawa.fukuoka.jp/material/files/group/37/060903.pdf',
    '2024-09-03',
    'extracted'
  );

  insert into public.general_questions (assembly_id, council_member_id, order_number, title)
  values (v_assembly_id, v_member_takeshita, 1, '国道3号バイパスと上広川小学校の建て替え問題ほか')
  returning id into v_gq1;

  insert into public.question_topics (general_question_id, topic_title, raw_excerpt, department, display_order)
  values (
    v_gq1,
    '国道3号広川八女バイパスと上広川小学校の建て替え問題',
    '竹下議員は、国道3号広川八女バイパスのルート決定の経緯について質問。令和2年5月13日にルート帯（山側ルート）が国の審議会で決定され、その10日後の5月22日に町から国土交通省へ要望書が提出された。町長は「国土交通省の審議会が専門家の意見を踏まえ適正に手続きを行った」と答弁。',
    '建設課',
    1
  );

  insert into public.general_questions (assembly_id, council_member_id, order_number, title)
  values (v_assembly_id, v_member_eto, 2, '防災対策の進捗と学校給食費の無償化要望')
  returning id into v_gq2;

  insert into public.question_topics (general_question_id, topic_title, raw_excerpt, department, display_order)
  values (
    v_gq2,
    '令和5年7月豪雨からの復旧状況',
    '江藤議員は、令和5年7月の記録的豪雨からの復旧状況を質問。町長は、災害査定を受けた30か所のうち22か所で工事発注済み、うち10か所が完了と答弁。',
    '建設課',
    1
  );

  insert into public.question_topics (general_question_id, topic_title, raw_excerpt, department, display_order)
  values (
    v_gq2,
    '学校給食費の無償化要望',
    '江藤議員は、給食費無償化について、町民の1割を超える2,352名の署名が提出されていることを紹介し、財源が課題であっても柔軟な検討を求めた。子ども課長は、物価高騰分の補助は既に実施しており、国の動向を見ながら恒久的な制度化の財源を模索していくと答弁。',
    '子ども課',
    2
  );

  insert into public.general_questions (assembly_id, council_member_id, order_number, title)
  values (v_assembly_id, v_member_shimoda, 4, '主要地方道・三潴上陽線の整備について')
  returning id into v_gq3;

  insert into public.question_topics (general_question_id, topic_title, raw_excerpt, department, display_order)
  values (
    v_gq3,
    '三潴上陽線の歩道整備とバイパス完成後の道路格下げ懸念',
    '下田議員は、三潴上陽線について、歩道未整備区間が多く、通学時に児童のすぐ横を大型車が通る危険な状況を指摘。建設課長は、歩道整備が進行中だが1区画の整備完了までに10年単位の期間がかかると答弁。',
    '建設課',
    1
  );

end $$;
