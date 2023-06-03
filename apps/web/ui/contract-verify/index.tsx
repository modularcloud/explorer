import { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { VerifyAndUpload } from "./verifyAndUpload";
export function VerifyContract() {
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
  const success = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const verifyAndUpload = async (e) => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log("loader");
        const fileContents = e.target.result;
        data.files[files[i].name] = fileContents;
      };
      await reader.readAsText(files[i]);
    }
    await axios
      .post(
        "http://localhost:3000/api/contract-verification/prisma/fetch-contract",
        data
      )
      .then((response) => {
        if (response.status === 200 && response.data.status == "perfect") {
          setVerified(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-gray-100 bg-center bg-no-repeat min-h-screen  ">
      <div>
        <p className="text-center font-bold  text-4xl pt-20">Verifier</p>
        <p className="text-center ">
          Verify smart contracts by recompiling with the Solidity source code
          and metadata
        </p>
      </div>
      <VerifyAndUpload />
    </div>
  );
}
