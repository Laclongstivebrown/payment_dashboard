// src/components/payments/payment-row.tsx
import { StatusBadge } from "@/components/payments/status-badge";
import { formatDate, formatXAF } from "@/lib/format";
import type { Payment } from "@/types/payment";

export function PaymentRow({ payment }: { payment: Payment }) {
  return (
    <li className="flex items-center justify-between gap-3 p-4">
      <div>
        <p className="font-medium">{payment.payee}</p>
        <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-medium">{formatXAF(payment.amount)}</span>
        <StatusBadge status={payment.status} />
      </div>
    </li>
  );
}