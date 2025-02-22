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
import { useAppSelector } from "@/config/redux/hooks";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { getImageString } from "@/actions/getmageString";

export default function FormComponent() {
  const router = useRouter();
  const userID = useAppSelector((state) => state.user.id);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      profile: "",
      phone: "",
    },
  });

  const [fileURL, setFileURL] = useState<string>("");
  const {
    control,
    formState: { errors },
  } = form;
  console.log(errors);
  async function onSubmit(userData: z.infer<typeof userSchema>) {
    if (fileURL) {
      userData.profile = fileURL;
    }
    console.log(userData)
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const imageURL = await getImageString(file);
      setFileURL(imageURL);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (userID) {
    router.push(`/overview/${userID}`);
  }
  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center overflow-hidden bg-background p-5">
      <ModeToggle />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-md max-h-max bg-sidebar rounded-md shadow shadow-accent border border-input mx-auto py-3"
        >
          <div className="w-full flex flex-col px-6 py-0">
            <div className="text-center flex justify-center w-full gap-2">
              <h2 className="text-center text-lg font-semibold flex items-center justify-center gap-2">
                Welcome to The Trade Journal
              </h2>{" "}
              <span className="animate-wave text-2xl block">👋</span>
            </div>

            <FormField
              name="profile"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <div className="h-full w-full flex flex-col">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...field}
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(e)} // Calling the function here
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-background h-40 mt-3 w-40 rounded-full border mx-auto hover:bg-input border-accent overflow-hidden flex items-center justify-center text-white/80 cursor-pointer hover:scale-[1.01] duration-200 transition flex-col relative"
                    >
                      {fileURL ? (
                        <Image
                          src={fileURL}
                          alt="Screenshot"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="p-3 flex items-center justify-center flex-col gap-2">
                          <CameraIcon className="h-10 w-10 text-white/50" />
                          <span className="text-[12px] md:text-sm">
                            Upload Profile Pic
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
              )}
            />
            <div className="grid grid-cols-1 gap-4 w-full">
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
