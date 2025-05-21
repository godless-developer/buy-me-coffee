"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Profile = {
  id: number;
  name: string;
  about: string;
  socialMediaURL: string;
  avatarImage: string;
  userId: string;
  coverImg: string;
};

type ProfileContextType = {
  profileInfo: Profile | null;
  getProfileInfo: (userId: string) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileInfo, setProfileInfo] = useState<Profile | null>(null);

  const getProfileInfo = async (userId: string) => {
    try {
      const response = await axios.get(`/api/profile?userId=${userId}`);
      if (response.data.error) {
        console.error("Error fetching profile:", response.data.message);
        return;
      }
      setProfileInfo(response.data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileInfo, getProfileInfo }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
