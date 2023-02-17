interface Props {
  children?: React.ReactNode;
}

export function Footer({ children }: Props) {
  return (
    <footer className="flex flex-col justify-evenly text-center absolute bottom-0 border-t h-1/6 p-2">
      <span className="text-slate-900">
        &copy; Copyright {new Date().getFullYear()}. All rights reserved.
      </span>
      <div className="flex flex-row justify-around">{children}</div>
    </footer>
  );
}
