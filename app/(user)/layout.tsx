import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/Theme";
import { Toaster } from "react-hot-toast";
import {ClerkProvider} from "@clerk/nextjs"
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontSize: "0.85rem",
              borderRadius: "8px",
            },
          }}
        />
      </body>
    </html>
    </ClerkProvider>
  );
}
