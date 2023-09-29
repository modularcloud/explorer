import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);
import React, { useEffect } from "react";
import SvgXClose from "./icons/x-close";
import SvgCopyText from "./icons/copy-text";
interface props {
  sourceCode: string;
  setIsExpandedFileContent: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string;
}

const SourceCodePreviewer: React.FC<props> = ({
  sourceCode,
  setIsExpandedFileContent,
  fileName,
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen  w-screen backdrop-blur-md overflow-auto">
      <div className="absolute top-1/4  left-1/4 w-3/5 z-10  ">
        <div className="absolute     p-3 pb-4  flex justify-between flex-col bg-white rounded-md w-full ">
          <div className="flex justify-between">
            <p className="text-center mb-2">{fileName}</p>
            <div className="cursor-pointer">
              <div className="flex">
                <div
                  className="px-2 pb-1 mr-4 text-center  hover:bg-[#f7f7f7] rounded-md"
                  onClick={() => {
                    navigator.clipboard.writeText(sourceCode);
                  }}
                >
                  <SvgCopyText />
                </div>
                <div
                  onClick={() => {
                    setIsExpandedFileContent(false);
                  }}
                >
                  <SvgXClose />
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-[#EAECF0] border-solid rounded-lg">
            <pre>
              <code className="h-96 language-js ">{sourceCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceCodePreviewer;
