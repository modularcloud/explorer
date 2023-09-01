import { Footer } from "~/ui/footer";
import { Search } from "~/ui/search";

export default function HomePageLayout({
  children,
  logo,
}: {
  logo: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen flex flex-col justify-between container mx-auto"
      style={{
        backgroundImage: "url(/images/home-layout-vector.svg)",
      }}
    >
      <div>
        {logo}
        {/* <Search /> */}
        {children}
      </div>

      <Footer />
    </main>
  );
}
