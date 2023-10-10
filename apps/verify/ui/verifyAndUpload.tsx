import { ChangeEvent, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import JSZip from "jszip";
import { readFileData } from "../utils/readFileData";
import ExternalFileImporter from "./externalFileImporter";
import ChainSelectableComponent from "./chainSelectableComponent";
import UploadedFileSection from "./uploadedFileSection";
import SvgFileUpload from "./icons/fileUpload";
import ChooseContractPopup from "./chooseContractPopup";

type VerificationStatus = "FULL" | "PARTIAL" | null;
export type ContractData = {
  contractAddress: string;
  chainId: string;
  files: Record<string, any>;
  uploadedUrl: string;
  verificationStatus: VerificationStatus;
  chosenContract: number | undefined;
};

export default function VerifyAndUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("22222");
  const [showContractPopUp, setShowContractPopUp] = useState<boolean>(false);
  const [contractDeployedSolidityFiles, setContractDeployedSolidityFiles] =
    useState({});
  const [chosenContractIndex, setChosenContractIndex] = useState<number>();
  const [metadataJsonExists, SetMetadataJsonExists] = useState<boolean>(false);
  const HARDHAT_OUTPUT_FORMAT_REGEX = /"hh-sol-build-info-1"/;

  const data: ContractData = {
    contractAddress: contractAddress,
    chainId: chainId,
    files: {},
    uploadedUrl: "",
    chosenContract: chosenContractIndex,
    verificationStatus: null,
  };

  const handleChainSelectionChange = (chainId: string) => {
    setChainId(chainId);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray] as File[]);
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
      const fileArray = Array.from(event.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray] as File[]);
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
    if (contractAddress == "") {
      toast.error(
        "We noticed you left the contract address blank. Please fill it in ",
      );
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
          chosenContract: data.chosenContract,
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
          if (
            error ==
              'Metadata file not found. Did you include "metadata.json"?' &&
            metadataJsonExists
          ) {
            error = " The provided metadata is invalid.";
          }
        }
      }
      console.error("File Verification or ", error);
      toast.update(toastId, {
        render: ` Verification Failed: ${error}`,
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
    } finally {
      setChosenContractIndex(undefined);
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
    } catch (error: any) {
      console.error("Error uploading file:", error);
      throw new Error("File Upload Failed");
    }
  };

  const readAndZipFiles = () => {
    return new Promise<Blob>(async (resolve, reject) => {
      try {
        const zip = new JSZip();
        let zipFile;
        if (files) {
          for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            const fileContents = await readFileData(file);
            const fileType = file.name.includes(".")
              ? file.name.split(".").pop()
              : null;
            if (fileType?.toLowerCase() === "json") {
              SetMetadataJsonExists(true);
            }
            if (
              fileType?.toLowerCase() === "json" &&
              fileContents.match(HARDHAT_OUTPUT_FORMAT_REGEX) &&
              typeof data.chosenContract == "undefined"
            ) {
              let loadedJson = JSON.parse(fileContents);
              if (typeof loadedJson === "string") {
                loadedJson = JSON.parse(loadedJson);
              }
              if (Object.keys(loadedJson.output.contracts).length > 1) {
                setContractDeployedSolidityFiles(loadedJson.output.contracts);
                setShowContractPopUp(true);
                throw new Error("Verification Paused:");
              }
            }
            data.files[file.name] = fileContents;
            zip.file(file.name, file);
          }
          zip.generateAsync({ type: "blob" }).then(async (content) => {
            zipFile = new Blob([content], { type: "application/zip" });
            resolve(zipFile);
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Verification Paused:") {
            toast.update(toastId, {
              render: ` Verification Paused: Multiple contracts detected. Please select the primary contract and click Submit.`,
              type: "warning",
              isLoading: false,
              closeOnClick: true,
            });
          } else {
            toast.update(toastId, {
              render: `Error on reading files`,
              type: "error",
              isLoading: false,
              closeOnClick: true,
            });
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="my-7 flex flex-col items-center justify-center gap-y-6 rounded-xl   ">
        <div className="w-[90vw] rounded-xl border-solid bg-[#FCFCFC] px-14 py-10 shadow-lg ">
          <ChooseContractPopup
            setChosenContractIndex={setChosenContractIndex}
            data={data}
            files={contractDeployedSolidityFiles}
            showContractPopUp={showContractPopUp}
            setShowContractPopUp={setShowContractPopUp}
            onSubmit={onSubmit}
          />
          <div className="tab:flex-row mb-3 flex  flex-col justify-between">
            <div className="flex w-full flex-col ">
              <p className="">Select Chain</p>
              <ChainSelectableComponent
                onSelectionChange={handleChainSelectionChange}
              />
            </div>
            <div className="tab:w-3/5 flex w-full flex-col ">
              <p className="pl-1 ">Contract Address</p>
              <input
                type="text"
                onChange={onContractAddressChange}
                className="mt-2 w-full rounded-lg  border-2 border-solid   border-gray-300 p-2  font-sans font-light placeholder:text-gray-600"
                placeholder="0xbb0e34e178a36b85af3622a7166b0543be239db2"
              />
            </div>
          </div>
          <ExternalFileImporter setFiles={setFiles} />
          <div className="tab:flex-row flex w-full flex-col gap-x-5">
            <label
              htmlFor="file-upload"
              className="custom-file-upload tab:w-[65%] w-full pt-5 "
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={dragNdrop}
                className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-solid p-20  font-light"
              >
                <div className="relative flex h-[40px] w-[40px] flex-col items-center justify-center rounded-full bg-[#F2F4F7]">
                  <div className="relative  flex items-center justify-center rounded-full bg-[#F9FAFB]  ">
                    <SvgFileUpload />
                  </div>
                </div>
                <p className="text-center text-[#6941C6]">Click to Upload</p>
                <p className="text-center  text-sm text-[#667085]">
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
            <div className="tab:h-80 tab:w-[40%] relative flex w-full flex-col overflow-auto  pl-1 pt-4 ">
              <UploadedFileSection deleteFile={deleteFile} files={files} />
            </div>
          </div>

          <div className="flex items-center justify-center pt-3">
            <div
              className="w-1/5 cursor-pointer rounded-lg  bg-[#7B6FE7] px-4 py-2 text-center text-white "
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
