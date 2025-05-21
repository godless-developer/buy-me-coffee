import { runQuery } from "@/utils/server/queryService";
import { ProfilePaid } from "@/utils/type";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<ProfilePaid>> {
  try {
    const {
      country,
      firstName,
      lastName,
      cardNumber,
      expireMonth,
      expireYear,
      cvc,
      userId,
    } = await req.json();

    if (userId === null || userId === undefined) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "User ID is required" }),
        {
          status: 400,
        }
      );
    }

    const createProfilePaid = `
      INSERT INTO "profilePaid" ("country", "firstName", "lastName", "cardNumber", "expireMonth", "expireYear", "cvc", "userId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`;

    const profilePaid: ProfilePaid[] = await runQuery(createProfilePaid, [
      country,
      firstName,
      lastName,
      cardNumber,
      expireMonth,
      expireYear,
      cvc,
      userId,
    ]);

    const createdProfilePaid = profilePaid[0];

    const updateProfile = `
      UPDATE "user"
      SET "profileId" = $1
      WHERE "id" = $2
      RETURNING *`;

    const updatedProfile = await runQuery(updateProfile, [
      createdProfilePaid?.id,
      userId,
    ]);
    return new NextResponse(
      JSON.stringify({
        updateProfile: updatedProfile[0],
        profile: profilePaid[0],
        userId: userId,
        message: "Profile created successfully",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Failed to create profile" }),
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: Request): Promise<NextResponse<ProfilePaid>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "User ID is required" }),
        { status: 400 }
      );
    }

    const getProfilePaid = `
      SELECT * FROM "profilePaid"
      WHERE "userId" = $1
      LIMIT 1
    `;

    const profilePaid: ProfilePaid[] = await runQuery(getProfilePaid, [userId]);

    if (profilePaid.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "Profile not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ profile: profilePaid[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Failed to get profile" }),
      { status: 500 }
    );
  }
}
