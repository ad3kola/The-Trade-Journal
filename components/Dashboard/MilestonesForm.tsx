import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { milestonesSchema } from "@/config/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "../Form";
import { SelectItem } from "../ui/select";
import { TargetIcon } from "lucide-react";
import { MilestoneType } from "@/lib/constants/ind4x";

function MilestonesForm() {
  const form = useForm<z.infer<typeof milestonesSchema>>({
    resolver: zodResolver(milestonesSchema),
    defaultValues: {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(errors);

  const onSubmit = async () => {
    await fetch('')
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create a Milestone</h2>
        <div className="col-span-2 w-full">
              <CustomFormField
                control={control}
                fieldType={FormFieldType.SELECT}
                name="username"
                Icon={TargetIcon}
                label="Trade Account Type"
                placeholder="Select session"
              >
                {Object.values(MilestoneType).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex cursor-pointer items-center gap-2">
                      {type}
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
      </form>
    </Form>
  );
}

export default MilestonesForm;
