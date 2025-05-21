"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

const formSchema = z.object({
  coverImg: z.string(),
});
export default function CoverImage({ coverImg }: { coverImg: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverImg: coverImg,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  console.log(coverImg);
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="coverImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] text-black font-semibold">
                  Add photo
                </FormLabel>
                <FormControl>
                  <div className="h-[430px] w-full relative">
                    {coverImg ? (
                      <Image
                        alt="file-input"
                        src={coverImg}
                        width={1000}
                        height={1000}
                        className={
                          "size-full object-cover h-[430px] w-full border border-dashed border-blue-500/20 bg-blue-500/5  bg-no-repeat bg-center"
                        }
                      />
                    ) : (
                      <p className="absolute inset-0 top-40 left-[] text-black z-20">
                        Upload a cover image
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
