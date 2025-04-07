"use client";
import { useUser } from "@/app/_context/Users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export default function ProfileInfo() {
  const username = localStorage.getItem("username");
  return (
    <div className="bg-white w-[100%] text-black h-[300px] flex justify-center items-center">
      <div className="w-[80%] border-[#b3b3b3] border-[1px] rounded-lg flex flex-col gap-6 p-6">
        <div className="flex justify-between">
          <div className="flex justify-between items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{username}</p>
              <p className="text-[13px]">buymecoffee.com/baconpancakes1</p>
            </div>
          </div>
          <button className="px-4 bg-black text-white py-1 rounded-lg">
            Share page link
          </button>
        </div>
        <div className="w-full h-[1px] bg-gray-700"></div>
        <div className="flex gap-4 items-center">
          <p className="font-bold">Earning</p>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="text-black bg-white">
              <SelectGroup>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                <SelectItem value="All time">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-[28px] font-extrabold">$450</p>
      </div>
    </div>
  );
}
