"use client";

import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";

import { z } from "zod";
import { formSchema } from "@/lib/config/zod";
import { UseFormReturn } from "react-hook-form";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  current: number;
  count: number;
}

const Slide2 = ({ form, current, count }: Props) => {
  return (
    <div className="w-full rounded-sm flex flex-col border mx-auto items-center gap-4 p-2 pt-16 relative">
      <div className="text-[12px] left-1/2 -translate-x-1/2 absolute top-3 text-center text-foreground">
        <p className="animate-pulse animate-left-right">
          <ChevronDoubleLeftIcon className="w-4 h-4 inline mr-2" /> Swipe
          between slides{" "}
          <ChevronDoubleRightIcon className="w-4 h-4 inline ml-2" />
        </p>{" "}
        <p>
          Slide {current} of {count}
        </p>
      </div>
      <h3 className="text-xl mt-4 uppercase font-extrabold tracking-wider">
        Trade Execution
      </h3>
      <div className="flex flex-col gap-2 w-full py-4">
        <div className="grid grid-cols-3 w-full gap-2 items-center">
          <FormField
            name="entryPrice"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="px-3">Entry Price</FormLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="000.00"
                  className="input appearance-none placeholder:tracking-wider [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="riskAmount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-1yy">
                <FormLabel className="px-3">Risk [$]</FormLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="10.00"
                  className="placeholder:tracking-wider input appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <FormField
            name="takeProfit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-3">Take Profit</FormLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="000.00"
                  className="input appearance-none placeholder:tracking-wider [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="stopLoss"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-3">Stop Loss</FormLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="000.00"
                  className="input appearance-none placeholder:tracking-wider [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col pt-6 pb-2 px-2">
          <h3 className="text-lg tracking-wide font-semibold">
            Trade Strategy Metrics
          </h3>
          <div className="flex flex-wrap w-full items-center gap-4 gap-y-6 px-3 py-5">
            <FormField
              name="strategy.divergence"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-fit flex items-center gap-4 flex-nowrap">
                  <FormLabel className="font-medium whitespace-nowrap text-sm">
                    Divergence
                  </FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="strategy.trendLineRetest"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-fit flex items-center gap-4 flex-nowrap">
                  <FormLabel className="font-medium whitespace-nowrap text-sm">
                    Trendline Retest
                  </FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="strategy.H_S"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-fit flex items-center gap-4 flex-nowrap">
                  <FormLabel className="font-medium whitespace-nowrap text-sm">
                    Head & Shoulders Pattern
                  </FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="strategy.proTrendBias"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-fit flex items-center gap-4 flex-nowrap">
                  <FormLabel className="font-medium whitespace-nowrap text-sm">
                    Aligns with 15 min trend bias
                  </FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="strategy.fibKeyLevels"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-fit flex items-center gap-4 flex-nowrap">
                  <FormLabel className="font-medium whitespace-nowrap text-sm">
                    Fib key Levels
                  </FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confidenceLevel"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 flex-nowrap relative -mt-1">
                  <FormLabel className="font-normal mt-1 tracking-wide text-sm">
                    Confidence
                  </FormLabel>
                  <Slider
                    onValueChange={field.onChange}
                    defaultValue={[field.value]}
                    max={5}
                    step={1}
                    className="flex-1 max-w-[360px]"
                  />
                  <span className="w-full absolute -bottom-5 left-1 text-[11px] font-light tracking-wider text-white/80 text-center">
                    1 (Gamble) ... 5 (Very Confident)
                  </span>
                  <span className="font-medium text-sm shrink-0">
                    {field.value}
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
