import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/lib/prisma";

export default async function isContractVerified(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contractAddress = Array.isArray(req.query.contractaddress) ? req.query.contractaddress[0] : req.query.contractaddress;

  if (contractAddress) {
    try {
      const findContractAddress = await prisma.verification.findUnique({
        where: {
          contractAddress: contractAddress,
        },
      });
      console.log(findContractAddress);
      if (findContractAddress) {
        res.status(200).json({ verified: true });
      } else {
        res.status(200).json({ verified: false });
      }
    } catch (error) {
      res.status(500).json("serverError");
    }
  }
}
