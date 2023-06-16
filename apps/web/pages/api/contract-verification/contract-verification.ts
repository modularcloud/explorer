import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import prisma from "../../../prisma/lib/prisma";
import { getEngine } from "../../../lib/networks";
export default async function verifyContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress, files, uploadedFilesFolderUrl } = req.body;
  try {
    console.log("Making API call...");
    const response = await axios.post(
      process.env.SOURCIFY_URL ?? "http://localhost:5555/verify", //sourcify api call url
      {
        address: contractAddress,
        chain: getEngine().config.network.sourcifyChainId,
        files: files,
      }
    );
    console.log("API call completed, response status:", response.status);

    if (response.status == 200) {
      console.log("Creating record in database...");
      try {
        const record = await prisma.verification.create({
          data: {
            verificationStatus:
              response.data.result[0].status == "perfect" ? "FULL" : "PARTIAL",
            contractAddress,
            chainID: chainId,
            isVerified: true,
            filesUploadedURL: uploadedFilesFolderUrl,
          },
        });
      } catch (error) {
        console.error(error);
      }
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
