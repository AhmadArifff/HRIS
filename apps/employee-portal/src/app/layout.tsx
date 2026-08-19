import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { FaceAuthGuard } from "@/components/auth/FaceAuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Portal | HRIS Enterprise",
  description: "Portal Mandiri Karyawan (Self-Service Attendance, Leave, Payroll)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col`}
      >
        <FaceAuthGuard>
          <Header />
          <main className="flex-1">{children}</main>
        </FaceAuthGuard>
      </body>
    </html>
  );
}
