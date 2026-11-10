// src/components/payments/payment-detail.tsx
"use client";

import Link from "next/link";
import { PaymentTimeline } from "@/components/payments/payment-timeline";
import { StatusBadge } from "@/components/payments/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayment } from "@/hooks/use-payments";
import { NotFoundError } from "@/lib/api";
import { formatDate, formatXAF } from "@/lib/format";

function BackLink() {
  return (
    <Link href="/dashboard/payments" className={buttonVariants({ variant: "outline" })}>
      Back to payments
    </Link>
  );
}

export function PaymentDetailSkeleton() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4" aria-busy="true" aria-label="Loading payment">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-36 w-full rounded-xl" />
    </div>
  );
}

export function PaymentDetail({ id }: { id: string }) {
  const { data: payment, isPending, error, refetch, isFetching } = usePayment(id);

  if (isPending) return <PaymentDetailSkeleton />;

  if (error instanceof NotFoundError) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-3">
        <h1 className="text-lg font-semibold">Payment not found</h1>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find a payment with the reference {id}. It may have been removed.
        </p>
        <BackLink />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        <div role="alert" className="flex flex-col items-start gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4">
          <p className="text-sm">We couldn&apos;t load this payment. Check your connection and try again.</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </Button>
            <BackLink />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div>
        <BackLink />
      </div>

      {payment.status === "rejected" && (
        <div role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm">
          This payment was rejected{payment.rejectionReason ? `: ${payment.rejectionReason}` : "."}
        </div>
      )}

      <Card className="gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">{payment.payee}</h1>
            <p className="text-sm text-muted-foreground">
              {payment.id} · {formatDate(payment.date)}
            </p>
          </div>
          <StatusBadge status={payment.status} />
        </div>
        <p className="text-2xl font-bold">{formatXAF(payment.amount)}</p>
      </Card>

      <Card className="gap-3 p-4">
        <h2 className="font-medium">Status</h2>
        <PaymentTimeline status={payment.status} />
      </Card>
    </div>
  );
}