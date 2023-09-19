import { notFound, redirect } from "next/navigation";

export default async function SearchRedirectPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  // In case of the form submission without JS enabled
  if (searchParams?.search) {
    redirect(`/search/${encodeURIComponent(searchParams?.search)}`);
  } else {
    notFound();
  }
}
export const runtime = "edge";
