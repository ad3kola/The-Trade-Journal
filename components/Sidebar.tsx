"use client";

import {
  ChartBarIcon,
  ChartPieIcon,
  // ClipboardIcon,
  ClipboardListIcon,
  ExternalLink,
  // GraduationCapIcon,
  HomeIcon,
  PlusIcon,
  Table,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/lib/typings";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { SignOutButton, useAuth } from "@clerk/nextjs";
const SideBar = () => {

const { userId } = useAuth()

  const navLinks: NavLinks[] = [
    { Icon: HomeIcon, title: "Dashboard", url: "/dashboard" },

    { Icon: Table, title: "Orders List", url: "/orders-list" },
    { Icon: PlusIcon, title: "Log a Trade", url: "/upload" },
    { Icon: ChartBarIcon, title: "Data & Analytics", url: "/analytics" },
    { Icon: ClipboardListIcon, title: "Strategy & Notes", url: "/strategy" },
    // { Icon: GraduationCapIcon, title: "Replay & Backtesting", url: "/backtesting" },
  ];
  const currentRoute = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex w-full items-center justify-center pb-4 p-2 gap-4 h-fit mt-2">
          <ChartPieIcon className="w-8 h-8" />
          <h3 className="text-xl tracking-wider font-extrabold">
            Trade Journal
          </h3>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks
                .slice(0, navLinks.length)
                .map(({ title, Icon, url }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "font-bold transition duration-100 ease-in-out text-sm tracking-wider gap-4 py-6",
                        currentRoute == `${url}/${userId}` &&
                          "bg-primary hover:bg-primary dark:hover:text-foreground text-[#fff] hover:font-medium"
                      )}
                    >
                      <Link href={`${url}/${userId}`}>
                        <Icon className="h-10 w-10" />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              <SidebarSeparator className="my-5 " />
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="font-bold transition duration-100 ease-in-out text-sm tracking-wider gap-4 py-6 hover:bg-primary dark:hover:text-foreground hover:font-medium"
                >
                  <SignOutButton>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-start"
                    >
                      <ExternalLink className="h-10 w-10" />
                      Log Out
                    </Button>
                  </SignOutButton>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SideBar;
