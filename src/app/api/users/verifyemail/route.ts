import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log("Verification token received:", token);

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    const users = await User.find({
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("Users with valid expiry:", users.length);

    let validUser = null;

    for (let user of users) {
      if (user.verifyToken) {
        console.log("Comparing tokens for user:", user.email);
        const isTokenValid = await bcrypt.compare(token, user.verifyToken);
        if (isTokenValid) {
          validUser = user;
          break;
        }
      }
    }

    if (!validUser) {
      console.log("No valid token match found");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    validUser.isVerified = true;
    validUser.verifyToken = undefined;
    validUser.verifyTokenExpiry = undefined;
    await validUser.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("Verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
