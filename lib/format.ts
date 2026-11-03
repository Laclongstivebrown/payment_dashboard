// src/lib/format.ts
export const formatXAF = (n: number) => `${n.toLocaleString("fr-FR")} XAF`;

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(iso));