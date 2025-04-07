export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    const getUser = `SELECT email,password FROM "user" WHERE email = $1 AND password = $2`;
    const user = await runQuery(getUser, [email, password]);

    if (user.length > 0) {
      return new Response(
        JSON.stringify({ user: user[0], message: "User found" })
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: true, message: "Failed to sign in" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
// import { NextResponse } from "next/server";
import { runQuery } from "../../../utils/server/queryService";
