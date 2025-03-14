"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { strategySchema } from "@/config/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./Form";
import { Form, FormLabel } from "./ui/form";
import {
  ArrowUpWideNarrowIcon,
  ClipboardPenIcon,
  NotebookPenIcon,
  PercentIcon,
  XIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { usersCollection } from "@/config/firebase";

export default function CreateStrategy({ docID }: { docID: string | null }) {
  const [open, setOpen] = useState(false); // 👈 State for modal control
  const [strategies, setStrategies] = useState<string[]>([]);
  const [metricInput, setMetricInput] = useState("");

  const form = useForm<z.infer<typeof strategySchema>>({
    resolver: zodResolver(strategySchema),
    defaultValues: {
      name: "",
      overview: "",
      winRate: 0,
      metrics: [],
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = async (data: z.infer<typeof strategySchema>) => {
    if (!docID) return;

    try {
      const q = query(
        collection(usersCollection, docID, "strategy"),
        where("name", "==", data.name)
      );
      const queryResponse = await getDocs(q);

      if (!queryResponse.empty) {
        console.log("Strategy already exists");
        return;
      }

      data.metrics = strategies;

      await addDoc(collection(usersCollection, docID, "strategy"), data);
      console.log("New strategy created");

      reset();
      setStrategies([]);
      setOpen(false);
    } catch (err) {
      console.error("Error creating strategy:", err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}> 
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Create a new strategy</Button> 
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Strategy</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="h-full py-5">
                <div className="w-full flex flex-col gap-6 p-2 max-w-6xl mx-auto">
                  <CustomFormField
                    control={control}
                    name="name"
                    label="Name"
                    placeholder="Name of Strategy"
                    Icon={ClipboardPenIcon}
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    control={control}
                    name="overview"
                    label="Strategy Overview || Description"
                    Icon={ArrowUpWideNarrowIcon}
                    placeholder="A little bit detail about the strategy.."
                    fieldType={FormFieldType.TEXTAREA}
                  />
                  <CustomFormField
                    control={control}
                    name="winRate"
                    label="Win Rate"
                    Icon={PercentIcon}
                    placeholder="75"
                    fieldType={FormFieldType.INPUT}
                  />
                  <div className="flex flex-col space-y-3">
                    <FormLabel className="pl-2 whitespace-nowrap">
                      New Trade Metric
                    </FormLabel>
                    <div className="flex gap-2 w-full items-center rounded-md border border-input bg-transparent pl-4 h-11 text-[13px] lg:text-base shadow-sm transition-colors">
                      <NotebookPenIcon className="w-4 h-4" />
                      <Input
                        value={metricInput}
                        onChange={(e) => setMetricInput(e.target.value)}
                        placeholder="Metric name"
                      />
                      <Button
                        type="button"
                        className="ml-auto text-xl font-bold"
                        size="icon"
                        onClick={() => {
                          if (metricInput.trim()) {
                            setStrategies((prev) => [...prev, metricInput]);
                            setMetricInput("");
                          }
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {strategies.length > 0 && (
                    <div className="flex items-center space-x-3 flex-wrap -mt-2 px-2">
                      {strategies.map((strat, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            setStrategies((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="cursor-pointer bg-primary text-foreground w-fit px-4 pr-3 h-8 flex items-center justify-center font-medium rounded-full text-xs hover:bg-primary duration-200"
                        >
                          {strat}
                          <XIcon className="h-4 w-4 ml-2" />
                        </div>
                      ))}
                    </div>
                  )}

                  <DialogFooter>
                    <Button type="submit">Create Strategy</Button>
                  </DialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
