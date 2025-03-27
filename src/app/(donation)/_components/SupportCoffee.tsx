"use client";
import { Coffee } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function SupportCoffee() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-white p-6 flex flex-col gap-6">
      <h1 className="text-[24px] font-bold">Buy Jake a Coffee</h1>
      <div className="flex flex-col gap-2">
        <p>Select amount:</p>
        <div className="flex gap-3">
          <button className="flex bg-[#d1d1d1] px-4 py-2 rounded-md gap-2">
            <Coffee width={18} />
            <p>$10</p>
          </button>
          <button className="flex bg-[#d1d1d1] px-4 py-2 rounded-md gap-2">
            <Coffee width={18} />
            <p>$10</p>
          </button>
          <button className="flex bg-[#d1d1d1] px-4 py-2 rounded-md gap-2">
            <Coffee width={18} />
            <p>$10</p>
          </button>
          <button className="flex bg-[#d1d1d1] px-4 py-2 rounded-md gap-2">
            <Coffee width={18} />
            <p>$10</p>
          </button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter BuyMeCoffee or social acount URL:</FormLabel>
                <FormControl>
                  <Input placeholder="buymecoffee.com/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special message:</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[150px]"
                    placeholder="Please write your message here"
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#d1d1d1]">
            Support
          </Button>
        </form>
      </Form>
    </div>
  );
}
