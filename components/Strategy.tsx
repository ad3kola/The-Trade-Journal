import { XIcon } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Image from "next/image";

// { indx }: {indx: string}

function Strategy({strategy} : {strategy: {name: string, overview: string, image: string, metrics: string[]}}) {
  return (
      <div className="border border-foreground p-2 px-6 rounded-lg">
        <AccordionItem value={`item-1`} className="p-0 border-none">
          <AccordionTrigger className="font-bold tracking-wide text-base">
            {strategy.name}
          </AccordionTrigger>
          <AccordionContent>
            {strategy.overview}
            <div className="flex items-center gap-3 flex-wrap py-4">
              {strategy.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-transparent border hover:font-semibold border-foreground text-foreground w-fit px-4 pr-3 h-8 flex items-center justify-center font-medium rounded-xl text-xs hover:bg-foreground hover:text-background duration-200"
                >
                  {metric}
                  <XIcon className="h-4 w-4 ml-2" />
                </div>
              ))}
              <div className="w-full h-80 rounded-lg relative overflow-hidden border-2 mt-2">
                <Image
                  alt=""
                  src="/assets/35A.png"
                  fill
                  className="object-contain w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
   
  );
}

export default Strategy;
