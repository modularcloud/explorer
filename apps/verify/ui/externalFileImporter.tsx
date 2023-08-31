import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import convertBase64ToFile from "../utils/convertBase64ToFile";
import PuffLoader from "react-spinners/ClipLoader";
import ImportFileComponent from "./importFileComponent";
import readRemoteFile from "../utils/readRemoteFiles";
type props = {
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
};

const ExternalFileImporter: React.FC<props> = ({ setFiles }) => {
  const [showImportFromGithub, setshowImportFromGithub] =
    useState<boolean>(false);
  const [showImportFromRemote, setshowImportFromRemote] =
    useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImport = async (importFrom: string) => {
    setIsLoading(true);
    if (importFrom === "Github") {
      let files: File[] = [];
      await axios
        .post("api/data-retrieval/github", { githubUrl: url })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let file = convertBase64ToFile(
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
      const files = await readRemoteFile(url);
      console.log(files);
      setFiles(files);
    }
    setIsLoading(false);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const toggleImport = (importFrom) => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_154_11824)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
                fill="#7B6FE7"
              />
            </g>
            <defs>
              <clipPath id="clip0_154_11824">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="pr-2">Import from GitHub</p>
        </div>

        <div
          className=" bg-[#FCFAFF] cursor-pointer flex gap-x-2 mb-3 mt-1 p-1.5  rounded-lg justify-center items-center border-2 border-solid border-[#7B6FE7]"
          onClick={() => {
            setshowImportFromRemote(!showImportFromRemote);
            setshowImportFromGithub(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="#7B6FE7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
