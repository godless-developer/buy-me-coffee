import { LoginTypes } from "../src/utils/type";

const CommentModel = async (): Promise<LoginTypes[]> => {
  return [
    {
      username: "tukka",
      email: "bbtulga98@gmail.com",
      password: "pass1111",
      id: "12834",
    },
  ];
};
export default CommentModel;
