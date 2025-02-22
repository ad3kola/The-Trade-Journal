"use client";

import { Form } from "@/components/ui/form";
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

export default function FormComponent() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      profile: "",
      phone: "",
    },
  });
  async function onSubmit(userData: z.infer<typeof userSchema>) {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("User creation failed");

      const data: UserProps = await res.json();
      const { id } = data;

      router.push(`/overview/${id}`);
      toast.success("Pls wait as you're being redirected 😊");
    } catch {
      toast.error("An error occurred while creating user, try again");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center overflow-hidden bg-background p-5">
      <ModeToggle />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-md max-h-max bg-sidebar rounded-md shadow shadow-accent border border-input mx-auto py-3"
        >
          <div className="w-full flex flex-col gap-3 px-6 py-3">
            <div className="text-center">
              <span className="animate-wave text-5xl block">👋</span>
            </div>
            <h2 className="text-center text-lg font-semibold flex items-center justify-center gap-2">
              Welcome to The Trade Journal
            </h2>
            <p className="text-purple-600 text-lg text-center font-semibold"></p>
            <div className="grid grid-cols-1 gap-6 w-full ">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="fullName"
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
            </div>
            <Button type="submit" variant="secondary" className="">
              Register
            </Button>
            <p className="text-[12px] mt-2 text-center tracking-wider font-light ">
              {" "}
              © Copyrights 2025
            </p>
            <p className="bg-gradient-to-r from-primary via-purple-400 to-purple-600 bg-clip-text text-transparent -mt-2 text-sm text-center tracking-wider font-semibold">
              Made by Adekola Adedeji
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
