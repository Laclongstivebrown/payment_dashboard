// src/hooks/use-payments.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "@/lib/api";

export const paymentKeys = {
  all: ["payments"] as const,
};

export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.all,
    queryFn: fetchPayments,
  });
}