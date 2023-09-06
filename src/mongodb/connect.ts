import { connect } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export  async function connectmongodb(){
    console.log("Connected to DB");
   const connection =  await connect(process.env.MONGO_DB_URI || "")
   return connection
}