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
  CommandGroup,
} from "./ui/command";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  AccountType,
  calculateTradeMetrics,
  TradeSession,
  TradeStatus,
  TradeTimeframe,
  TradeType,
} from "@/lib/constants/ind4x";
import { getImageString } from "@/actions/getmageString";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AlarmClockIcon,
  CameraIcon,
  ChartCandlestickIcon,
  ChevronsUpDown,
  DollarSignIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { uploadTrade } from "@/actions/db/actions";
import { Coin } from "@/lib/typings";
import fetchAllCoins from "@/actions/fetchAllCoins";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  PHONE_INPUT = "phoneInput",
  FILE_INPUT = "fileInput",
  PASSWORD = "password",
  SELECT = "select",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  COMBOBOX = "comboBox",
  SWITCH = "switch",
  SKELETON = "skeleton",
  SLIDER = "slider",
}

export default function FormComponent({
  docID,
  userID,
}: {
  docID: string;
  userID: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coinSymbol: {
        id: "",
        symbol: "",
        name: "",
        image: "",
        current_price: 0,
      },
      accountType: AccountType.PERSONAL,
      tradeSession: TradeSession.NEW_YORK,
      timeframe: TradeTimeframe.M3,
      tradeType: TradeType.BUY,
      entryPrice: 0,
      takeProfit: 0,
      stopLoss: 0,
      riskAmount: 0,
      leverage: 0,
      positionSize: 0,
      realizedPnL: 0,
      risk_Reward: 0,
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
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = form;
  console.log(errors);

  const [fileURL, setFileURL] = useState<string>("");

  const [isUploading, setIsUploading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsUploading(true);

    if (fileURL) {
      data.tradeScreenshot = fileURL;
    }
    // Format date only for API submission
    data.date = new Date(data.date);

    console.log(data);

    await uploadTrade({ docID, data });

    // Reset form values
    form.reset({
      entryPrice: 0,
      stopLoss: 0,
      takeProfit: 0,
      positionSize: 0,
      leverage: 0,
      riskAmount: 0,
      strategy: {
        divergence: false,
        fibKeyLevels: false,
        head_Shoulders: false,
        indicatorHighlight: false,
        proTrendBias: false,
        trendlineRetest: false,
      },
      tradeReview: "",
      tradeScreenshot: "",
    });

    setFileURL("");
    reset();
    router.push(`/orders-list/${userID}`);
    setIsUploading(false);
  }
  console.log(userID);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const imageURL = await getImageString(file);
      setFileURL(imageURL);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const [allCoins, setAllCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetchAllCoins();
        setAllCoins(res);
        console.log(res);
      } catch (error) {
        console.error("Failed to fetch coins: ", error);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    const entry = Number(getValues("entryPrice"));
    const tp = Number(getValues("takeProfit"));
    const sl = Number(getValues("stopLoss"));
    const risk = Number(getValues("riskAmount"));
    const tradeStatus = getValues("tradeStatus") as "Win" | "Loss"; // ✅ "Win" or "Loss"
    const tradeType = getValues("tradeType") as "Buy" | "Sell"; // ✅ "Buy" (Long) or "Sell" (Short)

    if (entry && tp && sl && risk && tradeStatus && tradeType) {
      const result = calculateTradeMetrics(
        entry,
        tp,
        sl,
        risk,
        tradeStatus,
        tradeType
      );
      setValue("realizedPnL", parseFloat(result.realizedPnl.toFixed(3)));
      setValue("risk_Reward", parseFloat(result.rrr.toFixed(2)));
    }

    if (entry && sl && risk) {
      const positionSize = risk / Math.abs(entry - sl); // ✅ Correct for both buy & sell
      setValue("positionSize", parseFloat(positionSize.toFixed(3)));
    }
  }, [
    watch("entryPrice"),
    watch("takeProfit"),
    watch("stopLoss"),
    watch("riskAmount"),
    watch("tradeStatus"),
    watch("tradeType"), // ✅ Now watching for Buy/Sell changes
  ]);

  console.log(allCoins);

  const PnL = watch("realizedPnL");
  const RR = watch("risk_Reward");
  const qty = watch("positionSize");

  // console.log(PnL);
  // form.setValue("realizedPnL", PnL);

  // console.log(RR);
  // form.setValue("risk_Reward", RR);
  console.log(allCoins);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full py-5">
        <div className="w-full flex flex-col gap-6 p-2 max-w-6xl mx-auto">
          {allCoins && (
            <FormField
              control={control}
              name="coinSymbol"
              render={({}) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-[280px] bg-background mx-auto gap-7 h-14 flex items-center"
                      >
                        {getValues("coinSymbol")?.symbol ? (
                          <div className="flex items-center gap-4">
                            <Image
                              src={
                                getValues("coinSymbol")?.image ||
                                "/default-image.png"
                              } // Avoid undefined image error
                              alt="logo"
                              width={35}
                              height={35}
                            />
                            <div className="flex flex-col items-start -space-y-1">
                              <span className="uppercase font-bold text-base">
                                {getValues("coinSymbol")?.symbol}USDT
                              </span>
                              <span className="text-[9px] text-foreground">
                                {getValues("coinSymbol")?.name ||
                                  "Select a coin"}{" "}
                                TetherUS Perpetual
                              </span>
                            </div>
                          </div>
                        ) : (
                          "Select coin"
                        )}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-70" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Search for coin" />
                        <CommandGroup>
                          <CommandList>
                            <CommandEmpty>No coin found</CommandEmpty>
                            {allCoins.map((coin) => (
                              <CommandItem
                                key={coin.id}
                                onSelect={() => setValue("coinSymbol", coin)}
                              >
                                <div className="w-full flex gap-4 items-center px-3 mt-1">
                                  <Image
                                    className="rounded-full"
                                    src={coin.image}
                                    alt="logo"
                                    width={35}
                                    height={35}
                                  />
                                  <div className="flex flex-col -space-y-1">
                                    <span className="uppercase font-bold">
                                      {coin.symbol} USDT
                                    </span>
                                    <span className="text-[10px] whitespace-nowrap text-foreground">
                                      {coin.name} TetherUS Perpetual
                                    </span>
                                  </div>
                                  <CheckBadgeIcon
                                    className={`ml-auto ${
                                      coin.symbol ===
                                      form.getValues("coinSymbol").symbol
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                </div>
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          )}
          <div className="grid grid-cols-2 w-full gap-4 lg:grid-cols-4">
            <div className="col-span-2 w-full">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.SELECT}
                name="accountType"
                Icon={UserIcon}
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
                Icon={AlarmClockIcon}
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
                Icon={AlarmClockIcon}
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
                Icon={ChartCandlestickIcon}
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
              Icon={DollarSignIcon}
              name="entryPrice"
              label="Entry Price"
              placeholder="0.00"
            />
            <div className="grid w-full gap-4 grid-cols-2">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                Icon={DollarSignIcon}
                name="takeProfit"
                label="Take Profit"
                placeholder="0.00"
              />{" "}
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                Icon={DollarSignIcon}
                name="stopLoss"
                label="Stop Loss"
                placeholder="0.00"
              />
            </div>

            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              Icon={DollarSignIcon}
              name="riskAmount"
              label="Risk Amount"
              placeholder="0.00"
            />
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                Icon={DollarSignIcon}
                name="leverage"
                label="Leverage Used"
                placeholder="0.00"
              />
              <CustomFormField
                control={control}
                fieldType={FormFieldType.INPUT}
                Icon={DollarSignIcon}
                name="positionSize"
                label="Quantity | Pos. Size"
                placeholder="0.00"
                value={qty}
              />
            </div>
          </div>{" "}
          <div className="w-full grid grid-cols-2 items-center gap-4">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              Icon={DollarSignIcon}
              name="realizedPnL"
              disabled={true}
              label="Realized PnL"
              placeholder="0.00"
              value={PnL} // Pass calculated value
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              Icon={DollarSignIcon}
              name="risk_Reward"
              disabled={true}
              label="Risk : Reward"
              placeholder="+3.0R"
              value={RR} // Pass calculated value
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
                          className="flex h-full flex-1 items-center gap-4 w-full rounded-md border border-dashed cursor-pointer border-accent bg-background p-3 whitespace-nowrap"
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
