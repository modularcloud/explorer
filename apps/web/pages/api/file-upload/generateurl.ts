import { NextApiRequest, NextApiResponse } from "next";
import generateUploadUrl from "./s3file-upload";
export default async function generateS3Url(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = await generateUploadUrl(
    req.query.file,
    req.query.contractaddress
  );
  res.send({ url });
}
