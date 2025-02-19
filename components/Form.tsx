"use client";

import { Form, FormControl } from "@/components/ui/form";
import { formSchema } from "@/lib/config/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import CustomFormField from "./CustomFormField";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { GenderOptions } from "@/lib/constants/ind4x";
import { Label } from "./ui/label";

export enum FormFieldType {
  INPUT = "input",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  CHECKBOX = "checkbox",
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
      //   coinDesc: "",
      //   coinName: "",
      //   coinLogo: "",
      //   accountType: "personal",
      //   session: "newYork",
      //   tradeType: "buy",
      //   timeframe: "3min",
      //   status: "win",
      //   PnL: 0,
      //   tradeRemarks: "",
      //   screenshot: "",
      //   confidenceLevel: 1,
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-3 p-2 py-5 max-w-3xl mx-auto h-full">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="entryPrice"
            label="Entry Price"
            placeholder="0.00"
          />
          <div className="grid grid-cols-1 w-full gap-4 lg:grid-cols-2">
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
            label="Risk Amount [$}"
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
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="date"
            label="Trade Date"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="status"
            label="Trade Outcome"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex flex-col sm:flex-row items-center h-11 gap-3 w-full lg:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <Label
                      key={option}
                      htmlFor={option} // Links label to radio input
                      className="flex h-full flex-1 items-center gap-3 w-full rounded-md border border-dashed cursor-pointer border-primary bg-input p-3"
                    >
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="hidden"
                      />
                      <div className="h-5 w-5 border border-gray-400 rounded-full flex items-center justify-center">
                        {/* Custom indicator */}
                        <div className="h-3 w-3 rounded-full bg-primary opacity-0 data-[state=checked]:opacity-100"></div>
                      </div>
                      {option}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
          <Button type="submit" variant="secondary" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
