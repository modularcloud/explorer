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
      <div className="flex w-full flex-col items-center space-y-6 p-6 sm:p-8 md:px-12">
        {children}
      </div>
    </div>
  );
}
