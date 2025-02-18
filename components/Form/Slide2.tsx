"use client";

import { FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";

import { z } from "zod";
import { formSchema } from "@/lib/config/zod";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const Slide2 = ({ form }: Props) => {
  return (
    <div className="w-full rounded-sm flex flex-col border mx-auto items-center gap-4 p-2 pt-16">
      <h3 className="text-xl uppercase font-extrabold tracking-wider">
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
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col py-3">
          <h3 className="text-lg tracking-wide font-semibold">
            Trade Strategy Metrics
          </h3>
          <div className="flex flex-wrap w-full items-center gap-4 p-5">
            <FormField
              name="divergence"
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
                </FormItem>
              )}
            />
            <FormField
              name="trendLineRetest"
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
                </FormItem>
              )}
            />
            <FormField
              name="headShoulders"
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
                </FormItem>
              )}
            />
            <FormField
              name="proTrendBias"
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
                </FormItem>
              )}
            />
            <FormField
              name="fibKeyLevels"
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
                </FormItem>
              )}
            />
            <FormField
              name="confidenceLevel"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4 flex-nowrap relative -mt-1">
                  <FormLabel className="font-normal mt-1 tracking-wide text-sm">
                    Confidence
                  </FormLabel>
                  <Slider
                    onValueChange={field.onChange}
                    defaultValue={[field.value]}
                    max={5}
                    step={1}
                    />
                  <span className="w-full absolute -bottom-5 left-10 text-[11px] font-light tracking-wider text-white/80 text-center">
                    1 (Gamble) ... 5 (Very Confident)
                  </span>
                  <span className="font-medium text-sm shrink-0">
                    {field.value}
                  </span>
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
