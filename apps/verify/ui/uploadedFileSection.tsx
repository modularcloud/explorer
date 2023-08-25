import React, { FC, useEffect, useState } from "react";
interface Props {
  files: FileList | null;
}
import SourceCodePreviewer from "./sourceCodePreviewer";
import { readFileData } from "../utils/readFileData";

const UploadedFileSection: FC<Props> = ({ files }) => {
  const [fileData, setFileData] = useState<string>("");
  const [isExpandedFileContent, setIsExpandedFileContent] =
    useState<boolean>(false);
  const onViewClick = async (file) => {
    setFileData(await readFileData(file));
    setIsExpandedFileContent(!isExpandedFileContent);
  };
  return (
    <div>
      <p>Uploaded Files</p>
      {files &&
        Array.from(files).map((file, index) => (
          <div
            key={index}
            className="bg-[#F9F5FF] flex   justify-between p-2 my-1 rounded-lg mt-3"
          >
            <div className="flex gap-x-3  justify-center items-center">
              <div className="bg-[#F4EBFF] rounded-full h-[30px] w-[30px] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  s
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.6663 1.89154V5.33366C11.6663 5.80037 11.6663 6.03372 11.7572 6.21198C11.8371 6.36879 11.9645 6.49627 12.1213 6.57616C12.2996 6.66699 12.533 6.66699 12.9997 6.66699H16.4418M16.6663 8.32385V14.3337C16.6663 15.7338 16.6663 16.4339 16.3939 16.9686C16.1542 17.439 15.7717 17.8215 15.3013 18.0612C14.7665 18.3337 14.0665 18.3337 12.6663 18.3337H7.33301C5.93288 18.3337 5.23281 18.3337 4.69803 18.0612C4.22763 17.8215 3.84517 17.439 3.60549 16.9686C3.33301 16.4339 3.33301 15.7338 3.33301 14.3337V5.66699C3.33301 4.26686 3.33301 3.5668 3.60549 3.03202C3.84517 2.56161 4.22763 2.17916 4.69803 1.93948C5.23281 1.66699 5.93288 1.66699 7.33301 1.66699H10.0095C10.621 1.66699 10.9267 1.66699 11.2144 1.73607C11.4695 1.79731 11.7134 1.89832 11.9371 2.03539C12.1893 2.19 12.4055 2.40619 12.8379 2.83857L15.4948 5.49542C15.9271 5.9278 16.1433 6.14399 16.2979 6.39628C16.435 6.61996 16.536 6.86382 16.5973 7.11891C16.6663 7.40663 16.6663 7.71237 16.6663 8.32385Z"
                    stroke="#6941C6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text-[#101828] break-all">
                <p className="pr-1">{file.name}</p>
              </div>
            </div>
            <div className="flex gap-x-3  pl-2 justify-center items-center">
              <div
                className="text-[#6941C6] cursor-pointer"
                onClick={() => onViewClick(file)}
              >
                View
              </div>
              {isExpandedFileContent ? (
                <SourceCodePreviewer
                  sourceCode={fileData}
                  setIsExpandedFileContent={setIsExpandedFileContent}
                />
              ) : (
                ""
              )}
              <div className="text-[#B42318] cursor-pointer">Delete</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UploadedFileSection;
