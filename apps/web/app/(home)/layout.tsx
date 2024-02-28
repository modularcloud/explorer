import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";
import { Footer } from "~/ui/footer";
import { SearchForm } from "~/ui/search/search-form";
import { Header } from "~/ui/header";

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
      className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14 px-5 tab:px-8 py-4 tab:py-6"
    >
      <HomeBg className="absolute left-0 top-0 right-0 hidden tab:block z-[-1]" />
      <HomeBgMobile className="absolute left-0 top-0 right-0 tab:hidden block z-[-1]" />

      <Header />

      {/* <section>{children}</section> */}
    </main>
    // <main
    //   id="main-content"
    //   tabIndex={0}
    //   className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14 px-5 tab:px-8"
    // >
    //   <div className="flex flex-col justify-center h-full w-full flex-1 gap-24">
    //     <section className="flex flex-col gap-8">
    //       {logo}
    //       <SearchForm />
    //     </section>
    //     <section>{children}</section>
    //   </div>

    //   <Footer />
    // </main>
  );
}
