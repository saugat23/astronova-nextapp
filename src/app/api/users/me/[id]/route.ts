import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(request:NextRequest){

    try {
        const reqBody = await request.json();
        const { _id, first_name, last_name, email, password, phone, country, address, google_id, google_token, insta_url, postal_code, state, twitter_url } = reqBody
        console.log(reqBody);

        const user = await User.findOne({ _id })
        if(user){
            User.updateOne({ first_name, last_name, email, password, phone, country, address, google_id, google_token, insta_url, postal_code, state, twitter_url})
        }
        return NextResponse.json({
            mesaaage: "User Updated",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}