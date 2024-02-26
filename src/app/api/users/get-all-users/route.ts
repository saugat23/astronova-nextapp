import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){

    try {
        // const user = await User.findOne({_id: userId}).select("-password");
        const users = await User.find({});
        return NextResponse.json({
            message: "Users found",
            data: users
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}