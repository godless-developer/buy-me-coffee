"use client";
import { useProfile } from "@/app/_context/Profile";
import { useUser } from "@/app/_context/Users";
import { Coffee } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeSideBar() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
    setUsername(username);
  }, []);

  const { profileInfo, getProfileInfo } = useProfile();

  useEffect(() => {
    if (userId) {
      getProfileInfo(userId);
    }
  }, [userId]);
  return (
    <div className="w-[300px] pl-[80px] pr-8 bg-white h-screen fixed text-black">
      <div className="w-full flex h-[100px] items-center gap-3">
        <Coffee size={26} strokeWidth={2.5} />
        <p className="text-[20px] font-bold">Buy Me Coffee</p>
      </div>
      <div className="w-full mt-[50px] h-[200px] flex flex-col justify-between items-start">
        <Link
          href={"./"}
          className="hover:bg-[#f4f4f5] w-full rounded-md py-2 px-4 flex cursor-pointer"
        >
          Home
        </Link>
        <Link
          href={"./explore"}
          className="hover:bg-[#f4f4f5] w-full rounded-md py-2 px-4 flex cursor-pointer"
        >
          Explore
        </Link>
        <Link
          href={`./viewpage/${profileInfo?.id}`}
          className="hover:bg-[#f4f4f5] w-full rounded-md py-2 px-4 flex cursor-pointer"
        >
          View page
        </Link>
        <Link
          href={"./accountSettings"}
          className="hover:bg-[#f4f4f5] w-full rounded-md py-2 px-4 flex cursor-pointer"
        >
          Account settings
        </Link>
      </div>
    </div>
  );
}
