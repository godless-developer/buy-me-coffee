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

const formSchema = z.object({
  image: z.string().nonempty("Username must be at least 2 characters."),
});
export default function CoverImage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] text-black font-semibold"></FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label
                        htmlFor="file-input"
                        className="w-full h-[442px] flex flex-col justify-center items-center cursor-pointer border-[1px] border-gray border-dashed "
                      >
                        <Input hidden type="file" id="file-input" />
                        <div className="flex bg-black text-white px-3 py-1 rounded-lg justify-center items-center gap-2">
                          <Camera size={30} strokeWidth={1.4} color="gray" />
                          <p>Add a cover image</p>
                        </div>
                      </Label>
                    </div>
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
