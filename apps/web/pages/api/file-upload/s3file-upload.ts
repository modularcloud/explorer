const aws = require("aws-sdk");

const accessKeyId = process.env.AWS_S3_ACCESSKEY_ID;
const secretAccessKey = process.env.AWS_S3_ACCESSKEY_SECRET;
const region = "us-east-2";
const name = "contract-verification";

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadUrl(datatype: string) {
  try {
    const imageName = "/contract-files" + +"." + datatype;
    const params = {
      Bucket: name,
      Key: imageName,
      Expires: 120,
    };
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  generateUploadUrl,
};
