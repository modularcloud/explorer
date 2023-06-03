import { ChangeEvent, useState } from "react";

export function VerifyContract() {
  const [files, setFiles] = useState<FileList>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
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
      <div className="flex flex-col justify-center items-center">
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
                Array.from(files).map((file) => (
                  <p className="text-center">{file.name},</p>
                ))}
            </div>
            <div className="flex justify-center items-center cursor-pointer ">
              <div className=" bg-[#254ba5] text-white px-4 py-2 rounded-lg">
                Verify
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
