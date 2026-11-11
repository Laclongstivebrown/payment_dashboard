import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

export const metadata: Metadata = {
  title: { default: "Payment Dashboard", template: "%s | Payment Dashboard" },
  description: "Track and create payments. Built with Next.js, TypeScript and TanStack Query.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} dark h-full antialiased`}>
     <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
