import { ChangeEvent, useState } from "react";
import axios from "axios";

export function VerifyContract() {
  const [files, setFiles] = useState<FileList | undefined>();
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

  const verifyAndUpload = async () => {
    if (!files) {
      console.error("No files were uploaded");
      return;
    }
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
      .post("api/contract-verification/prisma/fetch-contract", data)
      .then((response) => {
        if (response.status === 200 && response.data.status === "perfect") {
          setVerified(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-gray-100 bg-center bg-no-repeat min-h-screen">
      <div>
        <p className="text-center font-bold  text-4xl pt-20">Verifier</p>
        <p className="text-center">
          Verify smart contracts by recompiling with the Solidity source code
          and metadata
        </p>
      </div>
      <div className="flex flex-col items-center">
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={verifyAndUpload}>Verify and Upload</button>
        {verified && <p>Contract is verified!</p>}
      </div>
    </div>
  );
}
