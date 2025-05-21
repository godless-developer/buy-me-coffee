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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ProfilePaid } from "@/utils/type";
const formSchema = z.object({
  select: z.string(),
  Fname: z.string().nonempty("First name must match"),
  Lname: z.string().nonempty("Last name must match"),
  card: z.string().max(16).min(16).nonempty("Invalid card number"),
  expires: z.string(),
  year: z.string(),
  cvc: z.string().max(3).min(3).nonempty("Invalid month"),
});

export default function CreatePaid() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select: "",
      Fname: "",
      Lname: "",
      card: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  const createProfile = async ({ values }: { values: ProfilePaid }) => {
    const response = await fetch("/api/profilePaid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: values.country,
        firstName: values.firstName,
        lastName: values.lastName,
        cardNumber: values.cardNumber,
        expireMonth: values.expireMonth,
        expireYear: values.expireYear,
        cvc: values.cvc,
        userId: localStorage.getItem("userId"),
      }),
    });
    if (!response.ok) {
      console.error("Failed to create profile");
      return;
    }
    const data = await response.json();
    if (data.error) {
      console.error("Failed to create profile:", data.message);
      return;
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const mappedValues: ProfilePaid = {
      id: "",
      country: values.select,
      firstName: values.Fname,
      lastName: values.Lname,
      cardNumber: values.card,
      expireMonth: values.expires,
      expireYear: values.year,
      cvc: values.cvc,
      userId: localStorage.getItem("userId") || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    createProfile({ values: mappedValues });
    router.push("./");
    console.log(values);
  }
  return (
    <div className="text-black h-full flex justify-center items-start pt-40">
      <div className="w-[500px] flex flex-col gap-10">
        <div>
          <h1 className="text-[25px] font-semibold">
            How would you like to be paid?
          </h1>
          <p className="text-[15px] text-gray-400">
            Enter location and payment details
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="select"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Select country
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="text-black bg-white">
                          <SelectGroup>
                            <SelectItem value="United States">
                              United States
                            </SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Mongolia">Mongolia</SelectItem>
                            <SelectItem value="New Zealand">
                              New Zealand
                            </SelectItem>
                            <SelectItem value="United Kingdom">
                              United Kingdom
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-[100%] gap-[4%]">
                <FormField
                  control={form.control}
                  name="Fname"
                  render={({ field }) => (
                    <FormItem className="w-[48%]">
                      <FormLabel className="text-[14px] text-black font-semibold">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name here"
                          {...field}
                          className="border outline-none focus-within:outline-none w-[100%]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Lname"
                  render={({ field }) => (
                    <FormItem className="w-[48%]">
                      <FormLabel className="text-[14px] text-black font-semibold">
                        Last name
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
              </div>
              <FormField
                control={form.control}
                name="card"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Enter card number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        {...field}
                        className="border outline-none focus-within:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="expires"
                  render={({ field }) => (
                    <FormItem className="w-[48%]">
                      <FormLabel className="text-[14px] text-black font-semibold">
                        Expires
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent className="text-black bg-white h-[250px] overflow-scroll">
                            <SelectGroup>
                              {Array.from(
                                { length: 12 },
                                (_, index) => index + 1
                              ).map((item) => (
                                <SelectItem key={item} value={String(item)}>
                                  {item} сар
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="w-[48%]">
                      <FormLabel className="text-[14px] text-black font-semibold">
                        Year
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent className="text-black bg-white h-[250px] overflow-scroll">
                            <SelectGroup>
                              {Array.from(
                                { length: 120 },
                                (_, index) => index + 1950
                              ).map((item) => (
                                <SelectItem key={item} value={String(item)}>
                                  {item} он
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem className="w-[48%]">
                      <FormLabel className="text-[14px] text-black font-semibold">
                        CVC
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CVC"
                          {...field}
                          className="border outline-none focus-within:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
