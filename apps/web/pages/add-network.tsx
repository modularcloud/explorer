import { FormEvent, useState } from "react";
import useSWR from "swr";

export default function AddNetwork() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [evmEndpoint, setEvmEndpoint] = useState("");
  const [svmEndpoint, setSvmEndpoint] = useState("");
  const {
    isLoading: isLoadingList,
    data: list,
    mutate,
  } = useSWR("/api/chain-config", (url) =>
    fetch(url).then((res) => res.json())
  );

  async function deleteNetwork(provider: string, id: string) {
    fetch(`/api/chain-config/${provider}/${id}`, {
      method: "DELETE",
      headers: { Authorization: password },
    }).then((res) => {
      if (res.ok) mutate("/api/chain-config");
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const endpoints: any = {};
    if (evmEndpoint) endpoints.evm = evmEndpoint;
    if (svmEndpoint) endpoints.svm = svmEndpoint;
    if ((!evmEndpoint && !svmEndpoint) || !name) return;
    await fetch("/api/chain-config", {
      method: "POST",
      headers: {
        Authorization: password,
      },
      body: JSON.stringify({
        name,
        endpoints,
        provider: "eclipse",
      }),
    });
    setName("");
    setEvmEndpoint("");
    mutate("/api/chain-config");
  }

  return (
    <div>
      <h1>Authentication</h1>
      <p>
        Enter and keep the password in the box below while performing actions.
      </p>
      <input
        type="password"
        className="border"
        onChange={(e) => setPassword(e.target.value)}
      />
      <h1>Networks</h1>
      {isLoadingList ? "Loading..." : null}
      <ul>
        {(list?.result ?? []).map((network: any) => (
          <li key={network.id}>
            {`${network.name}: EVM (${network.endpoints?.evm}), SVM(${network.endpoints?.svm}) `}
            <button
              className="border"
              onClick={() => deleteNetwork(network.provider, network.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h1>Add Network</h1>
      <p>Only EVM endpoints are supported at this time.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            className="border"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          EVM Endpoint (Optional):
          <input
            type="text"
            value={evmEndpoint}
            className="border"
            onChange={(e) => setEvmEndpoint(e.target.value)}
          />
        </label>
        <label>
          SVM Endpoint (Optional):
          <input
            type="text"
            value={svmEndpoint}
            className="border"
            onChange={(e) => setSvmEndpoint(e.target.value)}
          />
        </label>
        <input className="border" type="submit" value="Submit" />
      </form>
    </div>
  );
}
