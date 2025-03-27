// "use client";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { LoginTypes } from "../../../utils/type";
// type usersContextType = {
//   categories: LoginTypes[];
//   getCategories: () => void;
// };
// export const UsersContext = createContext<usersContextType>(
//   {} as usersContextType
// );

// export const useUsers = () => {
//   return useContext(UsersContext);
// };

// export const UsersProvider = ({ children }: { children: ReactNode }) => {
//   const [categories, setCategories] = useState<LoginTypes[]>([]);

//   return (
//     <div>
//       <UsersContext.Provider value={{ categories, getCategories }}>
//         {children}
//       </UsersContext.Provider>
//     </div>
//   );
// };
