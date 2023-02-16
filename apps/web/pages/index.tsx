import React, { useState } from "react";
import clsx from "clsx";
import {
  SearchInput,
  Footer,
  LatestBlock,
  BigLogo,
} from "@modularcloud/design-system";
import Link from "next/link";
import { SearchOptions } from "../lib/search-options";
import { Whitelabel } from "../lib/whitelabel"
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { isSearchable } from "../lib/search";

export const getServerSideProps: GetServerSideProps<{
  whitelabel?: string,
  searchOptions: any,
}> = async ({ params }) => {
  return {
     props: {
      whitelabel: Whitelabel,
    searchOptions: SearchOptions  
     }
  }
}

export default function Homepage({ whitelabel, searchOptions }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mode = "light";
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="container flex flex-col items-center justify-center w-full">
        <BigLogo mode={mode} whitelabel={whitelabel} />
        <div className="w-full xl:w-2/5 lg:w-3/6 md:w-4/6 sm:w-4/5 mt-6">
          <SearchInput
            mode={mode}
            placeholder="Go to hash or height"
            optionGroups={searchOptions}
            isOpen={isOpen}
            handleOpen={setIsOpen}
            onSearch={(network: string, term: string) => {
              if(isSearchable(term)) {
                fetch(`/api/path/${network}/${term}`)
                  .then((response) => {
                    if(!response.ok) {
                      throw new Error("No path found.")
                    }
                    return response.json()
                  })
                  .then(data => {
                    if(typeof data.path === "string") {
                      router.push(data.path)
                    }
                  }).catch(() => setIsOpen(true))
              }
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
