import { FormEvent, useState } from "react";
import useSWR from "swr";

export default function AddNetwork() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");
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
    console.log("here");
    e.preventDefault();
    console.log("there");
    await fetch("/api/chain-config", {
      method: "POST",
      headers: {
        Authorization: password,
      },
      body: JSON.stringify({
        name,
        endpoint,
        provider: "eclipse",
        type: "evm",
      }),
    });
    setName("");
    setEndpoint("");
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
            {`${network.name}: ${network.endpoint} `}
            <button className="border" onClick={() => deleteNetwork(network.provider, network.id)}>
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
          Endpoint:
          <input
            type="text"
            value={endpoint}
            className="border"
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </label>
        <input className="border" type="submit" value="Submit" />
      </form>
    </div>
  );
}
