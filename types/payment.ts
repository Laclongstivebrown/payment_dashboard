// src/types/payment.ts
export type PaymentStatus = "pending" | "approved" | "rejected";

export interface Payment {
  id: string;
  payee: string;
  amount: number; // XAF has no decimals, store whole francs
  status: PaymentStatus;
  date: string; // ISO string, e.g. "2026-10-01"
  rejectionReason?: string;
}