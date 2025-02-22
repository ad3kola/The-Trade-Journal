"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { formSchema } from "@/config/zod";
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
      coinSymbol: {
        logo: "",
        name: "",
        value: "",
      },
      accountType: AccountType.PERSONAL,
      tradeSession: TradeSession.NEW_YORK,
      timeframe: TradeTimeframe.M3,
      tradeType: TradeType.BUY,
      entryPrice: 10,
      takeProfit: 10,
      stopLoss: 10,
      riskAmount: 10,
      leverage: 10,
      positionSize: 10,
      realizedPnL: 10,
      risk_Reward: 10,
      date: new Date(),
      tradeStatus: TradeStatus.WIN,
      strategy: {
        divergence: false,
        head_Shoulders: false,
        trendlineRetest: false,
        fibKeyLevels: false,
        proTrendBias: false,
        indicatorHighlight: false,
      },
      tradeReview: "",
      tradeScreenshot: "",

      confidence: [0],
    },
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  console.log(errors);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (fileURL) {
      data.tradeScreenshot = fileURL;
    }
    if (data.date) {
      const formattedDate = new Date(format(new Date(data.date), "PP"));
      data = { ...data, date: formattedDate };
    }
    const res = await fetch("/api/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    console.log("Clicked");
  }
  const [fileURL, setFileURL] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    try {
      const imageURL = await getImageString(file);
      setFileURL(imageURL);
    } catch (error) {
      console.log("Error: ", error);
      console.log(error);
    }
    setIsUploading(false);
  };

  const calculateRR = (
    riskAmount: number,
    entry: number,
    takeProfit: number,
    stopLoss: number
  ) => {
    const lossDistance = Math.abs(entry - stopLoss); // Ensure it's always positive
    const potentialReward = Math.abs(takeProfit - entry); // Ensure it's always positive

    if (lossDistance === 0) {
      throw new Error("Stop loss cannot be the same as entry price."); // Prevent division by zero
    }

    const RR = potentialReward / lossDistance;

    return RR;
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full py-5">
        <div className="w-full flex flex-col gap-6 p-2 max-w-6xl mx-auto">
          <FormField
            control={control}
            name="coinSymbol"
            render={({}) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[280px] mx-auto gap-7 h-14 flex items-center"
                    >
                      {form.getValues("coinSymbol").value ? (
                        <div className="flex items-center gap-4">
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
                  <PopoverContent className="w-[280px] p-0">
                    <Command>
                      <CommandInput placeholder="Search for coin" />
                      <CommandList>
                        <CommandEmpty>No coin found</CommandEmpty>
                        {listOfCoins.map((coin, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => setValue("coinSymbol", coin)}
                          >
                            <div className="w-full flex gap-4 items-center">
                              <Image
                                src={coin.logo}
                                alt="logo"
                                width={30}
                                height={30}
                              />
                              <div className="flex flex-col -space-y-1">
                                <span className="uppercase font-bold">
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
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
              control={control}
              fieldType={FormFieldType.INPUT}
              name="entryPrice"
              label="Entry Price"
              placeholder="0.00"
            />
            <div className="grid w-full gap-4 grid-cols-2">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                name="takeProfit"
                label="Take Profit"
                placeholder="0.00"
              />{" "}
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                name="stopLoss"
                label="Stop Loss"
                placeholder="0.00"
              />
            </div>

            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="riskAmount"
              label="Risk Amount"
              placeholder="0.00"
            />
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                name="leverage"
                label="Leverage Used"
                placeholder="0.00"
              />
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                name="positionSize"
                label="Quantity | Pos. Size"
                placeholder="0.00"
              />
            </div>
          </div>{" "}
          <div className="w-full grid grid-cols-2 items-center gap-4">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="realizedPnL"
              disabled={true}
              label="Realized PnL"
              placeholder="0.00"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              disabled={true}
              name="risk_Reward"
              label="Risk : Reward "
              placeholder="+3.0R"
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.DATE_PICKER}
                name="date"
                label="Trade Date"
              />
            </div>
            <div className="lg:col-span-2">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.SKELETON}
                name="tradeStatus"
                label="Trade Status"
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex flex-wrap items-center h-11 gap-4 w-full lg:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      {Object.values(TradeStatus).map((status) => (
                        <Label
                          key={status}
                          htmlFor={status} // Links label to radio input
                          className="flex h-full flex-1 items-center gap-4 w-full rounded-md border-2 border-dashed cursor-pointer border-accent bg-input p-3 whitespace-nowrap"
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
          <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col w-full gap-2">
              <h3 className="text-lg font-bold tracking-wider">
                Trade Strategy Metrics
              </h3>
              <div className="flex flex-col w-full gap-4 px-5 py-3 max-w-[650px]">
                <div className="w-full flex flex-wrap gap-7 ">
                  <CustomFormField
                    control={control}
                    name="strategy.divergence"
                    label="Divergence"
                    fieldType={FormFieldType.SWITCH}
                  />
                  <CustomFormField
                    control={control}
                    name="strategy.head_Shoulders"
                    label="Head & Shoulders"
                    fieldType={FormFieldType.SWITCH}
                  />
                  <CustomFormField
                    control={control}
                    name="strategy.trendlineRetest"
                    label="Trendline Retest"
                    fieldType={FormFieldType.SWITCH}
                  />{" "}
                  <CustomFormField
                    control={control}
                    name="strategy.fibKeyLevels"
                    label="Fib Key Levels"
                    fieldType={FormFieldType.SWITCH}
                  />
                  <CustomFormField
                    control={control}
                    name="strategy.proTrendBias"
                    label="Aligns with 15min Trend Bias"
                    fieldType={FormFieldType.SWITCH}
                  />
                  <CustomFormField
                    control={control}
                    name="strategy.indicatorHighlight"
                    label="Highlight on IT Pro+ Indicatr"
                    fieldType={FormFieldType.SWITCH}
                  />
                </div>
                <CustomFormField
                  control={control}
                  name="confidence"
                  fieldType={FormFieldType.SLIDER}
                />
              </div>
            </div>
            <FormField
              name="tradeScreenshot"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <div className="h-full w-full flex flex-col gap-4">
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
                      className="w-full bg-background rounded-md h-64 border hover:bg-accent border-accent overflow-hidden flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.01] duration-200 transition flex-col relative"
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
          </div>
          <div>
            <CustomFormField
              control={control}
              name="tradeReview"
              label="Trade Remark"
              placeholder="Write a feedback..."
              fieldType={FormFieldType.TEXTAREA}
            />
          </div>{" "}
          <Button
            type="submit"
            className={`${
              isUploading
                ? "bg-primary text-foreground"
                : "bg-foreground text-background"
            }`}
          >
            {isUploading ? (
              <div className="flex items-center gap-4">
                Uploading
                <div className="relative w-4 h-4">
                  <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 border-4 border-purple-400 border-l-transparent border-b-transparent rounded-full animate-[spin_0.7s_linear_infinite_reverse]"></div>
                </div>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
