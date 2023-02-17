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
import Image from "next/image";

import { CubesOff } from "@modularcloud/design-system";
import { SearchOptions } from "../../../../lib/search-options";
import { Whitelabel } from "../../../../lib/whitelabel";
import { isSearchable } from "../../../../lib/search";
import Link from "next/link";

interface PanelProps {
  classes: string;
  id: string,
  metadata: { [key: string]: string },
  context: {
    network: string,
    entityTypeName: string
  }
}

const EntityPanel = ({ classes, id, metadata, context }: PanelProps) => (
  <RightPanel className={classes}>
    <EntityDetails
      iconType={<CubesOff />}
      type={context.entityTypeName}
      hash={id}
      network={context.network}
    />
    <KeyValueList
      header={`${context.entityTypeName} Information`}
      entryLabels={Object.keys(metadata)}
      entries={Object.entries(metadata)}
    />
  </RightPanel>
);

export const getServerSideProps: GetServerSideProps<{
  entity: Entity;
  associated: Entity[];
  whitelabel?: string;
  searchOptions: any
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

  if (entity.computed.Messages) {
    associated.push(...entity.computed.Messages);
  }

  return {
    props: {
      entity,
      associated,
      whitelabel: Whitelabel,
      searchOptions: SearchOptions
    },
  };
};

function EntityPage({
  entity,
  associated,
  whitelabel,
  searchOptions
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mode = "light";
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const [view, setView] = useState(
    entity.context.entityTypeName === "Transaction" || associated.length < 3
      ? "cards"
      : "table"
  );

  let name = "Explorer";
  if(whitelabel === "celestia") {
    name = "Celestia";
  }
  if(whitelabel === "dymension") {
    name = "Dym"
  }

  return (
    <div className="flex">
      <div className="grow">
        <div className="lg:hidden">
          <TopBar
            type={entity.context.entityTypeName}
            id={entity.uniqueIdentifier}
          >
            {entity.context.network === "Mocha" ? (
              <Image
                src="/images/celestia-bigger.png"
                alt="Celestia"
                height="28"
                width="142"
              />
            ) : (
                <Image
                  src="/images/dymension-bigger.png"
                  alt="Dymension"
                  height="28"
                  width="142"
                />
            )}
          </TopBar>
        </div>
        <Header
          logo={<Link href="/"><div className="font-logo font-[700] text-[1.125rem] flex justify-between items-center">{name}{whitelabel ? <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">Scan</span> : null}</div></Link>}
          searchInput={
            <SearchInput
            mode={mode}
            placeholder="Go to hash or height"
            optionGroups={searchOptions}
            isOpen={isOpen}
            handleOpen={setIsOpen}
            defaultSelected={entity.context.network}
            onSearch={(searchNetwork: string, term: string) => {
              if(isSearchable(term)) {
                fetch(`/api/path/${searchNetwork}/${term}`)
                  .then((response) => {
                    if(!response.ok) {
                      throw new Error("No path found.")
                    }
                    return response.json()
                  })
                  .then(data => {
                    if(typeof data.path === "string") {
                      router.push(data.path.toLowerCase())
                    }
                  }).catch(() => setIsOpen(true))
              }
            }}
          />
          }
          panelContent={
            <EntityPanel
              classes="flex lg:hidden"
              id={entity.uniqueIdentifier}
              metadata={entity.metadata}
              context={entity.context}
            />
          }
          onSwitchView={(view: string) => setView(view)}
          defaultView={view}
          whitelabel={whitelabel}
        />
        {view === "cards" ? (
          <CardList>
            {associated.map((entity) => (
              <Card
                key={entity.uniqueIdentifier}
                type={entity.context.entityTypeName}
                badgeText={entity.uniqueIdentifier}
                badgeIcon="reward"
              >
                <KeyValueList
                  entryLabels={Object.keys(entity.metadata)}
                  entries={Object.entries(entity.metadata)}
                />
              </Card>
            ))}
          </CardList>
        ) : null}
        {view === "table" ? (
          <Table data={associated} onRowClick={(row) => console.log(row)} />
        ) : null}
      </div>
      <EntityPanel classes="sticky top-0 hidden lg:flex" id={entity.uniqueIdentifier} metadata={entity.metadata} context={entity.context} />
    </div>
  );
}

export default EntityPage;
