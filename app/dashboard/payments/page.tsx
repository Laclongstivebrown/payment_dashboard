// src/app/dashboard/payments/page.tsx (server component: no "use client" needed)
import Link from "next/link";
import { PaymentList } from "@/components/payments/payment-list";
import { buttonVariants } from "@/components/ui/button";

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Payments</h1>
        <Link href="/dashboard/payments/new" className={buttonVariants()}>
          New payment
        </Link>
      </div>
      <PaymentList />
    </div>
  );
}