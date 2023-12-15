import { SCREEN_NAME } from "../../config/screenName";

export const SETTING_ITEM_TITLES = {
  PROFILE: "プロフィール確認",
  MYNO: "マイナンバー提出",
  PASSWORD: "パスワード変更",
  UPLOAD_DOCUMENT: "書類アップロード",
  VIDEO: "就業に関する動画",
  ABOUT_JOB: "給与受け取りまでの全体の流れ",
  FAQ: "よくある質問・Q&A",
  SALARY: "お給料について",
  ABOUT_TRANSFER: "即払いについて",
  CONTACT: "お問い合わせ・ご要望",
  SUMAJOB_TERM: "スマジョブ利用規約",
  PRIVACY_POLICY: "個人情報保護方針・個人情報の取り扱いについて",
  PRINCIPLE: "日雇派遣の原則禁止について",
  COMPANY: "会社概要",
  APPOINTMENT: "面談予約",
  MY_CAR: "マイカー通勤登録",
  IMAGE_REGIST: "本人確認書類提出",
};

const {
  MYNO,
  MY_CAR,
  APPOINTMENT,
  UPLOAD_DOCUMENTS,
  PASSWORD,
  VIDEO,
  ABOUT_JOB,
  FAQ,
  SALARY,
  ABOUT_TRANSFER,
  CONTACT,
  SUMAJOB_TERM,
  PRIVACY_POLICY,
  PRINCIPLE,
  COMPANY,
  PROFILE,
} = SCREEN_NAME;

export const settingData = [
  {
    label: "アカウント設定",
    data: [
      { label: SETTING_ITEM_TITLES.PROFILE, screen: PROFILE },
      { label: SETTING_ITEM_TITLES.MYNO, screen: MYNO },
      { label: SETTING_ITEM_TITLES.MY_CAR, screen: MY_CAR },
      { label: SETTING_ITEM_TITLES.APPOINTMENT, screen: APPOINTMENT },
      { label: SETTING_ITEM_TITLES.UPLOAD_DOCUMENT, screen: UPLOAD_DOCUMENTS },
      { label: SETTING_ITEM_TITLES.PASSWORD, screen: PASSWORD },
    ],
    screen: "",
  },
  {
    label: "サポート",
    data: [
      { label: SETTING_ITEM_TITLES.VIDEO, screen: VIDEO },
      { label: SETTING_ITEM_TITLES.ABOUT_JOB, screen: ABOUT_JOB },
      { label: SETTING_ITEM_TITLES.FAQ, screen: FAQ },
      { label: SETTING_ITEM_TITLES.SALARY, screen: SALARY },
      { label: SETTING_ITEM_TITLES.ABOUT_TRANSFER, screen: ABOUT_TRANSFER },
    ],
    screen: "",
  },
  { label: SETTING_ITEM_TITLES.CONTACT, data: null, screen: CONTACT },
  {
    label: "各種規約",
    data: [
      { label: SETTING_ITEM_TITLES.SUMAJOB_TERM, screen: SUMAJOB_TERM },
      { label: SETTING_ITEM_TITLES.PRIVACY_POLICY, screen: PRIVACY_POLICY },
      { label: SETTING_ITEM_TITLES.PRINCIPLE, screen: PRINCIPLE },
    ],
    screen: "",
  },
  { label: SETTING_ITEM_TITLES.COMPANY, data: null, screen: COMPANY },
  { label: "ログアウト", data: null, screen: "", isLogout: true },
];

// export const temporaryRegistrationItems = [
//   {
//     label: "プロフィール作成を行ってください",
//     type: "casnavi_id",
//     screen: REGIST_1,
//   },
//   {
//     label: "本人確認書類の提出を行ってください",
//     type: "image_upload_date",
//     screen: IMAGE_REGIST,
//   },
//   {
//     label: "就業に関する動画の視聴を行ってください",
//     type: "movie_check_date",
//     screen: VIDEO,
//   },
// ];

export const completeRegistrationItems = {
  NOT_SUBMITTED: {
    label: "マイナンバー未提出",
    status: 1,
  },
  WAITING_APPROVAL: {
    label: "マイナンバー承認待ち",
    status: 2,
  },
  RETURN: {
    label: "マイナンバー差戻",
    status: 4,
  },
};

export const NOT_DISPLAY_MYNO_STATUS_LIST = [2, 3];
