export function Card() {
  const entryLabels = [
    "Index",
    "Chain ID",
    "Height",
    "Status",
    "Time",
    "Fee",
    "Gas (used/wanted)",
    "Messages",
  ];
  const entryData = [
    "Chain ID",
    "Transactions",
    "Height",
    "Block time",
    "Block time",
    "Gas (used/wanted)",
    "Block Round",
    "Transactions",
  ];

  return (
    <div className="border shadow-md rounded-lg">
      <div className="bg-slate-100">Transaction</div>
      <div></div>
    </div>
  );
}
