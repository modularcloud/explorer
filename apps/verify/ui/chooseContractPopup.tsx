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
        <div className="fixed left-0 top-0 z-20  h-screen w-screen overflow-auto backdrop-blur-md ">
          <div className="absolute  left-1/4 top-[20%]  z-10 h-[70%] w-1/2  ">
            <div className="absolute     flex h-full  w-full flex-col  items-center overflow-auto rounded-md bg-white p-3  pb-4 ">
              <p className="pt-2 text-2xl font-bold">
                Please choose the main contract to verify
              </p>
              {Object.keys(files).map((contractName, index) => (
                <div
                  key={index}
                  className="mt-7    flex w-3/4 items-center justify-between  rounded-lg border-2 border-gray-100  p-4 "
                >
                  <div className="flex items-center justify-center gap-x-3 ">
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
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F4EBFF]">
                      <SvgFile />
                    </div>
                    <div className="break-all pl-1 text-[#101828]  ">
                      <p className="pr-1 ">{contractName}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div
                onClick={submit}
                className="sticky  bottom-[1%] z-20 mt-4  w-1/5 cursor-pointer rounded-lg  bg-[#7B6FE7] px-4 py-2 text-center text-white "
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
