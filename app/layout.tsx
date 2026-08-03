import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenStock",
  description: "Organize and track your plant collection with ease. Manage inventory, categories, and stock levels for your green business or personal garden.",
  keywords: ["plants", "inventory", "management", "gardening", "nursery", "garden center", "stock tracking"],
  authors: [{ name: "Martin Ifeanyi" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <QueryProvider>
              <Toaster />
              {children}
            </QueryProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
