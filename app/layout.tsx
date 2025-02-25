import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query";
import AuthProviderLayout from "@/components/auth-provider-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppExert Hire",
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
        <QueryProvider>
          <AuthProviderLayout>
            {children}
          </AuthProviderLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
