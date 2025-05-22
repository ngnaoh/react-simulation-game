import type { FieldRenderSetting } from "@/type/app";
import type { DataSimulation } from "@/type/database";

export const TemplateDataSimulation: DataSimulation = {
  timeStart: {},
  isViewedGuidance: {},
  video: {
    url: "http://youtube.com/watch?v=oHg5SJYRHA0",
    title: "Introduction",
    description: "Introduction to the simulation",
  },
  fields: {
    ebitda: {
      name: "ebitda",
      value: 0,
      status: "TBD",
    },
    multiple: {
      name: "multiple",
      value: 0,
      status: "TBD",
    },
    companyName: {
      name: "companyName",
      value: "",
      status: "TBD",
    },
    description: {
      name: "description",
      value: "",
      status: "TBD",
    },
    factorScore: {
      name: "factorScore",
      value: 1,
      status: "TBD",
    },
    interestRate: {
      name: "interestRate",
      value: 0,
      status: "TBD",
    },
    companies: {
      company1: {
        price: {
          name: "price",
          value: 0,
          status: "TBD",
        },
        shares: {
          name: "shares",
          value: 0,
          status: "TBD",
        },
        investor1: {
          name: "investor1",
          value: 0,
          status: "TBD",
        },
        investor2: {
          name: "investor2",
          value: 0,
          status: "TBD",
        },
        investor3: {
          name: "investor3",
          value: 0,
          status: "TBD",
        },
      },
      company2: {
        price: {
          name: "price",
          value: 0,
          status: "TBD",
        },
        shares: {
          name: "shares",
          value: 0,
          status: "TBD",
        },
        investor1: {
          name: "investor1",
          value: 0,
          status: "TBD",
        },
        investor2: {
          name: "investor2",
          value: 0,
          status: "TBD",
        },
        investor3: {
          name: "investor3",
          value: 0,
          status: "TBD",
        },
      },
      company3: {
        price: {
          name: "price",
          value: 0,
          status: "TBD",
        },
        shares: {
          name: "shares",
          value: 0,
          status: "TBD",
        },
        investor1: {
          name: "investor1",
          value: 0,
          status: "TBD",
        },
        investor2: {
          name: "investor2",
          value: 0,
          status: "TBD",
        },
        investor3: {
          name: "investor3",
          value: 0,
          status: "TBD",
        },
      },
    },
  },
  documents: [
    {
      title: "Introduction",
      content: ` Lorem ipsum dolor si t amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium.`,
    },
    {
      title: "Key Considerations",
      content: ` Lorem ipsum dolor si t amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt  
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium.`,
    },
    {
      title: "Conclusion",
      content: ` Lorem ipsum dolor si t amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium.`,
    },
  ],
};

export const FirstPartFieldsAnalysisRenderSetting: FieldRenderSetting[] = [
  {
    name: "ebitda",
    unit: "$ million",
    type: "inputText",
  },
  {
    name: "interestRate",
    unit: "%",
    type: "inputText",
  },
  {
    name: "multiple",
    unit: "x",
    type: "inputText",
  },
  {
    name: "factorScore",
    unit: "",
    type: "slider",
  },
];
export const SecondPartFieldsAnalysisRenderSetting: FieldRenderSetting[] = [
  {
    name: "companyName",
    unit: "",
    type: "inputText",
  },
  {
    name: "description",
    unit: "",
    type: "textarea",
  },
];

export const StageIndex = ["analysis", "structuring"];

export const FirstPartFieldsStructuringRenderSetting: FieldRenderSetting[] = [
  {
    name: "companies.company1.price",
    unit: "x",
    type: "inputText",
  },
  {
    name: "companies.company2.price",
    unit: "x",
    type: "inputText",
  },
  {
    name: "companies.company3.price",
    unit: "x",
    type: "inputText",
  },
  {
    name: "companies.company1.shares",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company2.shares",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company3.shares",
    unit: "$",
    type: "inputText",
  },
];

export const FirstPartFieldsStructuringRenderSettingMobile: FieldRenderSetting[] =
  [
    {
      name: "Company 1",
      unit: "",
      type: "spacing",
    },
    {
      name: "companies.company1.price",
      unit: "x",
      type: "inputText",
    },
    {
      name: "companies.company1.shares",
      unit: "$",
      type: "inputText",
    },
    {
      name: "Company 2",
      unit: "",
      type: "spacing",
    },
    {
      name: "companies.company2.price",
      unit: "x",
      type: "inputText",
    },
    {
      name: "companies.company2.shares",
      unit: "$",
      type: "inputText",
    },
    {
      name: "Company 3",
      unit: "",
      type: "spacing",
    },
    {
      name: "companies.company3.price",
      unit: "x",
      type: "inputText",
    },
    {
      name: "companies.company3.shares",
      unit: "$",
      type: "inputText",
    },
  ];

export const SecondPartFieldsStructuringRenderSetting: FieldRenderSetting[] = [
  {
    name: "companies.company1.investor1",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company2.investor1",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company3.investor1",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company1.investor2",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company2.investor2",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company3.investor2",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company1.investor3",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company2.investor3",
    unit: "$",
    type: "inputText",
  },
  {
    name: "companies.company3.investor3",
    unit: "$",
    type: "inputText",
  },
];

export const SecondPartFieldsStructuringRenderSettingMobile: FieldRenderSetting[] =
  [
    {
      name: "Company 1",
      unit: "",
      type: "spacing",
    },
    {
      name: "companies.company1.investor1",
      unit: "$",
      type: "inputText",
    },
    {
      name: "companies.company1.investor2",
      unit: "$",
      type: "inputText",
    },
    {
      name: "companies.company1.investor3",
      unit: "$",
      type: "inputText",
    },
    {
      name: "Company 2",
      unit: "",
      type: "spacing",
    },
    {
      name: "companies.company2.investor1",
      unit: "$",
      type: "inputText",
    },
    {
      name: "companies.company2.investor2",
      unit: "$",
      type: "inputText",
    },
    {
      name: "companies.company2.investor3",
      unit: "$",
      type: "inputText",
    },
    {
      name: "Company 3",
      unit: "",
      type: "spacing",
    },
    {
      name: "companies.company3.investor1",
      unit: "$",
      type: "inputText",
    },
    {
      name: "companies.company3.investor2",
      unit: "$",
      type: "inputText",
    },
    {
      name: "companies.company3.investor3",
      unit: "$",
      type: "inputText",
    },
  ];

export const PieChartConfig = {
  value: {
    label: "Value",
  },
  interestRate: {
    label: "Interest Rate",
    color: "hsl(240 1% 42%)",
  },
  remain: {
    label: "remain",
    color: "hsl(240 2% 26%)",
  },
};
