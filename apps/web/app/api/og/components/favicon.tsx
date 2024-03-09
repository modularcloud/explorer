import { MCLogo } from "~/ui/mc-logo";

export type FaviconProps = {
  networkBrandGradient: string;
};

export function Favicon({ networkBrandGradient }: FaviconProps) {
  return (
    <div
      tw="rounded-md p-2 flex items-center justify-center"
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
