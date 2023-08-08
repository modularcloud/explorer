import { ChangeEvent, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import JSZip from "jszip";
import { readFileData } from "../utils/readFileData";
import { error } from "console";
import SelectableComponent from "./selectableComponent";

export default function VerifyAndUpload() {
  const [files, setFiles] = useState<FileList>();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("91002");
  type VerificationStatus = "FULL" | "PARTIAL" | null;

  type ContractData = {
    contractAddress: typeof contractAddress;
    chainId: string;
    files: Record<string, any>;
    uploadedUrl: string;
    verificationStatus: VerificationStatus;
  };

  const data: ContractData = {
    contractAddress: contractAddress,
    chainId: chainId,
    files: {},
    uploadedUrl: "",
    verificationStatus: null,
  };

  const handleChainSelectionChange = (chainId: string) => {
    setChainId(chainId);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const onContractAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value.toLowerCase());
  };
  let toastId: any;
  const onSubmit = async () => {
    if (!files) {
      toast.error("Please add files to verify");
      return;
    }
    toastId = toast.loading("Verifying Files", {
      position: "top-center",
      closeOnClick: true,
    });
    try {
      const isVerified = await checkContractVerified();
      if (isVerified === false) {
        const zipFile = await readAndZipFiles();
        await verifyAndPost(zipFile);
      } else if (isVerified === true) {
        toast.update(toastId, {
          render: "Contract Already Verified",
          type: "warning",
          isLoading: false,
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: ` Internal Server Error`,
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
    }
  };

  const checkContractVerified = async () => {
    const response = await axios
      .get(
        `api/contract-verification/fetch-verified?contractaddress=${contractAddress}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
      .catch((error) => {
        console.error("Error calling API:", error);
        toast.update(toastId, {
          render: ` Verification Failed`,
          type: "error",
          isLoading: false,
          closeOnClick: true,
        });
      });
    return response?.data?.isVerified;
  };

  const verifyAndPost = async (zipFile: Blob) => {
    try {
      const sourcifyResponse = await axios.post(
        "api/contract-verification/verify-contract",
        {
          contractAddress: data.contractAddress,
          chain: data.chainId,
          files: data.files,
        },
      );
      if (sourcifyResponse.status == 200) {
        await uploadFile(zipFile);
        data.verificationStatus =
          sourcifyResponse.data.result[0].status == "perfect"
            ? "FULL"
            : "PARTIAL";
        const persistVerified = await axios.post(
          "api/contract-verification/persist-verified",
          data,
        );
        if (persistVerified?.status === 200) {
          toast.update(toastId, {
            render: "Verified Successfully",
            type: "success",
            isLoading: false,
            closeOnClick: true,
          });
        }
      } else {
        throw new Error("Error In Contract verification");
      }
    } catch (error: any) {
      if (error.response) {
        error = error.response.data.message;
      }
      console.error("File Verification or ", error);
      toast.update(toastId, {
        render: ` Verification Failed ${error}`,
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
    }
  };

  const uploadFile = async (file: File | Blob) => {
    try {
      const getFileUploadUrl = await axios.get(
        `api/file-upload/generateurl?file=${`${
          contractAddress + "_sourcefiles.zip"
        }`}&contractaddress=${contractAddress}`,
      );

      if (getFileUploadUrl.status === 200) {
        data.uploadedUrl = getFileUploadUrl.data.url.split("?")[0];
        const uploadFile = await axios.put(getFileUploadUrl.data.url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (uploadFile.status === 200) {
          // it will Get the base URL from the presigned S3 URL
          //then remove query parameter so that we get a clean url of where the file is uploaded and it is returned
          return getFileUploadUrl.data.url.split("?")[0];
        } else {
          throw new Error("File Upload Failed");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File Upload Failed");
    }
  };

  const readAndZipFiles = () => {
    return new Promise<Blob>(async (resolve, reject) => {
      let zip = new JSZip();
      let zipFile;
      if (files) {
        for (let i = 0; i < files?.length; i++) {
          const file = files[i];
          const fileContents = await readFileData(file);
          data.files[file.name] = fileContents;
          zip.file(file.name, file);
        }
        zip.generateAsync({ type: "blob" }).then(async (content) => {
          zipFile = new Blob([content], { type: "application/zip" });
          resolve(zipFile);
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="my-7 flex flex-col items-center justify-center gap-y-6 rounded-xl border-t-4 border-solid border-[#234594]">
        <div className="w-[80vw] rounded-lg bg-white px-14 py-10">
          <div>
            <p className="text-center text-2xl font-bold">Upload files</p>
          </div>
          <div>
            <p className="pb-5 text-center">
              Add the Solidity source files and metadata of the contract you
              want to verify.
            </p>
          </div>
          <label
            htmlFor="file-upload"
            className="custom-file-upload relative w-full pt-5"
          >
            <div className="flex">
              <p>Select Chain:</p>
              <SelectableComponent
                onSelectionChange={handleChainSelectionChange}
              />
            </div>
            <div className="w-full py-4">
              <input
                type="text"
                onChange={onContractAddressChange}
                className="h-10 w-full rounded-lg border-2 border-[#2753bb] indent-2  font-light placeholder:text-gray-800"
                placeholder="Contract Address"
              />
            </div>
            <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#234594] p-20 font-light">
              <p>Drag and drop here or</p>
              <p>Browse files</p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </div>
          </label>
          <div className="text-md flex gap-x-3 pt-5">
            <p>Added Files:</p>
            {files &&
              Array.from(files).map((file, index) => (
                <p key={index} className="text-center">
                  {file.name},
                </p>
              ))}
          </div>
          <div
            className="flex cursor-pointer items-center justify-center"
            onClick={onSubmit}
          >
            <div className="rounded-lg bg-[#254ba5] px-4 py-2 text-white">
              Verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
