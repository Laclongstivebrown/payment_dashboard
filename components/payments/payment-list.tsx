// src/components/payments/payment-list.tsx
"use client";

import Link from "next/link";
import { PaymentRow } from "@/components/payments/payment-row";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayments } from "@/hooks/use-payments";

function ListSkeleton() {
  return (
    <ul className="divide-y rounded-xl border" aria-busy="true" aria-label="Loading payments">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center justify-between gap-3 p-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PaymentList() {
  const { data, isPending, isError, refetch, isFetching } = usePayments();

  if (isPending) return <ListSkeleton />;

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-start gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4">
        <p className="text-sm">We couldn&apos;t load your payments. Check your connection and try again.</p>
        <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Retrying..." : "Try again"}
        </Button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <p className="font-medium">No payments yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Create your first payment and it will show up here.</p>
        <Link href="/dashboard/payments/new" className={`${buttonVariants()} mt-4`}>
          New payment
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y rounded-xl border">
      {data.map((p) => (
        <PaymentRow key={p.id} payment={p} />
      ))}
    </ul>
  );
}