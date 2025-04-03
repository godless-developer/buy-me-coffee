import { CreatorsModel } from "../../../../_back_end/creators-model";

export const GET = async () => {
  const creator = await CreatorsModel();
  return new Response(JSON.stringify({ data: creator }));
};
