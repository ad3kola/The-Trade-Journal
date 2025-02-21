"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { formSchema } from "@/lib/config/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import CustomFormField from "./CustomFormField";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { SelectItem } from "./ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "./ui/command";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import {
  AccountType,
  listOfCoins,
  TradeSession,
  TradeStatus,
  TradeTimeframe,
  TradeType,
} from "@/lib/constants/ind4x";
import { getImageString } from "@/actions/getmageString";
import { ChangeEvent, useRef, useState } from "react";
import { CameraIcon, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";

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
      coinSymbol: {
        logo: "",
        name: "",
        value: "",
      },
      //   confidenceLevel: 1,
      strategy: {
        divergence: false,
        H_S: false,
        trendLineRetest: false,
        proTrendBias: false,
        fibKeyLevels: false,
      },
    },
  });
  const { setValue } = form;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (fileURL) {
      data.tradeScreenshot = fileURL;
    }
    if (data.date) {
      const formattedDate = new Date(format(new Date(data.date), "PP"));
      data = { ...data, date: formattedDate };
    }
    console.log("Submitted Data: ", data);
  }
  const [fileURL, setFileURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const imageURL = await getImageString(file);
      setFileURL(imageURL);
    } catch (error) {
      console.log("Error: ", error);
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full py-5">
        <div className="w-full flex flex-col gap-6 p-2 max-w-3xl mx-auto">
          <FormField
            control={form.control}
            name="coinSymbol"
            render={({}) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[280px] mx-auto gap-7 flex items-center"
                    >
                      {form.getValues("coinSymbol").value ? (
                        <div className="flex items-center gap-3">
                          <Image
                            src={form.getValues("coinSymbol").logo}
                            alt="logo"
                            width={35}
                            height={35}
                          />
                          <div className="flex flex-col items-start -space-y-1">
                            <span className="uppercase font-bold text-base">
                              {form.getValues("coinSymbol").value} / USDT
                            </span>
                            <span className="text-[9px] text-foreground">
                              {form.getValues("coinSymbol").name} TetherUS
                              Perpetual
                            </span>
                          </div>
                        </div>
                      ) : (
                        "Select coin"
                      )}
                      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-70" />{" "}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search for coin" />
                      <CommandList>
                        <CommandEmpty>No coin found</CommandEmpty>
                        {listOfCoins.map((coin, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => setValue("coinSymbol", coin)}
                          >
                            <div className="w-full flex gap-3 items-center">
                              <Image
                                src={coin.logo}
                                alt="logo"
                                width={30}
                                height={30}
                              />
                              <div className="flex flex-col">
                                <span className="uppercase font-bold text-sm">
                                  {coin.value} / USDT
                                </span>
                                <span className="text-[10px] text-foreground">
                                  {coin.name} TetherUS Perpetual
                                </span>
                              </div>
                              <CheckBadgeIcon
                                className={`ml-auto ${
                                  coin.value ===
                                  form.getValues("coinSymbol").value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 w-full gap-4 lg:grid-cols-4">
            <div className="col-span-2 w-full">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="accountType"
                label="Trade Account Type"
                placeholder="Select session"
              >
                {Object.values(AccountType).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex cursor-pointer items-center gap-2">
                      {type}
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
          </div>{" "}
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
          <div></div>
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
          <div>
            <div className="w-full flex flex-wrap gap-5">
              <CustomFormField
                control={form.control}
                name="strategy.divergence"
                label="Divergence"
                fieldType={FormFieldType.SWITCH}
              />
              <CustomFormField
                control={form.control}
                name="strategy.H_S"
                label="Head & Shoulders"
                fieldType={FormFieldType.SWITCH}
              />
              <CustomFormField
                control={form.control}
                name="strategy.trendLineRetest"
                label="Trendline Retest"
                fieldType={FormFieldType.SWITCH}
              />
            </div>
          </div>
          <FormField
            name="tradeScreenshot"
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <div className="h-full w-full flex flex-col gap-3">
                  <FormLabel className="pl-2 whitespace-nowrap">
                    Trade Screenshot
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...field}
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e)} // Calling the function here
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-input rounded-md h-64 border hover:bg-accent border-accent overflow-hidden flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.01] duration-200 transition flex-col relative"
                  >
                    {fileURL ? (
                      <Image
                        src={fileURL}
                        alt="Screenshot"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="p-3 flex items-center justify-center flex-col gap-2">
                        <CameraIcon className="h-10 w-10 text-white/50" />
                        <span className="text-[12px] md:text-sm">
                          Click to Upload Image
                        </span>
                      </div>
                    )}
                  </div>
                  {fileURL && (
                    <div className=" flex items-center justify-end gap-4 py-2 px-4">
                      <Button
                        type="button"
                        variant={"secondary"}
                        className="font-semibold"
                        onClick={() => setFileURL("")}
                      >
                        Remove Image
                      </Button>
                      <Button
                        type="button"
                        variant={"secondary"}
                        className="font-semibold"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Image
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
            )}
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
