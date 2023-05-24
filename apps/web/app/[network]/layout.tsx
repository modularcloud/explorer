type Props = {
  children: React.ReactNode;
  rightpanel: React.ReactNode;
};

export default async function EntityLayout({ children, rightpanel }: Props) {
  return (
    <div className="lg:flex">
      <div className="lg:grow bg-[url('/images/glow.svg')] bg-no-repeat bg-center bg-top">
        <div className="relative">{children}</div>
      </div>
      {rightpanel}
    </div>
  );
}

export const dynamic = "force-dynamic";
