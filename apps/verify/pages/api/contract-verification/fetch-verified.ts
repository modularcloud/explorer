import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import axios, { AxiosResponse } from "axios";
import unzipper, { Entry } from "unzipper";
import { Verification } from ".prisma/client";

export default async function FetchVerifiedContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let contractAddress = Array.isArray(req.query.contractaddress)
    ? req.query.contractaddress[0]
    : req.query.contractaddress;
  contractAddress = contractAddress.toLowerCase();
  const readFiles = req.query.readfiles ?? null;
  if (contractAddress) {
    try {
      const findContractAddress = await prisma.verification.findUnique({
        where: {
          contractAddress: contractAddress,
        },
      });
      if (findContractAddress && readFiles === "true") {
        const url = findContractAddress.uploadedUrl;
        await axios
          .get(url, { responseType: "stream" })
          .then(async (response: AxiosResponse<any>) => {
            await unzipAndRead(response, findContractAddress);
            res.status(200).json(findContractAddress);
          })
          .catch((error: Error) => {
            console.log(error);
            res.status(500).json(error);
          });
      } else if (findContractAddress) {
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

const unzipAndRead = (
  response: AxiosResponse<any>,
  findContractAddress: Verification
) => {
  return new Promise((resolve, reject) => {
    findContractAddress.files = {};
    response.data
      .pipe(unzipper.Parse())
      .on("entry", (entry: Entry) => {
        const fileName = entry.path;
        const type = entry.type; // 'Directory' or 'File'

        if (type === "File") {
          let content = "";
          entry.on("data", (data: Buffer) => {
            content += data.toString();
          });
          entry.on("end", () => {
            findContractAddress.files[fileName] = content;
          });
        } else {
          entry.autodrain();
        }
      })
      .promise()
      .then(
        () => resolve(findContractAddress),
        (e) => console.log("error", e)
      );
  });
};
