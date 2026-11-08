// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState keeps one client per browser session (not recreated on every render)
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

// In app/layout.tsx:  <body><Providers>{children}</Providers></body>