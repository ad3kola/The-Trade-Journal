"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function TradeCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);

  return (
    <Calendar
      mode="multiple"
      selected={selectedDates}
      onSelect={(dates) => setSelectedDates(dates || [])} // ✅ Handles undefined case
      className="rounded-md border shadow "
    />
  );
}
