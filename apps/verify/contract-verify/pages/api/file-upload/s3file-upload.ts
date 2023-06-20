import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import archiver from "archiver";
import stream from "stream";

const accessKeyId = process.env.AWS_S3_ACCESSKEY_ID;
const secretAccessKey = process.env.AWS_S3_ACCESSKEY_SECRET;
const name = "verified-contracts";

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not set");
}

export default async function zipAndUploadFiles(files: string[], contractAddress: string) {
  const lowerCaseContractAddress = contractAddress.toLowerCase();
  const zipFileName = lowerCaseContractAddress + "/contractFiles.zip"; // Name for the zip file
  
  const output = new stream.PassThrough(); // Create a PassThrough stream, this will be our "file"
  const archive = archiver('zip');
  archive.pipe(output); // Pipe the archive data to our file

  // Add each file to the archive
  files.forEach(file => {
    archive.file(file, { name: file });
  });

  archive.finalize();

  const s3 = new S3Client({
    region: "us-west-2",
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });

  const s3Params = {
    Bucket: name,
    Key: zipFileName,
    Body: output
  };

  const command = new PutObjectCommand(s3Params);

  try {
    const response = await s3.send(command);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}