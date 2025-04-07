import { LoginTypes } from "../src/utils/type";

const UserModel = async (): Promise<LoginTypes[]> => {
  return [
    {
      username: "tukka",
      email: "bbtulga98@gmail.com",
      password: "pass111",
      id: "12834",
    },
  ];
};
export default UserModel;
