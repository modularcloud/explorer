export default function HomeLogo() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <small className="uppercase text-lg ">THIS FUTURE IS NOW</small>

      <p className="font-logo text-5xl font-bold md:text-6xl">
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
