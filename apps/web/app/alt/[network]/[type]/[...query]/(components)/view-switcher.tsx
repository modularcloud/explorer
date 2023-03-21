import ListViewOn from "./(icons)/ListViewOn";
import ListViewOff from "./(icons)/ListViewOff";
import CardOn from "./(icons)/CardOn";
import CardOff from "./(icons)/CardOff";

type Props = {
  selected: "table" | "cards";
};

export function ViewSwitcher({ selected }: Props) {
  return (
    <div className="flex items-center">
      <div className="h-[34px] w-[34px] p-[7px]">
        {selected === "table" ? <ListViewOn /> : <ListViewOff />}
      </div>
      <div className="mx-1 bg-slate-200 w-px h-5" />
      <div className="h-[34px] w-[34px] p-[7px]">
        {selected === "cards" ? <CardOn /> : <CardOff />}
      </div>
    </div>
  );
}
