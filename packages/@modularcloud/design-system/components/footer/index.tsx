export function Footer() {
  return (
    <footer className="flex flex-col justify-evenly text-center absolute bottom-0 border-t h-1/6 p-2">
      <span className="text-slate-900">
        @Copyright 2022. All rights reserved.
      </span>
      <div className="flex flex-row justify-around">
        <a>About</a>
        <a>Terms</a>
        <a>Policy</a>
      </div>
    </footer>
  );
}
