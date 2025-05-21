import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";

export default function ProfileAbout({
  username,
  about,
  socialMediaURL,
  avatarImage,
}: any) {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-3">
      <div className="w-full flex flex-col p-8 bg-white gap-5 border-[1px] border-[#d1d1d1] rounded-lg">
        <div className="flex justify-between  py-4">
          <div className="flex justify-center gap-3 items-center">
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src={avatarImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[20px] font-bold">{username}</p>
          </div>
          <button className="bg-[#d1d1d1] px-3 rounded-lg">Edit page</button>
        </div>
        <div className="bg-[#d1d1d1] w-full h-[1px]"></div>
        <h1 className="font-semibold text-[16px]">About {username}</h1>
        <p>{about}</p>
      </div>
      <div className="w-full border-[1px] border-[#d1d1d1] rounded-lg p-8 flex flex-col gap-5">
        <h1 className="font-semibold"> Social media URL</h1>
        <p>{socialMediaURL}</p>
      </div>
      <div className="w-full p-8 rounded-lg border-[1px] border-[#d1d1d1] gap-3 flex flex-col ">
        <h1 className="font-semibold">Recent Supporters</h1>
        <div className="border-[1px] border-[#d1d1d1] rounded-lg p-12 flex flex-col justify-center items-center gap-4">
          <Heart size={28} strokeWidth={3} />
          <p>Be the first one to support {username}</p>
        </div>
      </div>
    </div>
  );
}
