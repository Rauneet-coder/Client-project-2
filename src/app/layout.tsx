import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Mezrex | VFX Artist & Motion Designer",
  description: "I mainly animate illustrations and create visual effects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark`}>
      <body className="font-sans antialiased bg-[#070707] text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
