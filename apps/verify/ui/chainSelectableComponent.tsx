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
              : "tab:w-3/5 mt-2 flex w-full  items-center justify-between rounded-md border-2  p-2"
          }
        >
          <Select.Value>{selectedChainName}</Select.Value>
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport className="absolute top-10 max-h-80 w-full cursor-pointer overflow-hidden px-2    ">
              {data.map((item, index) => (
                <Select.Item
                  className={`relative  z-10 mx-2 w-full rounded-md  !border-none bg-white p-2 !outline-none hover:bg-gray-50 ${inter.variable} font-sans `}
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
