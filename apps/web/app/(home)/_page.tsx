import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect("/celestia-mainnet");
}
export const runtime = "edge";
