// "use client";

// import { CameraIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import { useEffect, useRef, useState } from "react";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Textarea } from "../ui/textarea";
// import { UseFormReturn } from "react-hook-form";
// import { formSchema } from "@/lib/config/zod";
// import { z } from "zod";
// import { Input } from "../ui/input";
// import Image from "next/image";

// interface Props {
//   form: UseFormReturn<z.infer<typeof formSchema>>;
// }

// const Slide3 = ({ form }: Props) => {
//   const screenShotRef = useRef<HTMLInputElement | null>(null);
//   const [imagePreview, setImagePreview] = useState();
//   useEffect(() => {
//     setImagePreview(form.watch("screenshot"));
//   }, [form.watch("screenshot")]);
//   return (
//     <div className="w-full flex flex-col gap-6 p-2">
//       <FormField
//         control={form.control}
//         name="screenshot"
//         render={({ field }) => {
//           setImagePreview(field.value);
//           return (
//             <FormItem>
//               <FormLabel className="py-1 px-3 text-sm">
//                 Upload Picture
//               </FormLabel>
//               <Input
//                 ref={screenShotRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     setImagePreview(URL.createObjectURL(file)); // Show image preview
//                     field.onChange(file); // Update form state
//                   }
//                 }}
//               />

//               <div
//                 onClick={() => screenShotRef?.current?.click()}
//                 className="w-full bg-[#393857]/20 rounded-2xl h-40 border border-accent flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.02] duration-200 transition flex-col relative"
//               >
//                 {imagePreview ? (
//                   <Image
//                     src={"/btx.png"}
//                     alt="Screenshot"
//                     fill={true}
//                     className="object-cover"
//                   />
//                 ) : (
//                   <>
//                     <CameraIcon className="h-20 w-20 text-white/50" />
//                     <span
//                       className="text-[11px] tracking-wider -mt-1
//                 "
//                     >
//                       *.jpg .png .jpeg
//                     </span>
//                   </>
//                 )}
//               </div>
//             </FormItem>
//           );
//         }}
//       />
//       <FormField
//         control={form.control}
//         name="tradeRemarks"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Trade Remark</FormLabel>
//             <FormControl>
//               <Textarea
//                 placeholder="How did you fell about taking this trade, what did you learn from it..."
//                 className="resize-none"
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <Button
//         className="bg-white text-background hover:bg-primary hover:text-foreground py-5 font-bold tracking-wider"
//         type="submit"
//         variant={"outline"}
//       >
//         Log Trade
//       </Button>
//     </div>
//   );
// };

// export default Slide3;
