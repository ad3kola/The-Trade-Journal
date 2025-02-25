"use client";

import {
  ChartBarIcon,
  ChartPieIcon,
  ExternalLink,
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { NavLinks } from "@/lib/typings";
import Link from "next/link";
import { Button } from "./ui/button";
const SideBar = () => {
  const router = useRouter()

  const navLinks: NavLinks[] = [
    { Icon: HomeIcon, title: "Dashboard", url: "/overview" },

    { Icon: Table, title: "Orders List", url: "/orders-list" },
    { Icon: ChartBarIcon, title: "Analytics", url: "/analytics" },
    { Icon: PlusIcon, title: "Log a Trade", url: "/upload" },
  ];
  const activeRoute = usePathname();

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
                      className={`font-bold transition duration-100 ease-in-out text-sm tracking-wider gap-4 py-6 ${
                        "bg-primary hover:bg-primary hover:text-foreground hover:font-medium"
                      }`}
                    >
                      <Link href={`${url}`}>
                        <Icon className="h-10 w-10" />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>10</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              <SidebarSeparator className="mt-7 " />
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="font-bold transition duration-100 ease-in-out text-sm tracking-wider gap-4 py-6 hover:bg-primary hover:text-foreground hover:font-medium"
                >
                  <Button variant = 'outline' className='w-full flex items-center justify-start' onClick={() => {dispatch(clearUser())
                    router.push('/')
                  }}>
                    <ExternalLink  className='h-10 w-10'/>
                    Log Out</Button>
                </SidebarMenuButton>
                <SidebarMenuBadge>10</SidebarMenuBadge>
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
