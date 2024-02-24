"use server"

import { getServerSession } from "next-auth/next"
import { Account, Profile } from "next-auth"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { nextauthOptions } from "@/lib/nextauth-options"
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"

export async function getUserSession() {
  const session = await getServerSession(nextauthOptions)
  return ({ session })
}

interface ExtendedProfile extends Profile {
  picture?: string
}

interface SignInWithOauthParams {
  account: Account,
  profile: ExtendedProfile
}

export async function signInWithOauth({
  account,
  profile
}: SignInWithOauthParams) {
  // console.log({account, profile})
  connect()

  const user = await User.findOne({email: profile.email})
  
  if (user) return true

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider
  })

  // console.log(newUser)
  await newUser.save()
  
  return true
}

interface GetUserByEmailParams {
  email: string
}

export async function getUserByEmail({
  email
}: GetUserByEmailParams) {
  connect()

  const user = await User.findOne({email}).select("-password")

  if (!user) {
    throw new Error ("User does not exist!")
  }

  // console.log({user})
  return {...user._doc, _id: user._id.toString()}
}

export interface UpdateUserProfileParams {
  name: string
}

export interface SignUpWithCredentialsParams {
  name: string,
  email: string,
  password: string
}

export async function signUpWithCredentials ({
  name,
  email,
  password
}: SignUpWithCredentialsParams) {
  connect()

  try {
    const user = await User.findOne({email})

    if (user) {
      throw new Error("User already exists.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    // console.log({newUser})
    await newUser.save()

    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}

interface SignInWithCredentialsParams {
  email: string,
  password: string
}

export async function signInWithCredentials ({
  email,
  password
}: SignInWithCredentialsParams) {
  connect()

  const user = await User.findOne({email})

  if (!user) {
    throw new Error("Invalid email or password!")
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password
  )

  if (!passwordIsValid) {
    throw new Error("Invalid email or password")
  }

  return {...user._doc, _id: user._id.toString()}
}

export interface ChangeUserPasswordParams {
  oldPassword: string,
  newPassword: string
}