// src/lib/format.ts
export const formatXAF = (n: number) => `${n.toLocaleString("en-US")} XAF`;

export const formatDate = (iso: string) => 
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso));

