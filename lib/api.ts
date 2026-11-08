// src/lib/api.ts (mock layer: later this calls Django, and only this file changes)
import { payments } from "@/lib/mock-data";
import type { Payment } from "@/types/payment";

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// DEV ONLY: change this to "error" or "empty" to see those states in the browser.
const SIMULATE: "none" | "error" | "empty" = "error";

export async function fetchPayments(): Promise<Payment[]> {
  await delay();
  if (SIMULATE === "error") throw new Error("Could not load payments.");
  if (SIMULATE === "empty") return [];
  return payments;
}