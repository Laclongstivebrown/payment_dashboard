// src/app/dashboard/payments/[id]/page.tsx
import { Suspense } from "react";
import { PaymentDetail, PaymentDetailSkeleton } from "@/components/payments/payment-detail";

// In Next.js 16, params is a Promise. With Cache Components, reading it must
// happen inside <Suspense>, so the page stays sync and a small child awaits it.
export default function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<PaymentDetailSkeleton />}>
      <PaymentDetailContent params={params} />
    </Suspense>
  );
}

async function PaymentDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PaymentDetail id={id} />;
}