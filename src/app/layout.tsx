import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import UserContextProvider from "@/context/UserContextProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserContextProvider>
            <div>
              <Link href="/">Home</Link>
              <Link href="/login">Login</Link>
              <Link href="/dashboard/add">Dashboard</Link>
            </div>
            {children}
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
