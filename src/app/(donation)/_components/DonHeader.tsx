"use client";
import { useProfile } from "@/app/_context/Profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coffee } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DonHeader() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
    setUserName(userName);
  }, []);
  const { profileInfo, getProfileInfo } = useProfile();

  useEffect(() => {
    if (userId) {
      getProfileInfo(userId);
    }
  }, [userId]);
  return (
    <div className="flex px-32 py-4 fixed top-0 z-10 justify-between bg-white w-full border-b-[1px] border-[#b8b8b8]">
      <Link href={"../"} className="w-full flex  items-center gap-3">
        <Coffee size={26} strokeWidth={2.5} />
        <p className="text-[20px] font-bold">Buy Me Coffee</p>
      </Link>
      <div className="flex justify-end gap-12 items-center ">
        <div className="flex items-center gap-2">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={profileInfo?.avatarImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{userName}</p>
        </div>
        <div>
          <select name="" id=""></select>
        </div>
      </div>
    </div>
  );
}
