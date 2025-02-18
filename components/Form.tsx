"use client";

import { Form } from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Slide1 from "./Form/Slide1";
import Slide2 from "./Form/Slide2";
import { formSchema } from "@/lib/config/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
// import Slide3 from "./Form/Slide3";

export default function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confidenceLevel: 3,
    },
  });
  function onSubmit() {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            <CarouselItem>
              <Slide1 form={form} />
            </CarouselItem>
            <CarouselItem>
              <Slide2 form={form} />
            </CarouselItem>
            <CarouselItem>
              {/* <Slide3 form={form} /> */}
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </form>
      <p className="text-[12px] animate-pulse text-center text-foreground">
        <ChevronDoubleLeftIcon className="w-4 h-4 inline mr-2" /> Swipe between
        slides <ChevronDoubleRightIcon className="w-4 h-4 inline ml-2" />
      </p>
    </Form>
  );
}
