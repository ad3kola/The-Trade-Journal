"use client";

import { Form } from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Slide1 from "./Form/Slide1";
import Slide2 from "./Form/Slide2";
import { formSchema } from "@/lib/config/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Carousel className="w-full max-w-lg mx-auto">
          <CarouselContent className="-ml-1">
            <CarouselItem>
              <Slide1 form={form} />
            </CarouselItem>
            <CarouselItem className="pl-1">
              <Slide2 form={form} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious
            variant="outline"
            className="px-5 hover:bg-primary"
          />
          <CarouselNext variant="outline" className="px-5 hover:bg-primary" />
        </Carousel>
      </form>
    </Form>
  );
}
