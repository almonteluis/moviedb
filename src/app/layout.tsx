"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatePresence mode="wait" initial={false}>
          {React.cloneElement(children as React.ReactElement, {
            key: pathname,
          })}
        </AnimatePresence>
      </body>
    </html>
  );
}
