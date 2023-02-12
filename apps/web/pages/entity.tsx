import { TopBar, Header } from "@modularcloud/design-system"

export default function Entity() {
    return <div>
        <div className="lg:hidden">
            <TopBar />
        </div>
        <Header />
    </div>
}