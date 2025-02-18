"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { format } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { CalendarIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Calendar } from "../ui/calendar";
import { z } from "zod";
import { formSchema } from "@/lib/config/zod";
import { UseFormReturn } from "react-hook-form";

interface Props {
    form: UseFormReturn<z.infer<typeof formSchema>>;
  };

const Slide1 = ({form}: Props) => {
  const languages = [
    { label: "Bitcoin", value: "btc", logo: "/btc.png" },
    { label: "French", value: "fr", logo: "/btc.png" },
    { label: "German", value: "de", logo: "/btc.png" },
    { label: "Spanish", value: "es", logo: "/mockup.png" },
    { label: "Portuguese", value: "pt", logo: "/btc.png" },
    { label: "Russian", value: "ru", logo: "/mockup.png" },
    { label: "Japanese", value: "ja", logo: "/btc.png" },
    { label: "Korean", value: "ko", logo: "/mockup.png" },
    { label: "Chinese", value: "zh", logo: "/btc.png" },
  ] as const;
  return (
    <div className="w-full border flex flex-col p-2 items-center py-12 gap-4">
      <h3 className="text-xl uppercase font-extrabold tracking-wider">
        Trade Details
      </h3>
      <div className="flex flex-col gap-4 mt-4 w-full">
        <FormField
          control={form.control}
          name="coinName"
          render={({ field }) => (
            <FormItem className="flex flex-col mx-auto justify-center items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      role="combobox"
                      variant="outline"
                      className={cn(
                        "w-[250px] py-6 justify-between tracking-wide",
                        !field.value && "text-foreground/70"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Choose Coin Symbol... "}
                      <ChevronsUpDownIcon className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("coinName", language.value);
                            }}
                          >
                            <div className="py-1 flex items-center gap-3 tracking-wide">
                              <Image
                                src={language.logo}
                                alt="logo"
                                width={25}
                                height={25}
                              />
                              <div className="flex flex-col -space-y-1">
                                <span className="uppercase text-left font-bold text-sm tracking-wider">
                                  {language.value}usdt
                                </span>
                              </div>
                            </div>
                            <CheckBadgeIcon
                              className={cn(
                                "ml-auto",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col md:flex-row gap-2 items-center">
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-3">Account Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="What account are you trading with.." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">Personal Account</SelectItem>
                    <SelectItem value="propFirm">Prop Firm Account</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="session"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-3">Trade Session</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="What session are you trading..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="asian_session">Asian Session</SelectItem>
                    <SelectItem value="newYork_session">
                      New York Session
                    </SelectItem>
                    <SelectItem value="london_session">
                      London Session
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="px-3">Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 py-5 text-left font-normal",
                        !field.value && "text-foreground/70 text-sm"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined} // Convert string to Date
                    onSelect={(date) => field.onChange(date?.toISOString())} // Store as string
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tradeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-1">Trade Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your bias..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Slide1;
