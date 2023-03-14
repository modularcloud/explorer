import { GetServerSideProps } from "next";
import { getSearchOptions } from "../../../lib/search-options";
import { loadDynamicNetworks, ServiceManager } from "../../../lib/service-manager";

export const getServerSideProps: GetServerSideProps<{}> = async ({ params }) => {
    let { networkLabel, entityType: searchTerm } = params ?? {};
    if (typeof networkLabel !== "string") {
      throw Error(`Misconfigured parameters: network=${networkLabel}`);
    }

    const searchOptions = await getSearchOptions();
    const defaultNetworkLabel: string = searchOptions[0].options[0].name;
  
    await loadDynamicNetworks();
    const network = ServiceManager.getNetwork(networkLabel);
    if (!network) {
      networkLabel = defaultNetworkLabel;
    }
    const path = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/path/${networkLabel}/${searchTerm}`).then((res) => res.json());
    if(path.path) {
        return {
            redirect: {
                destination: path.path,
                permanent: false,
            },
        };
    } else {
        return {
            notFound: true,
        };
    };
  };

    export default function Search() {
        return null;
    }