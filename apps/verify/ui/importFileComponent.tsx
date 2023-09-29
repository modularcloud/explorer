import { ChangeEvent } from "react";
import SvgXClose from "./icons/x-close";
/* eslint-disable react/prop-types */
type props = {
  importFrom: string;
  handleUrlChange: (event: ChangeEvent<HTMLInputElement>) => void;
  importUrl: string;
  placeholder: string;
  handleImport: (importFrom: string) => void;
  toggleImport: (importFrom: string) => void;
};
const ImportFileComponent: React.FC<props> = ({
  importFrom,
  handleUrlChange,
  importUrl,
  handleImport,
  toggleImport,
  placeholder,
}) => {
  return (
    <div>
      <div className="flex flex-col ">
        <div className="py-2">
          <p>Import from {importFrom}</p>
        </div>
        <div className="flex relative w-full">
          <div className="w-full">
            <input
              className="rounded-md border-[1px] border-[#D0D5DD] p-1.5  w-[98%]"
              type="text"
              placeholder={placeholder}
              value={importUrl}
              onChange={(event) => {
                handleUrlChange(event);
              }}
            />
          </div>
          <div
            className="bg-[#7B6FE7] rounded-md py-1.5 px-4 cursor-pointer"
            onClick={() => {
              handleImport(importFrom);
            }}
          >
            <p className="text-center text-white ">Import</p>
          </div>
          <div
            className="flex justify-center items-center px-3 cursor-pointer"
            onClick={() => {
              toggleImport(importFrom);
            }}
          >
            <SvgXClose />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImportFileComponent;
