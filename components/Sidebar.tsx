"use client";

import {
  ChartPieIcon,
  ChevronDown,
  User2,
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
  SidebarMenuSub,
  SidebarSeparator,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { navLinks } from "@/lib/constants/ind4x";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SideBar = () => {
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
                      className={`font-bold transition duration-100 ease-in-out text-sm tracking-wider gap-4 py-5 ${
                        activeRoute == url &&
                        "bg-primary hover:bg-primary hover:text-foreground hover:font-medium"
                      }`}
                    >
                      <a href={url}>
                        <Icon className="h-10 w-10" />
                        <span>{title}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>10</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
                <SidebarSeparator className="mt-7 " />
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      Settings
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent className="mt-2">
                      <SidebarMenuSub>
                            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>

                      </SidebarMenuSub>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SideBar;
