import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import { loadPage, HeadlessRoute, search } from "~/lib/headless-utils";
import { Table } from "~/ui/entity/table";
import { capitalize, parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import { notFound, redirect } from "next/navigation";
import { getSingleNetworkCached } from "~/lib/network";

// TODO : This is a temporary workaround
// export async function generateMetadata({ params }: { params: HeadlessRoute }) {
//   const pathParams = parseHeadlessRouteVercelFix(params);

//   if (pathParams.path[0] === "search") {
//     const query = pathParams.path[1];
//     return {
//       title: `Searching for ${query}`,
//     };
//   }

//   const { metadata } = await loadPage({ route: params });
//   return {
//     title: metadata.title,
//     description: metadata.description,
//   };
// }

export async function generateMetadata({
  params: _params,
}: {
  params: HeadlessRoute;
}) {
  const params = parseHeadlessRouteVercelFix(_params);
  if (params.path[0] === "search") {
    const query = params.path[1];
    return {
      title: `Searching for ${query}`,
    };
  }
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    return {};
  }

  // Special cases
  if (
    params.path.length === 1 &&
    (params.path[0] === "transactions" || params.path[0] === "blocks")
  ) {
    return {
      title: `Latest ${capitalize(params.path[0])} on ${network.chainBrand} ${
        network.chainName
      }`,
    };
  }

  function shortenId(str: string) {
    if (str.length < 12) {
      return str;
    }
    if (str.match(/^(?:[0-9]+\.){3}[0-9]+$/)) {
      return str.substring(0, 12) + "...";
    }
    return str.slice(0, 6) + "..." + str.slice(-6);
  }

  const pluralToSingular: Record<string, string> = {
    addressess: "address",
  };

  function formatTypeName(str: string) {
    let mappedSingular = pluralToSingular[str.toLowerCase()];
    if (mappedSingular) {
      return capitalize(mappedSingular);
    }
    if (str.endsWith("s")) {
      return capitalize(str.slice(0, -1));
    }
    return capitalize(str);
  }

  let titleParts = [];
  let descriptionParts = [];
  for (let i = 0; i < params.path.length; i += 2) {
    const type = params.path[i];
    const id = params.path[i + 1];

    if (!id) {
      titleParts.unshift(capitalize(type));
      descriptionParts.unshift(capitalize(type));
      break;
    }

    titleParts.unshift(`${formatTypeName(type)} ${shortenId(id)}`);
    descriptionParts.unshift(`${formatTypeName(type)} ${id}`);
  }

  return {
    title: `${titleParts.join(" - ")} - ${capitalize(
      network.chainBrand,
    )} ${capitalize(network.chainName)}`,
    description: `${descriptionParts.join(" in ")} on ${capitalize(
      network.chainBrand,
    )} ${capitalize(network.chainName)}, brought to you by Modular Cloud.`,
  };
}

export default function EntityPage({ params }: { params: HeadlessRoute }) {
  const pathParams = parseHeadlessRouteVercelFix(params);

  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={pathParams} />
    </React.Suspense>
  );
}

async function AyncPageContent({ params }: { params: HeadlessRoute }) {
  const entityType = params.path[0];

  if (entityType === "search") {
    const query = params.path[1];
    const redirectPath = await search(params.network, query);

    if (redirectPath) {
      redirect(`/${params.network}/${redirectPath.join("/")}`);
    } else {
      notFound();
    }
  }

  try {
    const page = await loadPage({ route: params });

    if (page.body.type === "notebook") {
      return <Overview properties={page.body.properties} isIBC={page.isIBC} />;
    }

    return <Table initialData={page} route={params} />;
  } catch (error) {
    notFound();
  }
}
