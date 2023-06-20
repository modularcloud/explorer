import { ChangeEvent, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export function VerifyAndUpload() {
  const [files, setFiles] = useState<FileList>();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  type ContractData = {
    contractAddress: typeof contractAddress;
    chainId: string;
    files: Record<string, any>;
    uploadedFilesFolderUrl: string;
  };

  const data: ContractData = {
    contractAddress: contractAddress,
    chainId: "91002",
    files: {},
    uploadedFilesFolderUrl: "",
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const onContractAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value.toLowerCase());
  };

  const verifyAndUpload = async () => {
    if (!files) {
      toast.error("Please add files to verify");
      return;
    }
    const id = toast.loading("Verifying Files", {
      position: "top-center",
      closeOnClick: true,
    });
    try {
      await axios
        .get(
          `api/contract-verification/fetch-verified?contractaddress=${contractAddress}`
        )
        .then(async (response) => {
          if (response.status === 200 && response.data.isVerified === false) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const fileContents = await readFileData(file);
              // await uploadFile(file);
              data.files[file.name] = fileContents;
            }
            const verifyResult = await axios.post(
              "api/contract-verification/contract-verification",
              data
            );
            if (verifyResult?.status === 200) {
              toast.update(id, {
                render: "Verified Successfully",
                type: "success",
                isLoading: false,
                closeOnClick: true,
              });
              setVerified(true);
            }
          } else if (
            response?.status === 200 &&
            response.data.isVerified === true
          ) {
            toast.update(id, {
              render: "Contract Already Verified",
              type: "warning",
              isLoading: false,
              closeOnClick: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error calling API:", error);
          toast.update(id, {
            render: ` Verification Failed`,
            type: "error",
            isLoading: false,
            closeOnClick: true,
          });
        });
    } catch (error) {
      console.error(error);
      toast.update(id, {
        render: ` Internal Server Error`,
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
    }
  };

  const readFileData = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContents = event.target?.result as string;
        resolve(fileContents);
      };
      reader.onerror = (event) => {
        reject(event);
      };
      reader.readAsText(file);
    });
  };

  const uploadFile = async (file: File) => {
    try {
      const getImageUploadUrl = await axios.get(
        `api/file-upload/generateurl?file=${file.name}&contractaddress=${contractAddress}`
      );

      if (getImageUploadUrl.status === 200) {
        const extractedFolderUrl = getImageUploadUrl.data.url
          .split("?")[0]
          .split("/");
        data.uploadedFilesFolderUrl = extractedFolderUrl
          .slice(0, extractedFolderUrl.length - 1)
          .join("/");
        const uploadImage = await axios.put(getImageUploadUrl.data.url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadImage.status === 200) {
          return getImageUploadUrl.data.url.split("?")[0];
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
            onClick={verifyAndUpload}
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
