import * as yup from "yup";

export const schemaAnalysis = yup
  .object({
    ebitda: yup.object().shape({
      name: yup.string().required(),
      value: yup
        .number()
        .typeError("EBITDA must be a number")
        .required("EBITDA is required")
        .positive("EBITDA must be positive"),
      status: yup.string().oneOf(["TBD", "OK"]),
    }),
    interestRate: yup.object().shape({
      name: yup.string().required(),
      value: yup
        .number()
        .typeError("Interest rate must be a number")
        .required("Interest rate is required")
        .positive("Interest rate must be positive"),
      status: yup.string().oneOf(["TBD", "OK"]),
    }),
    multiple: yup.object().shape({
      name: yup.string().required(),
      value: yup
        .number()
        .typeError("Multiple must be a number")
        .required("Multiple is required")
        .positive("Multiple must be positive"),
      status: yup.string().oneOf(["TBD", "OK"]),
    }),
    factorScore: yup.object().shape({
      name: yup.string().required(),
      value: yup
        .number()
        .min(1, "Factor score must be at least 1")
        .max(5, "Factor score must be at most 5")
        .required("Factor score is required"),
      status: yup.string().oneOf(["TBD", "OK"]),
    }),
    companyName: yup.object().shape({
      name: yup.string().required(),
      value: yup.string().required("Company name is required"),
      status: yup.string().oneOf(["TBD", "OK"]),
    }),
    description: yup.object().shape({
      name: yup.string().required(),
      value: yup.string().required("Description is required"),
      status: yup.string().oneOf(["TBD", "OK"]),
    }),
  })
  .required();

const companySchema = yup.object().shape({
  price: yup.object().shape({
    name: yup.string().required(),
    value: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),
    status: yup.string().oneOf(["TBD", "OK"]),
  }),
  shares: yup.object().shape({
    name: yup.string().required(),
    value: yup
      .number()
      .typeError("Shares must be a number")
      .required("Shares is required")
      .positive("Shares must be positive"),
    status: yup.string().oneOf(["TBD", "OK"]),
  }),
  investor1: yup.object().shape({
    name: yup.string().required(),
    value: yup
      .number()
      .typeError("Investment amount must be a number")
      .required("Investment amount is required")
      .positive("Investment amount must be positive"),
    status: yup.string().oneOf(["TBD", "OK"]),
  }),
  investor2: yup.object().shape({
    name: yup.string().required(),
    value: yup
      .number()
      .typeError("Investment amount must be a number")
      .required("Investment amount is required")
      .positive("Investment amount must be positive"),
    status: yup.string().oneOf(["TBD", "OK"]),
  }),
  investor3: yup.object().shape({
    name: yup.string().required(),
    value: yup
      .number()
      .typeError("Investment amount must be a number")
      .required("Investment amount is required")
      .positive("Investment amount must be positive"),
    status: yup.string().oneOf(["TBD", "OK"]),
  }),
});

export const schemaStructuring = yup.object().shape({
  companies: yup.object().shape({
    company1: companySchema,
    company2: companySchema,
    company3: companySchema,
  }),
});
