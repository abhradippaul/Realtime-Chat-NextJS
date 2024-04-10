"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

interface pageProps {
  children: React.ReactNode;
}

function Providers({ children }: pageProps) {
  return (
    <SessionProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </SessionProvider>
  );
}

export default Providers;
