"use client";

import { Calendar } from "@/components/ui/calendar";

export default function TradeCalendar({calendarDates}: {calendarDates: Date[]}) {
  return (
    <Calendar
      mode="multiple"
      selected={calendarDates}
      className="rounded-md border shadow "
    />
  );
}
