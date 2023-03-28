import clsx from "clsx";

interface Props {
  mode: "light" | "dark";
  name?: string;
}

export function BigLogo({ name = "Explorer" }: Props) {
  let match: RegExpMatchArray | null = name.match(/^(\w+)Scan$/);
  return (
    <div className="text-center text-night">
      <span>Modular Cloud</span>
      <div className="font-logo font-[700] text-[2.5rem] leading-[3rem] tracking-[-0.01em]">
        {match ? match[1] : name}
        {match ? (
          <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">
            Scan
          </span>
        ) : null}
      </div>
    </div>
  );
}
