"use client";

import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

type ProfilePaid = {
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
  userId: string;
};

type ProfilePaidContextType = {
  profile: ProfilePaid | null;
  getProfile: (userId: string) => Promise<void>;
};

const ProfilePaidContext = createContext<ProfilePaidContextType | undefined>(
  undefined
);

export const useProfilePaid = () => {
  const context = useContext(ProfilePaidContext);
  if (!context) {
    throw new Error("useProfilePaid must be used within a ProfilePaidProvider");
  }
  return context;
};

const ProfilePaidProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfilePaid | null>(null);

  const getProfile = async (userId: string) => {
    try {
      const response = await axios.get(`/api/profilePaid?userId=${userId}`);
      console.log("Fetched profile:", response.data);

      if (response.data.error) {
        alert(response.data.message);
        return;
      }

      setProfile(response.data.profile);
    } catch (error) {
      console.error("Failed to get profile:", error);
      alert("Error getting profile");
    }
  };

  return (
    <ProfilePaidContext.Provider value={{ profile, getProfile }}>
      {children}
    </ProfilePaidContext.Provider>
  );
};

export default ProfilePaidProvider;
