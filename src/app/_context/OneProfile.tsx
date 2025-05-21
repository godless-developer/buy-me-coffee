// context/ProfileContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Profile {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  userId: number;
  coverImg: string;
}

const OneProfileContext = createContext<{
  Oneprofile: Profile | null;
  fetchProfile: (id: string) => Promise<void>;
}>({
  Oneprofile: null,
  fetchProfile: async () => {},
});

export const OneProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Oneprofile, setOneProfile] = useState<Profile | null>(null);

  const fetchProfile = async (id: string) => {
    try {
      const res = await fetch(`/api/profile/${id}`);
      const data = await res.json();

      if (res.ok) {
        setOneProfile(data.profile);
      } else {
        console.error("Profile not found");
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  return (
    <OneProfileContext.Provider value={{ Oneprofile, fetchProfile }}>
      {children}
    </OneProfileContext.Provider>
  );
};

export const useProfile = () => useContext(OneProfileContext);
