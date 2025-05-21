import { runQuery } from "@/utils/server/queryService";
import { Profile } from "@/utils/type";
import { NextResponse } from "next/server";
export async function GET(req: Request): Promise<NextResponse<Profile>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "User ID is required" }),
        { status: 400 }
      );
    }

    const getProfile = `
      SELECT * FROM "Profile"
      WHERE "userId" = $1
      LIMIT 1
    `;

    const profile: Profile[] = await runQuery(getProfile, [userId]);

    if (profile.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "Profile not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ profile: profile[0] }), {
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

export async function POST(req: Request): Promise<NextResponse<Profile>> {
  try {
    const { name, about, socialMediaURL, avatarImage, userId } =
      await req.json();

    if (userId === null || userId === undefined) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "User ID is required" }),
        {
          status: 400,
        }
      );
    }

    const createProfile = `
      INSERT INTO "Profile" ("name", "about", "socialMediaURL", "avatarImage", "userId")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

    const profile: Profile[] = await runQuery(createProfile, [
      name,
      about,
      socialMediaURL,
      avatarImage,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        profile: profile[0],
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

export async function PATCH(req: Request): Promise<NextResponse> {
  try {
    const { profileId, coverImg } = await req.json();

    if (!profileId) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "Profile ID is required" }),
        { status: 400 }
      );
    }

    const updateQuery = `
      UPDATE "Profile"
      SET "coverImg" = $1
      WHERE id = $2
      RETURNING *`;

    const updatedProfile = await runQuery(updateQuery, [coverImg, profileId]);

    if (updatedProfile.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "Profile not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        profile: updatedProfile[0],
        message: "Cover image updated successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Update failed:", err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Update failed" }),
      { status: 500 }
    );
  }
}
