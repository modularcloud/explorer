import React, { useState } from "react";
import clsx from "clsx";
import {
  SearchInput,
  Footer,
  LatestBlock,
  BigLogo,
} from "@modularcloud/design-system";
import Head from "next/head";
import { getSearchOptions } from "../../lib/search-options";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { isSearchable } from "../../lib/search";
import { loadDynamicNetworks, ServiceManager } from "../../lib/service-manager";
import Script from "next/script";

export const getServerSideProps: GetServerSideProps<{
  searchOptions: any;
  name: string;
}> = async ({ params }) => {
  const { networkLabel } = params ?? {};
  if (typeof networkLabel !== "string") {
    throw Error(
      `Misconfigured parameters: network=${networkLabel}`
    );
  }
  
  await loadDynamicNetworks();
  const network = ServiceManager.getNetwork(networkLabel);
  if (!network) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      name: network.label,
      searchOptions: await getSearchOptions(),
    },
  };
};

export default function Homepage({
  searchOptions,
  name
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mode = "light";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>{`${name} by Modular Cloud`}</title>
      </Head>
      { name === "Triton" ? <>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MPKBCE2GRT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MPKBCE2GRT');
          `}
        </Script>
      </> : null }
      <div
        className={clsx(
          "flex flex-col items-center justify-center mx-auto min-h-screen p-4",
          {
            /* "text-white bg-night": mode === "dark",*/
            "bg-gray-100 bg-[url('/images/home-img-bg.png')] bg-repeat-x bg-top":
              mode === "light",
          }
        )}
      >
        <div className="container flex flex-col items-center justify-center w-full">
          <BigLogo mode={mode} name={name} />
          <div className="w-full xl:w-2/5 lg:w-3/6 md:w-4/6 sm:w-4/5 mt-6">
            <SearchInput
              fixedOption={name}
              mode={mode}
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
