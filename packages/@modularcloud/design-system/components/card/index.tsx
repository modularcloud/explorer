import { Badge } from "../badge";

interface Props {
  type: string;
  entries?: Array<[key: string, value: string]>;
  badgeText?: string;
  badgeIcon?: string;
  children?: React.ReactNode;
  navTo?: () => void;
}

export function Card({ type, badgeText, badgeIcon, children, navTo }: Props) {
  return (
    <div className="w-full border border-gray-300 shadow-md rounded-lg">
      <div className="px-4 p-2 font-bold bg-gray-100 border-b border-b-gray-300 rounded-t-lg">
        {type}
      </div>
      <div className="p-4">
        <div onClick={navTo} className="cursor-pointer">
          <Badge icon={true} long={true} list={[badgeText ?? "Unknown"]} />
        </div>
        {children}
      </div>
    </div>
  );
}
