import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a contact number"]
  },
  country: {
    type: String,
    required: [true, "Please provide a country"]
  },
  address: {
    type: String,
    required: [true, "Please provide a address"]
  },
  google_id: {
    type: String,
  },
  google_token: {
    type: String,
  },
  insta_url: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  state: {
    type: String,
  },
  twitter_url: {
    type: String,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
