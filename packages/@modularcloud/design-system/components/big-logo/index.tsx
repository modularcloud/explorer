import clsx from "clsx";

interface Props {
  mode: "light" | "dark";
  whitelabel?: string;
}

export function BigLogo({ mode, whitelabel }: Props) {
  let name = "Explorer";
  if(whitelabel === "celestia") {
    name = "CelestiaScan";
  }
  if(whitelabel === "dymension") {
    name = "DymScan"
  }
  return (
    <div className="text-center">
      <span
        className={clsx("text-slate font-medium", {
          "text-slate": mode === "light",
          "bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent":
            mode === "dark",
        })}
      >
        Modular Cloud
      </span>
      <div className="font-logo font-[700] text-[2.5rem] leading-[3rem]">{name}</div>
    </div>
  );
}
