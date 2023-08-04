import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId = process.env.AWS_S3_ACCESSKEY_ID;
const secretAccessKey = process.env.AWS_S3_ACCESSKEY_SECRET;
const name = "verified-contracts";

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not set");
}

export default async function generateUploadUrl(
  file: string,
  contractAddress: string,
) {
  const fileAddress = contractAddress + "/" + file;
  const splitedFileName = file.split(".");
  const s3Params = {
    Bucket: name,
    Key: fileAddress,
    ContentType: splitedFileName[splitedFileName.length - 1],
    // ACL: 'bucket-owner-full-control'
  };

  const s3 = new S3Client({
    region: "us-west-2",
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });

  const command = new PutObjectCommand(s3Params);

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return signedUrl;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
