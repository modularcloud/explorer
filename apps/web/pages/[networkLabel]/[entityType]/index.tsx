import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Entity } from "service-manager/types/entity.type";
import { getEntity } from "service-manager/types/network.type";
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
  let { networkLabel, entityType: searchTerm } = params ?? {};
  if (typeof networkLabel !== "string") {
    throw Error(`Misconfigured parameters: network=${networkLabel}`);
  }

  const searchOptions = await getSearchOptions();
  const defaultNetworkLabel: string = searchOptions[0].options[0].name;

  await loadDynamicNetworks();
  let network = ServiceManager.getNetwork(networkLabel);
  if (!network) {
    networkLabel = defaultNetworkLabel;
    network = ServiceManager.getNetwork(networkLabel);
  }
  let path: any;
  try {
    path = await fetch(
      `${
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      }/api/path/${networkLabel}/${searchTerm}`
    ).then((res) => res.json());
  } catch {}

  if (!path || !path.path || !network) {
    return {
      notFound: true,
    };
  }
  const [_, label, entityType, field, fieldValue] = path.path.split("/");
  const entity = await getEntity(network, entityType, field, fieldValue);
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
