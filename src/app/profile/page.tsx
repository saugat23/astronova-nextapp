"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error);
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data.firstName + " " + res.data.data.lastName + " - " + res.data.data.email);
    console.log(data);
  }

  return (
    <>
      <section className="min-h-screen flex justify-center items-center">
        <div className="shadow-md w-1/2 h-1/2">
          <h1 className="text-3xl font-medium text-center">User Details</h1>
          <div className="w-full text-center mt-4">
            {data === "" ? "" : <div>
            <Link href={`/profile/${data}`}>{data}</Link>
              </div>}
          </div>
          <div className="w-full text-center m-4">
            <button
              type="button"
              className="w-[406px] h-[58px] bg-[#2438B8] text-white rounded-md text-xl font-bold tracking-wider"
              onClick={getUserDetails}
            >Get Details</button>
          </div>
          <div className="w-full text-center m-4">
            <button
              type="button"
              className="w-[406px] h-[58px] bg-[#2438B8] text-white rounded-md text-xl font-bold tracking-wider"
              onClick={onLogout}
            >Log out</button>
          </div>
        </div>
      </section>
    </>
  );
}
