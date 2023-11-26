// import { createResolver } from "@modularcloud-resolver/core";
// import { PaginationContext } from "../../../../schemas/context";
// import { Page, PageContext } from "../../../../schemas/page";
// import { TransactionResponse } from "../../types";
// import * as Celestia from "@modularcloud-resolver/celestia";

// export const CelestiaLatestTransactionsResolver = createResolver(
//   {
//     id: "celestia-latest-transactions-0.0.0",
//     cache: false, // all cache is disabled for now
//   },
//   async (
//     { context }: { context: PageContext & PaginationContext },
//     transactionResolver,
//   ) => {
//     // using modular cloud custom endpoint
//     const response = await fetch(
//       `${context.rpcEndpoint}/txs${context.limit || context.after ? "?" : ""}${
//         context.limit ? `limit=${context.limit}` : ""
//       }${context.after ? `&nextToken=${context.after}` : ""}`,
//     );
//     const data = await response.json();
//     const list = await Promise.all(
//       data.result.txs.map((tx: any) =>
//         transactionResolver({
//           endpoint: context.rpcEndpoint,
//           hash: tx.txHash,
//         }),
//       ),
//     );
//     const transactions: TransactionResponse[] = list.map((resolution) => {
//       if (resolution.type === "success") {
//         return resolution.result;
//       }
//       throw new Error("Failed to resolve one or more transactions");
//     });
//     const page: Page = {
//       context,
//       metadata: {
//         title: `Latest Transactions`,
//         description: `See the latest transactions on ${context.chainBrand} ${context.chainName}`,
//       },
//       body: {
//         type: "collection",
//         refreshIntervalMS: 10000,
//         nextToken: data.result.nextToken,
//         tableColumns: [
//           {
//             columnLabel: "Icon",
//             hideColumnLabel: true,
//             breakpoint: "max-sm",
//           },
//           {
//             columnLabel: "Transactions",
//           },
//           {
//             columnLabel: "Type",
//           },
//           {
//             columnLabel: "Status",
//             breakpoint: "sm",
//           },
//           {
//             columnLabel: "Height",
//           },
//         ],
//         entries: await Promise.all(
//           transactions.map(async (tx) => {
//             let baseUrl = "http://localhost:3000";
//             if (process.env.VERCEL_URL) {
//               baseUrl = `https://${process.env.VERCEL_URL}`;
//             }
//             if (process.env.NEXT_PUBLIC_VERCEL_URL) {
//               baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
//             }

//             const response = await fetch(baseUrl + "/api/node/get-messages", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ str: tx.result.tx }),
//             });
//             const messages = await response.json();
//             const link = `/${context.chainBrand}-${context.chainName}/transactions/${tx.result.hash}`;
//             return {
//               sidebar: {
//                 headerKey: "Spotlight",
//                 headerValue: "Transaction",
//                 properties: {
//                   Hash: {
//                     type: "standard",
//                     payload: tx.result.hash,
//                   },
//                   Height: {
//                     type: "standard",
//                     payload: tx.result.height,
//                   },
//                   Status: {
//                     type: "status",
//                     payload: !tx.result.tx_result.code,
//                   },
//                   Type: {
//                     type: "standard",
//                     payload: messages[0]?.uniqueIdentifier ?? "Unknown",
//                   },
//                   Index: {
//                     type: "standard",
//                     payload: tx.result.index,
//                   },
//                   "Gas Used": {
//                     type: "standard",
//                     payload: tx.result.tx_result.gas_used,
//                   },
//                 },
//               },
//               link,
//               key: link,
//               row: {
//                 Icon: {
//                   type: "icon",
//                   payload: tx.result.tx_result.code ? "FAILURE" : "SUCCESS",
//                 },
//                 Transactions: {
//                   type: "longval",
//                   payload: {
//                     value: tx.result.hash,
//                   },
//                 },
//                 Height: {
//                   type: "standard",
//                   payload: tx.result.height,
//                 },
//                 Status: {
//                   type: "status",
//                   payload: !tx.result.tx_result.code,
//                 },
//                 Type: {
//                   type: "standard",
//                   payload: messages[0]?.uniqueIdentifier ?? "Unknown",
//                 },
//               },
//             };
//           }),
//         ),
//       },
//       sidebar: {
//         headerKey: "Network",
//         headerValue: context.chainName,
//         properties: {
//           Page: {
//             type: "standard",
//             payload: "Latest Transactions",
//           },
//         },
//       },
//       tabs: [
//         {
//           text: "Latest Transactions",
//           route: ["transactions"],
//         },
//         {
//           text: "Latest Blocks",
//           route: ["blocks"],
//         },
//       ],
//     };
//     return page;
//   },
//   [Celestia.TransactionResolver],
// );

export {}
