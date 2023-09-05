import { Footer } from "~/ui/footer";
import { Search } from "~/ui/search";
import { getSearchOptionGroups } from "~/lib/search-options";
import { ThemeProvider } from "~/app/theme-context-provider";
import { EXPLORER_CONFIG } from "~/config/explorers";

import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: EXPLORER_CONFIG.homepageTitle,
    description: EXPLORER_CONFIG.homepageDescription,
    keywords: EXPLORER_CONFIG.homepageKeywords,
  };
}

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
        <div className="flex flex-col justify-center h-full w-full flex-1 gap-24">
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

export const runtime = "edge";
