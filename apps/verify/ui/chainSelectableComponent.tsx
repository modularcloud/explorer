import React, { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [data, setData] = useState<Chain[]>([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chainList = [
          {
            // This is temporary we will retrieve the data from api later
            name: "Nautilus Proteus Testnet",
            chainId: 88002,
          },
        ];
        setData(chainList);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange(event.target.value);
  };

  return (
    <div className="flex">
      <select
        onChange={handleSelection}
        className={
          loading
            ? "hidden"
            : "rounded-md  mx-1 pl-1  flex justify-center items-center border-2 border-[#2753bb] border-solid"
        }
      >
        {data.map((item, index) => (
          <option key={index} value={item.chainId}>
            {item.name}
          </option>
        ))}
      </select>
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
