-- purpose: agenda_items・general_questionsのうちpolicy_tags未設定(空配列)のレコード全件に、
--          内容に基づいてテーマ別タグを設定する
-- affected: public.agenda_items, public.general_questions
-- notes: タグ語彙はpackages/shared/src/policy-tags.ts固定定義の7種
--        (kurashi_fukushi/machizukuri_bosai/kyoiku/sangyo_chiiki/zaisei_gyosei/kankyo_kiban/sonota)。
--        1件につき1〜2個を目安に、title・proposal_reason・question_topicsの内容から手動で判断
--        (AIによる自動タグ付けは行わない運用のため、本マイグレーションも手動判定による一括
--        バックフィルという位置づけ)。該当なしの場合のみsonotaとする方針だったが、対象97+39
--        件は全て1〜7区分のいずれかに分類可能だったためsonotaの使用はなし。
--        各UPDATE文は `where policy_tags = '{}'` を条件に含めることで、既にタグ設定済みの
--        レコードを変更せず、かつ再実行しても安全(冪等)になるようにしている。

do $$
begin

  -- agenda_items: policy_tags未設定分へのタグ付与
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '42bda399-b749-454b-aaae-e6c461cc18e1' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'aa9ef15a-5fcd-4f35-b8a0-38ee8379d36c' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '855e96c9-91ba-4baf-8fd8-67a6e2e10028' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '263944b2-fd43-44ae-9c44-889faedd8426' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '316434b6-769e-4d95-8c20-0e7881a43231' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '6ff141a0-b218-44ba-8e44-4cc64c5ead58' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '9ddb53d0-c970-4573-ae60-ba8297c9b31d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'e754d749-4288-4d80-ab0f-8a8fb7e9ffed' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '7ac1946f-e44b-4acf-9bef-6b21f108b354' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = 'f1d93dc5-7fea-4b00-8651-d1e308c5446a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '793112ac-f637-4dcd-af72-42d58039b2ef' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = '8f7abbda-6f16-44a6-b200-73e965326729' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '17c4bbb6-25e8-4a71-91f5-ad00a8647b55' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '4d746e6d-d014-402a-8c7d-82f464b3ad6f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '8fb6cce3-364f-4df8-8ad2-8117773dae1f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '4bf67f85-5ece-4ace-b0c0-bb3c039e1d9a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = 'd185e836-7f12-43fa-9667-47bb505296cc' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = 'b0563e2e-f676-4db5-956b-069115f90e58' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = 'be9c59d4-c374-44a2-8a69-29aa3a9bd874' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'd0252136-3853-4920-89e0-e7e14d063fd3' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = 'dbc80b8e-89ac-40cf-a42e-10bd9947569a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '97a17e0c-5b4d-42ae-90d6-a6a5e8c7c9d1' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = 'ebefb6cc-db62-4094-9c8e-9b8c2718af09' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '5ce8cbd1-6c06-46e1-8a4b-adfb112a460a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '7f16d8f4-5c0a-4e37-a3e1-4944193a2585' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = 'c4cec272-b83b-4cba-a696-35d6990fdfb5' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei','kurashi_fukushi'] where id = 'a003b0df-ee8c-42f4-95aa-547ad67d0501' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = 'fd74a389-00d4-4a11-b139-a0c6be9fc6a4' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '68aef8c6-b0b3-4b73-9cdf-a1791ebc225c' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '90a803d8-9193-45a5-8714-c7590cd7430d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'd1b2fe05-fe32-4308-93bf-a1fbade2c312' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '060e48ef-d141-47e6-b1f2-0010f6ede219' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei','machizukuri_bosai'] where id = '8b693a68-a27c-4656-9884-4c5e77e76976' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '581e38c3-ebf9-4691-aa80-d651379ec487' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '22261d3b-41fa-4fb4-ae81-b9c47c7204cb' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'ac62be40-20e2-4f7d-b632-018de0a69f33' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'f9158131-4619-4752-a3a5-a6963ef521eb' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = 'e94ca816-f7c3-443c-a157-c8333adc80f2' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '2f6c193a-eacb-4e50-be98-405a9e261011' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = 'b1b148d5-3625-4b84-8152-2ef5081887c7' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = 'e6f4ea0c-d643-46ee-adee-b3dde2fa8931' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '58437562-788f-405e-98da-2b6eca2bb0a3' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'cf957a64-4fa9-416b-946b-b6b3c2623550' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'd63f881b-520f-49cc-918e-8089ad5c762a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'b9174689-5caf-45b3-9b24-beff22a70a5c' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei','machizukuri_bosai'] where id = 'd583179a-2141-4829-90b7-e29cbd876629' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'f5a21a83-9970-4f4d-9e20-2a2f91b0d6de' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'd9e7aade-1c1f-4881-9a4d-bc766e0fb532' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'a688c108-3e76-4986-adc7-d0b6b9272d1b' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '266dcce4-0ff7-42d9-af7b-0643abf1798b' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '9cc8d0e7-defb-4f69-aa1e-9eccfec72bfd' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '276dff8c-c7e3-4216-8536-bb966233d7dd' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '79f1b519-7cdc-485b-89fb-1a210861470f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['sangyo_chiiki'] where id = '7f392668-b5ee-44b1-83ec-653d192191a9' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei','machizukuri_bosai'] where id = '2617c73e-5577-4cce-8d7a-99f03a55b7f2' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '1e5204ec-0d23-439e-82c1-cf4e9481dc67' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '036ddae1-dce6-401b-896e-daa4330a4560' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = 'ed3c3bcc-fa80-45fa-bbf1-23292cc32393' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '48a4db97-b456-4ca7-aa3c-c1e5624ac00a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = 'c47ee386-26c5-4cd3-ab71-63721214acd1' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '864dd689-be1c-45fa-bc5b-2dd42a8caeda' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '081337b4-aa63-450b-b05c-6fe4cc4e95c2' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '7198bebe-9b9e-406a-9273-76a5f7fe6539' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kyoiku','zaisei_gyosei'] where id = 'df7a3351-2953-49a7-a6a2-0804d163a06c' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = 'd1d4d904-fcc6-49a9-98fe-32e9ec5288f4' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = 'a19e5213-2d1e-4299-b373-ec73b434c701' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'c3b1086f-1797-4315-b88e-b1aa96aa5c9f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kyoiku','machizukuri_bosai'] where id = 'e4b19ce7-746c-4abc-afce-a5fb8c43124e' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '3def65a4-9b72-4b49-a447-4c43de2059f1' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '63ccc11b-409a-49af-9f8e-f738d0c0ae3d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'ac78510a-948d-4d9b-8d65-24317291473e' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '81b3afd9-8495-4e19-91d7-8941fbb5d822' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = 'b35ccac6-3bf7-43d6-8d4a-412d14da8f39' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = '13fa66b0-5b99-452b-b8e7-4766893accee' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '205f6d88-f70a-4cea-88cf-b8f774cae28f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '6740526d-2b2d-42f9-b249-acab3acd750d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '90ba5155-e8f7-49ae-8a38-56eabc02c544' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '67135751-b8a9-4c97-8598-d1200bb69186' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'd373af15-de13-430b-9e5f-8324a1297238' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '48ec1027-8bbd-4a39-a9e1-825f1048da4d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban','zaisei_gyosei'] where id = 'a159a584-513e-4c49-bd11-eabc10304c6a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'eca44cd6-7846-44f6-aa13-c6c90af06112' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = 'd1d1a16b-0519-4d21-b249-62ab1716135f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = 'dd17a2c0-cf58-444f-a20e-9dd571f35567' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = '2d82b264-6aff-4cbd-9312-29a75622334a' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['machizukuri_bosai'] where id = '633d2242-f92c-41be-820a-06e9c16f5e72' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['sangyo_chiiki','zaisei_gyosei'] where id = '88031d85-f860-494f-919d-187955a6386d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['sangyo_chiiki','zaisei_gyosei'] where id = 'd6623696-48c1-4972-992b-b55aa9d28dc5' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban','zaisei_gyosei'] where id = '8723b232-08f3-4e40-89f6-dd57a086760f' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['sangyo_chiiki'] where id = '6c12cba0-eeba-441b-b0c8-1e3055aa1b7d' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '8b7a7957-f424-47d6-9e82-03765489f7f2' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kyoiku'] where id = 'ab7740ac-9e3f-4346-a5b8-4028421e174e' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kankyo_kiban'] where id = '346dd075-6038-4352-bb19-ac2ea98f1354' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kyoiku'] where id = '3d642ef7-ec40-4732-b984-92d360e580ff' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '0f190d39-78d6-48f4-b582-52ffcaeb0cc8' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['zaisei_gyosei'] where id = '4972aeb7-2eef-4804-9d8c-9139d36380fe' and policy_tags = '{}';
  update public.agenda_items set policy_tags = array['kurashi_fukushi'] where id = '62f0efe5-7886-40b7-b2c0-279927efd074' and policy_tags = '{}';

  -- general_questions: policy_tags未設定分へのタグ付与
  update public.general_questions set policy_tags = array['kyoiku','machizukuri_bosai'] where id = 'd461a0d4-71f2-44ee-80f0-7d1e853a2367' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['zaisei_gyosei','sangyo_chiiki'] where id = '1029053b-4c82-4f9a-b173-1a7e5061962d' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi'] where id = '3156aae0-4fa9-40f7-900f-04f69280de01' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['zaisei_gyosei'] where id = '4d08dcd9-3349-4c66-8d52-8f9f23521a57' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku','sangyo_chiiki'] where id = '12adc70b-2d6b-46be-a139-5ab2cd4d6f4d' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai'] where id = '5301c83b-010a-4e0e-a9f2-43e38e3cf7fb' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi'] where id = '0f5f7315-45ba-45ea-919a-eb7e7bd91dd1' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki','machizukuri_bosai'] where id = 'b48e8fc5-03dd-4bec-b6b4-632950823d41' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai','kyoiku'] where id = '0b18f9da-9d63-4c59-a519-182f5ee01e36' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['zaisei_gyosei'] where id = '8d3656ff-64cd-4b4e-b986-13cfa3377e4b' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki','zaisei_gyosei'] where id = 'd9e583a5-ca49-4d02-b927-05a1629872bc' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi','kyoiku'] where id = 'b2c41f0c-4285-46f4-9d84-0efc371c088d' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku','machizukuri_bosai'] where id = '19777cfc-19ec-43e7-8f35-f7e9fb89a51f' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi','kyoiku'] where id = '981401c5-dd73-466c-b2de-251d0e23ea7a' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki'] where id = 'a2a77c56-5c4b-4ec9-ae7c-dbf61347f7c6' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku','kurashi_fukushi'] where id = '8244c212-0a6e-42b9-8b1d-45417e069d95' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai','kyoiku'] where id = '0e6b8ee6-b0dc-4fa0-b37b-15aa1ba15b50' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi','zaisei_gyosei'] where id = 'd9e89e25-9926-49bc-9966-a9a755ce29c5' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku','sangyo_chiiki'] where id = '140ec09d-ee46-49e3-9e75-ba32b95d31ec' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai','sangyo_chiiki'] where id = 'ba1627b3-f20e-4184-a414-24d3943dfb3e' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku'] where id = '0cc6f171-3fd7-43a7-8468-e110a428cf8f' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['zaisei_gyosei','machizukuri_bosai'] where id = '926a048f-7a02-465b-bf10-8363e2847d1c' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi'] where id = '455af9e1-9338-4e71-8da7-3dc5372f8ef8' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai','sangyo_chiiki'] where id = 'b50ad45f-00fb-4e35-b6e0-13211d8ff13d' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi'] where id = 'ab1103b7-58bb-4c81-9bb3-954b697e63b4' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki','zaisei_gyosei'] where id = 'b9466d3c-1850-4a33-b0c1-f3c78bbf6158' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki','machizukuri_bosai'] where id = 'a06f93b1-8685-4a6a-93a4-4e6af2a1b74a' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku','sangyo_chiiki'] where id = '9a46e854-d016-4ea6-b6b4-0a15fb1b8764' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai','kyoiku'] where id = 'd7c5682e-443c-48f8-85a6-e2e5bb30395a' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki'] where id = 'df56059f-8f09-4e50-8f89-cb7dc28a6b74' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi'] where id = 'f2528402-e901-4899-8bf5-d73e46b49fab' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi'] where id = 'ee5e322f-c2c1-4cb4-82ba-f52f96705789' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['sangyo_chiiki','machizukuri_bosai'] where id = '1ffaef59-1dfd-4f50-ad4d-8170307d717a' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai','sangyo_chiiki'] where id = 'e58f67e7-f258-44a5-b055-dafa965dd78d' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kurashi_fukushi','sangyo_chiiki'] where id = 'c507703f-236d-4355-82fb-fd837c201a79' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['machizukuri_bosai'] where id = 'a9a47f27-061f-4d48-8a8a-93c13eb4d44e' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['zaisei_gyosei','kyoiku'] where id = 'b4046b1f-a13a-437b-b85b-fe7b3c52f693' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['zaisei_gyosei','machizukuri_bosai'] where id = 'f214da49-1660-4851-a1f1-2c197aed0a01' and policy_tags = '{}';
  update public.general_questions set policy_tags = array['kyoiku','sangyo_chiiki'] where id = '56a2dccb-cfcd-4ee2-bf55-d7e86380b966' and policy_tags = '{}';

end $$;
