"use client";
import { useProfile } from "@/app/_context/Profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const AvatarHead = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

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
    <div className="flex justify-end gap-12 items-center py-4 px-28 ">
      <div className="flex items-center gap-2">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage
            src={profileInfo?.avatarImage || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{userName}</p>
      </div>
      <div>
        <select name="" id=""></select>
      </div>
    </div>
  );
};

export default AvatarHead;
