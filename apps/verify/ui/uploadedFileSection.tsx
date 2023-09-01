import React, { FC, useEffect, useState } from "react";
interface Props {
  files: File[] | undefined;
  deleteFile: (fileIndex: number) => void;
}
import SourceCodePreviewer from "./sourceCodePreviewer";
import { readFileData } from "../utils/readFileData";
import SvgFile from "./icons/file";

const UploadedFileSection: FC<Props> = ({ files, deleteFile }) => {
  const [fileData, setFileData] = useState<string>("");
  const [isExpandedFileContent, setIsExpandedFileContent] =
    useState<boolean>(false);
  const onViewClick = async (file: File) => {
    setFileData(await readFileData(file));
    setIsExpandedFileContent(!isExpandedFileContent);
  };
  const onDelete = (index: number) => {
    deleteFile(index);
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
                <SvgFile />
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
                  fileName={file.name}
                  setIsExpandedFileContent={setIsExpandedFileContent}
                />
              ) : (
                ""
              )}
              <div
                className="text-[#B42318] cursor-pointer"
                onClick={() => {
                  onDelete(index);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UploadedFileSection;
