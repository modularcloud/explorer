import { Browser } from "./assets/browser";
import { Cloud } from "./assets/cloud";
import { Connection } from "./assets/connection";
import { Remote } from "./assets/remote";

export function ErrorBox() {
  return (
      <div className="flex tab:gap-[1.38rem] gap-4 tab:flex-row flex-col max-tab:items-center">
        <Browser type="working" />
        <Connection />
        <Cloud type="warning" />
        <Connection />
        <Remote type="error" />
      </div>
  );
}
