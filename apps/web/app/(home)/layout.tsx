import { Footer } from "~/ui/footer";
import { Search } from "~/ui/search";

export default function HomePageLayout({
  children,
  search,
}: {
  search: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen flex flex-col justify-between container mx-auto"
      style={{
        backgroundImage: "url(/images/home-layout-vector.svg)",
        backgroundPosition: "top center",
      }}
    >
      <div>
        {search}
        {children}
      </div>

      <Footer />
    </main>
  );
}
