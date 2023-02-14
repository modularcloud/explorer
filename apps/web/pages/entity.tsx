import { TopBar, Header, Table } from "@modularcloud/design-system"

export default function Entity() {
    return <div>
        <div className="lg:hidden">
            <TopBar />
        </div>
        <Header />
        <Table />
    </div>
}