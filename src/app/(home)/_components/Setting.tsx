"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useUser } from "@/app/_context/Users";
import { use, useEffect, useState } from "react";
import { useProfilePaid } from "@/app/_context/Paid";
import { useProfile } from "@/app/_context/Profile";
import { get } from "http";

const personalInfoSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().optional(),
  socialUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
});

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const paymentSchema = z.object({
  country: z.string(),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  cardNumber: z
    .string()
    .min(16, { message: "Please enter a valid card number." }),
  expiryMonth: z.string(),
  expiryYear: z.string(),
  cvc: z.string().min(3, { message: "CVC must be at least 3 digits." }),
});

const successSchema = z.object({
  confirmationMessage: z
    .string()
    .nonempty("Please enter a confirmation message."),
});

export default function AccountPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
  }, []);

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      about: "",
      socialUrl: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });

  const successForm = useForm<z.infer<typeof successSchema>>({
    resolver: zodResolver(successSchema),
    defaultValues: {
      confirmationMessage:
        "Thank you for supporting me! It means a lot to have your support. It's a step toward creating a more inclusive and accepting community of artists.",
    },
  });

  const { profileInfo, getProfileInfo } = useProfile();
  const { profile, getProfile } = useProfilePaid();

  useEffect(() => {
    if (userId) {
      getProfileInfo(userId);
      getProfile(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (profileInfo) {
      personalInfoForm.reset({
        name: profileInfo.name || "",
        about: profileInfo.about || "",
        socialUrl: profileInfo.socialMediaURL || "",
      });
    }
    if (profile) {
      paymentForm.reset({
        country: profile.country || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        cardNumber: profile.cardNumber || "",
        expiryMonth: profile.expireMonth || "",
        expiryYear: profile.expireYear || "",
        cvc: profile.cvc || "",
      });
    }
  }, [profileInfo, profile]);

  function onPersonalInfoSubmit(values: z.infer<typeof personalInfoSchema>) {
    console.log(values);
  }

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    console.log(values);
  }

  function onPaymentSubmit(values: z.infer<typeof paymentSchema>) {
    console.log(values);
  }

  function onSuccessSubmit(values: z.infer<typeof successSchema>) {
    console.log(values);
  }

  const { users, getUser } = useUser();
  useEffect(() => {
    getUser();
  }, []);

  console.log("users", users);
  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">My account</h1>

      <Card className="hover:transform  hover:scale-105 duration-300 ease-in-out">
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...personalInfoForm}>
            <form
              onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
              className="space-y-4"
            >
              <div className="flex flex-col items-start space-y-2">
                <p className="text-sm ">Add photo</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label
                      htmlFor="file-input"
                      className="rounded-full w-[160px] h-[160px] flex flex-col justify-center items-center cursor-pointer border-[1px] border-gray border-dashed "
                    >
                      <Input hidden type="file" id="file-input" />
                      <div className="flex flex-col justify-center items-center gap-2">
                        <Camera size={30} strokeWidth={1.4} color="gray" />
                      </div>
                    </Label>
                  </div>
                </div>
              </div>

              <FormField
                control={personalInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="socialUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social media URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="hover:transform  hover:scale-105 duration-300 ease-in-out">
        <CardHeader>
          <CardTitle>Set a new password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="hover:transform  hover:scale-105 duration-300 ease-in-out">
        <CardHeader>
          <CardTitle>Payment details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...paymentForm}>
            <form
              onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}
              className="space-y-4"
            >
              <FormField
                control={paymentForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={profile?.country} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={paymentForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={paymentForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={paymentForm.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter card number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={paymentForm.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expires</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={paymentForm.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={paymentForm.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="hover:transform  hover:scale-105 duration-300 ease-in-out">
        <CardHeader>
          <CardTitle>Success page</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...successForm}>
            <form
              onSubmit={successForm.handleSubmit(onSuccessSubmit)}
              className="space-y-4"
            >
              <FormField
                control={successForm.control}
                name="confirmationMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation message</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
