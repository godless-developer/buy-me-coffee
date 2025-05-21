"use client";
import React from "react";
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
import { CameraIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "@/utils/type";
import Image from "next/image";

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

const uploadImage = async (file: File | null) => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    return result.secure_url;
  } catch (error: unknown) {
    return { error: "failed to upload image" };
  }
};
const formSchema = z.object({
  image: z.string(),
  name: z.string().nonempty("Please enter name"),
  about: z.string().min(8, "Please enter info about yourself"),
  socialMediaURL: z.string().min(8, "Please enter a social link"),
});

interface CreateProps {
  currentStep: any;
  setCurrentStep: (step: number) => void;
}

export default function CreateName({
  currentStep,
  setCurrentStep,
}: CreateProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      socialMediaURL: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setFile(file);
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  const createProfile = async ({ values }: { values: Profile }) => {
    const imageUrl = await uploadImage(file);
    console.log("Image URL:", imageUrl);
    console.log("avatarImage:", avatarImage);

    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatarImage: imageUrl,
        name: values.name,
        about: values.about,
        socialMediaURL: values.socialMediaURL,
        userId: localStorage.getItem("userId"),
      }),
    });
    console.log("Response:", response);
    console.log("userId:", localStorage.getItem("userId"));
    if (!response.ok) {
      console.error("Failed to create profile");
      return;
    }
    const data = await response.json();
    if (data.error) {
      console.error("Failed to create profile:", data.message);
      return;
    }
    setCurrentStep(currentStep + 1);
    if (imageUrl) {
      form.setValue("image", imageUrl);
    }
  };
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined" && imageUrl) {
      localStorage.setItem("avatarImage", imageUrl);
    }
  }, [imageUrl]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProfile({ values });
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
                      {avatarImage ? (
                        <div className="h-[230px] w-[230px] relative rounded-full">
                          <div className="h-[138px]">
                            <Image
                              alt="file-input"
                              src={avatarImage}
                              width={1000}
                              height={1000}
                              className={
                                "size-full object-cover rounded-full h-[230px] w-[230px] border border-dashed border-blue-500/20 bg-blue-500/5 bg-cover bg-no-repeat bg-center"
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="file-input"
                          className={`flex flex-col h-[230px] w-[230px] items-center justify-center cursor-pointer gap-2 p-4 rounded-full border border-dashed border-[#bc6c25] bg-[#fefae0]`}
                        >
                          <CameraIcon />
                          <Input
                            id="file-input"
                            type="file"
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      )}
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
                name="about"
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
                name="socialMediaURL"
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
