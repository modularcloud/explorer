import { Header } from "~/ui/header";

export default function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col h-full">
      <Header />
      {children}
    </main>
  );
}

export const runtime = "edge";
