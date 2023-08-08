import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import axios, { AxiosResponse } from "axios";
import unzipper, { Entry } from "unzipper";
import { Verification } from ".prisma/client";

export default async function FetchVerifiedContract(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let contractAddress = Array.isArray(req.query.contractaddress)
    ? req.query.contractaddress[0]
    : req.query.contractaddress;
  contractAddress = contractAddress?.toLowerCase();
  const readFiles = req.query.readfiles ?? null;
  if (contractAddress) {
    try {
      const contractData = await prisma.verification.findUnique({
        where: {
          contractAddress: contractAddress,
        },
      });
      if (contractData && readFiles === "true") {
        const url = contractData.uploadedUrl;
        await axios
          .get(url, { responseType: "stream" })
          .then(async (response: AxiosResponse<any>) => {
            const data = await unzipAndRead(response, contractData);
            res.status(200).json(data);
          })
          .catch((error: Error) => {
            console.log(error);
            res.status(500).json(error);
          });
      } else if (contractData) {
        res.status(200).json(contractData);
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
  contractData: Verification,
) => {
  return new Promise((resolve, reject) => {
    let data: any = { ...contractData };
    data.files = {};
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
            data.files[fileName] = content;
          });
        } else {
          entry.autodrain();
        }
      })
      .promise()
      .then(
        () => resolve(data),
        (e: any) => console.log("error", e),
      );
  });
};
