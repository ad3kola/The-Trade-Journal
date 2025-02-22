'use client'

import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { useAppSelector } from "@/config/redux/hooks";

const Header = () => {
  const user = useAppSelector((state) => state.user)

  return (
    <header className="flex w-full items-center bg-sidebar justify-between p-4 pb-3 shadow shadow-primary sticky top-0 z-50">
     {user && <div className="flex items-center h-full gap-3 shrink-0">
        <div className="relative">
          <Image
            className="object-cover"
            width={60}
            height={60}
            src="/btc.png"
            alt="profile"
          />
          <span className="absolute right-0.5 bottom-0.5 h-2.5 w-2.5 flex">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600" />
          </span>
        </div>
        <div className="flex flex-col text-base justify-center -space-y-1 w-full">
          <h3 className="font-bold tracking-wide">{user.fullName}</h3>
          <p className="text-[12px] text-foreground/65 font-medium">
            Hey, Welcome back!
          </p>
        </div>
      </div>}
      <div className="flex items-center w-full h-full justify-end gap-1 md:gap-2">
          <SidebarTrigger />
        <div className="bg-sidebar p-1 rounded-lg flex items-center justify-center border gap-2 border-sidebar-accent">
          <BellAlertIcon className="w-5 h-5 text-foreground" />
          <Button suppressHydrationWarning
            variant="default"
            className="px-2 cursor-pointer text-[12px] h-7"
          >
            {Math.floor(Math.random() * 8) + 1} New{" "}
          </Button>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
