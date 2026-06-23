import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Handshake,
  HelpCircle,
  MapPinned,
  MessageCircle,
  Ruler,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Store,
  WalletCards,
  Wrench,
} from "lucide-react";
import { getDisplayKeyword } from "@/lib/detail-content";
import { getPublishedPages } from "@/lib/pages";
import { CTA_URL } from "@/lib/site";

type CardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const painPoints: CardItem[] = [
  {
    title: "계약 종료 전 매장을 비워야 할 때",
    description:
      "임대차 계약서에 원상복구 조건이 있다면, 인테리어를 어디까지 정리해야 하는지 먼저 확인해야 합니다.",
    icon: FileText,
  },
  {
    title: "철거비와 폐기물 처리비가 부담될 때",
    description:
      "매장 규모뿐 아니라 설비, 자재, 폐기물 양에 따라 실제 비용은 달라질 수 있습니다.",
    icon: WalletCards,
  },
  {
    title: "원상복구 기준이 애매할 때",
    description:
      "바닥, 천장, 벽체, 전기 설비처럼 계약 조건과 현장 상태를 함께 봐야 하는 항목이 많습니다.",
    icon: Ruler,
  },
  {
    title: "지원 대상인지 확인이 필요할 때",
    description:
      "지원 가능 여부는 사업자 조건, 신청 기준, 매장 상황에 따라 달라질 수 있어 사전 확인이 필요합니다.",
    icon: SearchCheck,
  },
];

const guideCards: CardItem[] = [
  {
    title: "점포철거 및 원상복구 범위 확인",
    description:
      "계약상 돌려놓아야 하는 범위와 실제 공사가 필요한 범위를 함께 살펴봅니다.",
    icon: ClipboardCheck,
  },
  {
    title: "지원 대상 가능성 확인",
    description:
      "대상 조건에 맞는지 확인한 뒤 점포 철거비 지원을 활용할 수 있는 방향을 안내합니다.",
    icon: ShieldCheck,
  },
  {
    title: "공사 일정과 비용 기준 상담",
    description:
      "계약 종료 일정, 건물 관리 규정, 현장 여건을 반영해 상담 기준을 정리합니다.",
    icon: CalendarClock,
  },
];

const relatedGuides = [
  {
    title: "인천 철거비용 안내",
    description: "상가 규모와 원상복구 조건에 따라 달라지는 비용 기준을 확인합니다.",
  },
  {
    title: "강남 점포철거 안내",
    description: "건물 관리 규정과 계약 종료 일정을 함께 고려한 상담이 필요합니다.",
  },
  {
    title: "수원 원상복구 안내",
    description: "바닥, 천장, 벽체, 설비 범위를 기준으로 복구 항목을 정리합니다.",
  },
  {
    title: "부천 폐업철거 안내",
    description: "폐업 일정에 맞춰 철거와 원상복구 범위를 순서대로 확인합니다.",
  },
  {
    title: "음식점 철거비용 안내",
    description: "주방 설비, 배기, 배관, 폐기물 처리 범위가 비용에 영향을 줄 수 있습니다.",
  },
  {
    title: "카페 원상복구 안내",
    description: "인테리어 구조와 임대차 조건을 함께 확인하면 상담이 더 정확해집니다.",
  },
];

const processSteps: CardItem[] = [
  {
    title: "매장 상황 확인",
    description: "업종, 평수, 층수, 작업 동선, 폐기물 처리 여건을 먼저 확인합니다.",
    icon: Store,
  },
  {
    title: "원상복구 범위 정리",
    description: "계약 조건과 현장 사진을 바탕으로 복구가 필요한 항목을 정리합니다.",
    icon: Wrench,
  },
  {
    title: "지원 대상 가능성 검토",
    description: "대상 여부는 신청 조건과 매장 상황에 따라 달라질 수 있습니다.",
    icon: SearchCheck,
  },
  {
    title: "철거 및 원상복구 상담",
    description: "비용 기준, 일정, 공사 범위를 함께 확인한 뒤 상담을 진행합니다.",
    icon: MessageCircle,
  },
];

const costFactors = [
  "평수",
  "업종",
  "인테리어 구조",
  "바닥·천장·벽체 원상복구 범위",
  "폐기물 양",
  "작업 동선",
  "건물 관리 규정",
  "계약 종료 일정",
];

const supportCards: CardItem[] = [
  {
    title: "지원 대상 가능성 확인",
    description:
      "사업자 조건과 신청 기준을 함께 살펴보고 활용 가능성을 신중하게 확인합니다.",
    icon: SearchCheck,
  },
  {
    title: "철거 범위 상담",
    description:
      "매장 사진과 계약 조건을 바탕으로 철거와 복구가 필요한 항목을 정리합니다.",
    icon: ClipboardCheck,
  },
  {
    title: "원상복구 공사 진행",
    description:
      "대상 조건과 현장 여건을 확인한 뒤 일정과 공사 범위를 상담합니다.",
    icon: Handshake,
  },
];

const faqs = [
  {
    question: "폐업하면 반드시 원상복구를 해야 하나요?",
    answer:
      "임대차 계약서에 원상복구 의무가 포함되어 있거나 임대인과의 합의가 필요한 경우가 많습니다. 실제 범위는 계약 조건, 입점 당시 상태, 건물 관리 기준에 따라 달라질 수 있습니다.",
  },
  {
    question: "철거비용은 평당으로만 계산하나요?",
    answer:
      "평수는 중요한 기준이지만 전부는 아닙니다. 업종, 인테리어 구조, 설비, 폐기물 양, 작업 동선, 건물 관리 규정에 따라 실제 비용은 달라질 수 있습니다.",
  },
  {
    question: "희망리턴패키지 점포 철거비 지원은 누구나 받을 수 있나요?",
    answer:
      "누구나 동일하게 적용되는 제도는 아닙니다. 신청 시점의 기준, 사업자 조건, 폐업 상황, 매장 상태 등을 확인해야 하며 대상 여부는 조건에 따라 달라질 수 있습니다.",
  },
  {
    question: "지원 대상이면 철거비가 전부 지원되나요?",
    answer:
      "지원 대상이 되더라도 비용 전부가 지원된다고 단정할 수 없습니다. 지원 한도, 인정 범위, 신청 기준에 따라 실제 부담액은 달라질 수 있습니다.",
  },
  {
    question: "사진만으로도 상담이 가능한가요?",
    answer:
      "매장 사진만으로도 기본 상담은 가능합니다. 다만 임대차 계약상 원상복구 조건과 현장 상태를 함께 확인하면 더 정확한 안내가 가능합니다.",
  },
];

function CtaLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold text-emerald-700">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function IconCard({ item }: { item: CardItem }) {
  const Icon = item.icon;

  return (
    <div className="group rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm shadow-slate-200/70 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
    </div>
  );
}

export default function Home() {
  const publishedPages = getPublishedPages();
  const featuredGuides =
    publishedPages.length > 0
      ? publishedPages.slice(0, 6).map((page) => ({
          title: getDisplayKeyword(page),
          description:
            "철거비용, 원상복구 범위, 지원 가능성을 함께 확인할 수 있습니다.",
          href: `/${page.slug}/`,
        }))
      : relatedGuides.map((guide) => ({
          ...guide,
          href: "#",
        }));

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dffcf2_0,transparent_28rem),linear-gradient(180deg,#f8fffc_0%,#ffffff_34%,#f4f8fb_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-950 md:text-base">
              폐업 점포철거 안내
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-slate-950" href="#criteria">
              지원 기준
            </a>
            <a className="transition hover:text-slate-950" href="#process">
              진행 방식
            </a>
            <a className="transition hover:text-slate-950" href="#checklist">
              확인 항목
            </a>
            <a className="transition hover:text-slate-950" href="#faq">
              FAQ
            </a>
          </nav>

          <CtaLink className="px-4 py-2.5 text-xs md:px-5 md:text-sm">
            상담 신청
          </CtaLink>
        </div>
      </header>

      <section className="relative px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 translate-x-1/3 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              폐업 전후 원상복구 부담을 먼저 정리하세요
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl md:leading-[1.08]">
              폐업 후 점포철거와 원상복구, 비용 부담부터 줄여보세요
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              폐업을 진행하는 소상공인은 임대차 계약상 매장을 원상복구해야
              하는 경우가 많고, 이때 철거비용이 부담될 수 있습니다. 대상
              조건에 맞는 경우 희망리턴패키지 점포 철거비 지원을 활용해 철거
              및 원상복구 비용 부담을 줄일 수 있도록 안내합니다.
            </p>
            <div className="mt-9">
              <CtaLink>점포철거 상담 신청하기</CtaLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-tr from-emerald-200 via-cyan-100 to-white blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-950 p-5 text-white shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-emerald-200">
                      상담 전 확인 흐름
                    </p>
                    <p className="mt-1 text-xl font-semibold">복구 범위 점검</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-emerald-100">
                    조건 확인 필요
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    ["01", "원상복구 범위 확인", "계약 조건과 현장 상태"],
                    ["02", "철거비용 부담 점검", "설비·폐기물·동선 기준"],
                    ["03", "지원 대상 가능성 확인", "신청 기준과 사업자 조건"],
                    ["04", "상담 신청", "사진과 일정 확인"],
                  ].map(([number, title, description]) => (
                    <div
                      key={title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-300/20 text-sm font-semibold text-emerald-100">
                        {number}
                      </span>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className="mt-1 text-sm text-slate-300">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative -mt-6 ml-auto w-[88%] rounded-3xl border border-white bg-white p-5 shadow-xl shadow-slate-950/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">
                      상담 자료가 준비될수록
                    </p>
                    <p className="text-sm text-slate-500">
                      비용과 범위 안내가 더 정확해집니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="폐업 과정에서 자주 막히는 지점"
            title="매장을 비우기 전, 비용보다 먼저 확인해야 할 것들이 있습니다"
            description="철거와 원상복구는 현장 상황, 계약 조건, 일정이 함께 맞물립니다. 처음부터 기준을 정리하면 불필요한 비용 부담을 줄이는 데 도움이 됩니다."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="criteria" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-100 bg-white/80 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur md:p-10 lg:p-14">
          <SectionHeading
            eyebrow="지원 기준"
            title="철거비용은 줄일 수 있는 기준부터 확인해야 합니다"
            description="대상 조건에 맞는 경우 희망리턴패키지의 점포 철거비 지원 항목을 활용해 비용 부담을 줄일 수 있습니다. 다만 지원 가능 여부는 매장 상황과 신청 조건에 따라 확인이 필요합니다."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {guideCards.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold text-emerald-700">
                함께 확인하면 좋은 안내
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                매장 위치와 업종에 따라 확인할 기준이 달라질 수 있습니다
              </h2>
            </div>
            <p className="max-w-md text-base leading-8 text-slate-600">
              지역의 건물 관리 방식, 업종별 설비, 계약 종료 일정이 다르면
              상담에서 확인해야 할 항목도 달라질 수 있습니다.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/70 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 ring-1 ring-slate-100">
                  <MapPinned className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {guide.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {guide.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  기준 확인하기
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="진행 방식"
            title="폐업 일정에 맞춰 범위와 조건을 차례대로 확인합니다"
            description="상담 전 매장 사진과 임대차 계약상 원상복구 조건을 함께 확인하면 더 정확한 안내가 가능합니다."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative rounded-3xl border border-white/80 bg-white p-6 shadow-sm shadow-slate-200/70"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="checklist" className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-14">
          <div>
            <p className="mb-4 text-sm font-semibold text-emerald-300">
              확인 항목
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              철거비용은 평수만으로 결정되지 않습니다
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
              같은 평수의 매장이라도 업종, 인테리어 구조, 원상복구 범위,
              폐기물 양, 작업 동선에 따라 비용은 달라질 수 있습니다. 계약 종료
              일정이 촉박하거나 건물 관리 규정이 까다로운 경우에도 상담 기준이
              달라질 수 있습니다.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur md:p-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {costFactors.map((factor) => (
                <div
                  key={factor}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="text-sm font-medium text-slate-100">
                    {factor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 shadow-xl shadow-emerald-950/5 md:p-10 lg:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
            <div className="absolute -bottom-28 left-12 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="relative">
              <SectionHeading
                eyebrow="희망리턴패키지 안내"
                title="점포 철거비 지원, 대상이 될 경우 비용 부담을 줄이는 방법이 될 수 있습니다"
                description="희망리턴패키지에는 폐업 소상공인의 부담을 줄이기 위한 항목이 있으며, 그중 점포 철거비 지원은 조건에 맞는 경우 철거 및 원상복구 비용 부담을 줄이는 데 도움이 될 수 있습니다. 다만 지원 대상과 가능 여부는 매장 상황, 사업자 조건, 신청 기준 등에 따라 확인이 필요합니다."
              />
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {supportCards.map((item) => (
                  <IconCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="자주 묻는 질문"
            description="지원 가능성, 비용 범위, 원상복구 기준은 상황에 따라 달라질 수 있어 상담 전 기본 기준을 확인해두는 것이 좋습니다."
          />
          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 open:border-emerald-200 open:shadow-lg open:shadow-emerald-950/10"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-slate-950">
                  <span>{faq.question}</span>
                  <HelpCircle className="h-5 w-5 shrink-0 text-emerald-700 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-10 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white shadow-2xl shadow-slate-950/20 md:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
                <MessageCircle className="h-4 w-4" />
                사진과 계약 조건을 함께 확인하면 상담이 더 정확해집니다
              </p>
              <h2 className="max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                폐업 후 원상복구가 필요하다면, 철거 범위와 지원 가능성부터
                확인해보세요.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                철거비용, 원상복구 범위, 지원 대상 가능성을 함께 확인하면
                폐업 일정에 맞춘 상담을 더 빠르게 진행할 수 있습니다.
              </p>
            </div>
            <CtaLink className="!bg-white !text-slate-950 hover:!bg-emerald-50">
              상담 신청하기
            </CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
