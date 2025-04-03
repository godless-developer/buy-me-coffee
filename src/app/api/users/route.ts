import { NextResponse } from "next/server";
import { runQuery } from "../../../utils/server/queryService";

export async function GET(): Promise<NextResponse> {
  try {
    const getUser = `SELECT username,password FROM "user"`;
    const user = await runQuery(getUser);
    return new NextResponse(JSON.stringify({ Users: user }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
