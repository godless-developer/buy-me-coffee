import { NextResponse } from "next/server";
import { runQuery } from "../../../utils/server/queryService";

export async function GET(): Promise<NextResponse> {
  try {
    const getUser = `SELECT username,password FROM "user"`;
    const user = await runQuery(getUser);

    return new NextResponse(JSON.stringify({ Users: user }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Failed to run query" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username, password } = await req.json();

    const getUser = `SELECT username,password FROM "user" WHERE username = $1 AND password = $2`;
    const user = await runQuery(getUser, [username, password]);

    if (user.length > 0) {
      return new NextResponse(
        JSON.stringify({ user: user[0], message: "User found" })
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Failed to run query" }),
      {
        status: 500,
      }
    );
  }
}
