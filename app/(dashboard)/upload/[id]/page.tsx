"use client";

import FormComponent from "@/components/Form";
import { useParams } from "next/navigation";

const Page = () => {
  const {id} = useParams<{id: string}>()

  return (
    <main className="p-2 md:p-4 lg:p-6 flex flex-col w-full">
      <FormComponent id={id} userID={id} />
    </main>
  );
};

export default Page;
