import { Footer } from "~/ui/footer";
import { Search } from "~/ui/search";
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
      className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14"
      style={{
        backgroundImage: "url(/images/home-layout-vector.svg)",
        backgroundPosition: "top center",
      }}
    >
      <div className="flex flex-col justify-center h-full w-full flex-1 gap-24">
        <section className="flex flex-col gap-8">
          {logo}
          <Search optionGroups={searchOptionGroups} />
        </section>
        <section>{children}</section>
      </div>

      <Footer />
    </main>
  );
}
