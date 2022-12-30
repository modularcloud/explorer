import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { Entity } from "service-manager/types/entity.type";
import { getEntity } from "service-manager/types/network.type";
import { ServiceManager } from "../../../../lib/service-manager";

export const getServerSideProps: GetServerSideProps<{
  entity: Entity;
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
  return {
    props: {
      entity,
    },
  };
};

function EntityPage({
  entity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div>
        <div>{`${entity.uniqueIdentifierLabel}: ${entity.uniqueIdentifier}`}</div>
        <div>Associated entities go here</div>
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
