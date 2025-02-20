"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";
import { FormFieldType } from "./Form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, CameraIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { getImageString } from "@/actions/getmageString";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<any, string>) => JSX.Element;
}
const RenderField = ({
  field,
  props,
}: {
  field: ControllerRenderProps<any, string>;
  props: CustomProps;
}) => {
  const { fieldType, placeholder, label, renderSkeleton } = props;
  const [fileURL, setFileURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
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
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            placeholder={placeholder}
            defaultCountry="CA"
            international
            withCountryCallingCode
            label={label}
            onChange={field.onChange}
            value={field.value as E164Number | undefined}
            className="custom-phone-input w-full rounded-sm border-b border-primary bg-input px-4 py-3 text-[13px] lg:text-base shadow-sm transition-colors placeholder:text-foreground/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-accent bg-background">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 bg-input text-left font-normal text-[13px] border-b border-accent",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPPP")
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
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.FILE_INPUT:
      return (
        <FormControl>
          <div className="h-full w-full flex flex-col">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e)} // Calling the function here
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-input rounded-md h-64 border hover:bg-accent border-accent flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.01] duration-200 transition flex-col relative"
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
      );
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="pl-2 whitespace-nowrap">{label}</FormLabel>
            <RenderField field={field} props={props} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
