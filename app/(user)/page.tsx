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
import {
  createUser,
  signInUser,
  signUpUser,
} from "@/actions/user/user.actions";
import { userInDB, validateUser } from "@/actions/user/db.actions";

export default function FormComponent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = form;
  console.log(errors);

  const [currentState, setCurrentState] = useState<"sign-in" | "sign-up">(
    "sign-in"
  );
  const handleSignUpOrSignIn = async (data: z.infer<typeof userSchema>) => {
    try {
      let userID: string | undefined = undefined;
      let response;
  
      if (currentState == "sign-in") {
        response = await signInUser(data);
      } else if (currentState == "sign-up") {
        response = await signUpUser(data);
      }
  
      if (response?.error) {
        toast.error(response.error); // Show error toast if authentication fails
        return;
      }
  
      userID = response?.uid; // Get the user ID
  
      if (userID) {
        const { name, email, password } = data;
        await validateUser({ id: userID, name, email, password });
  
        toast.success(
          currentState === "sign-in" ? "Signed in successfully!" : "Account created!"
        );
  
        router.push(`/overview/${userID}`);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center overflow-hidden bg-background p-5">
      <ModeToggle />
      <Form {...form}>
        <div className="flex flex-col w-full max-w-md max-h-max bg-sidebar rounded-md shadow border border-input mx-auto py-3">
          <div className="mx-auto grid grid-cols-2 max-w-52 border border-input rounded-full p-1 space-x-0.5">
            <Button
              variant={currentState == "sign-in" ? "default" : "ghost"}
              className="rounded-full text-[12px] h-7"
              onClick={() => setCurrentState("sign-in")}
            >
              Sign In
            </Button>
            <Button
              variant={currentState == "sign-up" ? "default" : "ghost"}
              className="rounded-full text-[12px] h-7"
              onClick={() => setCurrentState("sign-up")}
            >
              Sign Up
            </Button>
          </div>
          <form
            onSubmit={form.handleSubmit(handleSignUpOrSignIn)}
            className="flex flex-col w-full mx-auto"
          >
            <div className="w-full flex flex-col p-6 gap-8 font-semibold ">
              <div className="flex flex-col w-full gap-2">
                <div className="flex text-4xl w-full ">
                  <h2>Hi</h2>{" "}
                  <span className="animate-wave text-4xl -mt-1 before: block">
                    👋
                  </span>
                </div>
                <h4 className="text-base font-medium">
                  Welcome {currentState == "sign-in" && "back"} to Trade Vault
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-6 w-full">
                {currentState == "sign-up" && (
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                  />
                )}
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="email"
                  label="Email Address"
                  placeholder="m@example.com"
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="password"
                  label="Password"
                  placeholder="JDoe_123"
                />
                {/* <CustomFormField
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone Number"
                placeholder="(902) 916-5681"
              /> */}
                <Button type="submit" className="py-3">
                  {currentState == "sign-up" ? "Register" : "Welcome back"}
                </Button>
              </div>

              <div className="flex items-center w-full justify-between text-[12px] mt-2 text-center tracking-wider font-light">
                <p className=""> © Copyrights 2025</p>
                <p className="text-purple-400 font-normal">Admin</p>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
