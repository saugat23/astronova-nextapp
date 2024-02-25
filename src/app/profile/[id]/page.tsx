"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import User from "@/models/userModel";

export default function UserProfile({params}: any) {
    const router = useRouter();

    const onUpdate = async () => {
        let response;
        const _id = params;
        const user = await User.findOne({ _id })
        try {
          response = await axios.put(`/api/users/me/${_id}`, user);
          console.log("update Success", response.data);
          router.push("/profile");
    
        } catch (error) {
          console.log("could not sign up")
          console.log(response);
          console.log(error);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page 
            <span className=" p-2 ml-2 rounded bg-blue-700 text-black">{params.id}</span>
            </p>
            <div className="mt-12 w-full h-full text-center">
                <button
                  type="button"
                  className="w-[406px] h-[58px] bg-[#2438B8] text-white rounded-md text-xl font-bold tracking-wider"
                  onClick={onUpdate}
                >
                  Update
                </button>
              </div>
            </div>
    )
}