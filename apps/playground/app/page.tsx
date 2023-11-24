import {
  createResolver,
  NotFound,
  ResolutionResponse,
  Trace,
} from "core";

function Resolution({ trace, raw }: { trace: Trace; raw?: string }) {
  console.log(raw);
  return (
    <div>
      <h1>Resolver ID: {trace.resolverId}</h1>
      <div style={{ paddingLeft: "20px" }}>
        <h2>Resolution Type: {trace.resolution.type}</h2>
        <h3>Input: {JSON.stringify(trace.input)}</h3>
        <h3>Created At: {new Date(trace.createdAt).toLocaleString()}</h3>
        {trace.resolution.type === "success" && (
          <p>Result: {JSON.stringify(trace.resolution.result)}</p>
        )}
        {trace.resolution.type === "error" && (
          <p>Error: {trace.resolution.error}</p>
        )}
        {trace.resolution.type === "pending" && (
          <p>Pending Input: {JSON.stringify(trace.input)}</p>
        )}
        <h3>Raw: {JSON.stringify(trace)}</h3>
        <h3>Dependencies:</h3>
        {trace.dependencies && trace.dependencies.length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {trace.dependencies.map((dep, index) => (
              <li key={index}>
                <Resolution trace={dep} />
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ paddingLeft: "20px" }}>None</p>
        )}
      </div>
    </div>
  );
}

export default async function Home() {
  const test7 = createResolver(
    { id: "test0", cache: false },
    async (input) => {
      const x: any = {};
      x.y.z;
    },
    [],
  );
  const test8 = createResolver(
    { id: "test1", cache: false },
    async (input: string, test0) => {
      const test0Response = await test0(input.toUpperCase());
      return test0Response.type === "success" ? test0Response.result : null;
    },
    [test7],
  );
  const test9 = createResolver(
    { id: "test1.5", cache: false },
    async (input: string) => {
      return input.toLowerCase();
    },
    [],
  );
  const test10 = createResolver(
    { id: "test2", cache: false },
    async (input: string, test1, test1point5) => {
      const result1Response = await test1(input);
      const result1 =
        result1Response.type === "success" ? result1Response.result : null;
      const result1point5Response: ResolutionResponse =
        await test1point5(input);
      const result1point5 =
        result1point5Response.type === "success"
          ? result1point5Response.result
          : null;
      return result1 && result1point5 ? result1 + " " + result1point5 : null;
    },

    [test8, test9],
  ); // This is a test to see if the resolver works

  const example = await test10("TESTing");
  // visualizing resolver responses
  return <Resolution trace={example.trace} raw={JSON.stringify(example)} />;
}
