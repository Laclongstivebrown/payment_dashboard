// src/components/payments/status-badge.tsx
import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/types/payment";

const styles: Record<PaymentStatus, string> = {
  pending: "bg-orange-400/20 text-orange-200",
  approved: "bg-green-400/20 text-green-200",
  rejected: "bg-red-400/20 text-red-200",
};

export function StatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge className={`capitalize ${styles[status]}`}>{status}</Badge>;
}