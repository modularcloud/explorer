import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import convertBase64ToFile from "../utils/convertBase64ToFile";
import PuffLoader from "react-spinners/ClipLoader";
import ImportFileComponent from "./importFileComponent";
import readRemoteFile from "../utils/readRemoteFiles";
import SvgGithub from "./icons/github";

import SvgPlus from "./icons/plus";
type props = {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};
/* eslint-disable react/prop-types */
const ExternalFileImporter: React.FC<props> = ({ setFiles }) => {
  const [showImportFromGithub, setshowImportFromGithub] =
    useState<boolean>(false);
  const [showImportFromRemote, setshowImportFromRemote] =
    useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImport = async (importFrom: string) => {
    setIsLoading(true);
    const files: File[] = [];
    if (importFrom === "Github") {
      await axios
        .post("api/data-retrieval/github", { githubUrl: url })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const file = convertBase64ToFile(
              res.data[i].rawFile,
              res.data[i].fileName,
            );
            files.push(file);
          }
          setFiles((prevFiles) => [...prevFiles, ...files] as File[]);
        })
        .catch((error) => {
          console.log(error);
          toast.error(`Failed to fetch Files from github: ${error} `);
        });
    } else {
      const rawFiles = await readRemoteFile(url);
      if (rawFiles !== null) {
        for (let i = 0; i < rawFiles.length; i++) {
          const file = convertBase64ToFile(
            rawFiles[i].rawFile,
            rawFiles[i].fileName,
          );
          files.push(file);
        }
        setFiles((prevFiles) => [...prevFiles, ...files] as File[]);
      }
    }
    setIsLoading(false);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const toggleImport = (importFrom: string) => {
    if (importFrom === "Github") {
      setshowImportFromGithub(!showImportFromGithub);
    } else {
      setshowImportFromRemote(!setshowImportFromRemote);
    }
  };
  return (
    <div className="">
      <div className="tab:flex-row my-2 flex flex-col gap-x-6 text-[#7B6FE7]">
        <div
          className={` mb-3  mt-1  flex  cursor-pointer items-center justify-center  gap-x-2 rounded-lg border-2 border-solid border-[#7B6FE7] bg-[#FCFAFF] p-1.5 ${
            !showImportFromGithub && showImportFromRemote ? "blur-[0.5px]" : ""
          }`}
          onClick={() => {
            setshowImportFromGithub(!showImportFromGithub);
            setshowImportFromRemote(false);
            setUrl("");
          }}
        >
          <SvgGithub />
          <p className="pr-2">Import from GitHub</p>
        </div>

        <div
          className={`mb-3 mt-1 flex cursor-pointer items-center justify-center gap-x-2  rounded-lg border-2 border-solid border-[#7B6FE7] bg-[#FCFAFF] p-1.5 ${
            !showImportFromRemote && showImportFromGithub ? "blur-[0.5px]" : ""
          }`}
          onClick={() => {
            setshowImportFromRemote(!showImportFromRemote);
            setshowImportFromGithub(false);
            setUrl("");
          }}
        >
          <SvgPlus />
          <p className="pr-2">Import from remote</p>
        </div>
        {isLoading && (
          <div className="absolute left-0 top-0 z-40  m-0 h-full min-w-[100%]  overflow-hidden  backdrop-blur-md ">
            <div className="absolute left-1/2  top-[40%] m-0 w-full   ">
              <PuffLoader color="#7B6FE7" size={200} />
            </div>
          </div>
        )}
      </div>
      {showImportFromGithub && (
        <ImportFileComponent
          importFrom="Github"
          handleUrlChange={handleUrlChange}
          importUrl={url}
          handleImport={handleImport}
          toggleImport={toggleImport}
          placeholder={
            "https://github.com/OpenZeppelin/master/contracts/token/ERC20"
          }
        />
      )}
      {showImportFromRemote && (
        <ImportFileComponent
          importFrom="Remote  file or zip"
          handleUrlChange={handleUrlChange}
          importUrl={url}
          handleImport={handleImport}
          toggleImport={toggleImport}
          placeholder="https://modular.cloud/contract.zip"
        />
      )}
    </div>
  );
};

export default ExternalFileImporter;
