import clsx from "clsx";

interface Props {
  mode: "light" | "dark";
  name?: string;
}

export function BigLogo({ mode, name = "Explorer" }: Props) {
  let match: RegExpMatchArray | null = name.match(/^(\w+)Scan$/);
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
      <div className="font-logo font-[700] text-[2.5rem] leading-[3rem]">{ match ? match[1] : name }{match ? <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">Scan</span> : null}</div>
    </div>
  );
}
