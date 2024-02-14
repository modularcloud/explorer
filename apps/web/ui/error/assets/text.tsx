type Props = {
    title: string;
    subtitle: string;
    type: "working" | "warning" | "error";
};
export function Text({ type, subtitle, title }: Props) {
  return (
    <div className="pt-4">
      <div className="text-[#818898] text-xs">{subtitle}</div>
      <div className="text-[#272835] text-sm h-7 flex items-center justify-center">
        {title}
      </div>
      { type === "working" ? <div className="text-[#40C4AA] text-xs">Working</div> : null }
        { type === "warning" ? <div className="text-[#FFBE4C] text-xs">Warning</div> : null }
        { type === "error" ? <div className="text-[#DF1C41] text-xs">Error</div> : null }
    </div>
  );
}
