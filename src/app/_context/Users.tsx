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
};

type UserContextType = {
  users: User[];
  getUser: any; // Ensures it's always an array
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
  const [users, setUsers] = useState<User[]>([]); // Default to empty array

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.Users || []); //
      console.log("Usersfasdf:", response.data);
      if (response.data.error) {
        alert(response.data.message);
        console.log("Error fetching users:", response.data.message);
        return;
      }
      console.log("Users state:", users);
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
