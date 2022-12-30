import { getEntity } from "service-manager/types/network.type";
import { Button } from "ui";
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
      <h1>Networks</h1>
      {ServiceManager.listNetworks().map((value) => {
        const network = ServiceManager.getNetwork(value);
        return (
          <div>
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
