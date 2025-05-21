"use client";
import { useParams } from "next/navigation";
import CoverImage from "../../_components/CoverImage";
import ProfileAbout from "../../_components/ProfileAbout";
import SupportCoffee from "../../_components/SupportCoffee";
import { useProfile } from "@/app/_context/OneProfile";
import { useEffect } from "react";

export default function Creator() {
  const { id } = useParams();
  const { Oneprofile, fetchProfile } = useProfile();

  useEffect(() => {
    if (id) fetchProfile(id as string);
  }, [id]);
  return (
    <div className="relative">
      <div className="bg-gray-200 w-full h-[450px] absolute ">
        <CoverImage coverImg={Oneprofile?.coverImg || ""} />
      </div>
      <div className=" w-[40%] h-[700px] absolute top-80 left-[10%]">
        <ProfileAbout
          username={Oneprofile?.name}
          about={Oneprofile?.about}
          socialMediaURL={Oneprofile?.socialMediaURL}
          avatarImage={Oneprofile?.avatarImage}
        />
      </div>
      <div className="w-[40%] bg-white absolute top-80 left-[52%] border-[1px] border-[#b8b8b8] rounded-lg p-3">
        <SupportCoffee />
      </div>
    </div>
  );
}
