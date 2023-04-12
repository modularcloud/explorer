import { Suspense } from "react";
import { Card } from "./card";
import { CardList } from "./card-list";
import { FetchLoadArgs } from "../../../../../../lib/utils";

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
                className="w-full border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-xl lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]"
              >
                <div className="px-4 py-1.5 font-bold bg-slate/[.04] border-b border-slate-100">
                  Loading...
                </div>
                <div className="py-2 px-4">
                  <div className="h-10 w-full text-center">Loading...</div>
                </div>
              </div>
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <Card key={card.query} resourcePath={card} />
          </Suspense>
        );
      })}
    </CardList>
  );
}
