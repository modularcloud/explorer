import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
export default async function FetchVerifiedContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contractAddress = Array.isArray(req.query.contractaddress)
    ? req.query.contractaddress[0]
    : req.query.contractaddress;

  if (contractAddress) {
    try {
      const findContractAddress = await prisma.verification.findUnique({
        where: {
          contractAddress: contractAddress,
        },
      });
      if (findContractAddress) {
        res.status(200).json(findContractAddress);
      } else {
        res.status(200).json({ isVerified: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
