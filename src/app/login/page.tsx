"use client";

import Auth from "@/components/AuthPage";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import GoogleSignInButton from "@/components/GoogleSignIn";


interface SignInFormProps {
  searchParams: {
  callbackUrl: string
  }
}

export default function LoginPage({searchParams: { callbackUrl } } : SignInFormProps) {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("could not login");
      console.log(error);
    }
  };

  return (
    <>
      <Auth>
        <div className="p-6">
          <Link href="/signup">
            <h4 className="text-right font-medium tracking-tight">
              Create an Account
            </h4>
          </Link>
          <div className="mt-20 mx-auto">
            <h2 className="text-center text-[55px] font-normal">
              Welcome Back
            </h2>
            <p className="text-center text-xl font-normal tracking-tighter">
              Enter your Untitled Accound Details
            </p>

            <div className="mt-12">
              <Input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                placeholder="Email or User ID"
              />
              <div className="mt-4 text-center w-full relative">
                <input
                  className="pr-8 text-black mx-auto bg-[#ECECEC] w-[406px] h-[58px] text-base font-normal px-4 outline-none rounded-sm placeholder:text-black"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Password"
                />
                <span
                  onClick={toggleShowPassword}
                  className="absolute top-4 right-[11rem]"
                >
                  {showPassword ? (
                    <Image
                      src="/show-password.png"
                      alt="Show Password Icon"
                      className="text-blue-700"
                      width="32"
                      height="24"
                    />
                  ) : (
                    <Image
                      src="/show-password.png"
                      alt="Show Password Icon"
                      width="32"
                      height="24"
                    />
                  )}
                </span>
              </div>
              <div className="w-[406px] h-16 mt-2 flex mx-auto justify-between items-center">
                <span>
                  <label className="font-normal tracking-tight">
                    <input
                      className="w-4 h-4 mr-2"
                      type="checkbox"
                      name="keepSignedIn"
                      id="keepSignedIn"
                    />
                    Keep me signed in
                  </label>
                </span>
                <span className="underline cursor-pointer">
                  Forgot Password
                </span>
              </div>
              <div className="mt-2 w-full h-full text-center">
                <button
                  type="button"
                  className="w-[406px] h-[58px] bg-[#2438B8] text-white rounded-md text-xl font-bold tracking-wider"
                  disabled={buttonDisabled}
                  onClick={onLogin}
                >
                  Sign In
                </button>
              </div>
              <div className="mt-12 w-full h-full text-center">
                <hr className="bg-slate-700 font-light w-[406px] h-[0.15rem] mx-auto -mb-3" />
                <span className="mx-auto font-medium">OR</span>
              </div>
              <div className="mt-2 w-full h-full text-center">
                <GoogleSignInButton callbackUrl={callbackUrl || "/"} />
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
}
