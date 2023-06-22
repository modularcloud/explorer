import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function verifyContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress, files, uploadedUrl } = req.body;
  const chainId = "91002"; // this value is hard coded as of now, it might change in the future

  try {
    console.log("Making API call...");

    const response = await axios.post(
      process.env.SOURCIFY_URL ?? "http://localhost:5555/verify",
      {
        address: contractAddress,
        chain: chainId,
        files: files,
      }
    );
    console.log("API call completed, response status:", response.status);
    console.log("Setting response status...");
    res.status(response.status).json(response.data);
    console.log("Response status set.");
    return;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;
    console.log(AxiosError);
    if (axiosError.response) {
      console.error(
        "axiosError details:",
        axiosError.response.data,
        axiosError.response.status,
        axiosError.response.headers
      );

      res.status(axiosError.response.status).json(axiosError.response.data);
      console.error("An error occurred:", error);
      return;
    }
  }
}
