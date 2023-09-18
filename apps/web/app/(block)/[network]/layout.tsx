export default function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Block Layout</h1>

      {children}
    </>
  );
}

export const runtime = "edge";
