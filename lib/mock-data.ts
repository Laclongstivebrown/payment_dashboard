// src/lib/mock-data.ts (temporary: replaced by your API later)
import type { Payment } from "@/types/payment";

export const payments: Payment[] = [
  { id: "PAY-1003", payee: "Yet Another Company", amount: 789012, status: "rejected", date: "2026-10-03" },
  { id: "PAY-1002", payee: "Another Company", amount: 123456, status: "approved", date: "2026-10-02" },
  { id: "PAY-1001", payee: "Kamga Logistics", amount: 456131, status: "pending", date: "2026-10-01" },
];