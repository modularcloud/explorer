import React, { useState } from "react";
import clsx from "clsx";
import {
  SearchInput,
  Footer,
  LatestBlock,
  BigLogo,
} from "@modularcloud/design-system";
import Head from "next/head";
import { getSearchOptions } from "../lib/search-options";
import { Whitelabel } from "../lib/whitelabel";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { isSearchable } from "../lib/search";

export const getServerSideProps: GetServerSideProps<{
  whitelabel?: string | null;
  searchOptions: any;
}> = async ({ params }) => {
  return {
    props: {
      whitelabel: Whitelabel,
      searchOptions: await getSearchOptions(),
    },
  };
};

export default function Homepage({
  whitelabel,
  searchOptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mode = "light";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  let name = "Explorer";
  if (whitelabel === "celestia") {
    name = "CelestiaScan";
  }
  if (whitelabel === "dymension") {
    name = "DymScan";
  }
  if (whitelabel === "nautilus") {
    name = "NautScan";
  }
  return (
    <>
      <Head>
        <title>{`${name} by Modular Cloud`}</title>
      </Head>
      <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] min-h-screen">
        <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
          <BigLogo mode={mode} name={name} />
          <div className="w-[27.875rem]">
            <SearchInput
              placeholder="Go to hash or height"
              optionGroups={searchOptions}
              isOpen={isOpen}
              handleOpen={setIsOpen}
              onSearch={(network: string, term: string) => {
                const id = term.trim();
                if (isSearchable(id)) {
                  fetch(`/api/path/${network}/${id}`)
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
