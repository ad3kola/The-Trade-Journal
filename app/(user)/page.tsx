"use client";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/config/zod";
import { FormFieldType } from "@/components/Form";
import { ModeToggle } from "@/components/ModeToggle";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserProps } from "@/lib/typings";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { getImageString } from "@/actions/getmageString";
import { createUser } from "@/actions/user/user.actions";

export default function FormComponent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const {
    formState: { errors },
  } = form;
  console.log(errors);

  const validateUser = async (data: z.infer<typeof userSchema>) => {
    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create user");

    const result = await res.json();

    // router.push(`/overview/${result.user.id}`);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center overflow-hidden bg-background p-5">
      <ModeToggle />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(validateUser)}
          className="flex flex-col w-full max-w-md max-h-max bg-sidebar rounded-md shadow shadow-accent border border-input mx-auto py-3"
        >
          <div className="w-full flex flex-col p-6 gap-8 font-semibold ">
            <div className="flex flex-col w-full gap-2">
              <div className="flex text-4xl w-full ">
                <h2>Hi</h2>{" "}
                <span className="animate-wave text-4xl -mt-1 before: block">
                  👋
                </span>
              </div>
              <h4 className="text-lg font-medium">Welcome to Trade Vault</h4>
            </div>

            <div className="grid grid-cols-1 gap-7 w-full">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Full Name"
                placeholder="John Doe"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="email"
                label="Email Address"
                placeholder="m@example.com"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone Number"
                placeholder="(902) 916-5681"
              />
              <Button type="submit" variant="secondary" className="">
                Register
              </Button>
            </div>

            <p className="text-[12px] mt-2 text-center tracking-wider font-light ">
              {" "}
              © Copyrights 2025
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
