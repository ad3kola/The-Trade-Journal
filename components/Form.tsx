"use client";

import { Form } from "@/components/ui/form";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "./ui/carousel";
import Slide1 from "./Form/Slide1";
import Slide2 from "./Form/Slide2";
import { formSchema, onSubmit } from "@/lib/config/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Slide3 from "./Form/Slide3";
import { useEffect, useState } from "react";

export default function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entryPrice: 0,
      riskAmount: 0,
      takeProfit: 0,
      stopLoss: 0,
      confidenceLevel: 1,
      strategy: {
        divergence: false,
        H_S: false,
        trendLineRetest: false,
        proTrendBias: false,
        fibKeyLevels: false,
      },
    },
  });
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Carousel className="w-full max-w-2xl" setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <Slide1 form={form} current={current} count={count} />
            </CarouselItem>
            <CarouselItem>
              <Slide2 form={form} current={current} count={count}/>
            </CarouselItem>
            <CarouselItem>
              <Slide3 form={form} current={current} count={count} onSubmit={onSubmit} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </form>
    </Form>
  );
}
