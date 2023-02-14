import clsx from "clsx";

interface Props {
  mode: "light" | "dark";
}

export function BigLogo({ mode }: Props) {
  return (
    <div className="text-center">
      <span
        className={clsx("text-slate font-bold", {
          "text-slate": mode === "light",
          "bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent":
            mode === "dark",
        })}
      >
        Modular Cloud
      </span>
      <img
        src={clsx({
          "images/CelestiaScan-logo.png": mode === "light",
          "images/CelestiaScan-logo-dark.png": mode === "dark",
        })}
        className="w-[220px] sm:w-[300px] mt-5"
      />
    </div>
  );
}
