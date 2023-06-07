import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function verifyContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress, chainId, files } = req.body;
  try {
    console.log('Making API call...');
    const response = await axios.post("http://localhost:3000/api/contract-verification/prisma/fetch-contract/", {
      address: contractAddress,
      chain: chainId,
      files: files,
    });
    console.log('API call completed, response status:', response.status);
    
    if (response.status == 200) {
      console.log('Creating record in database...');
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
      console.log('Record created.');
    }
    
    console.log('Setting response status...');
    res.status(response.status).json(response.data);
    console.log('Response status set.');
  } catch (error) {
    console.error('An error occurred:', error);
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('axiosError details:', axiosError.response.data, axiosError.response.status, axiosError.response.headers);
      
      // Forward the error response from the Sourcifiy api
      res.status(axiosError.response.status).json(axiosError.response.data);
    }
  }
}