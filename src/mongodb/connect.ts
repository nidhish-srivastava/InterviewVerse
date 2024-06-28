import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectmongodb() {
  try {
    console.log("Connected to MongoDB");
    const connection = await connect(process.env.MONGO_DB_URI || "");
    return connection;
  } catch (error) {
    console.log("Error connecting to DB");
  }
}
