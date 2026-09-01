/**
 * トップページ「次の議会（傍聴案内）」カードの設定。
 *
 * 広川町議会の会期・傍聴案内は本サイトのDBでは管理していないため、広川町公式サイト
 * で確認した情報をここに手入力する。次の定例会が近づいたら、このファイルの内容だけ
 * 書き換えれば良いシンプルな構造にしている（DBスキーマ変更は不要）。
 *
 * 該当する「次の議会」がない期間（会期の合間で案内すべき情報がないなど）は
 * UPCOMING_ASSEMBLY を null にすれば、トップページのカードは表示されなくなる。
 */

export interface UpcomingAssemblyInfo {
  /** 定例会・臨時会の名称（例: "令和8年第3回(9月)定例会"） */
  name: string;
  /** 会期（例: "2026年9月3日(木)〜9月17日(木)"） */
  sessionPeriod: string;
  /** 一般質問（本会議）の日時（例: "9月3日(木)・9月4日(金) 9時30分開会"） */
  generalQuestionSchedule: string;
  /** 開催場所（例: "広川町役場4階 議場"） */
  venue: string;
  /** 傍聴案内の説明文 */
  visitInfo: string;
  /** 参考リンクのURL（広川町議会公式サイトの傍聴案内ページなど） */
  referenceUrl: string;
  /** 参考リンクのラベル */
  referenceLabel: string;
}

export const UPCOMING_ASSEMBLY: UpcomingAssemblyInfo | null = {
  name: "令和8年第3回(9月)定例会",
  sessionPeriod: "2026年9月3日(木)〜9月17日(木)",
  generalQuestionSchedule: "9月3日(木)・9月4日(金) 9時30分開会",
  venue: "広川町役場4階 議場",
  visitInfo:
    "事前予約は不要です。当日、4階傍聴席入口前の受付で「議会傍聴人受付票」に住所・氏名を記入し、「議会傍聴券」を受け取って入場してください(先着35席、定員あり)。",
  referenceUrl:
    "https://www.town.hirokawa.fukuoka.jp/soshiki/gikai_jimukyoku/1/1/4/2/4615.html",
  referenceLabel: "広川町議会 議会傍聴について",
};
