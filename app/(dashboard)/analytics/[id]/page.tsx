"use client";

import { getCurrentUserDoc } from "@/actions/db/actions";
import MostTradedCoins from "@/components/Analytics/MostTradedCoins";
import PnL from "@/components/Analytics/PnL";
import SessionWins from "@/components/Analytics/SessionWins";
import StrategyLosses from "@/components/Analytics/StrategyLosses";
import StrategyWins from "@/components/Analytics/StrategyWins";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { format, subMonths } from "date-fns";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  console.log(date);

  return (
    <main className="w-full px-2 py-4 flex flex-col gap-4">
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                "flex justify-center items-center text-center h-12 mx-auto tracking-wider font-normal gap-2"
              )}
            >
              <Button variant={"outline"}>
                <FilterIcon />
              </Button>
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
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PnL />
        <PnL />
        <MostTradedCoins docID={docID} />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <StrategyWins docID={docID} />
        <StrategyLosses docID={docID} />
        <SessionWins docID={docID} />
      </div>
    </main>
  );
}
