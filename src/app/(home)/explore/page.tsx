import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ExploreCreators from "../_components/Explore";

export default function Explore() {
  return (
    <div className="w-screen pl-[350px]">
      <div className="flex justify-end gap-12 items-center py-4 px-28 ">
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
      <ExploreCreators />
    </div>
  );
}
