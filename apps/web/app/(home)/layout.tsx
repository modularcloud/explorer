import { Footer } from "~/ui/footer";
import { SearchForm } from "~/ui/search/search-form";
import { getSearchOptionGroups } from "~/lib/search-options";

export default async function HomeLayout({
  children,
  logo,
}: {
  logo: React.ReactNode;
  children: React.ReactNode;
}) {
  const searchOptionGroups = await getSearchOptionGroups();

  return (
    <main
      id="main-content"
      tabIndex={0}
      className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14"
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
