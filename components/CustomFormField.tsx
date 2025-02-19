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
import { CalendarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

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
        <div className="flex rounded-md border border-accent bg-sidebar">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 bg-input text-left font-normal text-[13px] border-b border-primary",
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
      return (
        renderSkeleton ? renderSkeleton(field) : null
      )
    case FormFieldType.TEXTAREA:
      return;
    case FormFieldType.CHECKBOX:
      return;
    case FormFieldType.DATE_PICKER:
      return;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel className="pl-2">{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
