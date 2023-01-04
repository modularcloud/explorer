import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { Entity } from "service-manager/types/entity.type";
import { getEntities, getEntity } from "service-manager/types/network.type";
import { Table } from "../../../../../../packages/design-system";
import { ServiceManager } from "../../../../lib/service-manager";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  entity: Entity;
  associated: Entity[];
}> = async ({ params }) => {
  const { networkLabel, entityType, field, fieldValue } = params ?? {};
  if (
    typeof networkLabel !== "string" ||
    typeof entityType !== "string" ||
    typeof field !== "string" ||
    typeof fieldValue !== "string"
  ) {
    throw Error(
      `Misconfigured parameters: network=${networkLabel}, entityType=${entityType}, field=${field}. fieldValue=${fieldValue}`
    );
  }

  const network = ServiceManager.getNetwork(networkLabel);
  if (!network) {
    return {
      notFound: true,
    };
  }

  const entity = await getEntity(network, entityType, field, fieldValue);
  if (!entity) {
    return {
      notFound: true,
    };
  }

  // temporary
  const associated: Entity[] = [];
  if (entityType.toLowerCase() === "block") {
    associated.push(
      ...(await getEntities(
        network,
        "transaction",
        "height",
        entity.metadata["Height"]
      ))
    );
  }

  return {
    props: {
      entity,
      associated,
    },
  };
};

function EntityPage({
  entity,
  associated,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const handleTableRowClick = (row: Entity) => {
    router.push({
      pathname: "/[networkLabel]/[entityType]/[field]/[fieldValue]",
      query: {
        networkLabel: row.context.network,
        entityType: row.context.entityTypeName,
        field: "hash", // TODO: get table layour from entity
        fieldValue: row.uniqueIdentifier,
      },
    });
  };
  return (
    <div>
      <div>
        <div>{`${entity.uniqueIdentifierLabel}: ${entity.uniqueIdentifier}`}</div>
        <Table data={associated} onRowClick={handleTableRowClick} />
        <code>{entity.raw}</code>
      </div>
      <div>
        {Object.entries(entity.metadata).map((entry) => (
          <li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
        ))}
      </div>
    </div>
  );
}

export default EntityPage;
