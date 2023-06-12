export default function RightPanelLoadingFallback() {
  return (
    <div
      className={
        "scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full sticky top-0 flex hidden h-full w-80 flex-col space-y-10 overflow-auto bg-gray-100 px-6 py-7 shadow-inner sm:px-9 lg:flex lg:h-screen lg:px-5 xl:w-[27.875rem]"
      }
    >
      Loading...
    </div>
  );
}
