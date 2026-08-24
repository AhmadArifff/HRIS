import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { ErrorBoundary } from '@/components/ErrorBoundary';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
