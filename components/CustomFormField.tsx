"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { FormFieldType } from "./Form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import PasswordStrengthBar from "react-password-strength-bar";

import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { LucideProps } from "lucide-react";

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  value?: number;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
  dateFormat?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<T, Path<T>>) => JSX.Element;
}
const RenderField = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomProps<T>;
}) => {
  const {
    fieldType,
    disabled,
    placeholder,
    value,
    label,
    renderSkeleton,

    Icon,
  } = props;
  const [password, setPassword] = useState("");

  switch (fieldType) {
    case FormFieldType.SLIDER:
      return (
        <FormControl>
          <div className="flex items-center w-full gap-3">
            <FormLabel className="shrink-0">Confidence</FormLabel>
            <FormControl>
              <Slider
                className="flex-1 max-w-64 w-full "
                defaultValue={field.value}
                onValueChange={(value) => field.onChange([value[0]])}
                min={0}
                max={5}
                step={1}
              />
            </FormControl>
            <p className="text-sm font-bold">{field.value}</p>
          </div>
        </FormControl>
      );
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <div className="flex gap-2 w-full items-center rounded-md border border-input bg-transparent pl-4 h-11 text-[13px] placeholder:tracking-wider lg:text-base shadow-sm placeholder:font-medium  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/60 focus-visible:outline-none">
            {Icon && <Icon className="w-4 h-4" />}
            <Input
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              value={value && field.value}
            />
          </div>
        </FormControl>
      );
    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <div className="flex flex-col w-full gap-2">
            <div className="flex gap-2 w-full items-center rounded-md border border-input bg-transparent pl-4 h-11 text-[13px] placeholder:tracking-wider lg:text-base shadow-sm placeholder:font-medium  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/60 focus-visible:outline-none">
              {Icon && <Icon className="w-4 h-4" />}
              <Input
                {...field}
                placeholder={placeholder}
                onChange={(e) => {
                  field.onChange(e);
                  setPassword(e.target.value);
                }}
                disabled={disabled}
                value={field.value}
              />
            </div>
            <div className="text-left flex items-center justify-start mt-2">
              <PasswordStrengthBar password={password} />
            </div>
          </div>
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
            className="custom-phone-input flex w-full rounded-md border border-input bg-transparent pl-4 h-11 text-[13px] placeholder:tracking-wider lg:text-base shadow-sm placeholder:font-medium  transition-colors placeholder:text-foreground/60 focus-visible:outline-none md:text-sm"
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
                    "w-full pl=x-4 h-11 text-left font-normal text-[13px] border-none bg-background flex justify-start gap-3",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="shrink-0 h-10 w-10 opacity-80" />
                  {field.value ? (
                    format(new Date(field.value), "PPPP") // Format the date here, ensuring it's a Date object
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (date) field.onChange(date); // Store the date directly as a Date object
                }}
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
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
                <div
                  className="flex items-center w-full 
                gap-3"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <SelectValue placeholder={placeholder} />
                </div>
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
    case FormFieldType.SWITCH:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Switch
                value={field.value}
                onCheckedChange={field.onChange}
                onChange={field.onChange}
              />
            </FormControl>
          </div>
        </FormControl>
      );
  }
};
const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, name, label } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("w-full flex gap-1 flex-col")}>
            {props.fieldType !== FormFieldType.SWITCH &&
              FormFieldType.SLIDER && (
                <FormLabel className="pl-2 whitespace-nowrap">
                  {label}
                </FormLabel>
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
