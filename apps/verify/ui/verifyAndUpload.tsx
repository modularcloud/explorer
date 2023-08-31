import { ChangeEvent, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import JSZip, { file } from "jszip";
import { readFileData } from "../utils/readFileData";
import ExternalFileImporter from "./externalFileImporter";
import ChainSelectableComponent from "./chainSelectableComponent";
import UploadedFileSection from "./uploadedFileSection";

export default function VerifyAndUpload() {
  const [files, setFiles] = useState<File[]>();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("22222");
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
      const fileArray = Array.from(event.target.files);
      setFiles(fileArray);
    }
  };
  const deleteFile = (fileIndex: number) => {
    if (files) {
      const newFiles = [...files];
      newFiles.splice(fileIndex, 1);
      setFiles(newFiles);
    }
  };
  const dragNdrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFiles(Array.from(event.dataTransfer.files));
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
        `api/contract-verification/fetch-verified?contractaddress=${contractAddress}&chainid=${chainId}`,
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
        if (error.response.data.errors) {
          error = error.response.data.errors[0].message;
        } else if (error.response.data.message) {
          error = error.response.data.message;
        } else {
          error = error.response.data.error;
        }
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
      <div className="my-7 flex flex-col items-center justify-center gap-y-6 rounded-xl   ">
        <div className="w-[90vw] shadow-lg rounded-xl bg-[#FCFCFC] px-14 py-10 border-solid ">
          <div className="flex  justify-between mb-3">
            <div className="flex flex-col w-full">
              <p className="pl-1">Select Chain</p>
              <ChainSelectableComponent
                onSelectionChange={handleChainSelectionChange}
              />
            </div>
            <div className="flex flex-col w-3/4 ">
              <p className="pl-1">Contract Address</p>
              <input
                type="text"
                onChange={onContractAddressChange}
                className="p-2 mt-2 rounded-lg  border-2 border-solid border-gray-300  font-light placeholder:text-gray-900"
                placeholder="Contract Address"
              />
            </div>
          </div>
          <ExternalFileImporter setFiles={setFiles} />
          <div className="flex w-full gap-x-5">
            <label
              htmlFor="file-upload"
              className="custom-file-upload pt-5 w-[65%]"
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={dragNdrop}
                className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-solid p-20  font-light"
              >
                <div className="bg-[#F2F4F7] h-[40px] w-[40px] rounded-full relative flex-col flex justify-center items-center">
                  <div className="relative  rounded-full bg-[#F9FAFB] flex justify-center items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M12 18V12M9 15H15M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"
                        stroke="#7B6FE7"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-[#6941C6]">Click to Upload</p>
                <p className="text-sm  text-[#667085]">
                  Drag and drop here or Browse files
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                  multiple
                />
              </div>
            </label>
            <div className="pt-4 flex flex-col relative w-[40%] ">
              <UploadedFileSection deleteFile={deleteFile} files={files} />
            </div>
          </div>

          <div className="text-md flex gap-x-3 pt-5">
            <p>Added Files:</p>
            {files &&
              Array.from(files).map((file, index) => (
                <p key={index} className="text-center">
                  {file.name},
                </p>
              ))}
          </div>
          <div className="flex  items-center justify-center">
            <div
              className="rounded-lg bg-[#7B6FE7] cursor-pointer  px-4 py-2 text-white w-1/5 text-center "
              onClick={onSubmit}
            >
              Verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
