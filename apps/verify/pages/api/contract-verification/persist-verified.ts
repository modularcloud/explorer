import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import prisma from "../../../prisma/lib/prisma";

export default async function persistVerified(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { contractAddress, files, uploadedUrl, verificationStatus, chainId } =
    req.body;

  try {
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
    } catch (error) {
      res.status(500).json(error);
      console.error(error);
    }

    return;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        "axiosError details:",
        axiosError.response.data,
        axiosError.response.status,
        axiosError.response.headers,
      );

      res.status(axiosError.response.status).json(axiosError.response.data);
      return;
    }
  }
}
