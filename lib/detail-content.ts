import type { PageRecord } from "./pages";
import { getWritingGuide, type WritingGuide } from "./writing-guides";

export type FaqItem = {
  question: string;
  answer: string;
};

export type DetailSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type DetailLayout = {
  showTopCta: boolean;
  faqTitle: string;
  relatedTitle: string;
  relatedAction: string;
};

export type DetailContent = {
  summary: string[];
  sections: DetailSection[];
  layout: DetailLayout;
};

type SectionPurpose =
  | "quickAnswer"
  | "readerSituation"
  | "scopeCheck"
  | "costVariable"
  | "restorationRange"
  | "siteCondition"
  | "quoteComparison"
  | "contractorCheck"
  | "schedulePlanning"
  | "contractReview"
  | "supportEligibility"
  | "riskPrevention"
  | "consultationPreparation"
  | "nextStep";

type KeywordIntent =
  | "cost"
  | "company"
  | "support"
  | "restoration"
  | "space"
  | "closure"
  | "general";

type ServiceKey =
  | "demolition-cost"
  | "restoration-cost"
  | "reinstatement-cost"
  | "restoration-company"
  | "reinstatement-company"
  | "demolition-company"
  | "business-closure-demolition"
  | "demolition-restoration"
  | "commercial-demolition"
  | "commercial-restoration"
  | "restaurant-demolition"
  | "cafe-demolition"
  | "store-demolition"
  | "shop-demolition"
  | "closure-support";

type ServicePattern = {
  key: ServiceKey;
  suffix: string;
  label: string;
  subject: string;
};

type KeywordContext = {
  page: PageRecord;
  keyword: string;
  location: string;
  locationSlug: string;
  service: string;
  serviceKey: ServiceKey;
  subject: string;
  guide: WritingGuide;
  seed: string;
  variant: number;
  intent: KeywordIntent;
  layoutVariant: number;
};

const SERVICE_PATTERNS: ServicePattern[] = [
  {
    key: "business-closure-demolition",
    suffix: "business-closure-demolition",
    label: "폐업 철거",
    subject: "폐업 일정과 매장 정리",
  },
  {
    key: "demolition-restoration",
    suffix: "demolition-restoration",
    label: "철거 원상복구",
    subject: "철거와 원상복구 범위",
  },
  {
    key: "commercial-restoration",
    suffix: "commercial-restoration",
    label: "상가 원상복구",
    subject: "상가 원상복구 기준",
  },
  {
    key: "commercial-demolition",
    suffix: "commercial-demolition",
    label: "상가 철거",
    subject: "상가 철거 범위",
  },
  {
    key: "restaurant-demolition",
    suffix: "restaurant-demolition",
    label: "식당 철거",
    subject: "주방 설비와 폐기물 정리",
  },
  {
    key: "restoration-company",
    suffix: "restoration-company",
    label: "원상복구 업체",
    subject: "원상복구 업체 선택",
  },
  {
    key: "reinstatement-company",
    suffix: "reinstatement-company",
    label: "원상회복 업체",
    subject: "원상회복 업체 선택",
  },
  {
    key: "demolition-company",
    suffix: "demolition-company",
    label: "철거업체",
    subject: "철거업체 선택",
  },
  {
    key: "reinstatement-cost",
    suffix: "reinstatement-cost",
    label: "원상회복 비용",
    subject: "원상회복 비용 기준",
  },
  {
    key: "restoration-cost",
    suffix: "restoration-cost",
    label: "원상복구 비용",
    subject: "원상복구 비용 기준",
  },
  {
    key: "demolition-cost",
    suffix: "demolition-cost",
    label: "철거 비용",
    subject: "철거 비용 기준",
  },
  {
    key: "cafe-demolition",
    suffix: "cafe-demolition",
    label: "카페 철거",
    subject: "카페 인테리어와 설비 철거",
  },
  {
    key: "store-demolition",
    suffix: "store-demolition",
    label: "점포 철거",
    subject: "점포 철거와 정리",
  },
  {
    key: "shop-demolition",
    suffix: "shop-demolition",
    label: "매장 철거",
    subject: "매장 철거 범위",
  },
  {
    key: "closure-support",
    suffix: "closure-support",
    label: "폐업 지원",
    subject: "폐업 지원 가능성",
  },
];

const LOCATION_MAP: Record<string, string> = {
  seoul: "서울",
  "gangnam-gu": "강남구",
  "seocho-gu": "서초구",
  "songpa-gu": "송파구",
  "gangdong-gu": "강동구",
  "mapo-gu": "마포구",
  "yongsan-gu": "용산구",
  "seoul-jung-gu": "서울 중구",
  "jongno-gu": "종로구",
  "seongdong-gu": "성동구",
  "gwangjin-gu": "광진구",
  "yeongdeungpo-gu": "영등포구",
  "guro-gu": "구로구",
  "geumcheon-gu": "금천구",
  "gwanak-gu": "관악구",
  "dongjak-gu": "동작구",
  "seodaemun-gu": "서대문구",
  "eunpyeong-gu": "은평구",
  "gangseo-gu": "강서구",
  "yangcheon-gu": "양천구",
  "nowon-gu": "노원구",
  "dobong-gu": "도봉구",
  "gangbuk-gu": "강북구",
  "seongbuk-gu": "성북구",
  "dongdaemun-gu": "동대문구",
  "jungnang-gu": "중랑구",
  incheon: "인천",
  "incheon-jung-gu": "인천 중구",
  "incheon-dong-gu": "인천 동구",
  "michuhol-gu": "미추홀구",
  "yeonsu-gu": "연수구",
  "namdong-gu": "남동구",
  "bupyeong-gu": "부평구",
  "gyeyang-gu": "계양구",
  "incheon-seo-gu": "인천 서구",
  seongnam: "성남",
  "bundang-gu": "분당구",
  pangyo: "판교",
  suwon: "수원",
  "suwon-paldal-gu": "수원 팔달구",
  "suwon-yeongtong-gu": "수원 영통구",
  "suwon-jangan-gu": "수원 장안구",
  "suwon-gwonseon-gu": "수원 권선구",
  dongtan: "동탄",
  hwaseong: "화성",
  yongin: "용인",
  "suji-gu": "수지구",
  "giheung-gu": "기흥구",
  "cheoin-gu": "처인구",
  anyang: "안양",
  "anyang-manan-gu": "안양 만안구",
  "anyang-dongan-gu": "안양 동안구",
  pyeongchon: "평촌",
  gunpo: "군포",
  sanbon: "산본",
  uiwang: "의왕",
  gwacheon: "과천",
  ansan: "안산",
  "ansan-danwon-gu": "안산 단원구",
  "ansan-sangnok-gu": "안산 상록구",
  bucheon: "부천",
  goyang: "고양",
  ilsan: "일산",
  "ilsan-dong-gu": "일산동구",
  "ilsan-seo-gu": "일산서구",
  "deogyang-gu": "덕양구",
  gimpo: "김포",
  namyangju: "남양주",
  guri: "구리",
  hanam: "하남",
  uijeongbu: "의정부",
  paju: "파주",
  siheung: "시흥",
  gwangmyeong: "광명",
  pyeongtaek: "평택",
  osan: "오산",
  anseong: "안성",
  icheon: "이천",
  yeoju: "여주",
  "gyeonggi-gwangju": "경기 광주",
  yangju: "양주",
  dongducheon: "동두천",
  pocheon: "포천",
  yangpyeong: "양평",
  gapyeong: "가평",
  busan: "부산",
  "haeundae-gu": "해운대구",
  "busanjin-gu": "부산진구",
  "suyeong-gu": "수영구",
  "dongnae-gu": "동래구",
  "busan-jung-gu": "부산 중구",
  "busan-seo-gu": "부산 서구",
  "busan-dong-gu": "부산 동구",
  "yeongdo-gu": "영도구",
  "busan-nam-gu": "부산 남구",
  "busan-buk-gu": "부산 북구",
  "sasang-gu": "사상구",
  "saha-gu": "사하구",
  "geumjeong-gu": "금정구",
  "yeonje-gu": "연제구",
  "busan-gangseo-gu": "부산 강서구",
  "gijang-gun": "기장군",
  daegu: "대구",
  "daegu-jung-gu": "대구 중구",
  "daegu-dong-gu": "대구 동구",
  "daegu-seo-gu": "대구 서구",
  "daegu-nam-gu": "대구 남구",
  "daegu-buk-gu": "대구 북구",
  "suseong-gu": "수성구",
  "dalseo-gu": "달서구",
  "dalseong-gun": "달성군",
  "gunwi-gun": "군위군",
  gwangju: "광주",
  "gwangju-dong-gu": "광주 동구",
  "gwangju-seo-gu": "광주 서구",
  "gwangju-nam-gu": "광주 남구",
  "gwangju-buk-gu": "광주 북구",
  "gwangsan-gu": "광산구",
  daejeon: "대전",
  "daejeon-dong-gu": "대전 동구",
  "daejeon-jung-gu": "대전 중구",
  "daejeon-seo-gu": "대전 서구",
  "yuseong-gu": "유성구",
  "daedeok-gu": "대덕구",
  sejong: "세종",
  ulsan: "울산",
  "ulsan-jung-gu": "울산 중구",
  "ulsan-nam-gu": "울산 남구",
  "ulsan-dong-gu": "울산 동구",
  "ulsan-buk-gu": "울산 북구",
  "ulju-gun": "울주군",
  chuncheon: "춘천",
  wonju: "원주",
  gangneung: "강릉",
  sokcho: "속초",
  donghae: "동해",
  samcheok: "삼척",
  cheongju: "청주",
  "cheongju-sangdang-gu": "청주 상당구",
  "cheongju-seowon-gu": "청주 서원구",
  "cheongju-heungdeok-gu": "청주 흥덕구",
  "cheongju-cheongwon-gu": "청주 청원구",
  chungju: "충주",
  jecheon: "제천",
  cheonan: "천안",
  "cheonan-dongnam-gu": "천안 동남구",
  "cheonan-seobuk-gu": "천안 서북구",
  asan: "아산",
  seosan: "서산",
  dangjin: "당진",
  gongju: "공주",
  nonsan: "논산",
  boryeong: "보령",
  hongseong: "홍성",
  jeonju: "전주",
  "jeonju-wansan-gu": "전주 완산구",
  "jeonju-deokjin-gu": "전주 덕진구",
  gunsan: "군산",
  iksan: "익산",
  jeongeup: "정읍",
  namwon: "남원",
  mokpo: "목포",
  yeosu: "여수",
  suncheon: "순천",
  gwangyang: "광양",
  naju: "나주",
  muan: "무안",
  pohang: "포항",
  "pohang-buk-gu": "포항 북구",
  "pohang-nam-gu": "포항 남구",
  gumi: "구미",
  gimcheon: "김천",
  gyeongsan: "경산",
  andong: "안동",
  gyeongju: "경주",
  yeongju: "영주",
  sangju: "상주",
  mungyeong: "문경",
  changwon: "창원",
  "changwon-uichang-gu": "창원 의창구",
  "changwon-seongsan-gu": "창원 성산구",
  "masan-happo-gu": "마산합포구",
  "masan-hoewon-gu": "마산회원구",
  "jinhae-gu": "진해구",
  gimhae: "김해",
  jinju: "진주",
  yangsan: "양산",
  geoje: "거제",
  tongyeong: "통영",
  sacheon: "사천",
  miryang: "밀양",
  geochang: "거창",
};

const PLACE_TOKEN_MAP: Record<string, string> = {
  amsa: "암사",
  andong: "안동",
  ansan: "안산",
  jungang: "중앙",
  sangnok: "상록",
  danwon: "단원",
  buk: "북",
  dong: "동",
  nam: "남",
  seo: "서",
  jung: "중",
  gangseo: "강서",
  station: "역",
  gu: "구",
  gun: "군",
  eup: "읍",
  myeon: "면",
};

function hashText(value: string) {
  return Array.from(value).reduce(
    (hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );
}

function hasFinalConsonant(value: string) {
  const lastChar = value.trim().at(-1);
  if (!lastChar) return false;

  const code = lastChar.charCodeAt(0) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function topicParticle(value: string) {
  return `${value}${hasFinalConsonant(value) ? "은" : "는"}`;
}

function subjectParticle(value: string) {
  return `${value}${hasFinalConsonant(value) ? "이" : "가"}`;
}

function joinLocation(parts: string[]) {
  return parts
    .join(" ")
    .replace(/\s+(구|군|동|읍|면|역)$/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function formatFallbackLocation(locationSlug: string) {
  return joinLocation(
    locationSlug
      .split("-")
      .map((part) => PLACE_TOKEN_MAP[part] ?? part),
  );
}

function detectService(slug: string) {
  const pattern =
    SERVICE_PATTERNS.find((item) => slug.endsWith(`-${item.suffix}`)) ??
    SERVICE_PATTERNS[0];
  const locationSlug = slug
    .replace(new RegExp(`-${pattern.suffix}$`), "")
    .replace(/^\/+|\/+$/g, "");

  return { pattern, locationSlug };
}

function getContext(page: PageRecord): KeywordContext {
  const { pattern, locationSlug } = detectService(page.slug);
  const fallbackLocation =
    LOCATION_MAP[locationSlug] ?? formatFallbackLocation(locationSlug);
  const displayKeyword =
    page.main_keyword && !/[?�]/.test(page.main_keyword)
      ? page.main_keyword
      : `${fallbackLocation} ${pattern.label}`;
  const location =
    displayKeyword
      .replace(new RegExp(`\\s*${pattern.label.replace(/\s+/g, "\\s*")}$`), "")
      .trim() || fallbackLocation;

  return {
    page,
    keyword: displayKeyword,
    location,
    locationSlug,
    service: pattern.label,
    serviceKey: pattern.key,
    subject: pattern.subject,
    guide: getWritingGuide(page.content_angle, page.tone, page.manner),
    seed: page.slug,
    variant: hashText(page.slug) % 17,
    intent: detectKeywordIntent(pattern.key, displayKeyword),
    layoutVariant: hashText(`${page.slug}:layout`) % 5,
  };
}

function isCompany(ctx: KeywordContext) {
  return ctx.serviceKey.endsWith("company");
}

function isCost(ctx: KeywordContext) {
  return ctx.serviceKey.endsWith("cost");
}

function isSupport(ctx: KeywordContext) {
  return ctx.serviceKey === "closure-support";
}

function isFood(ctx: KeywordContext) {
  return ctx.serviceKey === "restaurant-demolition" || ctx.serviceKey === "cafe-demolition";
}

function detectKeywordIntent(
  serviceKey: ServiceKey,
  keyword: string,
): KeywordIntent {
  if (serviceKey === "closure-support" || keyword.includes("지원")) return "support";
  if (serviceKey === "business-closure-demolition" || keyword.includes("폐업")) {
    return "closure";
  }
  if (serviceKey.endsWith("company") || keyword.includes("업체")) return "company";
  if (serviceKey.endsWith("cost") || keyword.includes("비용")) return "cost";
  if (
    serviceKey.includes("restoration") ||
    serviceKey.includes("reinstatement") ||
    keyword.includes("원상")
  ) {
    return "restoration";
  }
  if (
    serviceKey.includes("restaurant") ||
    serviceKey.includes("cafe") ||
    serviceKey.includes("commercial") ||
    serviceKey.includes("store") ||
    serviceKey.includes("shop") ||
    /상가|식당|카페|점포|매장/.test(keyword)
  ) {
    return "space";
  }

  return "general";
}

function pick<T>(items: readonly T[], seed: string, offset = 0): T {
  return items[hashText(`${seed}:${offset}`) % items.length];
}

function orderedSample<T>(
  items: readonly T[],
  count: number,
  seed: string,
): T[] {
  return [...items]
    .map((item, index) => ({
      item,
      score: hashText(`${seed}:${index}:${String(item)}`),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map(({ item }) => item);
}

function sentenceJoin(parts: string[]) {
  return parts.filter(Boolean).join(" ");
}

function conditionNoun(ctx: KeywordContext) {
  if (ctx.intent === "cost") return "견적 기준";
  if (ctx.intent === "company") return "업체 비교 기준";
  if (ctx.intent === "support") return "지원 가능성";
  if (ctx.intent === "restoration") return "원상복구 범위";
  if (ctx.intent === "space") return "현장 설비와 철거 범위";
  if (ctx.intent === "closure") return "폐업 일정과 정리 범위";
  return "현장 조건";
}

function siteVariable(ctx: KeywordContext) {
  if (isFood(ctx)) return "급배수, 배기, 주방 설비, 바닥 방수 상태";
  if (ctx.intent === "restoration") return "계약서 조항, 임대인 요청사항, 마감 상태";
  if (ctx.intent === "company") return "견적서 항목, 설명 방식, 일정 조율 가능 여부";
  if (ctx.intent === "support" || ctx.intent === "closure") {
    return "폐업 예정일, 신청 조건, 인정 가능한 공사 항목";
  }
  return "층수, 반출 동선, 폐기물 양, 작업 가능 시간";
}

function introByAngle(ctx: KeywordContext) {
  const firstStyle = ctx.layoutVariant;
  const noun = conditionNoun(ctx);
  const variable = siteVariable(ctx);
  const firstParagraphs = [
    `${topicParticle(ctx.keyword)} 지금 필요한 정보가 비용인지, 범위인지, 지원 가능성인지에 따라 먼저 봐야 할 기준이 달라집니다.`,
    `${ctx.location}에서 ${ctx.service}를 알아보는 상황이라면 ${noun}부터 정리해 두는 편이 좋습니다.`,
    `${ctx.location} ${topicParticle(ctx.subject)} 현장 사진 몇 장만으로 끝나지 않는 경우가 많습니다. ${variable}처럼 실제 범위를 바꾸는 요소가 함께 따라옵니다.`,
    `계약 종료일이 가까운 매장이라면 ${ctx.keyword}를 늦게 확인할수록 일정 선택지가 줄어들 수 있습니다.`,
    `금액부터 비교하기 전에 ${ctx.location} 매장의 ${subjectParticle(noun)} 어디까지인지 먼저 잡아야 합니다.`,
  ];

  const secondParagraphs = [
    `${ctx.service}는 철거할 항목, 다시 맞춰야 할 상태, 건물 규정, 폐기물 처리 조건이 나뉘어야 상담이 빨라집니다.`,
    `같은 업종이라도 공용부 사용 조건과 반출 시간, 마감재 상태가 다르면 견적과 일정이 달라질 수 있습니다.`,
    `상담 전에는 매장 전체 사진, 계약서의 원상복구 조항, 폐업 또는 인도 예정일을 함께 준비하면 판단이 명확해집니다.`,
    `필요한 확인은 복잡하지 않습니다. 남길 것과 철거할 것, 임대인이 요구한 상태, 지원 검토 여부를 나누면 됩니다.`,
    `${ctx.location} 매장 조건을 기준으로 보면 불필요한 항목을 줄이고 빠진 항목도 함께 점검할 수 있습니다.`,
  ];

  return [
    firstParagraphs[firstStyle],
    pick(secondParagraphs, ctx.seed, 11),
  ];
}

function toneBridge(ctx: KeywordContext) {
  const bridges = [
    `견적을 받을 때는 총액보다 포함 항목을 먼저 맞춰야 합니다. 같은 금액처럼 보여도 폐기물 처리나 마감 복구가 빠져 있으면 실제 부담이 달라집니다.`,
    `처음 준비하는 경우에는 철거와 원상복구를 한 덩어리로 보지 않는 것이 좋습니다. 없앨 부분과 돌려놓을 부분을 따로 나누면 상담 내용이 훨씬 선명해집니다.`,
    `일정이 빠듯하다면 공사 가능일, 반출 가능 시간, 인도 기준을 먼저 정해야 합니다. 이 세 가지가 늦게 정리되면 견적보다 일정 조율이 더 어려워질 수 있습니다.`,
    `현장 조건은 단정하기 어렵습니다. 사진으로 보이는 인테리어뿐 아니라 천장 속 설비, 바닥 접착면, 공용부 사용 조건도 함께 봐야 합니다.`,
    `지원 가능성을 함께 확인하려면 공사 범위와 비용 항목이 분리되어 있어야 합니다. 인정 가능한 항목과 직접 부담해야 하는 항목이 다를 수 있습니다.`,
  ];

  return pick(bridges, `${ctx.seed}:${ctx.guide.tone.label}`, 17);
}

function scopeSection(ctx: KeywordContext): DetailSection {
  const titles = [
    `${ctx.location} 매장에서 범위가 흔들리는 지점`,
    `${ctx.location} 매장에서 철거할 부분과 남겨야 할 부분`,
    `${ctx.location} 현장 범위가 분명해야 견적 기준도 맞춰집니다`,
    `${ctx.location} 매장은 사진으로 보이는 항목만으로 부족할 수 있습니다`,
  ];

  return {
    title: pick(titles, ctx.seed, 21),
    paragraphs:
      ctx.guide.manner.label === "comparative-explanatory"
        ? [
            `철거 범위와 원상복구 범위는 겹쳐 보이지만 판단 기준이 다릅니다. 철거는 없애야 할 항목이고, 원상복구는 인도 시점에 맞춰야 할 상태입니다.`,
            `두 범위가 섞인 견적은 비교가 어렵습니다. 같은 항목끼리 맞춰야 실제 부담과 빠진 작업을 함께 볼 수 있습니다.`,
          ]
        : undefined,
    items:
      ctx.guide.manner.label === "comparative-explanatory"
        ? undefined
        : [
            `${ctx.service}에 포함되는 내부 인테리어 철거 범위`,
            "바닥, 천장, 벽체, 전기 설비의 복구 필요 여부",
            isFood(ctx)
              ? "주방 또는 카운터 설비, 급배수, 배기 시설 정리 여부"
              : "간판, 외부 시설, 집기, 고정 설비 정리 여부",
            "폐기물 양, 반출 거리, 엘리베이터 사용 가능 시간",
            "임대인 또는 관리사무소가 요구하는 인도 기준",
          ],
  };
}

function riskSection(ctx: KeywordContext): DetailSection {
  const title = pick(
      [
        `${ctx.location} 매장 작업 후 추가 요청이 생기기 쉬운 부분`,
        `${ctx.location} 현장에서 일정이 밀리는 이유`,
        `${ctx.location} 작업 후 분쟁을 줄이려면 기준을 남겨야 합니다`,
        `${ctx.location} 매장은 낮은 견적보다 빠진 항목이 없는지 봐야 합니다`,
    ],
    ctx.seed,
    31,
  );

  return {
    title,
    paragraphs: [
      `범위를 작게 잡으면 공사 후 추가 복구 요청이 생길 수 있고, 반대로 필요하지 않은 항목까지 포함하면 비용이 커질 수 있습니다.`,
      sentenceJoin([
        `${ctx.location} 매장도 건물별 작업 규정과 반출 조건이 다를 수 있습니다.`,
        `일정 지연을 줄이려면 ${siteVariable(ctx)}를 상담 초기에 공유하는 편이 좋습니다.`,
      ]),
    ],
  };
}

function processSection(ctx: KeywordContext): DetailSection {
  if (ctx.guide.manner.label === "step-by-step") {
    return {
      title: pick(
        [
          `${ctx.location} 상담 전 준비 순서를 짧게 정리합니다`,
          `${ctx.location}에서 먼저 확인하고 그다음 견적을 비교하세요`,
          `${ctx.location} 매장 정리는 순서가 중요합니다`,
        ],
        ctx.seed,
        41,
      ),
      items: [
        "계약서의 원상복구 조항과 계약 종료일을 먼저 확인합니다.",
        "매장 사진으로 철거할 부분과 남겨야 할 부분을 나눕니다.",
        "폐기물 반출 동선과 건물 작업 가능 시간을 확인합니다.",
        "지원 가능성과 공사 범위를 별도로 검토합니다.",
        "상담 후 견적 항목이 같은 기준으로 정리됐는지 확인합니다.",
      ],
    };
  }

  if (ctx.guide.manner.label === "site-advice") {
    return {
      title: pick(
        [
          `${ctx.location} 현장 방문 전에 봐야 할 설비와 동선`,
          `${ctx.location} 사진만으로 부족할 수 있는 현장 조건`,
          `${ctx.location} 매장에서 놓치기 쉬운 작업 조건`,
        ],
        ctx.seed,
        43,
      ),
      items: [
        "입구와 공용부를 통한 폐기물 반출 동선",
        "천장 내부 설비와 전기 배선 상태",
        "바닥 마감재, 접착면, 방수층 상태",
        "간판과 외부 시설 철거 가능 여부",
        "건물 관리사무소의 작업 시간 제한",
      ],
    };
  }

  if (ctx.guide.manner.label === "beginner-guidance") {
    return {
      title: pick(
        [
          `${ctx.location} 매장은 철거와 복구 기준을 나누어 봐야 합니다`,
          `${ctx.location}에서 처음 알아볼 때는 용어보다 범위부터 보면 됩니다`,
          `${ctx.location}에서 없앨 부분과 맞춰야 할 상태를 나누어 보세요`,
        ],
        ctx.seed,
        45,
      ),
      paragraphs: [
        `철거는 매장 안의 시설을 걷어내는 작업이고, 원상복구는 계약상 돌려놓아야 하는 상태를 맞추는 과정입니다.`,
        `지원 가능성은 공사 자체와 별도로 확인해야 합니다. 대상 조건, 인정 범위, 신청 시점에 따라 실제 부담액이 달라질 수 있습니다.`,
      ],
    };
  }

  return {
    title:
      ctx.guide.tone.label === "practical"
        ? `${ctx.location} 상담 전에 바로 준비할 자료`
        : ctx.guide.tone.label === "approachable"
          ? `${ctx.location} 상담을 쉽게 시작하는 준비`
          : `${ctx.location} ${conditionNoun(ctx)} 상담 전에 확인할 자료`,
    items: [
      "매장 전체와 주요 설비 사진",
      "임대차 계약서의 원상복구 관련 조항",
      "폐업 예정일 또는 계약 종료일",
      "건물 관리사무소 작업 규정이 있는 경우 관련 안내",
      "지원 신청을 검토 중인 경우 사업자 기본 정보",
    ],
  };
}

function costSupportSection(ctx: KeywordContext): DetailSection {
  if (isSupport(ctx)) {
    return {
      title: pick(
        [
          `${ctx.location} 지원 조건은 공사 범위와 함께 봐야 합니다`,
          `${ctx.location} 지원 가능성은 공사 범위와 따로 확인해야 합니다`,
          `${ctx.location} 신청 전에 인정 가능한 항목을 나눠 보세요`,
        ],
        ctx.seed,
        51,
      ),
      paragraphs: [
        `점포 철거비 지원은 신청 기준, 사업자 상태, 폐업 상황, 매장 공사 범위에 따라 가능 여부가 달라질 수 있습니다.`,
        `지원 대상이 되더라도 모든 비용이 자동으로 처리되는 것은 아닙니다. 인정 가능한 항목과 직접 부담해야 하는 항목을 나누어 확인해야 합니다.`,
      ],
    };
  }

  if (isCompany(ctx)) {
    return {
      title: pick(
        [
          `${ctx.location} 업체를 볼 때는 설명 방식까지 확인하세요`,
          `${ctx.location} 견적서가 같은 범위를 말하는지 비교해야 합니다`,
          `${ctx.location} 일정 조율과 범위 설명이 분명한지 보세요`,
        ],
        ctx.seed,
        53,
      ),
      items: [
        "현장 사진만 보고 단정하지 않고 필요한 확인 사항을 묻는지",
        "철거와 원상복구 범위를 구분해 설명하는지",
        "폐기물 처리와 반출 조건을 견적에 포함하는지",
        "지원 가능성 확인에 필요한 자료를 안내하는지",
        "계약 종료 일정에 맞춰 작업 가능 여부를 알려주는지",
      ],
    };
  }

  if (isCost(ctx) || ctx.guide.tone.label === "cost-efficient") {
    return {
      title: pick(
        [
          `${ctx.location} 견적 차이가 생기는 지점부터 확인하세요`,
          `${ctx.location} 매장 비용은 평수만으로 정해지지 않습니다`,
          `${ctx.location} 추가 비용을 줄이려면 포함 범위가 보여야 합니다`,
        ],
        ctx.seed,
        55,
      ),
      paragraphs: [
        `${ctx.location} 매장의 비용은 평수와 업종만으로 정해지지 않습니다. 마감재 철거 난이도, 설비 철거, 폐기물 양, 작업 가능 시간이 함께 영향을 줍니다.`,
        `지원 가능성이 있다면 비용 항목을 더 구체적으로 나누어야 합니다. 지원 인정 범위와 실제 공사 범위가 항상 같지는 않기 때문입니다.`,
      ],
    };
  }

  return {
    title:
      ctx.guide.tone.label === "cautious"
          ? `${ctx.location} 지원 가능성 확인 시 주의할 점`
          : ctx.guide.tone.label === "urgent-but-calm"
            ? `${ctx.location} 일정과 지원 가능성을 함께 확인하세요`
            : `${ctx.location} 매장의 범위와 지원 가능성을 함께 볼 때`,
    paragraphs: [
      `${ctx.service}를 준비할 때 지원 제도를 함께 확인하면 비용 부담을 줄일 가능성이 있습니다. 다만 신청 기준과 매장 상태가 맞아야 하므로 사전 확인이 필요합니다.`,
      `철거가 필요한 부분, 복구가 필요한 부분, 지원 가능성이 있는 부분을 나누어 보면 상담 결과를 더 현실적으로 이해할 수 있습니다.`,
    ],
  };
}

function localSection(ctx: KeywordContext): DetailSection {
  const localLead =
    ctx.variant % 3 === 0
      ? `${ctx.location} 매장은 도로 접근성, 주차 가능 여부, 폐기물 차량 진입 조건에 따라 작업 방식이 달라질 수 있습니다.`
      : ctx.variant % 3 === 1
        ? `같은 ${ctx.location} 안에서도 지하층, 고층, 대형 상가, 로드숍 여부에 따라 철거와 복구 기준이 달라질 수 있습니다.`
        : `${ctx.location} 상권은 주변 점포 영업시간과 건물 작업 규정이 일정에 영향을 줄 수 있습니다.`;

  return {
    title: pick(
      [
          `${ctx.location} 매장에서 함께 확인할 현장 조건`,
        `${ctx.location} 안에서도 작업 조건은 달라질 수 있습니다`,
        `${ctx.location} 건물 규정과 반출 동선이 일정에 영향을 줍니다`,
      ],
      ctx.seed,
      61,
    ),
    paragraphs: [
      localLead,
      `${ctx.location} 매장 상담을 시작할 때는 위치와 층수, 공용부 사용 조건을 함께 알려주는 것이 좋습니다. 현장 조건이 분명할수록 일정과 비용 안내가 구체적입니다.`,
    ],
  };
}

function decisionSection(ctx: KeywordContext): DetailSection {
  const angle = ctx.guide.contentAngle.label;

  if (angle === "authoritativeness") {
    return {
      title: pick(
        [
          `${ctx.location} 결정 전에는 기준을 먼저 정리하세요`,
          `${ctx.location} 매장은 저렴한 금액보다 범위가 명확한지 봐야 합니다`,
          `${ctx.location} 계약 기준과 현장 기준을 같이 맞춰야 합니다`,
        ],
        ctx.seed,
        71,
      ),
      paragraphs: [
        `먼저 계약상 필요한 상태를 정하고, 그다음 철거 범위와 복구 범위를 나누어 견적을 봐야 합니다.`,
        `기준 없이 금액만 비교하면 어떤 항목이 빠졌는지 알기 어렵습니다. 견적에는 작업 범위, 폐기물 처리, 마감 복구, 일정 조건이 함께 보여야 합니다.`,
      ],
    };
  }

  if (angle === "expertise") {
    return {
      title: pick(
        [
          `${ctx.location} 견적을 볼 때 분리해야 할 항목`,
          `${ctx.location} 비용 항목은 같은 기준으로 나눠야 합니다`,
          `${ctx.location} 복구와 폐기물 처리 항목을 따로 확인하세요`,
        ],
        ctx.seed,
        73,
      ),
      items: [
        "기본 철거 작업비",
        "폐기물 처리와 반출 비용",
        "바닥·천장·벽체 복구 비용",
        "설비 철거와 전기·배관 정리 범위",
        "지원 인정 가능성이 있는 항목",
      ],
    };
  }

  if (angle === "experience") {
    return {
      title: pick(
        [
          `${ctx.location} 현장에서 먼저 갈리는 조건`,
          `${ctx.location} 매장은 보이지 않는 설비에서 변수가 생깁니다`,
          `${ctx.location} 매장은 작업 시간과 동선을 같이 봐야 합니다`,
        ],
        ctx.seed,
        75,
      ),
      paragraphs: [
        `현장에서는 눈에 보이는 인테리어보다 폐기물 반출, 전기 배선, 바닥 접착면, 공용부 사용 조건에서 차이가 나는 경우가 많습니다.`,
        `이 부분을 먼저 확인하면 견적이 왜 달라지는지 이해하기 쉽고, 공사 후 추가 요청도 줄일 수 있습니다.`,
      ],
    };
  }

  return riskSection(ctx);
}

function customSections(page: PageRecord): DetailSection[] {
  const sections: DetailSection[] = [];

  for (let index = 1; index <= 3; index += 1) {
    const title = page.extra[`section_${index}_title`];
    const body = page.extra[`section_${index}_body`];

    if (title && body) {
      sections.push({
        title,
        paragraphs: body
          .split(/\n{2,}/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      });
    }
  }

  return sections;
}

function purposePool(ctx: KeywordContext): SectionPurpose[] {
  const common: SectionPurpose[] = [
    "scopeCheck",
    "siteCondition",
    "consultationPreparation",
    "riskPrevention",
  ];

  if (ctx.intent === "cost") {
    return [
      "costVariable",
      "quoteComparison",
      "scopeCheck",
      "siteCondition",
      "riskPrevention",
      "consultationPreparation",
    ];
  }

  if (ctx.intent === "company") {
    return [
      "contractorCheck",
      "quoteComparison",
      "scopeCheck",
      "schedulePlanning",
      "contractReview",
      "consultationPreparation",
    ];
  }

  if (ctx.intent === "support") {
    return [
      "supportEligibility",
      "consultationPreparation",
      "schedulePlanning",
      "costVariable",
      "nextStep",
      "scopeCheck",
    ];
  }

  if (ctx.intent === "restoration") {
    return [
      "restorationRange",
      "contractReview",
      "siteCondition",
      "riskPrevention",
      "quoteComparison",
      "consultationPreparation",
    ];
  }

  if (ctx.intent === "space") {
    return [
      "siteCondition",
      "scopeCheck",
      "costVariable",
      "schedulePlanning",
      "riskPrevention",
      "contractReview",
    ];
  }

  if (ctx.intent === "closure") {
    return [
      "readerSituation",
      "schedulePlanning",
      "supportEligibility",
      "scopeCheck",
      "nextStep",
      "riskPrevention",
    ];
  }

  return common;
}

function sectionByPurpose(
  ctx: KeywordContext,
  purpose: SectionPurpose,
): DetailSection {
  if (purpose === "quickAnswer" || purpose === "readerSituation") {
    return {
      title: pick(
        [
          `${ctx.location} 매장을 비우기 전에 먼저 볼 기준`,
          `${ctx.location}에서 지금 필요한 답은 범위와 일정에서 갈립니다`,
          `${ctx.location} 상황이 급해도 확인 순서는 줄이지 않는 편이 좋습니다`,
        ],
        `${ctx.seed}:${purpose}`,
        81,
      ),
      paragraphs: [
        sentenceJoin([
          `${ctx.subject}을 준비하는 사람은 보통 비용만 궁금해하지만, 실제 상담에서는`,
          `${conditionNoun(ctx)}과 ${siteVariable(ctx)}가 먼저 확인됩니다.`,
        ]),
        `이 기준이 정리되면 견적을 받을 때 빠진 항목을 찾기 쉽고, 일정 조율도 더 현실적으로 진행할 수 있습니다.`,
      ],
    };
  }

  if (purpose === "scopeCheck") return scopeSection(ctx);
  if (purpose === "siteCondition") return localSection(ctx);
  if (purpose === "riskPrevention") return riskSection(ctx);
  if (purpose === "consultationPreparation" || purpose === "schedulePlanning") {
    return processSection(ctx);
  }
  if (
    purpose === "costVariable" ||
    purpose === "supportEligibility" ||
    purpose === "contractorCheck"
  ) {
    return costSupportSection(ctx);
  }
  if (
    purpose === "quoteComparison" ||
    purpose === "contractReview" ||
    purpose === "restorationRange"
  ) {
    return decisionSection(ctx);
  }

  return {
    title: pick(
      [
        `${ctx.location} 상담으로 넘기기 전에 정리할 마지막 기준`,
        `${ctx.location} 다음 단계는 자료를 모아 범위를 확인하는 것입니다`,
        `${ctx.location} 조건에 맞춰 견적 기준을 좁혀 보세요`,
      ],
      `${ctx.seed}:${purpose}`,
      91,
    ),
    paragraphs: [
      `매장 사진과 계약 조건, 폐업 예정일이 준비되면 상담에서 확인할 내용이 줄어듭니다.`,
      `철거 범위와 원상복구 범위를 나누어 전달하면 비용과 일정 안내도 더 구체적으로 받을 수 있습니다.`,
    ],
  };
}

function sectionsByGuide(ctx: KeywordContext) {
  const count = 2 + (hashText(`${ctx.seed}:section-count`) % 3);
  const pool = purposePool(ctx);
  const guidePurpose: SectionPurpose =
    ctx.guide.manner.label === "step-by-step"
      ? "schedulePlanning"
      : ctx.guide.manner.label === "risk-prevention"
        ? "riskPrevention"
        : ctx.guide.manner.label === "site-advice"
          ? "siteCondition"
          : ctx.guide.tone.label === "comparative"
            ? "quoteComparison"
            : ctx.guide.tone.label === "beginner-friendly"
              ? "quickAnswer"
              : "consultationPreparation";
  const selected = orderedSample(
    Array.from(new Set([guidePurpose, ...pool])),
    count,
    `${ctx.seed}:${ctx.guide.tone.label}:${ctx.guide.manner.label}`,
  );

  const sections: DetailSection[] = [];

  for (const purpose of selected) {
    const section = sectionByPurpose(ctx, purpose);
    if (!sections.some((item) => item.title === section.title)) {
      sections.push(section);
    }
  }

  for (const fallbackPurpose of purposePool(ctx)) {
    if (sections.length >= Math.min(count, 2)) break;
    const section = sectionByPurpose(ctx, fallbackPurpose);
    if (!sections.some((item) => item.title === section.title)) {
      sections.push(section);
    }
  }

  return sections;
}

function getLayout(ctx: KeywordContext): DetailLayout {
  const relatedTitles = [
    `다음 단계에서 함께 확인할 내용`,
    `비용과 범위를 비교할 때 참고할 페이지`,
    `원상복구까지 같이 살펴볼 항목`,
    `상담 전 함께 정리하면 좋은 기준`,
    `비슷한 상황에서 많이 확인하는 내용`,
  ];
  const faqTitles = [
    `${ctx.location} 매장에서 자주 확인하는 질문`,
    `상담 전에 많이 묻는 내용`,
    `${conditionNoun(ctx)}을 정리할 때 나오는 질문`,
    `결정 전에 확인하면 좋은 질문`,
    `${ctx.service} 관련 확인 사항`,
  ];

  return {
    showTopCta: ctx.layoutVariant !== 1,
    faqTitle: faqTitles[ctx.layoutVariant],
    relatedTitle: relatedTitles[ctx.layoutVariant],
    relatedAction: pick(
      ["범위 이어서 보기", "기준 더 확인하기", "관련 항목 살펴보기", "다음 기준 보기"],
      ctx.seed,
      103,
    ),
  };
}

export function getDisplayKeyword(page: PageRecord) {
  return getContext(page).keyword;
}

export function getDetailContent(page: PageRecord): DetailContent {
  const ctx = getContext(page);
  const custom = customSections(page);
  const summary = introByAngle(ctx);

  if (ctx.variant % 3 !== 1) {
    summary.push(toneBridge(ctx));
  }

  return {
    summary,
    sections: custom.length > 0 ? [...custom, ...sectionsByGuide(ctx).slice(0, 2)] : sectionsByGuide(ctx),
    layout: getLayout(ctx),
  };
}

export function getTitle(page: PageRecord) {
  const ctx = getContext(page);

  if (ctx.guide.tone.label === "urgent-but-calm") {
    return `${ctx.keyword} 계약 종료 전 확인 기준`;
  }

  if (ctx.guide.manner.label === "comparative-explanatory") {
    return `${ctx.keyword} 범위와 비용 비교 기준`;
  }

  if (isCompany(ctx)) {
    return `${ctx.keyword} 선택 전 확인할 기준`;
  }

  if (isCost(ctx)) {
    return `${ctx.keyword} 비용·원상복구 범위 확인`;
  }

  return `${ctx.keyword} 준비 방법과 지원 가능성`;
}

export function getHeroTitle(page: PageRecord) {
  const ctx = getContext(page);

  if (ctx.guide.tone.label === "urgent-but-calm") {
    return `${ctx.keyword}, 먼저 확인해야 할 범위와 일정`;
  }

  if (ctx.guide.tone.label === "beginner-friendly") {
    return `${ctx.keyword}, 처음 알아볼 때 필요한 기준부터 확인하세요`;
  }

  if (isCompany(ctx)) {
    return `${ctx.keyword}, 업체 선택 전 공사 범위부터 확인하세요`;
  }

  if (isCost(ctx)) {
    return `${ctx.keyword}, 비용이 달라지는 기준을 확인하세요`;
  }

  return `${ctx.keyword}, 철거 범위와 지원 가능성을 함께 확인하세요`;
}

export function getDescription(page: PageRecord) {
  const ctx = getContext(page);

  if (ctx.guide.tone.label === "urgent-but-calm") {
    return `${ctx.keyword}가 급하다면 계약 종료일, 원상복구 범위, 작업 가능 일정, 지원 가능성을 먼저 확인하는 것이 좋습니다.`;
  }

  if (ctx.guide.manner.label === "risk-prevention") {
    return `${ctx.keyword} 진행 전 추가 비용, 일정 지연, 원상복구 범위 누락을 줄이기 위해 확인할 기준을 정리했습니다.`;
  }

  return `${ctx.keyword}를 알아보고 있다면 원상복구 범위, 철거비용이 달라지는 기준, 점포 철거비 지원 가능성을 함께 확인해보세요.`;
}

function customFaqItems(page: PageRecord): FaqItem[] {
  const items: FaqItem[] = [];

  for (let index = 1; index <= 5; index += 1) {
    const question = page.extra[`faq_${index}_question`];
    const answer = page.extra[`faq_${index}_answer`];

    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items;
}

export function getFaqItems(page: PageRecord): FaqItem[] {
  const ctx = getContext(page);
  const custom = customFaqItems(page);

  if (custom.length > 0) {
    return custom.slice(0, 5);
  }

  const questionPool: FaqItem[] = [
    {
      question: `${ctx.keyword}에서 가장 먼저 확인할 기준은 무엇인가요?`,
      answer: `${conditionNoun(ctx)}과 계약 종료일, 매장 사진을 먼저 정리하면 상담 범위를 빠르게 좁힐 수 있습니다.`,
    },
    {
      question: `${ctx.location} 매장은 현장 방문 없이도 견적을 볼 수 있나요?`,
      answer: `사진으로 기본 범위는 볼 수 있지만 ${siteVariable(ctx)}처럼 현장에서 달라지는 요소가 있으면 방문 확인이 필요할 수 있습니다.`,
    },
    {
      question: `${ctx.location} ${conditionNoun(ctx)}에서 비용이 크게 달라지는 부분은 어디인가요?`,
      answer: `평수보다 철거 난이도, 폐기물 양, 반출 조건, 원상복구 범위, 작업 가능 시간이 더 큰 차이를 만들 수 있습니다.`,
    },
    {
      question: `${ctx.location}에서 일정이 급할 때 무엇부터 알려야 하나요?`,
      answer: `계약 종료일, 공사 가능 시간, 엘리베이터나 공용부 사용 조건, 반드시 맞춰야 하는 인도 기준을 먼저 공유하는 것이 좋습니다.`,
    },
    {
      question: `${ctx.location} ${topicParticle(conditionNoun(ctx))} 계약서만 보면 충분한가요?`,
      answer: `계약서가 기준이지만 임대인 요청사항과 관리사무소 규정, 현재 마감 상태를 함께 확인해야 실제 범위가 선명해집니다.`,
    },
    {
      question: `${ctx.location} 지원 가능성은 견적 전후 중 언제 확인하는 편이 좋나요?`,
      answer: `가능하면 견적을 보기 전부터 확인하는 편이 좋습니다. 인정 가능한 항목과 실제 공사 항목이 다를 수 있기 때문입니다.`,
    },
    {
      question: `${ctx.location}에서 ${ctx.service}를 비교할 때 금액 말고 볼 것은 무엇인가요?`,
      answer: `철거와 복구 범위를 구분해 설명하는지, 폐기물 처리와 반출 조건을 포함하는지, 일정 조율이 가능한지 함께 봐야 합니다.`,
    },
    {
      question: `${ctx.location} ${conditionNoun(ctx)}에서 추가 비용은 어떤 경우에 생기기 쉽나요?`,
      answer: `천장 속 설비, 바닥 접착면, 방수층, 간판, 야간 작업, 폐기물 양이 처음 예상과 다를 때 추가 항목이 생길 수 있습니다.`,
    },
    {
      question: `${ctx.location} ${conditionNoun(ctx)} 상담 전에 사진은 어느 정도 준비하면 되나요?`,
      answer: `입구, 전체 내부, 천장, 바닥, 벽체, 전기·수도 설비, 철거할 고정 시설을 각각 찍어두면 기본 판단에 도움이 됩니다.`,
    },
    {
      question: `${ctx.location} ${conditionNoun(ctx)} 견적서에서 빠지면 곤란한 항목은 무엇인가요?`,
      answer: `작업 범위, 폐기물 처리, 원상복구 포함 여부, 작업 시간 제한, 추가 비용 조건이 문서에 드러나는지 확인해야 합니다.`,
    },
  ];
  const count = 2 + (hashText(`${ctx.seed}:faq-count`) % 4);
  const intentFirst =
    ctx.intent === "support"
      ? questionPool[5]
      : ctx.intent === "company"
        ? questionPool[6]
        : ctx.intent === "restoration"
          ? questionPool[4]
          : ctx.intent === "cost"
            ? questionPool[2]
            : questionPool[0];
  const rest = orderedSample(
    questionPool.filter((item) => item.question !== intentFirst.question),
    count - 1,
    `${ctx.seed}:faq`,
  );

  return [intentFirst, ...rest];
}

export function getRelatedPages(currentPage: PageRecord, allPages: PageRecord[]) {
  const index = allPages.findIndex((page) => page.slug === currentPage.slug);

  if (index < 0 || allPages.length <= 1) {
    return [];
  }

  const maxOffset = allPages.length - 1;
  const baseOffsets = [
    1,
    7,
    37,
    Math.max(1, Math.floor(allPages.length / 5)),
    Math.max(1, Math.floor(allPages.length / 2)),
    Math.max(1, Math.floor((allPages.length * 4) / 5)),
    1 + (hashText(`${currentPage.slug}:link-offset`) % maxOffset),
  ];
  const related: PageRecord[] = [];
  const seen = new Set([currentPage.slug]);

  for (const offset of baseOffsets) {
    const target = allPages[(index + offset) % allPages.length];

    if (!seen.has(target.slug)) {
      related.push(target);
      seen.add(target.slug);
    }

    if (related.length >= 6) break;
  }

  for (const target of allPages) {
    if (related.length >= 6) break;
    if (!seen.has(target.slug)) {
      related.push(target);
      seen.add(target.slug);
    }
  }

  return related;
}

export function getRelatedCardText(page: PageRecord) {
  const ctx = getContext(page);

  return pick(
    [
      `${ctx.location} 매장의 ${conditionNoun(ctx)}을 이어서 확인할 수 있습니다.`,
      `${siteVariable(ctx)}가 비슷한 상황에서 함께 참고하기 좋습니다.`,
      `${ctx.service} 상담 전에 비교할 항목을 조금 더 좁혀볼 수 있습니다.`,
      `일정, 범위, 비용 항목을 나누어 볼 때 도움이 되는 안내입니다.`,
    ],
    ctx.seed,
    121,
  );
}

export function getRelatedBadgeText(
  currentPage: PageRecord,
  targetPage: PageRecord,
  index: number,
) {
  const current = getContext(currentPage);
  const target = getContext(targetPage);
  const badgePool =
    current.location === target.location
      ? ["같은 지역", "지역 기준", "인근 확인", "현장 비교", "같은 상권", "범위 비교"]
      : current.service === target.service
        ? ["같은 주제", "지역 비교", "조건 차이", "비용 비교", "범위 참고", "상황 비교"]
        : [
            "다음 확인",
            "비교 기준",
            "함께 볼 항목",
            "상담 전 참고",
            "관련 기준",
            "범위 점검",
            "비용 참고",
            "계약 확인",
            "일정 점검",
            "지원 확인",
          ];
  const offset = hashText(`${current.seed}:${target.seed}:badge`);

  return badgePool[(offset + index) % badgePool.length];
}

export function getRelatedAnchorText(
  currentPage: PageRecord,
  targetPage: PageRecord,
) {
  const current = getContext(currentPage);
  const target = getContext(targetPage);
  const targetKeyword = target.keyword;

  if (current.location === target.location) {
    return `${targetKeyword} 기준도 함께 보기`;
  }

  if (current.service === target.service) {
    return `${targetKeyword} 조건과 비교하기`;
  }

  return pick(
    [
      `${targetKeyword}에서 ${conditionNoun(target)} 확인`,
      `${targetKeyword} 범위 이어서 보기`,
      `${targetKeyword} 관련 기준`,
    ],
    `${current.seed}:${target.seed}`,
    123,
  );
}

export function getCtaText(page: PageRecord) {
  const ctx = getContext(page);

  if (ctx.guide.manner.label === "checklist-driven") return "확인 항목 상담하기";
  if (ctx.guide.tone.label === "urgent-but-calm") return "일정 상담하기";
  if (isSupport(ctx)) return "지원 가능성 상담하기";
  if (isCost(ctx)) return "비용 상담 신청하기";

  return `${ctx.service} 상담하기`;
}

export function getCtaLeadText(page: PageRecord) {
  const ctx = getContext(page);

  const leads = [
    `${ctx.location} 매장 사진과 계약 종료일을 보내주시면 필요한 범위부터 확인할 수 있습니다.`,
    `${ctx.location} 매장의 확인 기준이 애매하다면 철거할 부분과 남겨야 할 부분을 함께 정리해보세요.`,
    `${ctx.location} 매장의 견적 범위, 원상복구 기준, 지원 가능성을 나누어 확인해보세요.`,
    `${ctx.location} 매장의 ${siteVariable(ctx)}를 알려주시면 상담에서 확인할 항목을 더 빠르게 좁힐 수 있습니다.`,
    `${ctx.location} 일정이 정해져 있다면 작업 가능일과 인도 기준부터 맞춰보는 것이 좋습니다.`,
  ];

  return pick(leads, `${ctx.seed}:${ctx.intent}`, 131);
}
