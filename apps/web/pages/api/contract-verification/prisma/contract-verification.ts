import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import prisma from "./lib/prisma";

export default async function verifyContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress, chainId, files } = req.body;
  try {
    console.log("Making API call...");
    const response = await axios.post(
      process.env.SOURCIFY_URL ?? "http://localhost:5555/verify", //sourcify api call url
      {
        address: contractAddress,
        chain: chainId,
        files: files,
      }
    );
    console.log("API call completed, response status:", response.status);

    if (response.status == 200) {
      console.log("Creating record in database...");
      const record = await prisma.verification.create({
        data: {
          verificationStatus:
            response.data.result[0].status == "perfect" ? "FULL" : "PARTIAL",
          contractAddress,
          chainID: chainId,
          isVerified: true,
          sourceCode: files,
          bytecode: "your_bytecode_here", // Add the bytecode field here
        },
      });
      console.log("Record created.");
      
      console.log("Looking up the record...");
      const foundRecord = await prisma.verification.findUnique({
        where: {
          contractAddress: contractAddress,
        },
      });
      console.log("Record found:", foundRecord);
    }

    console.log("Setting response status...");
    res.status(response.status).json(response.data);
    console.log("Response status set.");
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        "axiosError details:",
        axiosError.response.data,
        axiosError.response.status,
        axiosError.response.headers
      );

      // Forward the error response from the Sourcify api
      res.status(axiosError.response.status).json(axiosError.response.data);
      console.error("An error occurred:", error);
    }
  }
}