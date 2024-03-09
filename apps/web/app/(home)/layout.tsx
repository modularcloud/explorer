import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";
import { Footer } from "~/ui/footer";
import { Header } from "~/ui/header";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="main-content"
      tabIndex={0}
      className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-4 tab:gap-6 px-5 tab:px-8 py-4 tab:py-6"
    >
      <HomeBg className="absolute left-0 top-0 right-0 hidden tab:block z-[-1]" />
      <HomeBgMobile className="absolute left-0 top-0 right-0 tab:hidden block z-[-1]" />

      <Header />

      <div>{children}</div>

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
