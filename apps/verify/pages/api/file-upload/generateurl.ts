import { NextApiRequest, NextApiResponse } from "next";
import generateUploadUrl from "./s3file-upload";

export default async function generateS3Url(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const file = req.query.file as string | undefined;
  const contractaddress = req.query.contractaddress as string | undefined;

  if (!file || !contractaddress) {
    res.status(400).send("Bad Request: Missing required parameters.");
  } else {
    const url = await generateUploadUrl(file, contractaddress);
    res.send({ url });
  }
}
