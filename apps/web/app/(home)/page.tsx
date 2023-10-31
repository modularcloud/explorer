import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect("/celestia-mocha");
}
export const runtime = "edge";
