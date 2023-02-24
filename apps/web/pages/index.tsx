import {
  BigLogo,
  Footer,
  LatestBlock,
  SearchInput,
} from '@modularcloud/design-system';
import clsx from 'clsx';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { isSearchable } from '../lib/search';
import { SearchOptions } from '../lib/search-options';
import { Whitelabel } from '../lib/whitelabel';

export const getServerSideProps: GetServerSideProps<{
  //whitelabel?: string,
  searchOptions: any,
}> = async ({ params }) => {
  return {
     props: {
     // whitelabel: Whitelabel,
    searchOptions: SearchOptions  
     }
  }
}

export default function Homepage({ /*whitelabel*/ searchOptions }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mode = "light";
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  let name = "Explorer";
  /*if(whitelabel === "celestia") {
    name = "CelestiaScan";
  }
  if(whitelabel === "dymension") {
    name = "DymScan"
  }*/
  return (
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
      <Head>
        <title>{name as string} by Modular Cloud</title>
      </Head>
      <div className="container flex flex-col items-center justify-center w-full">
        <BigLogo mode={mode} />
        <div className="w-full xl:w-2/5 lg:w-3/6 md:w-4/6 sm:w-4/5 mt-6">
          <SearchInput
            mode={mode}
            placeholder="Go to hash or height"
            optionGroups={searchOptions}
            isOpen={isOpen}
            handleOpen={setIsOpen}
            onSearch={(network: string, term: string) => {
              const id = term.trim()
              if(isSearchable(id)) {
                if (network === "Solana") {
                  fetch(`/api/path/sol`)
                    .then((response) => {
                      if(!response.ok) {
                        throw new Error("No path found.")
                      }
                      return response.json()
                    })
                    .then(data => {
                      console.log(data)
                    }).catch(() => setIsOpen(true))
                  
                } else {
                  fetch(`/api/path/${network}/${id}`)
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
              }
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
