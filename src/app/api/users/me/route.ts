import { getDatafromToekn } from "@/helpers/getdatafromtoken";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDatafromToekn(request);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
