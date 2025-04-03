"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
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
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      if (jsonData.error) {
        alert(jsonData.message);
        return;
      }

      setUsers(jsonData.data || []); // Ensure it's always an array
      console.log("Fetched users:", jsonData);
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
