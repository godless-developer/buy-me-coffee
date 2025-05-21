"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart } from "lucide-react";
import ProfileInfo from "./_components/ProfileInfo";
import { useEffect, useState } from "react";
import { useProfilePaid } from "@/app/_context/Paid";
import { useProfile } from "@/app/_context/Profile";
import AvatarHead from "../_components/AvatarHead";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
    setUsername(username);
  }, []);

  const { profile, getProfile } = useProfilePaid();
  const { profileInfo, getProfileInfo } = useProfile();

  useEffect(() => {
    if (userId) {
      getProfile(userId);
      getProfileInfo(userId);
    }
  }, [userId]);

  return (
    <div className="bg-white text-black w-[100%] h-full pl-[350px]">
      <AvatarHead />
      <ProfileInfo
        userName={username}
        avatarImage={profileInfo?.avatarImage}
        socialMediaURL={profileInfo?.socialMediaURL}
      />
      <div className="bg-white w-[100%] text-black flex justify-center items-start">
        <div className="flex justify-between px-30 w-full">
          <p className="font-extrabold">Recent transactions</p>
          <Select>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent className="text-black bg-white">
              <SelectGroup>
                <SelectItem value="$1">$1</SelectItem>
                <SelectItem value="$2">$2</SelectItem>
                <SelectItem value="$5">$5</SelectItem>
                <SelectItem value="$10">$10</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="bg-white w-[100%] text-black h-[809px] flex justify-center items-start pt-4">
        <div className="w-[80%] border-[#b3b3b3]  border-[1px] rounded-lg flex flex-col gap-6 p-6">
          <div className="flex flex-col justify-around items-center gap-3">
            <div className="w-16 h-16 bg-[#f4f4f5] rounded-full flex justify-center items-center">
              <Heart strokeWidth={1.5} />
            </div>
            <p>You don't have any supporters yet</p>
            <p>Share your page with your audience to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}
