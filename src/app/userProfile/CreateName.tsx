"use client";
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
import { Camera, CircleX } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const formSchema = z.object({
  image: z.string(),
  name: z.string().nonempty("Please enter name"),
  text: z.string().min(8, "Please enter info about yourself"),
  url: z.string().min(8, "Please enter a social link"),
});

interface CreateProps {
  currentStep: any;
  setCurrentStep: (step: number) => void;
}

export default function CreateName({
  currentStep,
  setCurrentStep,
}: CreateProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      text: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrentStep(currentStep + 1);
    console.log(values);
  }
  return (
    <div className="text-black h-full flex justify-center items-start pt-40">
      <div className="w-[500px] flex flex-col gap-10">
        <h1 className="text-[24px] font-semibold">
          Complete your profile page
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Add photo
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label
                            htmlFor="file-input"
                            className="rounded-full w-[220px] h-[220px] flex flex-col justify-center items-center cursor-pointer border-[1px] border-gray border-dashed "
                          >
                            <Input hidden type="file" id="file-input" />
                            <div className="flex flex-col justify-center items-center gap-2">
                              <Camera
                                size={30}
                                strokeWidth={1.4}
                                color="gray"
                              />
                            </div>
                          </Label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here"
                        {...field}
                        className="border outline-none focus-within:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      About
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write about yourself here"
                        {...field}
                        className="border outline-none focus-within:outline-none h-[130px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Social media URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://"
                        {...field}
                        className="border outline-none focus-within:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-[40%] rounded-md text-white bg-[#18181b]"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
