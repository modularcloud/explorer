import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/lib/prisma";

export default async function persistVerified(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { contractAddress, uploadedUrl, verificationStatus, chainId } =
    req.body;

  console.log("Making API call...");
  console.log("Creating record in database...");
  try {
    const record = await prisma.verification.create({
      data: {
        verificationStatus,
        contractAddress,
        chainID: chainId,
        isVerified: true,
        uploadedUrl: uploadedUrl,
      },
    });
    console.log("Setting response status...");
    res.status(200).json(record);
    console.log("Response status set.");
    return;
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
    return;
  }
}
