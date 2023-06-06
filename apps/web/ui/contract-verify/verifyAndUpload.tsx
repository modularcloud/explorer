import { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export function VerifyAndUpload() {
  const [files, setFiles] = useState<FileList>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };
  const [verified, setVerified] = useState<boolean>(false);
  let data = {
    contractAddress: "0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40",
    chainId: "91002",
    files: {},
  };
  const verify = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contract-verification/prisma/fetch-contract",
        data
      );
      return response; // Return the API response data
    } catch (error) {
      console.error("Error calling API:", error);
      return error.response.data;
    }
  };
  const verifyAndUpload = async () => {
    if (files) {
      const id = toast.loading("Verifying Files", {
        position: "top-center",
        closeOnClick: true,
      });
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const fileContents = e.target?.result;
          data.files[files[i].name] = fileContents;
        };
        reader.readAsText(files[i]);
      }
      const verifyResult = await verify(data);
      if (verifyResult?.status === 200) {
        if (verifyResult?.data.result[0]?.storageTimestamp) {
          toast.update(id, {
            render: "Files Already Verified",
            type: "Warning",
            isLoading: false,
            closeOnClick: true,
          });
          setVerified(true);
        } else if (verifyResult.data.result[0].status == "perfect") {
          toast.update(id, {
            render: "Verified Successfully",
            type: "success",
            isLoading: false,
            closeOnClick: true,
          });
          setVerified(true);
        }
      } else {
        console.log(verifyResult);
        toast.update(id, {
          render: `Verification Failed ${verifyResult.error}`,
          type: "error",
          isLoading: false,
          closeOnClick: true,
        });
      }
    } else {
      console.log(false);
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
