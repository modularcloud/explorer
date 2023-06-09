import { Suspense } from "react";
import { ServerFeedCard } from "./card/server";
import { CardList } from "./card-list";
import { FetchLoadArgs } from "../../lib/utils";

type Props = {
  data: FetchLoadArgs[];
  next: FetchLoadArgs;
};

export default async function Feed({ data }: Props) {
  return (
    <CardList>
      {data.map((card) => {
        return (
          <Suspense
            key={card.query}
            fallback={
              <div
                key={card.query}
                className="border-mid-dark-100 w-full rounded-xl border shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]"
              >
                <div className="bg-slate/[.04] border-b border-slate-100 px-4 py-1.5 font-bold">
                  Loading...
                </div>
                <div className="px-4 py-2">
                  <div className="h-10 w-full text-center">Loading...</div>
                </div>
              </div>
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <ServerFeedCard key={card.query} resourcePath={card} />
          </Suspense>
        );
      })}
    </CardList>
  );
}
