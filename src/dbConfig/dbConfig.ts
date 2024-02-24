import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("monogDB connection established");
    });

    connection.on("error", () => {
      console.log("monogDB connection error, make sure database is running");
      process.exit();
    });
  } catch (error) {
    console.log("Database connection went wrong!");
    console.log(error);
  }
}
