import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function verifyContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async (resolve, reject) => {
    const { contractAddress, chainId, files } = req.body;
    try {
      // API call to our local souricfy instance
      const response = await axios.post("http://localhost:5555/", {
        address: contractAddress,
        chain: chainId,
        files: files,
      });
      if (response.status == 200) {
        const record = await prisma.verification.create({
          data: {
            verificationStatus:
              response.data.result[0].status == "perfect" ? "FULL" : "PARTIAL",
            contractAddress,
            chainId,
            isVerified: true,
            sourceCode: files,
          },
        });
      }
      res.status(response.status).json(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(axiosError.response.data);
        console.error(axiosError.response.status);
        console.error(axiosError.response.headers);

        // Forward the error response from the Sourcifiy api
        res.status(axiosError.response.status).json(axiosError.response.data);
      }
    }
  });
}
