import { Footer } from "~/ui/footer";
import { SearchForm } from "~/ui/search/search-form";
import { getGroupedNetworkChains } from "~/lib/grouped-network-chains";

export default async function HomeLayout({
  children,
  logo,
}: {
  logo: React.ReactNode;
  children: React.ReactNode;
}) {
  const date = new Date().getTime();
  console.time(`[${date}] \`getGroupedNetworkChains()\` from HomeLayout`);
  const searchOptionGroups = await getGroupedNetworkChains();
  console.timeEnd(`[${date}] \`getGroupedNetworkChains()\` from HomeLayout`);

  return (
    <main
      id="main-content"
      tabIndex={0}
      className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14 px-5 tab:px-8"
    >
      <div className="flex flex-col justify-center h-full w-full flex-1 gap-24">
        <section className="flex flex-col gap-8">
          {logo}
          <SearchForm optionGroups={searchOptionGroups} />
        </section>
        <section>{children}</section>
      </div>

      <Footer />
    </main>
  );
}
