import { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export function VerifyAndUpload() {
  const [files, setFiles] = useState<FileList>();
  const [contractAddress, setContractAddress] = useState<string>("");
  type ContractData = {
    contractAddress: typeof contractAddress;
    chainId: string;
    files: object;
    fileUploadedUrls: object;
  };
  let data: ContractData = {
    contractAddress: contractAddress,
    chainId: "91002",
    files: {},
    fileUploadedUrls: {},
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const onContractAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value);
  };

  const verifyAndUpload = async () => {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.files[files[i].name] = await readFileData(files[i]);
        data.fileUploadedUrls[files[i].name] = await uploadFile(files[i]);
      }
      await verifyAndToast(data);
    } else {
      toast.error("Please add files to verify", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  async function readFileData(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = e.target?.result;
        resolve(fileContents);
      };

      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }

  const verifyAndToast = async (data: ContractData) => {
    const id = toast.loading("Verifying Files", {
      position: "top-center",
      closeOnClick: true,
    });
    try {
      const verifyResult = await axios.post(
        "api/contract-verification/prisma/contract-verification",
        data
      );
      if (verifyResult?.status === 200) {
        if (verifyResult?.data?.result?.[0]?.storageTimestamp) {
          toast.update(id, {
            render: "Contract Already Verified",
            type: "Warning",
            isLoading: false,
            closeOnClick: true,
          });
          setVerified(true);
        } else if (verifyResult.data.result[0].status == "perfect") {
          toast.update(id, {
            render: " Verified Successfully",
            type: "success",
            isLoading: false,
            closeOnClick: true,
          });
          setVerified(true);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast.update(id, {
          render: ` Verification Failed \n ${axiosError.response?.data?.errors?.[0]?.message}`,
          type: "error",
          isLoading: false,
          closeOnClick: true,
        });
      }

      console.error("Error calling API:", error);
    }
  };
  const uploadFile = async (file: File) => {
    const getImageUploadUrl = await axios.get(
      `api/file-upload/generateurl?file=${file.name}&contractaddress=${contractAddress}`
    );
    if (getImageUploadUrl.status === 200) {
      const UploadImage = await axios.put(getImageUploadUrl.data.url, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (UploadImage.status === 200) {
        return getImageUploadUrl.data.url.split("?")[0];
      } else {
        toast.error(UploadImage.status.toString());
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="border-[#234594] border-t-4 rounded-xl  my-7 border-solid flex flex-col gap-y-6 justify-center items-center">
        <div className="px-14 py-10 bg-white w-[80vw] rounded-lg">
          <div>
            <p className="text-center font-bold text-2xl">Upload files</p>
          </div>
          <div>
            <p className="text-center pb-5">
              Add the Solidity source files and metadata of the contract you
              want to verify.
            </p>
          </div>
          <label
            htmlFor="file-upload"
            className="custom-file-upload w-full relative pt-5 "
          >
            <div className=" w-full py-4">
              <input
                type="text"
                onChange={onContractAddressChange}
                className=" w-full h-10 border-2 font-light border-[#2753bb] rounded-lg  indent-2 placeholder:text-gray-800"
                placeholder="Contract Address"
              />
            </div>
            <div className="border-2 font-light border-[#234594] rounded-xl  cursor-pointer border-dashed p-20 relative flex flex-col  justify-center items-center">
              <p>Drag and drop here or </p>
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
          <div className="pt-5 flex gap-x-3  text-md ">
            <p>Added Files:</p>
            {files &&
              Array.from(files).map((file, index) => (
                <p key={index} className="text-center">
                  {file.name},
                </p>
              ))}
          </div>
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={verifyAndUpload}
          >
            <div className=" bg-[#254ba5] text-white px-4 py-2 rounded-lg">
              Verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
