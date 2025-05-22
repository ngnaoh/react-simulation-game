export type FieldRenderSetting = {
  name: string;
  unit: string;
  type: FieldRenderType;
};

export const FieldRenderType = {
  inputText: "inputText",
  slider: "slider",
  textarea: "textarea",
} as const;

export type FieldRenderType =
  (typeof FieldRenderType)[keyof typeof FieldRenderType];

export type SummaryItem = {
  company: string;
  sharesBidFor: number;
  capitalRaised: number | "Allocate";
};

export type SubscriptionItem = {
  company: string;
  status: "Under" | "Over";
};

export type OutputDataStructuring = {
  summary: SummaryItem[];
  subscription: SubscriptionItem[];
};

export type PieChartData = {
  browser: string;
  value: number;
  fill: string;
};
