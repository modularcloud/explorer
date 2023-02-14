import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { Entity } from "service-manager/types/entity.type";
import { getEntities, getEntity } from "service-manager/types/network.type";
import { ServiceManager } from "../../../../lib/service-manager";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  TopBar,
  Header,
  RightPanel,
  EntityDetails,
  SearchInput,
  KeyValueList,
  Card,
  CardList,
  Table,
} from "@modularcloud/design-system";

import { CubesOff } from "@modularcloud/design-system";

const entryLabels = [
  "Chain ID",
  "Transactions",
  "Height",
  "Block time",
  "Block time",
  "Gas (used/wanted)",
  "Block Round",
  "Transactions",
];

const entriesData: [string, string][] = [
  ["1212", "Mamaki 5411"],
  ["2323", "4"],
  ["3434", "245588"],
  ["4545", "245588"],
  ["5656", "Oct 1, 2022 at 4:09:00 PM"],
  ["6767", "8.09/19.98"],
  ["7878", "1225"],
  ["8989", "Liam Scales"],
];

const transactionLabels = [
  "Index",
  "Chain ID",
  "Height",
  "Status",
  "Block time",
  "Time",
  "Fee",
  "Gas",
  "Messages",
];

const transactionData: [string, string][] = [
  ["ffv", "1"],
  ["aee", "Mamaki"],
  ["vbx", "245588"],
  ["wef", "Failure"],
  ["ghf", "Oct 1, 2022 at 4:09:00 PM"],
  ["qqw", "8.09/19.98"],
  ["qwe", "1225"],
  ["sdf", "4"],
];

const dataGroups = [
  {
    label: "Celestia",
    options: [
      {
        name: "Mamaki",
        value: "MMK",
      },
      {
        name: "Mocha",
        value: "MCA",
      },
      {
        name: "Arabic",
        value: "ARB",
      },
    ],
  },
];

interface PanelProps {
  classes: string;
  type: string,
  id: string,
  metadata: { [key: string]: string }
}

const EntityPanel = ({ classes, type, id, metadata }: PanelProps) => (
  <RightPanel className={classes}>
    <EntityDetails
      iconType={<CubesOff />}
      type={type}
      hash={id}
    />
    <KeyValueList
      header="Block Information"
      entryLabels={Object.keys(metadata)}
      entries={Object.entries(metadata)}
    />
  </RightPanel>
);

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
  const [selectedItem, setSelectedItem] = useState(
    dataGroups[0].options[0].value
  );
  const [view, setView] = useState("table");

  const handleSelect = (selectedItem: React.SetStateAction<string>) => {
    console.log(selectedItem);
    setSelectedItem(selectedItem);
  };

  return (
    <div className="flex">
      <div className="grow">
        <div className="lg:hidden">
          <TopBar type={entity.context.entityTypeName} id={entity.uniqueIdentifier} />
        </div>
        <Header
          searchInput={
            <SearchInput
              mode="light"
              placeholder="Go to hash or height"
              optionGroups={dataGroups}
              selectedItem={selectedItem}
              selectHandler={handleSelect}
            />
          }
          panelContent={<EntityPanel classes="flex lg:hidden" type={entity.context.entityTypeName} id={entity.uniqueIdentifier} metadata={entity.metadata} />}
          onSwitchView={(view: string) => setView(view)}
        />
        { view === "cards" ? <CardList>
          <Card type="Transaction" badgeText="Get Reward" badgeIcon="reward">
            <KeyValueList
              entryLabels={transactionLabels}
              entries={transactionData}
            />
          </Card>
        </CardList> : null }
        { view === "table" ? <Table /> : null }
      </div>
      <EntityPanel classes="sticky top-0 hidden lg:flex" type={entity.context.entityTypeName} id={entity.uniqueIdentifier} metadata={entity.metadata} />
    </div>
  );
}

export default EntityPage;
