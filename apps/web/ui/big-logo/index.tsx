import { getWhitelabel } from "~/lib/utils";

export async function BigLogo() {
  const whitelabel = await getWhitelabel();
  return (
    <div className="text-night text-center">
      <span>{whitelabel.subText ?? "Modular Cloud"}</span>
      <div className="font-logo text-[2.5rem] font-[700] leading-[3rem] tracking-[-0.01em]">
        {whitelabel.name[0]}
        {whitelabel.name[1] ? (
          <span className="from-ocean to-royal bg-gradient-to-r bg-clip-text text-transparent">
            {whitelabel.name[1]}
          </span>
        ) : null}
      </div>
    </div>
  );
}
