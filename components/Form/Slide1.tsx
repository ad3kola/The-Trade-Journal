// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "../ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { format } from "date-fns";

// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import Image from "next/image";
// import { CalendarIcon, ChevronsUpDownIcon } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "../ui/command";
// import {
//   CheckBadgeIcon,
//   ChevronDoubleLeftIcon,
//   ChevronDoubleRightIcon,
// } from "@heroicons/react/24/solid";
// import { Calendar } from "../ui/calendar";
// import { z } from "zod";
// import { formSchema } from "@/lib/config/zod";
// import { UseFormReturn } from "react-hook-form";

// interface Props {
//   form: UseFormReturn<z.infer<typeof formSchema>>;
//   current: number;
//   count: number;
// }


// const Slide1 = ({ form, current, count }: Props) => {
//   const languages = [
//     { label: "Bitcoin", value: "btc", logo: "/btc.png" },
//     { label: "French", value: "fr", logo: "/btc.png" },
//     { label: "German", value: "de", logo: "/btc.png" },
//     { label: "Spanish", value: "es", logo: "/mockup.png" },
//     { label: "Portuguese", value: "pt", logo: "/btc.png" },
//     { label: "Russian", value: "ru", logo: "/mockup.png" },
//     { label: "Japanese", value: "ja", logo: "/btc.png" },
//     { label: "Korean", value: "ko", logo: "/mockup.png" },
//     { label: "Chinese", value: "zh", logo: "/btc.png" },
//   ];
//   return (
//     <div className="w-full border relative rounded-md flex flex-col p-2 items-center pt-12 pb-8 gap-6">
//       <div className="text-[12px] left-1/2 -translate-x-1/2 absolute top-3 text-center text-foreground">
//         <p className="animate-pulse animate-right">
//           <ChevronDoubleLeftIcon className="w-4 h-4 inline mr-2" /> Swipe
//           between slides{" "}
//           <ChevronDoubleRightIcon className="w-4 mt-2 h-4 inline ml-2" />
//         </p>{" "}
//         <p>
//           Slide {current} of {count}
//         </p>
//       </div>
//       <h3 className="text-xl uppercase font-extrabold mt-8 tracking-wider">
//         Trade Details
//       </h3>
//       <div className="flex flex-col gap-4 w-full">
//         <FormField
//           control={form.control}
//           name="coinName"
//           render={({ field }) => (
//             <FormItem className="flex flex-col mx-auto justify-center items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       role="combobox"
//                       variant="outline"
//                       className={cn(
//                         "w-[250px] py-6 justify-between tracking-wide",
//                         !field.value && "text-foreground/70"
//                       )}
//                     >
//                       {field.value
//                         ? languages.find(
//                             (language) => language.value === field.value
//                           )?.label
//                         : "Choose Coin Symbol... "}
//                       <ChevronsUpDownIcon className="opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[250px] p-0">
//                   <Command>
//                     <CommandInput
//                       placeholder="Search framework..."
//                       className="h-9"
//                     />
//                     <CommandList>
//                       <CommandEmpty>No framework found.</CommandEmpty>
//                       <CommandGroup>
//                         {languages.map((language) => (
//                           <CommandItem
//                             value={language.label}
//                             key={language.value}
//                             onSelect={() => {
//                               form.setValue("coinName", language.value);
//                             }}
//                           >
//                             <div className="py-1 flex items-center gap-3 tracking-wide">
//                               <Image
//                                 src={language.logo}
//                                 alt="logo"
//                                 width={25}
//                                 height={25}
//                               />
//                               <div className="flex flex-col -space-y-1">
//                                 <span className="uppercase text-left font-bold text-sm tracking-wider">
//                                   {language.value}usdt
//                                 </span>
//                               </div>
//                             </div>
//                             <CheckBadgeIcon
//                               className={cn(
//                                 "ml-auto",
//                                 language.value === field.value
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               )}
//                             />
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//             </FormItem>
//           )}
//         />
//         <div className="w-full flex flex-col md:flex-row gap-2 items-center">
//           <FormField
//             control={form.control}
//             name="accountType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="px-3">Account Type</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="What account are you trading with.." />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="personal">Personal Account</SelectItem>
//                     <SelectItem value="prop_firm">Prop Firm Account</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="session"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="px-3">Trade Session</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="What session are you trading..." />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="asian">Asian Session</SelectItem>
//                     <SelectItem value="newYork">New York Session</SelectItem>
//                     <SelectItem value="london">London Session</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="date"
//           render={({ field }) => (
//             <FormItem className="col-span-2">
//               <FormLabel className="px-3">Date of Birth</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-full pl-3 py-5 text-left font-normal",
//                         !field.value && "text-foreground/70 text-sm"
//                       )}
//                     >
//                       {field.value ? (
//                         format(field.value, "PP")
//                       ) : (
//                         <span>Pick a date</span>
//                       )}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value ? new Date(field.value) : undefined}
//                     onSelect={(date) => field.onChange(date)}
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex items-center w-full gap-2">
//           <FormField
//             control={form.control}
//             name="tradeType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="px-1">Trade Type</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="What's your bias..." />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="buy">Buy</SelectItem>
//                     <SelectItem value="sell">Sell</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="timeframe"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="px-1">Timeframe</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="3min" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="1min">1min</SelectItem>
//                     <SelectItem value="3min">3min</SelectItem>
//                     <SelectItem value="5min">5min</SelectItem>
//                     <SelectItem value="15min">15min</SelectItem>
//                     <SelectItem value="30min">30min</SelectItem>
//                     <SelectItem value="1hr">1hr</SelectItem>
//                     <SelectItem value="2hr">2hr</SelectItem>
//                     <SelectItem value="4hr">4hr</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="px-1">Trade Outcome</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Win / Loss" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="win">Win</SelectItem>
//                     <SelectItem value="loss">Loss</SelectItem>
//                     <SelectItem value="missed_entry">Missed Entry</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slide1;
