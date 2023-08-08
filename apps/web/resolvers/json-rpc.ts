import { createResolver, NotFound } from "./create-resolver";
type JSONRPCRequest = {
  jsonrpc: string;
  method: string;
  id: number;
};

const defaultIsPending = (response: any) => {
  if (response.result === null) {
    return true;
  }
  return false;
};
export const createJSONRPCResolver = (
  resolverId: string,
  { jsonrpc = "2.0", method, id = 1 }: JSONRPCRequest,
  isPending: (response: any) => boolean = defaultIsPending,
  cache: boolean = false,
) =>
  createResolver(
    {
      id: resolverId,
      cache,
    },
    async ({ endpoint, params }: { endpoint: string; params: any[] }) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonrpc, method, params, id }),
      });

      const json = await response.json();
      if (isPending(json)) {
        NotFound();
      }
      return json;
    },
    [],
  );
