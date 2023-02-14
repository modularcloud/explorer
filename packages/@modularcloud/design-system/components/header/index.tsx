import { CircleButton } from "../circle-button";
import { ViewSwitcher } from "../view-switcher";
import { RightSidebarOff, SearchOff } from "../../icons";

// TODO: fix padding
export function Header() {
    return (
        <div className="h-[4.25rem] flex flex-col">
            <div className="flex-grow pb-px flex justify-between items-center px-4 sm:px-6 lg:px-8">
                <div className="text-[1.125rem] font-medium">CelestiaScan</div>
                <div className="flex gap-6 items-center">
                    <ViewSwitcher />
                    <div className="flex gap-4 items-center lg:hidden">
                        <CircleButton><SearchOff/></CircleButton>
                        <CircleButton><RightSidebarOff/></CircleButton>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-night opacity-[.04]"></div>
        </div>
    )
}