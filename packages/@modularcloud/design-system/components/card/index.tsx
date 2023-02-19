import { CircleButton } from "../circle-button";
import { CubesOn, ArrowOn } from "../../icons";
import clsx from "clsx";
import { Badge } from "../badge";

interface Props {
  type: string;
  entries?: Array<[key: string, value: string]>;
  badgeText?: string;
  badgeIcon?: string;
  children?: React.ReactNode;
  navTo?: () => void
}

function renderIcon(icon: string | undefined) {
  switch (icon) {
    case "reward":
      return <ArrowOn />;
    case "pay":
      return <CubesOn />;
  }
}

export function Card({ type, badgeText, badgeIcon, children, navTo }: Props) {
  return (
    <div className="w-full border border-gray-300 shadow-md rounded-lg">
      <div className="px-4 p-2 font-bold bg-gray-100 border-b border-b-gray-300 rounded-t-lg">
        {type}
      </div>
      <div className="p-4">
        {
          navTo ? <div onClick={navTo} className={clsx({ hidden: !badgeText || !badgeIcon })}>
            <CircleButton>
              <div className="flex flex-row space-x-1 items-center p-2.5">
                {renderIcon(badgeIcon)}
                <span className="font-bold">{badgeText}</span>
              </div>
            </CircleButton>
          </div> : <Badge long={true} list={[badgeText ?? "Unknown"]} />
        }
        {children}
      </div>
    </div>
  );
}
