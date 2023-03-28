import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { Entity } from "service-manager/types/entity.type";
import { slugify, ValueSchemaType } from "service-manager";
import { getEntities, getEntity } from "service-manager/types/network.type";
import {
  loadDynamicNetworks,
  ServiceManager,
} from "../../../../lib/service-manager";
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
  Tabs,
} from "@modularcloud/design-system";
import Image from "next/image";
import useSWR from "swr";

import { CubesOff } from "@modularcloud/design-system";
import { getSearchOptions } from "../../../../lib/search-options";
import { Whitelabel } from "../../../../lib/whitelabel";
import { isSearchable } from "../../../../lib/search";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

interface PanelProps {
  classes: string;
  id: string;
  metadata: { [key: string]: ValueSchemaType };
  img?: string;
  context: {
    network: string;
    entityTypeName: string;
  };
}

const EntityPanel = ({ classes, id, metadata, context, img }: PanelProps) => (
  <RightPanel className={classes}>
    <EntityDetails
      iconType={<CubesOff />}
      type={context.entityTypeName}
      hash={id}
      network={img}
    />
    <div>
      <div className="pb-4 font-bold">{`${context.entityTypeName} Information`}</div>
      <KeyValueList data={metadata} type="sidebar" />
    </div>
  </RightPanel>
);

export const getServerSideProps: GetServerSideProps<{
  entity: Entity;
  whitelabel?: string | null;
  searchOptions: any;
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

  await loadDynamicNetworks();
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
      whitelabel: Whitelabel,
      searchOptions: await getSearchOptions(),
    },
  };
};

export function EntityPage({
  entity,
  whitelabel,
  searchOptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mode = "light";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(
    entity.context.entityTypeName === "Transaction" ||
      entity.context.entityTypeName === "Account"
      ? "cards"
      : "table"
  );
  const swrResponse = useSWR(
    "/api/associated#" + entity.uniqueIdentifier,
    (url) =>
      fetch(url, { method: "POST", body: JSON.stringify(entity) }).then((res) =>
        res.json()
      ),
    {
      onSuccess: (data) => {
        if (data.length < 3) setView("cards");
      },
    }
  );
  const associated: Record<string, Entity[]> | Entity[] =
    swrResponse.data ?? ({} as Record<string, Entity[]>); // TODO validation
  const [keys, record]: [string[], Record<string, Entity[]>] =
    React.useMemo(() => {
      if (Array.isArray(associated)) {
        if (associated.length === 0) return [[], {}];
        const type = associated[0].context.entityTypeName;
        return [[associated[0].context.entityTypeName], { [type]: associated }];
      }
      return [Object.keys(associated), associated];
    }, [associated]);
  const [activeTab, setActiveTab] = React.useState(0);
  const content = React.useMemo(() => {
    return record[keys[activeTab]] ?? [];
  }, [keys, record, activeTab]);

  const isCelestiaEntity = entity.context.network.toLowerCase() === "mocha";
  const isDymensionEntity = !!entity.context.network
    .toLowerCase()
    .match(/(^hub$)|rollapp|dymension/);
  const isEclipseEntity = !isCelestiaEntity && !isDymensionEntity;

  let img = "";
  if (isCelestiaEntity) {
    img = "Celestia";
  }
  if (isDymensionEntity) {
    img = "Dymension";
  }
  if (isEclipseEntity) {
    img = "Eclipse";
  }

  let name = "Explorer";
  if (whitelabel === "celestia") {
    name = "Celestia";
  }
  if (whitelabel === "dymension") {
    name = "Dym";
  }
  if (whitelabel === "nautilus") {
    name = "Naut";
  }
  const shortId =
    entity.uniqueIdentifier.length > 6
      ? entity.uniqueIdentifier.substring(0, 6) + "..."
      : entity.uniqueIdentifier;

  return (
    <>
      <Head>
        <title>{`${entity.context.entityTypeName} (${shortId}) on ${
          entity.context.network === "RollAppX"
            ? "RollApp X"
            : entity.context.network
        } - ${name}${whitelabel ? "Scan" : ""}`}</title>
      </Head>
      {entity.context.network === "Triton" ? (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-WM976PHBGC"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WM976PHBGC');
          `}
          </Script>
        </>
      ) : null}
      <div className="lg:flex">
        <div className="lg:grow">
          <div className="lg:hidden">
            <TopBar
              type={entity.context.entityTypeName}
              id={entity.uniqueIdentifier}
            >
              {whitelabel?.toLowerCase() === "nautilus" ? null : (
                <Image
                  src={`/images/${img.toLowerCase()}-bigger.png`}
                  alt={img}
                  height="28"
                  width="142"
                />
              )}
            </TopBar>
          </div>
          <Header
            logo={
              <Link href="/">
                <div className="font-logo font-[700] text-[1.125rem] flex justify-between items-center">
                  {name}
                  {whitelabel && whitelabel !== "dev" ? (
                    <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">
                      Scan
                    </span>
                  ) : null}
                </div>
              </Link>
            }
            searchInput={
              <SearchInput
                placeholder="Go to hash or height"
                optionGroups={searchOptions}
                isOpen={isOpen}
                handleOpen={setIsOpen}
                defaultSelected={slugify(entity.context.network)}
                onSearch={(searchNetwork: string, term: string) => {
                  const id = term.trim();
                  if (isSearchable(id)) {
                    fetch(`/api/path/${searchNetwork}/${id}`)
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error("No path found.");
                        }
                        return response.json();
                      })
                      .then((data) => {
                        if (typeof data.path === "string") {
                          router.push(data.path.toLowerCase());
                        }
                      })
                      .catch(() => setIsOpen(true));
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
                img={whitelabel?.toLowerCase() === "nautilus" ? undefined : img}
              />
            }
            onSwitchView={(view: string) => setView(view)}
            defaultView={view}
          />
          {view === "cards" ? (
            <CardList>
              {content.map((entity, index) => (
                <Card
                  key={`${entity.uniqueIdentifier}-${index}-${activeTab}`}
                  type={entity.context.entityTypeName}
                  badgeText={entity.uniqueIdentifier}
                  navTo={
                    entity.context.network === "N/A" &&
                    !entity.computed.parentPath
                      ? undefined
                      : () =>
                          router.push(
                            entity.computed.parentPath ??
                              `/${entity.context.network}/${entity.context.entityTypeName}/${entity.uniqueIdentifierLabel}/${entity.uniqueIdentifier}`
                          )
                  }
                >
                  <KeyValueList data={entity.metadata} type="card" />
                </Card>
              ))}
            </CardList>
          ) : null}
          {view === "table" ? <Table data={content} router={router} /> : null}
          {!content.length ? (
            <p className="w-full text-slate text-center">
              {swrResponse.isLoading
                ? "Loading..."
                : keys.length
                ? `No ${keys[
                    activeTab
                  ].toLowerCase()} for this ${entity.context.entityTypeName.toLowerCase()}.`
                : `This ${entity.context.entityTypeName.toLowerCase()} is empty.`}
            </p>
          ) : null}
          <Tabs list={keys} setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <EntityPanel
          classes="sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
          id={entity.uniqueIdentifier}
          metadata={entity.metadata}
          context={entity.context}
          img={whitelabel?.toLowerCase() === "nautilus" ? undefined : img}
        />
      </div>
    </>
  );
}

export default EntityPage;
