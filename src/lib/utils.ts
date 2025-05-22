import type { Companies, Fields } from "@/type/database";
import { clsx, type ClassValue } from "clsx";
import { get, omit, sum } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeLeft(
  createdAt: string = "",
  duration: number = 0
) {
  if (!createdAt || !duration) return 5; // TODO: update to 300
  const createdTime = new Date(createdAt).getTime();
  const currentTime = new Date().getTime();
  const elapsedSeconds = Math.floor((currentTime - createdTime) / 1000);
  const remainingSeconds = duration - elapsedSeconds;
  return Math.max(0, remainingSeconds);
}

export const checkShouldFinishAnalysis = (
  fields: Omit<Fields, "companies">
) => {
  return Object.values(omit(fields, "companies")).every(
    (value) => value.status === "OK"
  );
};

export const checkShouldFinishStructuring = (fields: Fields) => {
  return Object.values(fields.companies).every((company) => {
    return Object.values(omit(company, "name")).every(
      (value) => value.status === "OK"
    );
  });
};

export const getSharesBidFor = (formData: Companies, company: string) => {
  return sum([
    +get(formData, `${company}.investor1.value`, 0),
    +get(formData, `${company}.investor2.value`, 0),
    +get(formData, `${company}.investor3.value`, 0),
  ]);
};

export const getCapitalRaised = (
  formData: Companies,
  sharesBidFor: number,
  company: string
) => {
  const price = +get(formData, `${company}.price.value`, 0);
  const shares = +get(formData, `${company}.shares.value`, 0);

  return sharesBidFor <= shares ? price * shares : "Allocate";
};

export const getStatus = (
  formData: Companies,
  sharesBidFor: number,
  company: string
) => {
  const shares = +get(formData, `${company}.shares.value`, 0);
  if (sharesBidFor === shares) return "Filled";
  if (sharesBidFor > shares) return "Over";
  return "Under";
};

export const getValuation = (formData: Fields) => {
  return (
    +get(formData, "ebitda.value", 0) *
    +get(formData, "multiple.value", 0) *
    +get(formData, "factorScore.value", 0)
  );
};
