export default function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col justify-between container mx-auto h-full gap-14">
      {children}
    </main>
  );
}

export const runtime = "edge";
