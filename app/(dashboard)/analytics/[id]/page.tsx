"use client";

import { getCurrentUserDoc } from "@/actions/db/actions";
import MostTradedCoins from "@/components/Analytics/MostTradedCoins";
import StrategyLosses from "@/components/Analytics/StrategyLosses";
import StrategyWins from "@/components/Analytics/StrategyWins";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { format, subMonths } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SessionChart from "@/components/Analytics/SessionChart";
import PersonalAccountPnL from "@/components/Analytics/PersonalAccountPnL";
import PropFirmAccountPnL from "@/components/Analytics/PropFirmAccountPnL";
import PnLCalendar from "@/components/Analytics/PnLCalendar";

export default function Page() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [docID, setDocID] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        if (doc) setDocID(doc.docRefID);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="w-full px-2 py-4 flex flex-col gap-4">
      <div className="flex items-center w-full justify-center gap-2">
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex justify-center items-center text-center h-12 mx-auto tracking-wider font-normal gap-2"
                )}
              >
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "flex-1 max-w-[320px] w-full",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={{ after: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
          <PersonalAccountPnL docID={docID} date={date} />
          <PropFirmAccountPnL docID={docID} date={date} />
          <MostTradedCoins docID={docID} date={date} />
        </div>
        <PnLCalendar docID={docID} />
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
          <StrategyWins docID={docID} date={date} />
          <StrategyLosses docID={docID} date={date} />
          <SessionChart docID={docID} date={date} />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3"></div>
    </main>
  );
}
