export function forceLength(
  str: string,
  len: number,
  strategy: "middle" | "end" = "middle",
) {
  const MIN = 4;
  const diff = str.length - len;
  if (diff > 0) {
    if (strategy === "end") {
      let shortend = str.slice(0, len - 1);
      if (len < MIN) {
        shortend = str.slice(0, MIN);
      }
      return shortend + "...";
    }
    if (strategy === "middle") {
      const midpoint = Math.floor(str.length / 2);
      const removal = Math.floor(diff / 2);
      let start = str.slice(0, midpoint - removal);
      let end = str.slice(midpoint + removal);
      if (start.length + end.length < MIN) {
        start = str.slice(0, MIN);
        end = str.slice(-MIN);
      }
      return start + "..." + end;
    }
  }
  return str;
}

export function LongVal({
  value,
  max,
  step,
  strategy,
}: {
  value: string;
  max: number;
  step: number;
  strategy?: "middle" | "end";
}) {
  const UI_MAX = 80;
  max = Math.min(max, UI_MAX);
  return (
    <>
      <div className="hidden 2xl:block">
        {forceLength(value, UI_MAX, strategy)}
      </div>
      <div className="hidden xl:block 2xl:hidden">
        {forceLength(value, max, strategy)}
      </div>
      <div className="hidden lg:block xl:hidden">
        {forceLength(value, max - step, strategy)}
      </div>
      <div className="hidden md:block lg:hidden">
        {forceLength(value, max - step * 2, strategy)}
      </div>
      <div className="hidden sm:block md:hidden">
        {forceLength(value, max - step * 3, strategy)}
      </div>
      <div className="xs:block hidden sm:hidden">
        {forceLength(value, max - step * 4, strategy)}
      </div>
      <div className="xs:hidden">
        {forceLength(value, max - step * 5, strategy)}
      </div>
    </>
  );
}
