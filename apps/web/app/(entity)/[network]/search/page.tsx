import { notFound, redirect } from "next/navigation";
import { search } from "~/lib/headless-utils";

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
  const redirectPath = await search(params.network, searchParams?.q);

  if (redirectPath) {
    redirect(`/${params.network}/${redirectPath.join("/")}`);
  } else {
    notFound();
  }
}
export const runtime = "edge";
