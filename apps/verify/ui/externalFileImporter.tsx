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
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
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
          setFiles(files);
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
          console.log(file);
          files.push(file);
        }
        setFiles(files);
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
    <div>
      <div className="flex gap-x-6 my-2 text-[#7B6FE7]">
        <div
          className=" bg-[#FCFAFF]  flex  gap-x-2  mb-3 mt-1 p-1.5  rounded-lg justify-center items-center border-2 border-solid border-[#7B6FE7] cursor-pointer"
          onClick={() => {
            setshowImportFromGithub(!showImportFromGithub);
            setshowImportFromRemote(false);
          }}
        >
          {isLoading && (
            <div className="absolute top-0 left-0 h-full  min-w-[100%] overflow-hidden backdrop-blur-md  z-40  m-0 ">
              <div className="absolute top-[40%]  left-1/2 w-full m-0   ">
                <PuffLoader color="#7B6FE7" size={200} />
              </div>
            </div>
          )}
          <SvgGithub />
          <p className="pr-2">Import from GitHub</p>
        </div>

        <div
          className=" bg-[#FCFAFF] cursor-pointer flex gap-x-2 mb-3 mt-1 p-1.5  rounded-lg justify-center items-center border-2 border-solid border-[#7B6FE7]"
          onClick={() => {
            setshowImportFromRemote(!showImportFromRemote);
            setshowImportFromGithub(false);
          }}
        >
          <SvgPlus />
          <p className="pr-2">Import from remote</p>
        </div>
      </div>
      {showImportFromGithub && (
        <ImportFileComponent
          importFrom="Github"
          handleUrlChange={handleUrlChange}
          importUrl={url}
          handleImport={handleImport}
          toggleImport={toggleImport}
        />
      )}
      {showImportFromRemote && (
        <ImportFileComponent
          importFrom="Remote"
          handleUrlChange={handleUrlChange}
          importUrl={url}
          handleImport={handleImport}
          toggleImport={toggleImport}
        />
      )}
    </div>
  );
};

export default ExternalFileImporter;
