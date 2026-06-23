export type ContentAngleLabel =
  | "experience"
  | "expertise"
  | "authoritativeness"
  | "trustworthiness";

export type ToneLabel =
  | "professional"
  | "approachable"
  | "objective"
  | "persuasive"
  | "practical"
  | "comparative"
  | "cost-efficient"
  | "urgent-but-calm"
  | "cautious"
  | "beginner-friendly";

export type MannerLabel =
  | "formal-structured"
  | "conversational"
  | "criteria-based"
  | "step-by-step"
  | "consultation-oriented"
  | "checklist-driven"
  | "comparative-explanatory"
  | "site-advice"
  | "beginner-guidance"
  | "risk-prevention";

export type WritingGuideEntry<T extends string> = {
  label: T;
  guide: string[];
};

export type WritingGuide = {
  contentAngle: WritingGuideEntry<ContentAngleLabel>;
  tone: WritingGuideEntry<ToneLabel>;
  manner: WritingGuideEntry<MannerLabel>;
};

export const CONTENT_ANGLE_GUIDES = {
  경험: {
    label: "experience",
    guide: [
      "Write from a practical, field-aware perspective.",
      "Use concrete situations that a store owner may actually face.",
      "Mention overlooked details before, during, or after demolition.",
      "Avoid sounding like a generic article.",
      "Prefer situation-based explanations over abstract definitions.",
    ],
  },
  전문성: {
    label: "expertise",
    guide: [
      "Write with procedural clarity and domain-specific judgment.",
      "Explain standards, sequence, scope, and decision criteria.",
      "Use practical terms but explain them in accessible language.",
      "Avoid vague claims and organize the information logically.",
      "Focus on what should be checked before making a decision.",
    ],
  },
  권위성: {
    label: "authoritativeness",
    guide: [
      "Write in a confident but not exaggerated manner.",
      "Emphasize decision standards, comparison criteria, and scope control.",
      "Avoid promotional claims without context.",
      "Use firm guidance where the reader needs a clear standard.",
      "Frame the page as a reliable reference for making a decision.",
    ],
  },
  신뢰성: {
    label: "trustworthiness",
    guide: [
      "Write transparently and conditionally.",
      "Make clear that cost, scope, and eligibility can vary by site condition.",
      "Avoid guaranteed outcomes or overpromising.",
      "Mention what needs to be verified before consultation or quotation.",
      "Prioritize clarity, caution, and verifiable factors.",
    ],
  },
} as const satisfies Record<string, WritingGuideEntry<ContentAngleLabel>>;

export const TONE_GUIDES = {
  전문형: {
    label: "professional",
    guide: [
      "Use polished and structured sentences.",
      "Avoid casual exaggeration.",
      "Focus on standards, process, and clarity.",
      "Keep the wording stable and businesslike.",
    ],
  },
  친근형: {
    label: "approachable",
    guide: [
      "Use a softer and easier tone.",
      "Reduce psychological burden for first-time readers.",
      "Use occasional question-like transitions naturally.",
      "Avoid sounding too formal or distant.",
    ],
  },
  객관형: {
    label: "objective",
    guide: [
      "Use neutral and fact-oriented wording.",
      "Compare conditions without emotional pressure.",
      "Avoid strong persuasion.",
      "Focus on differences, criteria, and variables.",
    ],
  },
  설득형: {
    label: "persuasive",
    guide: [
      "Explain why the reader should check the issue before deciding.",
      "Show practical consequences of not checking key conditions.",
      "Use reason-based persuasion, not pressure.",
      "Connect the explanation naturally to consultation.",
    ],
  },
  실무형: {
    label: "practical",
    guide: [
      "Focus on actual steps, documents, site checks, and preparation.",
      "Use concrete action-oriented explanations.",
      "Avoid abstract SEO-like paragraphs.",
      "Make the reader feel they know what to do next.",
    ],
  },
  비교형: {
    label: "comparative",
    guide: [
      "Explain differences between options, scopes, or quotation items.",
      "Use contrastive sentence structures.",
      "Help the reader compare cost, contractor, restoration, and schedule.",
      "Avoid listing only one-sided claims.",
    ],
  },
  비용효율형: {
    label: "cost-efficient",
    guide: [
      "Focus on avoiding unnecessary additional costs.",
      "Explain cost variables and scope control.",
      "Avoid simply saying cheap or low price.",
      "Help the reader spend appropriately by checking conditions first.",
    ],
  },
  긴급형: {
    label: "urgent-but-calm",
    guide: [
      "Address readers who may have limited time before closure or handover.",
      "Prioritize what must be checked first.",
      "Keep urgency calm and practical.",
      "Do not create fear or exaggerated pressure.",
    ],
  },
  신중형: {
    label: "cautious",
    guide: [
      "Use measured expressions.",
      "Emphasize contract, cost, scope, and schedule risks.",
      "Avoid definitive claims.",
      "Encourage verification before decision-making.",
    ],
  },
  초보자형: {
    label: "beginner-friendly",
    guide: [
      "Explain terms and steps in simple language.",
      "Assume the reader may not know the demolition or restoration process.",
      "Use clear sequence and plain wording.",
      "Avoid industry jargon unless explained.",
    ],
  },
} as const satisfies Record<string, WritingGuideEntry<ToneLabel>>;

export const MANNER_GUIDES = {
  격식형: {
    label: "formal-structured",
    guide: [
      "Use a formal and organized structure.",
      "Prefer complete explanatory paragraphs.",
      "Avoid conversational filler.",
      "Make the page read like a reliable business guide.",
    ],
  },
  대화형: {
    label: "conversational",
    guide: [
      "Use natural transitions as if explaining to a client.",
      "Include light question-style sentences where appropriate.",
      "Avoid sounding mechanical.",
      "Keep the tone helpful but not overly casual.",
    ],
  },
  객관형: {
    label: "criteria-based",
    guide: [
      "Present conditions, variables, and decision criteria.",
      "Avoid emotional or promotional phrasing.",
      "Organize information by what can be checked.",
    ],
  },
  단계형: {
    label: "step-by-step",
    guide: [
      "Structure the explanation by sequence.",
      "Show what should be checked first, next, and before consultation.",
      "Use ordered logic rather than random paragraphs.",
    ],
  },
  상담형: {
    label: "consultation-oriented",
    guide: [
      "Lead the reader toward preparing for consultation.",
      "Mention what information is useful to share.",
      "Make the CTA feel like the next natural step.",
    ],
  },
  체크리스트형: {
    label: "checklist-driven",
    guide: [
      "Use checkable items where useful.",
      "Do not make the entire page a list.",
      "Turn abstract concerns into concrete items the reader can verify.",
    ],
  },
  비교설명형: {
    label: "comparative-explanatory",
    guide: [
      "Explain by comparing similar concepts or options.",
      "Clarify differences such as demolition vs restoration, quotation vs final cost.",
      "Help the reader make a better comparison.",
    ],
  },
  현장조언형: {
    label: "site-advice",
    guide: [
      "Include site-level details such as floor, ceiling, wall, fixtures, waste, access, and building rules.",
      "Make the content feel grounded in actual store demolition situations.",
      "Avoid overly abstract statements.",
    ],
  },
  초보자안내형: {
    label: "beginner-guidance",
    guide: [
      "Start from basic understanding.",
      "Explain what the reader may not know yet.",
      "Reduce confusion around cost, scope, restoration, and support.",
    ],
  },
  리스크안내형: {
    label: "risk-prevention",
    guide: [
      "Explain possible mistakes and how to prevent them.",
      "Mention quotation gaps, unclear scope, restoration disputes, and schedule delays.",
      "Avoid fear-based exaggeration.",
    ],
  },
} as const satisfies Record<string, WritingGuideEntry<MannerLabel>>;

function getEntry<T extends string>(
  value: string,
  guides: Record<string, WritingGuideEntry<T>>,
  fallback: string,
) {
  return guides[value] ?? guides[fallback];
}

export function getWritingGuide(
  contentAngle: string,
  tone: string,
  manner: string,
): WritingGuide {
  return {
    contentAngle: getEntry(contentAngle, CONTENT_ANGLE_GUIDES, "신뢰성"),
    tone: getEntry(tone, TONE_GUIDES, "신중형"),
    manner: getEntry(manner, MANNER_GUIDES, "상담형"),
  };
}

export const INTERNAL_GUIDE_VALUES = [
  ...Object.keys(CONTENT_ANGLE_GUIDES),
  ...Object.keys(TONE_GUIDES),
  ...Object.keys(MANNER_GUIDES),
  ...Object.values(CONTENT_ANGLE_GUIDES).map((guide) => guide.label),
  ...Object.values(TONE_GUIDES).map((guide) => guide.label),
  ...Object.values(MANNER_GUIDES).map((guide) => guide.label),
];

export const INTERNAL_GUIDE_SENTENCES = [
  ...Object.values(CONTENT_ANGLE_GUIDES).flatMap((guide) => guide.guide),
  ...Object.values(TONE_GUIDES).flatMap((guide) => guide.guide),
  ...Object.values(MANNER_GUIDES).flatMap((guide) => guide.guide),
];
