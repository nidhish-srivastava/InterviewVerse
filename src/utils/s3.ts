import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import { promisify } from "util";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const randomBytes = promisify(crypto.randomBytes);
const region = "ap-south-1";
const bucketName = "interviewverse-s3bucket";
const accessKeyId = process.env.accessKeyId || "";
const secretAccessKey = process.env.secretAccessKey || "";

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function generateUploadUrl() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return uploadUrl
}
