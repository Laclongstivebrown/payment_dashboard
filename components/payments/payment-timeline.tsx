// src/components/payments/payment-timeline.tsx
import type { PaymentStatus } from "@/types/payment";

export function PaymentTimeline({ status }: { status: PaymentStatus }) {
  const steps = ["Submitted", "In review", status === "rejected" ? "Rejected" : "Approved"];
  const reached = status === "pending" ? 1 : 2;

  return (
    <ol className="space-y-3">
      {steps.map((label, i) => {
        const done = i <= reached;
        const isRejected = status === "rejected" && i === 2;
        const dot = !done ? "bg-muted" : isRejected ? "bg-red-400" : "bg-green-400";
        return (
          <li key={label} className="flex items-center gap-3 text-sm">
            <span aria-hidden className={`size-3 rounded-full ${dot}`} />
            <span className={done ? "font-medium" : "text-muted-foreground"}>{label}</span>
            {i === reached && <span className="sr-only">(current step)</span>}
          </li>
        );
      })}
    </ol>
  );
}