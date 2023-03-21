import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Entity } from "service-manager/types/entity.type";
import { getEntity } from "service-manager/types/network.type";
import { isAddress, isHash } from "../../../lib/search";
import { getSearchOptions } from "../../../lib/search-options";
import {
  loadDynamicNetworks,
  ServiceManager,
} from "../../../lib/service-manager";
import { Whitelabel } from "../../../lib/whitelabel";
import { EntityPage } from "../../../pages/[networkLabel]/[entityType]/[field]/[fieldValue]";

export const getServerSideProps: GetServerSideProps<{
  entity: Entity;
  whitelabel?: string | null;
  searchOptions: any;
}> = async ({ params }) => {
  let { networkLabel: type, entityType: searchTerm } = params ?? {};
  if (typeof type !== "string" || typeof searchTerm !== "string") {
    throw Error(`Misconfigured parameters: Type=${type}, SearchTerm=${searchTerm}`);
  }

  const searchOptions = await getSearchOptions();
  const defaultNetworkLabel: string = searchOptions[0].options[0].name;

  await loadDynamicNetworks();
  let network = ServiceManager.getNetwork(defaultNetworkLabel);
  if (!network) {
    throw Error(`Network not found: ${defaultNetworkLabel}. Explorer is probably misconfigured.`);
  }

  const ENTITY_TYPE_NAME_MAP: Record<string, string> = {
    "tx": "transaction",
    "contract": "account",
    "address": "account",
  }

  let entityType = ENTITY_TYPE_NAME_MAP[type.toLowerCase()] || type;

  let field = "height";
  if(isHash(searchTerm)) {
    field = "hash";
  }
  if(isAddress(searchTerm)) {
    field = "address";
  }

  const entity = await getEntity(network, entityType, field, searchTerm);
  if (!entity) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      entity,
      whitelabel: Whitelabel,
      searchOptions: await getSearchOptions(),
    },
  };
};

/*export default function SearchPage({
  entity,
  whitelabel,
  searchOptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <EntityPage
      entity={entity}
      whitelabel={whitelabel}
      searchOptions={searchOptions}
    />
  );
}*/
export default EntityPage;
