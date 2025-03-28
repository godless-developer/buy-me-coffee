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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginTypes } from "../../../../utils/type";
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export default function LoginBack() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [users, setUsers] = useState<LoginTypes[] | null>(null);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data));
  }, []);
  console.log(users);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkemail = users?.find((item) => item.email !== values.email);
    const checkpassword = users?.find(
      (item) => item.password !== values.password
    );
    if (checkemail) {
      alert("email buruu bnaa");
      return;
    }
    if (checkpassword) {
      alert("password buruu bna");
      return;
    }

    router.push("./userProfile");
    console.log(values);
  }
  return (
    <div className="py-10 px-20 w-[100%] h-screen">
      <div className="flex justify-end">
        <button className="bg-[#f4f4f5] text-black px-4 py-2 rounded-md">
          Log in
        </button>
      </div>
      <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">
        <div>
          <div>
            <h1 className="text-[#09090B] text-[24px] font-semibold">
              Welcome back
            </h1>
          </div>
          <div className="w-[400px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] text-black">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email here"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] text-black">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter password here"
                            {...field}
                            className="border outline-none focus-within:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-md bg-[#18181b]"
                >
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
