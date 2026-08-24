-- purpose: 既存の議案・一般質問(令和6年第3回定例会・令和8年第1回定例会)に
--          Phase5のpolicy_tagsを一括で付与する(AI分類+人手レビュー済み)
-- affected: public.agenda_items, public.general_questions
-- notes: is_featuredはAI判定の対象外のため一切変更しない。
--        発委第1号は情報不足のためタグなし(空欄)のまま。
--        UPDATEのみで、存在しないidを指定しても副作用はない(冪等)。

update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = 'db0b5aeb-7174-437c-b66c-5f5021dcd5a8'; -- 議案第1号 令和5年度広川町一般会計歳入歳出決算認定について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = 'f45b56cd-3d00-498e-b148-01be42ec61d8'; -- 議案第5号 広川町税条例の一部を改正する条例について
update public.agenda_items set policy_tags = '{"machizukuri_bosai"}'::text[] where id = '29547fb2-c066-48e0-a5c1-023be89e057d'; -- 議案第9号 令和6年度広川町一般会計補正予算（第3号）について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = '71d23890-e847-4692-9d6a-568696e8a920'; -- 議案第4号 広川町役場課設置条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = 'a067a12c-cf0e-4385-9579-8638b5506c51'; -- 議案第5号 広川町保健・福祉センターの設置、管理及び運営に関する条例の一部改正について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = '675fea56-467b-4e82-82b8-62c142f1a1f8'; -- 議案第6号 広川町行政手続条例の一部改正について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = 'c04801e6-6a6a-499d-8866-7d7cff9f8520'; -- 議案第7号 広川町印鑑条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '72a1642d-3c31-4157-b5c6-02f89cf3a68d'; -- 議案第8号 広川町国民健康保険税条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = 'c20c6947-8d36-4be6-8b7b-5d6e883a3428'; -- 議案第9号 広川町特定乳児等通園支援事業の運営に関する基準を定める条例の制定について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = 'fb38b0e7-d998-425d-b941-d1c7c4ce99ff'; -- 議案第10号 広川町特定教育・保育施設及び特定地域型保育事業の運営に関する基準を定める条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '95bbf6d7-fe10-4171-ac5b-230c9412940e'; -- 議案第11号 広川町家庭的保育事業等の設備及び運営に関する基準を定める条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '6ab98d05-108b-4421-af72-10f4310c2bc6'; -- 議案第12号 広川町乳児等通園支援事業の設備及び運営に関する基準を定める条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = 'f473de7b-2538-417e-88eb-c2750752d2d2'; -- 議案第13号 広川町放課後児童健全育成事業の設備及び運営に関する基準を定める条例の一部改正について
update public.agenda_items set policy_tags = '{"machizukuri_bosai"}'::text[] where id = '492405c9-fbb1-4155-b1fa-0e5f0abc3813'; -- 議案第14号 広川町火入れに関する条例の一部改正について
update public.agenda_items set policy_tags = '{"sangyo_chiiki"}'::text[] where id = '973d8f48-07f9-4866-a181-6ee4908670f9'; -- 議案第15号 広川町中小企業融資資金貸付条例の一部改正について
update public.agenda_items set policy_tags = '{"kankyo_kiban"}'::text[] where id = 'e1ba3aa9-eaaa-44c3-b153-a8636a20ae18'; -- 議案第16号 広川町水道事業及び下水道事業の設置等に関する条例の一部改正について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '37e3252c-132a-473d-8c9c-f7dd1a20d40f'; -- 議案第17号 広川町保健・福祉センターの指定管理者の指定について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = '765bf68d-a89f-40f9-985b-ba3cae89206e'; -- 議案第18号 福岡県市町村職員退職手当組合を組織する地方公共団体の数の減少及び規約の変更について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = 'ec39d5f7-2b98-46ad-9e16-5381ad577eb5'; -- 議案第19号 令和7年度広川町一般会計補正予算（第8号）について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '041de39d-022d-4562-a455-b94a4659e868'; -- 議案第20号 令和7年度広川町国民健康保険特別会計補正予算（第4号）について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '001a6e9c-c71b-4803-9f70-70312f83ea91'; -- 議案第21号 令和7年度広川町後期高齢者医療特別会計補正予算（第3号）について
update public.agenda_items set policy_tags = '{"kankyo_kiban"}'::text[] where id = '37b5f41f-c015-4e8d-bad4-dc1f665e4b4a'; -- 議案第22号 令和7年度広川町水道事業会計補正予算（第3号）について
update public.agenda_items set policy_tags = '{"kankyo_kiban","zaisei_gyosei"}'::text[] where id = '2773a26a-ecde-432b-b67e-fae4ca6f4e55'; -- 議案第23号 令和7年度広川町下水道事業会計補正予算（第3号）について
update public.agenda_items set policy_tags = '{"zaisei_gyosei"}'::text[] where id = '36b5f380-7659-47cd-8f82-3f8fb84d2e6e'; -- 議案第24号 令和8年度広川町一般会計予算について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = 'd974a1f2-7911-4ad4-ba97-1ee3b9bda5b5'; -- 議案第25号 令和8年度広川町国民健康保険特別会計予算について
update public.agenda_items set policy_tags = '{"kurashi_fukushi"}'::text[] where id = '13e3b19a-fff4-42ad-86a7-e3bebdd006ef'; -- 議案第26号 令和8年度広川町後期高齢者医療特別会計予算について
update public.agenda_items set policy_tags = '{"machizukuri_bosai","zaisei_gyosei"}'::text[] where id = '06c607df-88e5-486c-84ce-4b3874695f4d'; -- 議案第27号 令和8年度広川防災ダム管理特別会計予算について
update public.agenda_items set policy_tags = '{"kankyo_kiban"}'::text[] where id = 'b8e86de0-a85b-4f7e-a36f-34932e8ee1e7'; -- 議案第28号 令和8年度広川町水道事業会計予算について
update public.agenda_items set policy_tags = '{"kankyo_kiban","zaisei_gyosei"}'::text[] where id = '3c4f6a78-6f7d-42a2-8b28-a59d532f2da4'; -- 議案第29号 令和8年度広川町下水道事業会計予算について
update public.agenda_items set policy_tags = '{}'::text[] where id = '67135751-b8a9-4c97-8598-d1200bb69186'; -- 発委第1号 広川町議会委員会条例の一部改正について

update public.general_questions set policy_tags = '{"machizukuri_bosai"}'::text[] where id = '7d5a3b05-5e28-4eec-abde-7fa80448d91d'; -- 1番 国道3号バイパスと上広川小学校の建て替え問題ほか
update public.general_questions set policy_tags = '{"machizukuri_bosai","kyoiku"}'::text[] where id = '012b39f3-c0e4-4d9b-aec8-7ade9a7db7ed'; -- 2番 防災対策の進捗と学校給食費の無償化要望
update public.general_questions set policy_tags = '{"machizukuri_bosai"}'::text[] where id = 'd4e53ae2-d051-452d-882e-726d9334a6f1'; -- 4番 主要地方道・三潴上陽線の整備について
update public.general_questions set policy_tags = '{"machizukuri_bosai","kyoiku"}'::text[] where id = '37b30949-b594-4a3d-9bf4-3e96dbaaf94b'; -- 1番 第5次総合計画の進捗、水害復興・浸水対策、こどもまんなか政策、平和教育と主権者教育
update public.general_questions set policy_tags = '{"zaisei_gyosei","sangyo_chiiki"}'::text[] where id = '070a9bc9-43d0-49c8-8fec-96d32edd899b'; -- 2番 広川町の財政見通しと自治会・地域コミュニティ事業の在り方ほか
update public.general_questions set policy_tags = '{"zaisei_gyosei","kurashi_fukushi"}'::text[] where id = '70806efe-5378-4555-b76a-099cc0e1f07f'; -- 3番 令和8年度予算編成と給食無償化、産業展示会館の直営化ほか
update public.general_questions set policy_tags = '{"kurashi_fukushi","kyoiku"}'::text[] where id = '961e7081-fb9e-4dc7-ad9a-b8bf58e21e99'; -- 4番 国保の現状と子育て支援金、教育費負担軽減、各種基金の活用方針
update public.general_questions set policy_tags = '{"zaisei_gyosei","kurashi_fukushi"}'::text[] where id = '08028dad-af4c-420e-8cc3-ff4b08eb4041'; -- 5番 職員定数・採用状況とこどもまんなかプロジェクトの推進状況
update public.general_questions set policy_tags = '{"machizukuri_bosai"}'::text[] where id = '02570c60-ee53-4c84-9738-70896f638b61'; -- 6番 広川消防署の建て替え時期・場所・敷地確保の検討状況
