import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { firstName, lastName, email, password, contactNumber, country, address } = reqBody
        console.log(reqBody);

        const user = await User.findOne({ email }); //check if user exists
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 200})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ // creating a new user
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            country,
            address
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({success:true, message: "User created successfully", savedUser}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:200});
    }
}