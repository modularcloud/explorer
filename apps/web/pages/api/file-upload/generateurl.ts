import { NextApiRequest, NextApiResponse } from "next";

const generateS3Url = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("generateS3Url");
  const url = await s3.generateUploadUrl(req.body.fileType);
  res.send({ url });
};
