// src/components/payments/payment-form.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreatePayment } from "@/hooks/use-payments";

type Errors = { payee?: string; amount?: string };

function validate(payee: string, rawAmount: string) {
  const errors: Errors = {};
  if (payee.trim().length < 2) {
    errors.payee = "Enter who you are paying (at least 2 characters).";
  }
  // Allow "450 000" style input by stripping spaces
  const amount = Number(rawAmount.replace(/\s/g, ""));
  if (!rawAmount.trim()) {
    errors.amount = "Enter an amount.";
  } else if (!Number.isInteger(amount) || amount <= 0) {
    errors.amount = "Enter a whole number greater than 0. XAF has no decimals.";
  }
  return { errors, amount };
}

export function PaymentForm() {
  const router = useRouter();
  const create = useCreatePayment();
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payee = String(data.get("payee") ?? "");
    const rawAmount = String(data.get("amount") ?? "");

    const result = validate(payee, rawAmount);
    setErrors(result.errors);

    if (result.errors.payee || result.errors.amount) {
      // Move focus to the first field with a problem
      const first = result.errors.payee ? "payee" : "amount";
      (form.elements.namedItem(first) as HTMLInputElement | null)?.focus();
      return;
    }

    create.mutate(
      { payee: payee.trim(), amount: result.amount },
      { onSuccess: (payment) => router.push(`/dashboard/payments/${payment.id}`) }
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {create.isError && (
        <div role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm">
          We couldn&apos;t save this payment. Check your connection and try again.
        </div>
      )}

      <Card className="gap-4 p-4">
        <div className="space-y-1">
          <label htmlFor="payee" className="text-sm font-medium">
            Payee
          </label>
          <Input
            id="payee"
            name="payee"
            autoComplete="off"
            aria-invalid={!!errors.payee}
            aria-describedby={errors.payee ? "payee-error" : undefined}
          />
          {errors.payee && (
            <p id="payee-error" className="text-xs text-red-400">
              {errors.payee}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount (XAF)
          </label>
          <Input
            id="amount"
            name="amount"
            inputMode="numeric"
            autoComplete="off"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
          {errors.amount && (
            <p id="amount-error" className="text-xs text-red-400">
              {errors.amount}
            </p>
          )}
        </div>
      </Card>

      <div className="flex gap-2">
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? "Saving..." : "Save payment"}
        </Button>
        <Link href="/dashboard/payments" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}