import { notFound, redirect } from "next/navigation";
import { PageArchetype } from "~/ecs/archetypes/page";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import { getSingleNetworkCached } from "~/lib/network";
import { isAddress, isHash, isHeight } from "~/lib/search";

import type { FetchLoadArgs } from "~/lib/utils";

interface Props {
  params: FetchLoadArgs;
}
export default function Page({ params: { network, type, query } }: Props) {
  return <h1 className="text-xl font-bold">{`${network}/${type}/${query}`}</h1>;
}

export async function generateMetadata(props: Props) {
  if (props.params.type === "search") {
    // automatically redirect to block/address/hash if the format of the query matches
    const isTransactionQuery = isHash(props.params.query);
    const isAddressQuery = isAddress(props.params.query);
    const isBlockQuery = isHeight(props.params.query);

    if (isTransactionQuery) {
      redirect(`/${props.params.network}/transaction/${props.params.query}`);
    } else if (isAddressQuery) {
      redirect(`/${props.params.network}/address/${props.params.query}`);
    } else if (isBlockQuery) {
      redirect(`/${props.params.network}/block/${props.params.query}`);
    }
  }

  const network = await getSingleNetworkCached(props.params.network);

  if (!network) notFound();

  const entity = await asyncUseEntity({
    resourcePath: props.params,
    archetype: PageArchetype,
  });

  if (!entity) notFound();

  return {
    title: `${entity.components.page.data.metadata.title} - ModularCloud`,
    description: entity.components.page.data.metadata.description,
    keywords: entity.components.page.data.metadata.keywords,
  };
}
