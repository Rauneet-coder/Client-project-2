"use client";

/**
 * ClientProviders — wraps the app with client-side providers
 * including LoadingScreen and CustomCursor.
 */

import { ReactNode } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      {children}
    </>
  );
}
