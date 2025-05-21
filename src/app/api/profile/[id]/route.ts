import { runQuery } from "@/utils/server/queryService";
import { Profile } from "@/utils/type";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Profile>> {
  try {
    const profileId = params.id;

    const query = `SELECT * FROM "Profile" WHERE id = $1 LIMIT 1`;
    const values = [profileId];

    const result = await runQuery(query, values);

    if (result.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "Profile not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ profile: result[0] }), {
      status: 200,
    });
  } catch (err) {
    console.error("Query failed:", err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Query failed" }),
      { status: 500 }
    );
  }
}
