"use client";

import { CameraIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ChangeEvent, useRef, useState } from "react";
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
import { dbStorage } from "@/lib/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void | Promise<void>;
  current: number;
  count: number;
}

const Slide3 = ({ form, onSubmit, current, count }: Props) => {
  const [fileURL, setFileURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const uniqueFileName = `${file.name}_${crypto.randomUUID()}`;
    const storageRef = ref(dbStorage, `trades/${uniqueFileName}`);
    setIsLoading(true);
    try {
      // Upload file first
      await uploadBytes(storageRef, file);
      console.log("Upload successful");

      // Wait a moment before fetching URL
      const url = await getDownloadURL(storageRef);
      console.log("File URL:", url);
      setFileURL(url);

      form.setValue("screenshot", url);

      // Store `url` in state or database as needed
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setIsLoading(false);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-full rounded-sm flex flex-col border mx-auto items-center gap-6 py-4 px-6 pt-16  relative">
      <div className="text-[12px] left-1/2 -translate-x-1/2 absolute top-3 text-center text-foreground">
        <p className="animate-pulse animate-left">
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
      />{" "}
      <FormField
        control={form.control}
        name="screenshot"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="py-1 px-3 text-sm">Upload Picture</FormLabel>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                uploadImage(e);
                field.onChange(e);
              }}            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-[#393857]/20 rounded-md h-60 border border-accent flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.02] duration-200 transition flex-col relative"
            >
              {fileURL ? (
                <Image
                  src={fileURL}
                  alt="Screenshot"
                  fill
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
        )}
      />
      <Button
        onClick={form.handleSubmit(onSubmit)}
        className=" bg-primary hover:text-foreground py-5 font-bold tracking-wider w-40 hover:bg-primary disabled:bg-accent"
        type="submit"
        variant={"outline"}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full 2-full text-foreground font-semibold tracking-wide capitalize text-sm"> uploading
            <span className="ml-3 loader"></span>
          </div>
        ) : (
          "Log Trade"
        )}
      </Button>
    </div>
  );
};

export default Slide3;
