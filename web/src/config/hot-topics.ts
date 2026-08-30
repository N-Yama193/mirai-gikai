/**
 * トップページ「今、広川町で話されていること」特集セクションの設定。
 *
 * 5つのテーマについて、実際の一般質問・議案から関連するレコードを手動で選んで列挙する
 * シンプルな最初のステップ。AIによる自動選定は行わず、本番DBの検索結果をもとに人手で
 * キュレーションしている。将来的にテーマページや他自治体比較へ発展させる可能性がある
 * が、現時点ではこの静的設定ファイルを読み込んでカード表示するだけの実装に留める。
 *
 * リンク先が存在しないテーマの項目を無理に追加してはいけない。該当データが見つからない
 * 場合は、そのテーマ自体をこの配列に含めない。
 */

export type HotTopicLinkType = "general-question" | "agenda-item";

export type HotTopicIconName = "Car" | "Route" | "Store" | "Home" | "Waves";

export interface HotTopicLink {
  type: HotTopicLinkType;
  assemblyId: string;
  id: string;
  label: string;
}

export interface HotTopic {
  id: string;
  icon: HotTopicIconName;
  title: string;
  description: string;
  links: HotTopicLink[];
}

export const HOT_TOPICS: readonly HotTopic[] = [
  {
    id: "regional-transport",
    icon: "Car",
    title: "地域交通",
    description: "高齢者や車を持たない人の移動をどうする?",
    links: [
      {
        type: "general-question",
        assemblyId: "b54c4cc2-2612-46f8-8a8e-01e57a5f6579",
        id: "3156aae0-4fa9-40f7-900f-04f69280de01",
        label: "ふれあいタクシーの利用状況と課題(令和7年第1回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "b54c4cc2-2612-46f8-8a8e-01e57a5f6579",
        id: "b48e8fc5-03dd-4bec-b6b4-632950823d41",
        label: "公共交通(ふれあいタクシー)の東西路線拡充(令和7年第1回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "79063e2e-6bc6-45f8-aa98-74799b785b49",
        id: "a9a47f27-061f-4d48-8a8a-93c13eb4d44e",
        label: "町民の移動手段(地域交通)の現状と今後の課題(令和8年第2回定例会)",
      },
    ],
  },
  {
    id: "national-route-3-bypass",
    icon: "Route",
    title: "国道3号・バイパス整備",
    description: "広川町を通る新しい道路計画はどうなっている?",
    links: [
      {
        type: "general-question",
        assemblyId: "e32eb0dc-cce3-4bf2-a527-95915c02edf5",
        id: "7d5a3b05-5e28-4eec-abde-7fa80448d91d",
        label:
          "国道3号広川八女バイパスと上広川小学校の建て替え問題(令和6年第3回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "b54c4cc2-2612-46f8-8a8e-01e57a5f6579",
        id: "5301c83b-010a-4e0e-a9f2-43e38e3cf7fb",
        label:
          "国道3号広川八女バイパス・県道三潴上陽線バイパスの進捗(令和7年第1回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "7dd65f4c-fad4-45e3-aa93-cf48edc42e6a",
        id: "d7c5682e-443c-48f8-85a6-e2e5bb30395a",
        label:
          "豊かなまちづくりのための施策(組織改編・バイパス事業等)(令和7年第4回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "79063e2e-6bc6-45f8-aa98-74799b785b49",
        id: "1ffaef59-1dfd-4f50-ad4d-8170307d717a",
        label:
          "一般国道3号広川八女バイパスの進捗状況と町の取り組み(令和8年第2回定例会)",
      },
    ],
  },
  {
    id: "kamihirokawa-commercial-facility",
    icon: "Store",
    title: "上広川の商業施設誘致",
    description: "上広川地区にスーパーやコンビニを呼び込めるか?",
    links: [
      {
        type: "general-question",
        assemblyId: "79063e2e-6bc6-45f8-aa98-74799b785b49",
        id: "56a2dccb-cfcd-4ee2-bf55-d7e86380b966",
        label:
          "上広川地区の振興策として、スーパーやコンビニエンスストアなどの誘致(令和8年第2回定例会)",
      },
    ],
  },
  {
    id: "vacant-houses",
    icon: "Home",
    title: "空き家問題",
    description: "増え続ける空き家をどう活用・解消する?",
    links: [
      {
        type: "general-question",
        assemblyId: "b54c4cc2-2612-46f8-8a8e-01e57a5f6579",
        id: "b48e8fc5-03dd-4bec-b6b4-632950823d41",
        label: "空き家バンクの実績と改善(令和7年第1回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "78c69403-1e60-4da6-a4e2-63a150f8b099",
        id: "140ec09d-ee46-49e3-9e75-ba32b95d31ec",
        label: "鬼ノ渕行政区の空き家問題ほか(令和7年第3回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "79063e2e-6bc6-45f8-aa98-74799b785b49",
        id: "e58f67e7-f258-44a5-b055-dafa965dd78d",
        label: "空き家対策(令和8年第2回定例会)",
      },
    ],
  },
  {
    id: "pool-outsourcing",
    icon: "Waves",
    title: "学校プールの民間委託",
    description: "老朽化するプールの水泳授業をどう続ける?",
    links: [
      {
        type: "general-question",
        assemblyId: "b54c4cc2-2612-46f8-8a8e-01e57a5f6579",
        id: "d461a0d4-71f2-44ee-80f0-7d1e853a2367",
        label: "学校プール整備・水泳授業民間委託の検討(令和7年第1回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "b54c4cc2-2612-46f8-8a8e-01e57a5f6579",
        id: "1029053b-4c82-4f9a-b173-1a7e5061962d",
        label: "学校プールの民間委託検討状況(令和7年第1回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "8bab3223-6710-43de-8513-59a82987ba94",
        id: "19777cfc-19ec-43e7-8f35-f7e9fb89a51f",
        label: "水泳授業の民間委託(広川中学校試行)(令和7年第2回定例会)",
      },
      {
        type: "general-question",
        assemblyId: "79063e2e-6bc6-45f8-aa98-74799b785b49",
        id: "56a2dccb-cfcd-4ee2-bf55-d7e86380b966",
        label: "プール指導の民間委託の報告(令和8年第2回定例会)",
      },
    ],
  },
] as const;
