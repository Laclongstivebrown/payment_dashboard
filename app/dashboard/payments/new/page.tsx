// src/app/dashboard/payments/new/page.tsx
import { PaymentForm } from "@/components/payments/payment-form";

export default function NewPaymentPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <h1 className="text-lg font-semibold">New payment</h1>
      <PaymentForm />
    </div>
  );
}