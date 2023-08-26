// import { getWhitelabel } from "~/lib/utils";

export async function BigLogo() {
  // TODO : to remove
  // const whitelabel = await getWhitelabel();
  return (
    <div className="text-night text-center">
      <span>Explorer</span>
      <div className="font-logo text-[2.5rem] font-[700] leading-[3rem] tracking-[-0.01em]">
        {/* {whitelabel.name[0]} */}
        Modular
        {/* {whitelabel.name[1] ? ( */}
        <span className="from-ocean to-royal bg-gradient-to-r bg-clip-text text-transparent">
          {/* {whitelabel.name[1]} */}
          Cloud
        </span>
        {/* ) : null} */}
      </div>
    </div>
  );
}
