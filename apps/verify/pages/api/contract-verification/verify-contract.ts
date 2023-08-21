import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function verifyContract(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { contractAddress, files, chain } = req.body;

  try {
    console.log("Making API call...");
    const response = await axios.post(
      process.env.SOURCIFY_URL ?? "http://localhost:5555/verify",
      {
        address: contractAddress,
        chain: chain,
        files: files,
      },
    );
    if (
      response.data.result[0].status !== "perfect" &&
      response.data.result[0].status !== "partial"
    ) {
      res.status(400).json({ message: response.data.result[0].message });
      return;
    }
    console.log("API call completed, response status:", response.status);
    console.log("Setting response status...");
    res.status(response.status).json(response.data);
    console.log("Response status set.");
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
      console.error("An error occurred:", error);
      return;
    }
  }
}
