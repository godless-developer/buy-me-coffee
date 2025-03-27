import UserModel from "../../../../_back_end/model";

export const GET = async () => {
  const user = await UserModel();
  return new Response(JSON.stringify({ data: user }));
};

// export const POST = async (req: Request) => {
//   const body = await req.json();
//   return new Response(JSON.stringify({ message: "hgg", received: body }));
// };
