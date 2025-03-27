import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coffee } from "lucide-react";

export default function DonHeader() {
  return (
    <div className="flex px-32 py-4">
      <div className="w-full flex  items-center gap-3">
        <Coffee size={26} strokeWidth={2.5} />
        <p className="text-[20px] font-bold">Buy Me Coffee</p>
      </div>
      <div className="flex justify-end gap-12 items-center ">
        <div className="flex items-center gap-2">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Jake</p>
        </div>
        <div>
          <select name="" id=""></select>
        </div>
      </div>
    </div>
  );
}
