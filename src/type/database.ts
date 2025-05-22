export type User = {
  id: string;
  email: string;
  created_at: string;
  username: string;
  permissions: string;
};

export type Simulation = {
  id: string;
  created_at: string;
  data: DataSimulation;
  stage_id: string;
};

export type Team = {
  id: string;
  created_at: string;
  name: string;
};

export type UserTeam = {
  created_at: string;
  team_id: string;
  user_id: string;
  simulation_id: string;
};

export type Stage = {
  id: string;
  name: (typeof STAGE_NAMES)[keyof typeof STAGE_NAMES];
  duration: number;
};

export const STAGE_NAMES = {
  analysis: "analysis",
  structuring: "structuring",
} as const;

export type FieldStatus = "TBD" | "OK";

export type FieldString = {
  name: string;
  value: string;
  status: FieldStatus;
};

export type FieldNumber = {
  name: string;
  value: number;
  status: FieldStatus;
};

export type Fields = {
  ebitda: FieldNumber;
  multiple: FieldNumber;
  companyName: FieldString;
  description: FieldString;
  factorScore: FieldNumber;
  interestRate: FieldNumber;
  companies: Companies;
};

export type Video = {
  url: string;
  title: string;
  description: string;
};

export type Document = {
  title: string;
  content: string;
};

export type Companies = {
  company1: Company;
  company2: Company;
  company3: Company;
};

export type Company = {
  price: FieldNumber;
  shares: FieldNumber;
  investor1: FieldNumber;
  investor2: FieldNumber;
  investor3: FieldNumber;
};

export type DataSimulation = {
  fields: Fields;
  isViewedGuidance: {
    [key: string]: boolean; // key is team id
  };
  video: Video;
  documents: Document[];
  timeStart: {
    [key: string]: string; // key is stage id
  };
};
