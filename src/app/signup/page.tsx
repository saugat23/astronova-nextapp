"use client";

import Auth from "@/components/AuthPage";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    country: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if(user.firstName.length > 0 && user.lastName.length > 0 && user.email.length > 0 && user.password.length > 0 && user.contactNumber.length > 0 && user.country.length > 0 && user.address.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }

    if(user.password !== user.confirmPassword){
      setButtonDisabled(true);
    }
  },[user]);

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");

    } catch (error) {
      console.log("could not sign up")
      console.log(error);
    }
  };

  return (
    <>
      <Auth>
        <div className="p-4">
          <Link href="/login">
            <h4 className="text-right font-medium tracking-tight">
              Already have an account
            </h4>
          </Link>
          <div className="mt-2 mx-auto">
            <h2 className="text-center text-[55px] font-normal">
              Create an account
            </h2>
            <p className="text-center text-xl font-normal tracking-tighter">
              Enter your Untitled Accound Details
            </p>
            <div className="mt-6">
              <Input
                type="text"
                id="firstName"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                placeholder="First Name"
              />
              <Input
                type="text"
                id="lastName"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                placeholder="Last Name"
              />
              <Input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
              />
              <div className="mt-4 text-center w-full relative">
                <input
                  className="pr-8 text-black mx-auto bg-[#ECECEC] w-[406px] h-[58px] text-base font-normal px-4 outline-none rounded-sm placeholder:text-black"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Password"
                />
                <span onClick={toggleShowPassword} className="absolute top-4 right-[11rem]" >{showPassword ? <Image src="/show-password.png" alt="Show Password Icon" className="text-blue-700" width="32" height="24" /> : <Image src="/show-password.png" alt="Show Password Icon" width="32" height="24" />}</span>
              </div>
              <div className="mt-4 text-center w-full relative">
                <input
                  className="pr-8 text-black mx-auto bg-[#ECECEC] w-[406px] h-[58px] text-base font-normal px-4 outline-none rounded-sm placeholder:text-black"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password"
                />
                <span onClick={toggleShowConfirmPassword} className="absolute top-4 right-[11rem]" >{showConfirmPassword ? <Image src="/show-password.png" alt="Show Password Icon" className="text-blue-700" width="32" height="24" /> : <Image src="/show-password.png" alt="Show Password Icon" width="32" height="24" />}</span>
              </div>
              <div className="mt-4 text-center w-full relative">
                <input
                  className="pl-16 text-black mx-auto bg-[#ECECEC] w-[406px] h-[58px] text-base font-normal px-4 outline-none rounded-sm placeholder:text-black"
                  type="text"
                  id="contactNumber"
                  value={user.contactNumber}
                  onChange={(e) =>
                    setUser({ ...user, contactNumber: e.target.value })
                  }
                  placeholder="+977 Contact Number"
                />
                <Image
                  src="/nepal.png"
                  alt="Nepal"
                  className="absolute top-3 left-[11rem] rounded-[50%] bg-white"
                  width="32"
                  height="32"
                />
              </div>
              <div className="mt-4 text-center w-full relative">
                <input
                  className="text-black mx-auto bg-[#ECECEC] w-[406px] h-[58px] text-base font-normal px-4 outline-none rounded-sm placeholder:text-black"
                  type="text"
                  id="Country"
                  value={user.country}
                  onChange={(e) => setUser({ ...user, country: e.target.value })}
                  placeholder="Country"
                />
                <Image
                  src="/location.png"
                  alt="Location Icon"
                  className="absolute top-3 right-[11rem] rounded-[50%] bg-white"
                  width="32"
                  height="32"
                />
              </div>
              <Input
                type="text"
                id="address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                placeholder="Address"
              />
              <div className="mt-12 w-full h-full text-center">
                <button
                  type="button"
                  className="w-[406px] h-[58px] bg-[#2438B8] text-white rounded-md text-xl font-bold tracking-wider"
                  disabled={buttonDisabled}
                  onClick={onSignUp}
                >
                  Sign up
                </button>
              </div>
              <div className="mt-4 w-full h-full text-center" >
                <hr className="bg-slate-700 font-light w-[406px] h-[0.15rem] mx-auto -mb-2" />
                <span className="mx-auto font-medium">OR</span>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
}
