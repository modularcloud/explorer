export function RightPanelLoadingFallback() {
  return (
    <div
      className={
        "h-full lg:h-screen flex flex-col space-y-10 px-6 py-7 lg:px-5 sm:px-9 bg-gray-100 shadow-inner overflow-auto scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
      }
    >
      Loading...
    </div>
  );
}
