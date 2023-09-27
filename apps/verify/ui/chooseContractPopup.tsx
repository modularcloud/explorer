import { FC } from "react";
import SvgFile from "./icons/file";
import { ContractData } from "./verifyAndUpload";
import { toast } from "react-toastify";

interface props {
  files: object | undefined;
  showContractPopUp: boolean;
  setShowContractPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenContractIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  data: ContractData;
  onSubmit: () => void;
}

const ChooseContractPopup: FC<props> = ({
  onSubmit,
  files,
  data,
  setShowContractPopUp,
  setChosenContractIndex,
  showContractPopUp,
}) => {
  const submit = () => {
    if (typeof data.chosenContract === "undefined") {
      toast.error("Please select a contract to continue ");
    } else {
      onSubmit();
      setTimeout(() => {
        setShowContractPopUp(false);
      }, 3);
    }
  };
  return (
    <div>
      {showContractPopUp && files && (
        <div className="fixed top-0 left-0 h-screen  w-screen backdrop-blur-md overflow-auto z-20 ">
          <div className="absolute  top-[20%] h-[70%]  left-1/4 w-1/2 z-10  ">
            <div className="absolute     p-3 pb-4  h-full flex  overflow-auto flex-col bg-white rounded-md w-full  items-center ">
              <p className="pt-2 font-bold text-2xl">
                Please choose the main contract to verify
              </p>
              {Object.keys(files).map((contractName, index) => (
                <div
                  key={index}
                  className="flex   justify-between p-4 items-center mt-7  border-2 border-gray-100 rounded-lg  w-3/4 "
                >
                  <div className="flex gap-x-3 items-center justify-center ">
                    <div>
                      <input
                        type="checkbox"
                        value={index}
                        checked={data.chosenContract === index}
                        onChange={() => {
                          setChosenContractIndex(index);
                        }}
                      ></input>
                    </div>
                    <div className="bg-[#F4EBFF] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                      <SvgFile />
                    </div>
                    <div className="text-[#101828] break-all pl-1  ">
                      <p className="pr-1 ">{contractName}</p>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="text-[#6941C6] text-lg cursor-pointer">
                      View
                    </div>
                  </div>
                </div>
              ))}
              <div
                onClick={submit}
                className="sticky  mt-4  rounded-lg bg-[#7B6FE7] cursor-pointer  px-4 py-2 text-white w-1/5 text-center "
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseContractPopup;
