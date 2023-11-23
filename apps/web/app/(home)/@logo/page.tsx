import { HeaderBg } from "~/ui/header-bg";

export default function HomeLogo() {
  return (
    <div
      className="flex flex-col gap-8 items-center pt-44"
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": network.config.primaryColor,
      }}
    >
      <HeaderBg className="absolute left-0 top-0 right-0 hidden tab:block z-[-1]" />
      <small className="uppercase text-xs border rounded-full px-3 py-1.5 bg-white">
        THIS FUTURE IS NOW
      </small>

      <p className="font-logo text-5xl font-medium md:text-6xl capitalize">
        <span className="bg-gradient-to-r from-[#191930] via-[#525272] to-[#2C2C43] text-transparent bg-clip-text">
          Modular
        </span>
        <span className="from-royal to-cyan-500 bg-gradient-to-r bg-clip-text text-transparent">
          Cloud
        </span>
      </p>
    </div>
  );
}

export const runtime = "edge";
