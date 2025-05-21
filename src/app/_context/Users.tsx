"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  username: string;
  email: string;
  id: string;
  name?: string;
  about?: string;
  avatarImage?: string;
  socialMediaURL?: string;
};
type UserContextType = {
  users: User[];
  getUser: any;
};

const userContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users");
      const usersData = response.data.Users || [];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error in getting user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider value={{ users, getUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
