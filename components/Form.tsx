"use client";

import { Form, FormControl } from "@/components/ui/form";
import { formSchema } from "@/lib/config/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import CustomFormField from "./CustomFormField";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { SelectItem } from "./ui/select";
import {
  AccountType,
  TradeSession,
  TradeStatus,
  TradeTimeframe,
  TradeType,
} from "@/lib/constants/ind4x";

export enum FormFieldType {
  INPUT = "input",
  PHONE_INPUT = "phoneInput",
  FILE_INPUT = "fileInput",
  SELECT = "select",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  COMBOBOX = "comboBox",
  SWITCH = "switch",
  SKELETON = "skeleton",
  SLIDER = "slider",
}

export default function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entryPrice: 0,
      riskAmount: 0,
      takeProfit: 0,
      leverage: 0,
      stopLoss: 0,
      positionSize: 0,
      date: new Date(),
      accountType: AccountType.PERSONAL,
      tradeSession: TradeSession.NEW_YORK,
      tradeType: TradeType.BUY,
      timeframe: TradeTimeframe.M3,
      status: TradeStatus.WIN,
      realizedPnL: 0,
      tradeReview: "",
      tradeScreenshot: "",
      //   confidenceLevel: 1,
      //   coinDesc: "",
      //   coinName: "",
      //   coinLogo: "",
      //   strategy: {
      //     divergence: false,
      //     H_S: false,
      //     trendLineRetest: false,
      //     proTrendBias: false,
      //     fibKeyLevels: false,
      //   },
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("clicked");
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full py-5">
        <div className="w-full flex flex-col gap-6 p-2 max-w-3xl mx-auto">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="tradeSession"
            label="Coin Symbol"
            placeholder="Select coin"
          >
            {Object.values(TradeSession).map((type) => (
              <SelectItem key={type} value={type}>
                <div className="flex cursor-pointer items-center gap-2">
                  {type}
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="grid grid-cols-2 w-full gap-4 lg:grid-cols-4">
            <div className="col-span-2 w-full">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="tradeSession"
                label="Trade Session"
                placeholder="Select session"
              >
                {Object.values(TradeSession).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex cursor-pointer items-center gap-2">
                      {type}
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 col-span-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="timeframe"
                label="Timeframe"
                placeholder="Select timeframe"
              >
                {Object.values(TradeTimeframe).map((timeframe) => (
                  <SelectItem key={timeframe} value={timeframe}>
                    <div className="flex cursor-pointer items-center gap-2">
                      {timeframe}
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="tradeType"
                label="Trade Type"
                placeholder="Select bias"
              >
                {Object.values(TradeType).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex cursor-pointer items-center gap-2">
                      {type}
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
          </div>
          <div className="grid grid-cols-1 w-full gap-4 lg:grid-cols-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="entryPrice"
              label="Entry Price"
              placeholder="0.00"
            />
            <div className="grid w-full gap-4 grid-cols-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="takeProfit"
                label="Take Profit"
                placeholder="0.00"
              />{" "}
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="stopLoss"
                label="Stop Loss"
                placeholder="0.00"
              />
            </div>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="riskAmount"
              label="Risk Amount"
              placeholder="0.00"
            />
            <div className="w-full grid grid-cols-2 items-center gap-3">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="leverage"
                label="Leverage Used"
                placeholder="0.00"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="positionSize"
                label="Quantity | Pos. Size"
                placeholder="0.00"
              />
            </div>
          </div>{" "}
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="date"
                label="Trade Date"
              />
            </div>
            <div className="lg:col-span-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SKELETON}
                name="status"
                label="Trade Outcome"
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex flex-wrap items-center h-11 gap-3 w-full lg:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {Object.values(TradeStatus).map((status) => (
                        <Label
                          key={status}
                          htmlFor={status} // Links label to radio input
                          className="flex h-full flex-1 items-center gap-3 w-full rounded-md border-2 border-dashed cursor-pointer border-accent bg-input p-3 whitespace-nowrap"
                        >
                          <FormControl>
                            <RadioGroupItem value={status} id={status} />
                          </FormControl>

                          {status}
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.FILE_INPUT}
            name="tradeScreenshot"
            label="Upload"
          />
          <div>
            <CustomFormField
              control={form.control}
              name="tradeReview"
              label="Trade Remark"
              placeholder="Write a feedback..."
              fieldType={FormFieldType.TEXTAREA}
            />
          </div>
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
