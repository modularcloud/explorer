import { getWhitelabel } from "../../lib/utils";

export async function BigLogo() {
  const whitelabel = await getWhitelabel();
  return (
    <div className="text-center text-night">
      <span>{whitelabel.subText ?? "Modular Cloud"}</span>
      <div className="font-logo font-[700] text-[2.5rem] leading-[3rem] tracking-[-0.01em]">
        {whitelabel.name[0]}
        {whitelabel.name[1] ? (
          <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">
            {whitelabel.name[1]}
          </span>
        ) : null}
      </div>
    </div>
  );
}
