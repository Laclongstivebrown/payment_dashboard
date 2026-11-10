// src/lib/api.ts (mock layer: later this calls Django, and only this file changes)
import { payments } from "@/lib/mock-data";
import type { Payment } from "@/types/payment";

export class NotFoundError extends Error {
  constructor(message = "Payment not found.") {
    super(message);
    this.name = "NotFoundError";
  }
}

export type NewPaymentInput = Pick<Payment, "payee" | "amount">;

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// DEV ONLY: change this to "error" or "empty" to see those states in the browser.
const SIMULATE: "none" | "error" | "empty" = "none";

// In-memory copy so created payments show up until the page is refreshed.
// Gone once the real backend exists.
let db: Payment[] = [...payments];

export async function fetchPayments(): Promise<Payment[]> {
  await delay();
  if (SIMULATE === "error") throw new Error("Could not load payments.");
  if (SIMULATE === "empty") return [];
  return db;
}

export async function fetchPayment(id: string): Promise<Payment> {
  await delay();
  if (SIMULATE === "error") throw new Error("Could not load payment.");
  const payment = db.find((p) => p.id === id);
  if (!payment) throw new NotFoundError();
  return payment;
}

export async function createPayment(input: NewPaymentInput): Promise<Payment> {
  await delay();
  if (SIMULATE === "error") throw new Error("Could not create payment.");
  const lastNumber = Math.max(1000, ...db.map((p) => Number(p.id.replace("PAY-", "")) || 0));
  const payment: Payment = {
    id: `PAY-${lastNumber + 1}`,
    payee: input.payee,
    amount: input.amount,
    status: "pending",
    date: new Date().toISOString().slice(0, 10),
  };
  db = [payment, ...db];
  return payment;
}