"use client";
import { Search, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import { CreatorsTypes } from "../../../utils/type";
import { useEffect, useState } from "react";
import AvatarHead from "./AvatarHead";
import { useUser } from "@/app/_context/Users";
import Link from "next/link";

export default function ExploreCreators() {
  const { users, getUser } = useUser();

  useEffect(() => {
    getUser();
  }, []);
  console.log("Users:", users);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-4">
      <AvatarHead />
      <h1 className="text-2xl font-bold mb-6">Explore creators</h1>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search name"
          className="pl-10 pr-4 py-2 w-[250px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-4">
        {users?.length == 0 ? (
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div
              className="w-[50px] h-[50px] bg-[#d1d1d1] rounded-full
          flex justify-center items-center"
            >
              <User />
            </div>
            <p>No creators have signed up yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-6 flex flex-col justify-between gap-8"
              >
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={`${user.avatarImage}` || "/placeholder.svg"}
                        alt={`${user.username}'s avatar`}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">{user.username}</h2>
                  </div>
                  <div className="">
                    <Link
                      href={`./viewpage/${user.id}`}
                      className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
                    >
                      View profile <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[50%]">
                    <h3 className="font-medium mb-2">About {user.name}</h3>
                    <p className="text-sm text-gray-700">{user.about}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Social media URL</h3>
                    <a
                      href={user.socialMediaURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {user.socialMediaURL}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
