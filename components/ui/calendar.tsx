"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const isSingleMode = props.mode === "single";
  const isMultipleMode = props.mode === "multiple";
  const isRangeMode = props.mode === "range";
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-full h-fit rounded-full bg-sidebar", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full h-full",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: cn(
          "text-sm font-medium",
          isSingleMode && "text-foreground",
          isRangeMode && "text-foreground"
        ),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full h-full border-collapse",
        head_row: "flex w-full",
        head_cell: cn(
          "rounded-md w-full font-semibold text-sm py-2 text-[#fff] dark:text-foreground",
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 py-1 text-center text-sm flex-grow flex-shrink focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-transparent",
          "[&:has([aria-selected].day-outside)]:bg-accent/50",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-primary hover:text-[#fff] dark:hover:text-foreground rounded-lg font-bold",
          isSingleMode && "text-{#fff] dark:text-foreground ",
          isRangeMode && "text-{#fff] dark:text-foreground "

        ),

        day_selected: cn(
          isSingleMode && "dark:text-background",
          isRangeMode && "text-[#fff] dark:text-foreground",
            isMultipleMode
            ? "bg-primary text-[#fff] hover:text-[#fff] rounded-lg" // Multiple mode
            : "bg-foreground text-background" // Range mode (no border-radius to connect)
        ),

        day_range_start: cn(
          isRangeMode && "bg-primary text-{#fff] dark:text-foreground rounded-l-md"
        ),
        day_range_end: cn(
          isRangeMode && "bg-primary text-{#fff] dark:text-foreground rounded-r-md"
        ),
        day_range_middle: cn(isRangeMode && "bg-primary text-{#fff] dark:text-foreground"),

        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("h-4 w-4 text-foreground", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-4 w-4 text-foreground", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
