"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { fetchAnalyticsCalendarPnL } from "@/actions/db/actions";

const MonthlyCalendar = ({ docID }: { docID: string | null }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [trades, setTrades] = useState<
    { date: string; total: number; tradesCount: number }[]
  >([]);
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day(); // Get starting weekday
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Fetch calendar PnL on component mount and whenever docID or currentMonth changes
  useEffect(() => {
    if (docID) {
      const fetchCalendarPnL = async () => {
        const data = await fetchAnalyticsCalendarPnL(
          docID,
        );

        setTrades(data); // Update state with fetched trades data
      };
      fetchCalendarPnL();
    }
  }, [docID, currentMonth]);

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "month"));
  };

  const handleNextYear = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "year"));
  };

  const handlePreviousYear = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "year"));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={handlePreviousYear}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              &laquo;&laquo; {/* Double left arrow for previous year */}
            </button>
            <button
              onClick={handlePreviousMonth}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              &laquo; {/* Single left arrow for previous month */}
            </button>
            <CardTitle className="mx-2">
              {currentMonth.format("MMMM YYYY")}
            </CardTitle>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              &raquo; {/* Single right arrow for next month */}
            </button>
            <button
              onClick={handleNextYear}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              &raquo;&raquo; {/* Double right arrow for next year */}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold text-sm">
              {day}
            </div>
          ))}

          {/* Empty cells for start offset */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {monthDays.map((day) => {
            const dateKey = currentMonth.date(day).format("MM/DD/YYYY");
            const pnl = trades.find((trade) => trade.date == dateKey) || null;
            return (
              <div
                key={day}
                className={`p-2 rounded-sm text-foreground sm:h-20 h-[60px] lg:h-24 flex flex-col items-end justify-start  ${
                  pnl && pnl.total > 0
                    ? "bg-green-600"
                    : pnl && pnl.total < 0
                    ? "bg-red-700"
                    : "bg-input text-black"
                }`}
              >
                <p className="text-xs lg:text-sm font-normal">
                  {day.toString().padStart(2, "0")}
                </p>
                {pnl !== null && (
                  <>
                    <div className="text-sm sm:text-xl lg:text-3xl font-semibold lg:font-extrabold tracking-wide -mr-1">
                      <span className="">$</span>
                      {Math.abs(pnl.total)}
                    </div>
                    <p className="hidden sm:inline-flex text-xs lg:text-xs font-medium">
                      {pnl.tradesCount} trades
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyCalendar;
