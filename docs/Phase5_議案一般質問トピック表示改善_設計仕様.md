# Phase 5 議案・一般質問 トピック表示改善 設計仕様

対象: みらい議会Fork版（広川町議会）
前提: Phase 1〜4（トップページ広川町化）完了・本番反映済み
参考: みらい議会＠福岡市（https://mirai-gikai-fukuoka-city-web-6wib.vercel.app/ ）

## 1. 背景・目的

現状の広川町版は、議案一覧・一般質問一覧ともに「時系列の単純リスト」になっており、カードをクリックしないと内容が分からない。

福岡市版は、議案を「まちづくり・環境」「福祉・医療」「産業・経済」「財政・予算」などテーマ別セクションに分け、各カードに要約・タグ・ステータス・注目マークを表示しており、一覧性・可読性が高い。

このフェーズでは、福岡市版の以下4要素を広川町版に導入する。

1. ジャンル別セクション分け
2. カード上のタグ・ステータスバッジ
3. カード上のAI要約（1〜2行）
4. 注目マークによる強調表示

対象は「議案一覧」（agenda_items）と「一般質問一覧」（general_questions）の両方とする。

## 2. 現状の資産（そのまま使えるもの）

調査の結果、以下は既に実装済みで、今回はほぼ手を加えずに使える。

- `agenda_items.status`（可決/否決/継続審査/撤回/未審議）とそのバッジ表示（`AgendaItemStatusBadge`）
- `agenda_items.ai_summary` / `general_questions.ai_summary`（`points`/`conclusion` のJSON、AI生成・下書き→公開のワークフロー付き）
- 上記を生成するadmin機能（`generate-agenda-summary-core.ts` / `generate-general-question-summary-core.ts`）

→ カード上の「AI要約1〜2行」は、既存の `ai_summary.conclusion`（100字程度で生成済み）をそのまま流用できる。**新規のAI生成は不要。**

## 3. 新規に必要なもの

### 3-1. テーマタグ（ジャンル分け用）

`agenda_items` と `general_questions` の両方に、複数選択可能なタグを追加する。

```sql
alter table public.agenda_items add column policy_tags text[] not null default '{}';
alter table public.general_questions add column policy_tags text[] not null default '{}';

create index idx_agenda_items_policy_tags on public.agenda_items using gin (policy_tags);
create index idx_general_questions_policy_tags on public.general_questions using gin (policy_tags);
```

タグの語彙は固定リストとし、`packages/shared` 等の共通定数として定義する（自由入力にしない。福岡市のように件数が多くないため、固定7種程度で十分）。

| タグ | 想定する内容 | Phase4アクセントカラー割当 |
|---|---|---|
| くらし・福祉 | 子育て・高齢者・国保・福祉 | Berry `#C75A61` |
| まちづくり・防災 | 建設・都市計画・水害復旧・消防 | Green `#5E8060` |
| 教育 | 学校教育・給食・平和教育・主権者教育 | Ginkgo Yellow `#D6A92C` |
| 産業・地域振興 | 産業課、観光、地域コミュニティ | Kiku `#D99A42` |
| 財政・行政経営 | 予算編成、基金運用、総合計画、職員体制 | Grape `#79547D` |
| 環境・くらしの基盤 | 環境課、上下水道 | Hirokawa Blue `#174A68`（薄め） |
| その他 | 上記に当てはまらないもの | グレー |

タグは既存の `question_topics.department`（担当課）や `agenda_items.category`（議案区分＝決算認定/条例改正等の法的分類）とは別軸。department/categoryは今まで通り残し、policy_tagsはあくまで「町民が見て分かりやすいテーマ」用。

### 3-2. 注目フラグ

```sql
alter table public.agenda_items add column is_featured boolean not null default false;
alter table public.general_questions add column is_featured boolean not null default false;
```

AIによる自動判定は行わず、管理者（admin画面）が手動でON/OFFする。広川町規模（1定例会あたり議案20〜30件、一般質問5〜6件）ではAI自動選定より人手のほうが精度・納得感が高いため。

## 4. admin側の変更

- 既存の「AI要約管理」画面（`general-question-summary-list.tsx` / `agenda-item-summary-list.tsx`）に、以下を追加する。
  - テーマタグのチェックボックス（複数選択、`policy_tags`）
  - 「注目」トグルスイッチ（`is_featured`）
- 保存は既存の `saveGeneralQuestionSummary` / `saveAgendaItemSummary` 系のリポジトリ関数を拡張する形で対応する。
- 新規のAI生成フローは不要（3-1, 3-2は人手入力のため）。

## 5. web側の変更

### 5-1. カードコンポーネント

`AgendaItemCard` / `GeneralQuestionCard` を拡張し、以下を表示する。

- タグバッジ（`policy_tags`、複数可、色分け）
- ステータスバッジ（agenda_itemsは既存のものを流用。general_questionsには無いので追加しない）
- 注目マーク（`is_featured`が true の場合、🔥やバッジ等で強調。デザインは絣モチーフに合わせて控えめに）
- AI要約1〜2行（`ai_summary.conclusion` を `line-clamp-2` 等で省略表示。未公開の場合は非表示のまま現状維持）

### 5-2. 一覧のセクション化

`AgendaItemList` / `GeneralQuestionList` を、フラットな配列表示からタグ別セクション表示に変更する。

- 表示対象の定例会内の全件を取得し、`policy_tags` ごとにグルーピングして、タグの固定順序でセクション表示する。
- 1件が複数タグを持つ場合は、該当する全セクションに重複表示する（福岡市版と同様の挙動）。
- `policy_tags` が空の項目は「その他」セクションに集約し、表示から漏れないようにする（移行期間中の未タグ付けデータの受け皿）。
- 「注目」項目は、セクションとは別に、ページ最上部に横断的な「注目の議案／一般質問」セクションとしてまとめて表示する。

### 5-3. 段階導入について

既存データ（令和8年第1回定例会含む）は `policy_tags` が空の状態で移行されるため、導入直後は全件が「その他」セクションに入る。以下のいずれかで対応する。

- (a) 管理者がadmin画面で既存分に手動でタグ付けする（6件の一般質問＋30件弱の議案なら現実的な作業量）
- (b) 当面は「その他」に集約されたままでも一覧として機能はするため、優先度が低ければ後回しにする

## 6. 実装時の注意点

- `policy_tags` の固定語彙は、将来的に自治体が変わっても再利用しやすいよう、Fork設定の一部として切り出しておく（他Fork展開時の再カスタマイズ性を考慮）。
- グループ化・重複表示によりページの縦の長さが伸びるため、セクションの折りたたみ（アコーディオン）UIも検討候補とする（初期実装ではまず開いた状態で様子を見る）。
- 色分けはPhase4のアクセントカラーパレットをそのまま再利用し、新しい配色ルールを増やさない。
- WCAGコントラスト比の確認はPhase4と同様に行う。

## 7. 未決定事項（要確認）

- タグ付けの実施範囲: 今後投入するデータ全件に対してタグ付けを必須運用にするか、任意運用にするか
- 既存6件の一般質問・令和8年第1回定例会の議案への遡及タグ付けを、このフェーズで一緒にやるか、別タスクにするか
