import { Header } from "./(components)/header";
import { RightPanel } from "./(components)/right-panel";
import Associated from "./associated";

/**
 * Note:
 * Passing resource path to RSCs because there doesn't seem any good way of accessing them directly yet
 * */
export default async function EntityPage(props: any) {
  return (
    <div className="lg:flex">
      <div className="lg:grow">
        <Header />
        {/* @ts-expect-error Async Server Component */}
        <Associated resourcePath={props.params} />
      </div>
      {/* @ts-expect-error Async Server Component */}
      <RightPanel className="sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]" resourcePath={props.params} />
    </div>
  );
}

export const dynamic = "force-dynamic";