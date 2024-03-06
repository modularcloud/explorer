import { Footer } from "~/ui/footer";
import { SearchForm } from "~/ui/search/search-form";

export default async function HomeLayout({
  children,
  logo,
}: {
  logo: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main
      id="main-content"
      tabIndex={0}
      className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14 px-5 tab:px-8"
    >
      <div className="flex flex-col justify-center h-full w-full flex-1 gap-24">
        <section className="flex flex-col gap-8">
          {logo}
          <SearchForm />
        </section>
        <section>{children}</section>
      </div>

      <Footer />
      {/*
        this fixes a weird issue with safari scrolling to a section instead of the top of the page, 
        this workaround has been copied from here : https://github.com/algolia/docsearch/issues/1260#issuecomment-1011939736
        idk exactly why this happens or why it works, but hey it works so... 🤷‍♂️
       */}
      <div className="!fixed">
        <input type="text" className="sr-only" aria-hidden="true" />
      </div>
    </main>
  );
}
