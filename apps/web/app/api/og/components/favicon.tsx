import { MCLogo } from "./mc-logo";

export type FaviconProps = {
  networkBrandGradient: string;
};

export function Favicon({ networkBrandGradient }: FaviconProps) {
  console.log({
    bgImage: networkBrandGradient,
  });
  return (
    <div
      tw="rounded-lg p-2 flex items-center justify-center"
      className="rounded-lg p-2 flex items-center justify-center"
      style={{
        backgroundImage: networkBrandGradient.replaceAll(";", ""),
      }}
    >
      <MCLogo
        style={{
          width: "16px",
          height: "16px",
        }}
      />
    </div>
  );
}
