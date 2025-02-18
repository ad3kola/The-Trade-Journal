"use client";

import { CameraIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "@/lib/config/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void | Promise<void>;
  current: number;
  count: number;
}

const Slide3 = ({ form, onSubmit, current, count }: Props) => {
  const screenShotRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  //   useEffect(() => {
  // setImagePreview(form.watch("screenshot"));
  //   }, [form.watch("screenshot")]);
  return (
    <div className="w-full rounded-sm flex flex-col border mx-auto items-center gap-4 p-2 pt-16 relative">
      <div className="text-[12px] left-1/2 -translate-x-1/2 absolute top-3 text-center text-foreground">
        <p className="animate-pulse ">
          <ChevronDoubleLeftIcon className="w-4 h-4 inline mr-2" /> Swipe
          between slides{" "}
          <ChevronDoubleRightIcon className="w-4 h-4 inline ml-2" />
        </p>{" "}
        <p>
          Slide {current} of {count}
        </p>
      </div>
      <h3 className="text-xl uppercase font-extrabold tracking-wider">
        Trade Details
      </h3>
      <FormField
        control={form.control}
        name="screenshot"
        render={({ field }) => {
          //   setImagePreview(field.value);
          return (
            <FormItem>
              <FormLabel className="py-1 px-3 text-sm">
                Upload Picture
              </FormLabel>
              <Input
                ref={screenShotRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                    field.onChange(file); // Update form state
                  }
                }}
              />

              <div
                onClick={() => screenShotRef?.current?.click()}
                className="w-full bg-[#393857]/20 rounded-md h-36 border border-accent flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.02] duration-200 transition flex-col relative"
              >
                {imagePreview ? (
                  <Image
                    src={"/btx.png"}
                    alt="Screenshot"
                    fill={true}
                    className="object-cover"
                  />
                ) : (
                  <>
                    <CameraIcon className="h-20 w-20 text-white/50" />
                    <span
                      className="text-[11px] tracking-wider -mt-1
                "
                    >
                      *.jpg .png .jpeg
                    </span>
                  </>
                )}
              </div>
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="tradeRemarks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trade Remark</FormLabel>
            <FormControl>
              <Textarea
                placeholder="How did you fell about taking this trade, what did you learn from it..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        onClick={form.handleSubmit(onSubmit)}
        className="bg-white w-full text-background hover:bg-primary hover:text-foreground py-5 font-bold tracking-wider"
        type="submit"
        variant={"outline"}
      >
        Log Trade
      </Button>
    </div>
  );
};

export default Slide3;
