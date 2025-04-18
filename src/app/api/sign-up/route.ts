import { runQuery } from "@/utils/server/queryService";

export async function POST(req: Request): Promise<Response> {
  try {
    const { username, email, password } = await req.json();
    // console.log("username", username);
    // console.log("email", email);
    // console.log("password", password);

    const createUser = `INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3)`;
    const users = await runQuery(createUser, [username, email, password]);
    return new Response(
      JSON.stringify({ user: users, message: "User created successfully" })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: true, message: "Failed to create user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
