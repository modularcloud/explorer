import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { Entity } from "service-manager/types/entity.type";
import { getEntities, getEntity } from "service-manager/types/network.type";
import { Table } from "@modularcloud/design-system";
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
    <div className="bg-bg-50 h-screen flex flex-col">
      <div className="grow flex">
        {/** Main */}
        <div className="grow">
          {/** Body */}
          <div>{`${entity.uniqueIdentifierLabel}: ${entity.uniqueIdentifier}`}</div>
          <Table data={associated} onRowClick={handleTableRowClick} />
        </div>
        <div className="w-96 p-8 border-l border-l-main-100 truncate flex flex-col">
          {/** Right Sidebar */}
          {Object.entries(entity.metadata).map((entry) => (
            <div className="flex justify-between" key={entry[0]}><span className="font-bold">{entry[0]}</span> <span className="truncate w-1/3 text-right">{entry[1]}</span></div>
          ))}
        </div>
      </div>
      <div className="flex w-full border-t border-t-main-100 items-center justify-between h-24 px-14">
        { /** Footer */}
        <span>Copyright 2023 Modular Cloud</span>
        <ul className="flex">
          <li>About Us</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </div>
  );
}

export default EntityPage;
