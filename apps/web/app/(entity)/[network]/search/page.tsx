import { notFound, redirect } from "next/navigation";

export default async function SearchRedirectPage({
  searchParams,
  params,
}: {
  searchParams?: { q?: string };
  params: { network: string };
}) {
  if (!searchParams?.q) {
    notFound();
  }
  redirect(`./search/${searchParams.q}`);
}
export const runtime = "edge";
