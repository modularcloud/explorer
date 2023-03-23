import * as React from "react";
import { Badge } from "../badge";

export function Tabs({ list, activeTab, setActiveTab }: { list: string[], setActiveTab: (index: number) => void, activeTab: number }) {

  function handleClick(index: number) {
    setActiveTab(index);
  }

  return (
    list.length > 1 ? <div className="bg-gradient-to-t from-white to-transparent flex items-center fixed bottom-0 w-full gap-3 p-6 font-semibold">
      {list.map((item, index) => (
        <div key={index} className="cursor-pointer" onClick={() => handleClick(index)}>
          <Badge list={[item]} toggled={index === activeTab} />
        </div>
      ))}
    </div> : null
  );
}
