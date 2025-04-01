"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/config/zod";
import { ModeToggle } from "@/components/ModeToggle";
import { redirect } from "next/navigation";
import Image from "next/image";
import { SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";

export default function FormComponent() {

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


   const { userId } = useAuth()

  if (userId) {
    redirect(`/dashboard/${userId}`)
  }
  return (
    // <div className="w-full h-screen flex flex-col gap-5 items-center justify-center overflow-hidden bg-background p-5">
    //   <ModeToggle />
    //   <Form {...form}>
    //     <div className="flex flex-col w-full max-w-md max-h-max bg-sidebar rounded-md shadow border border-input mx-auto relative">
    //       <div className="mx-auto grid grid-cols-2 max-w-52 border border-input rounded-full p-1 space-x-0.5 mt-3">
    //         <Button
    //           variant={currentState == "sign-in" ? "default" : "ghost"}
    //           className="rounded-full text-[12px] h-7"
    //           onClick={() => setCurrentState("sign-in")}
    //         >
    //           Sign In
    //         </Button>
    //         <Button
    //           variant={currentState == "sign-up" ? "default" : "ghost"}
    //           className="rounded-full text-[12px] h-7"
    //           onClick={() => setCurrentState("sign-up")}
    //         >
    //           Sign Up
    //         </Button>
    //       </div>
    //       <form
    //         onSubmit={form.handleSubmit(handleSignUpOrSignIn)}
    //         className="flex flex-col w-full py-3 mx-auto z-50"
    //       >
    //         <div className="w-full flex flex-col p-6 gap-8 font-semibold ">
    //           <div className="flex flex-col w-full gap-2">
    //             <div className="flex text-4xl w-full ">
    //               <h2>Hi</h2>{" "}
    //               <span className="animate-wave text-4xl -mt-1 before: block">
    //                 👋
    //               </span>
    //             </div>
    //             <h4 className="text-base font-medium">
    //               Welcome {currentState == "sign-in" && "back"} to Trade Vault
    //             </h4>
    //           </div>

    //           <div className="grid grid-cols-1 gap-6 w-full">
    //             {currentState == "sign-up" && (
    //               <CustomFormField
    //                 control={form.control}
    //                 fieldType={FormFieldType.INPUT}
    //                 name="name"
    //                 label="Full Name"
    //                 placeholder="John Doe"
    //                 Icon={UserIcon}
    //               />
    //             )}
    //             <CustomFormField
    //               control={form.control}
    //               fieldType={FormFieldType.INPUT}
    //               name="email"
    //               label="Email Address"
    //               Icon={UserIcon}
    //               placeholder="m@example.com"
    //             />
    //             <CustomFormField
    //               control={form.control}
    //               fieldType={FormFieldType.PASSWORD}
    //               name="password"
    //               label="Password"
    //               Icon={EyeOffIcon}
    //               placeholder="JDoe_123"
    //             />
    //             {/* <CustomFormField
    //             control={form.control}
    //             fieldType={FormFieldType.PHONE_INPUT}
    //             name="phone"
    //             label="Phone Number"
    //             placeholder="(902) 916-5681"
    //           /> */}
    //             <Button type="submit" className="py-3">
    //               {currentState == "sign-up" ? "Register" : "Welcome back"}
    //             </Button>
    //           </div>

    //           <div className="flex items-center w-full justify-between text-[12px] mt-2 text-center tracking-wider font-light">
    //             <p className=""> © Copyrights 2025</p>
    //             <p className="text-purple-400 font-normal">Admin</p>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </Form>
    // </div>
    <main className="max-w-7xl mx-auto p-3">
      <header className="flex px-2 items-center w-full justify-between">
        <h2>TRADE JOURNAL</h2>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>{" "}
        </div>
      </header>
      <div className="flex items-center justify-center w-full flex-col lg:flex-row py-10 gap-6">
        <div className="flex flex-col gap-4 w-full text-center lg:text-left">
          <h1 className="text-5xl/[65px] tracking-wide font-extrabold ">
            The Only Tool You Need to Become Profitable
          </h1>
          <p className="text-lg max-w-3xl mx-auto lg:mx-0">
            TradeZella helps you discover your strengths and weaknesses to
            become a profitable trader with the power of journaling and
            analytics.
          </p>
          <SignInButton>
            <Button className="w-fit font-bold mx-auto lg:mx-0">
              Start Journalling &rarr;
            </Button>
          </SignInButton>
        </div>
        <div className="w-full relative h-[600px] overflow-visible">
          <Image
            src="/assets/trade-journal.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
