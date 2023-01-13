import { getEntity } from "service-manager/types/network.type";
import { BoxedValue, Button } from "@modularcloud/design-system";
import { ServiceManager } from "../lib/service-manager";

type Example = {
  description: string;
  result: string;
};

type Props = {
  examples: Example[];
};

export async function getServerSideProps() {
  const network = ServiceManager.getNetwork("Mocha");
  const examples: Example[] = [];
  if (network) {
    const blockByHeight = await getEntity(network, "Block", "height", "5");
    examples.push({
      description: "Block by height (5)",
      result: blockByHeight?.raw ?? "",
    });

    const blockByHash = await getEntity(
      network,
      "Block",
      "hash",
      blockByHeight?.uniqueIdentifier ?? ""
    );
    examples.push({
      description: `Same block, retrieved by hash (${blockByHeight?.uniqueIdentifier})`,
      result: blockByHash?.raw ?? "",
    });

    const transactionByHash = await getEntity(
      network,
      "Transaction",
      "hash",
      "C12DA33E2AF01882260063550DBDF0B23241D1116797D87D60E270BCF406D95D"
    );
    examples.push({
      description:
        "Transaction by hash (C12DA33E2AF01882260063550DBDF0B23241D1116797D87D60E270BCF406D95D)",
      result: transactionByHash?.raw ?? "",
    });
  }
  return {
    props: {
      examples,
    },
  };
}

export default function Web(props: Props) {
  return (
    <div>
      <h1 className="text-xl">Networks</h1>
      <BoxedValue value="Pay For Data" />
      {ServiceManager.listNetworks().map((value) => {
        const network = ServiceManager.getNetwork(value);
        return (
          <div key={value}>
            <h2>{value}</h2>
            <ul>
              {network?.entityTypes.map((entityType) => (
                <li key={entityType.name}>{entityType.name}</li>
              ))}
            </ul>
          </div>
        );
      })}
      <h1>Examples</h1>
      {props.examples.map((example) => (
        <div key={example.description}>
          <p>{example.description}</p>
          <code>{example.result}</code>
        </div>
      ))}
      <Button />
    </div>
  );
}
