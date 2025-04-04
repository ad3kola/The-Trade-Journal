import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/Theme";
import { SidebarProvider } from "@/components/ui/sidebar";
import {ClerkProvider} from '@clerk/nextjs'
import SideBar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, TwitchIcon } from "lucide-react";

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
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontSize: "0.85rem",
              borderRadius: "8px",
            },
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system">
          <SidebarProvider>
            <div className="flex h-screen w-full mt-5">
              <SideBar />
              <main className="flex-1 overflow-y-auto pb-6 relative">
                <Header />
                {children}
                <div className="flex flex-col items-center justify-end w-full gap-1">
                  <div className="gap-2 flex">
                    <Button variant={"outline"} size={"sm"}>
                      <GithubIcon />
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      <LinkedinIcon />
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      <TwitchIcon />
                    </Button>
                  </div>
                  <p className="text-sm">Developed by Adekola Adedeji</p>
                  <p className="text-xs">© Copyrights Acts 2025</p>
                </div>
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
