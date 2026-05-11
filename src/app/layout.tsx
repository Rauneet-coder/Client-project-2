import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
