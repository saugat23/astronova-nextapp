"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [allUsers, setAllUsers] = useState([]);

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
    setData(res.data.data._id);
    console.log(data);
  }

  const getAllUsers = async () => {
    const res = await axios.get('/api/users/get-all-users')
    if(res){
      setAllUsers({...allUsers, ...res});
    }
    console.log(res.data);
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
              onClick={getAllUsers}
            >Get all users</button>
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
        <div className="shadow-md">
          {allUsers.length === 0 ? <div></div> : <div>{allUsers.map((user) => <li key={user}>{user}</li>)}</div>}
        </div>
      </section>
    </>
  );
}
