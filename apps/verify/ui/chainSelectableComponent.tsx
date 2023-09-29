import React, { useState, CSSProperties } from "react";
import * as Select from "@radix-ui/react-select";
import ClipLoader from "react-spinners/ClipLoader";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const override: CSSProperties = {
  borderColor: "#2753bb",
  margin: 0,
};

interface SelectableComponentProps {
  onSelectionChange: (value: string) => void;
}
type Chain = {
  //this is temporary
  name: string;
  chainId: number;
};
const SelectableComponent: React.FC<SelectableComponentProps> = ({
  onSelectionChange,
}) => {
  const [data, setData] = useState<Chain[]>([
    {
      // This is temporary we will retrieve the data from api later
      name: "Nautilus Mainnet",
      chainId: 22222,
    },
    {
      name: "Nautilus Proteus Testnet",
      chainId: 88002,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedChainName, setSelectedChainName] = useState(data[0].name);
  const chainList = [
    {
      // This is temporary we will retrieve the data from api later
      name: "Nautilus Mainnet",
      chainId: 22222,
    },
    {
      name: "Nautilus Proteus Testnet",
      chainId: 88002,
    },
  ];


  const handleSelection = (selectedValue: string) => {
    onSelectionChange(selectedValue);
    const selectedChain = chainList.find(
      (chain) => chain.chainId === Number(selectedValue),
    );
    if (selectedChain) {
      setSelectedChainName(selectedChain.name);
    }
  };

  return (
    <div className="flex">
      <Select.Root onValueChange={handleSelection}>
        <Select.Trigger
          className={
            loading
              ? "hidden"
              : "rounded-md mt-2 w-full p-2  flex justify-between items-center border-2  md:w-3/5"
          }
        >
          <Select.Value>{selectedChainName}</Select.Value>
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport className="px-2 overflow-hidden max-h-80 cursor-pointer absolute top-10 w-full    ">
              {data.map((item, index) => (
                <Select.Item
                  className={`z-10  bg-white p-2 relative w-full  rounded-md mx-2 hover:bg-gray-50 !border-none !outline-none ${inter.variable} font-sans `} 
                  key={index}
                  value={item.chainId.toString()}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <ClipLoader
        color="#2753bb"
        loading={loading}
        cssOverride={override}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default SelectableComponent;
