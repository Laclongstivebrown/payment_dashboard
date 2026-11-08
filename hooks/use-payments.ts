// src/hooks/use-payments.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPayment, fetchPayments, NotFoundError } from "@/lib/api";

export const paymentKeys = {
  all: ["payments"] as const,
  detail: (id: string) => ["payments", id] as const,
};

export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.all,
    queryFn: fetchPayments,
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: paymentKeys.detail(id),
    queryFn: () => fetchPayment(id),
    // A missing payment will still be missing on retry, so only retry real failures
    retry: (failureCount, error) => !(error instanceof NotFoundError) && failureCount < 1,
  });
}