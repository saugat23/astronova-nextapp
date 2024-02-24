import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastName: {
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
  contactNumber: {
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
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
