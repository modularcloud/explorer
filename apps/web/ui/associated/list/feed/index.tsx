interface Props {
  children: React.ReactNode;
}

// Tailwind hates this :(
const paddingStyle = {
  paddingTop: "4.25rem",
};

export function FeedList({ children }: Props) {
  return (
    <div style={paddingStyle} className="w-full">
      <div className="flex flex-col space-y-6 w-full p-6 sm:p-8 md:px-12 items-center">
        {children}
      </div>
    </div>
  );
}
