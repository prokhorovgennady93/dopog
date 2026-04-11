"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeClient } from "./ThemeClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeClient>
        {children}
      </ThemeClient>
    </SessionProvider>
  );
}
