import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/Theme";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

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
                <main className="flex-1 overflow-y-auto pb-10 relative">
                  <Header />
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}
