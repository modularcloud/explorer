import { NextApiRequest, NextApiResponse } from "next";
import zipAndUploadFile from "./s3file-upload";

export default async function generateS3Url(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = req.query.file as string | undefined;
  const contractaddress = req.query.contractaddress as string | undefined;

  if (!file || !contractaddress) {
    res.status(400).send('Bad Request: Missing required parameters.');
  } else {
    const response = await zipAndUploadFile(file, contractaddress); 
    res.send({ response }); // the response is now the result of the upload, not a URL
  }
}
