import { Footer } from "~/ui/footer";
import { Search } from "~/ui/search";
import { getSearchOptionGroups } from "~/lib/search-options";
import { ThemeProvider } from "~/app/theme-context-provider";

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
      className="min-h-screen flex flex-col justify-between container mx-auto h-full"
      style={{
        backgroundImage: "url(/images/home-layout-vector.svg)",
        backgroundPosition: "top center",
      }}
    >
      <ThemeProvider>
        <div className="flex flex-col justify-center h-full w-full flex-1">
          <section className="flex flex-col gap-8">
            {logo}
            <Search optionGroups={searchOptionGroups} />
          </section>
          <section>{children}</section>
        </div>
      </ThemeProvider>

      <Footer />
    </main>
  );
}
