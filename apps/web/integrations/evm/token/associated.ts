// import { TransformInput, TransformOutput } from "@modularcloud/ecs";
// import { AssociatedComponent } from "../../../ecs/components/associated";
// import { AccountExtract } from ".";

// export const AssociatedTransform = {
//   schema: AssociatedComponent,
//   transform: async ({
//     data,
//     metadata,
//   }: TransformInput<typeof AccountExtract>): Promise<
//     TransformOutput<typeof AssociatedComponent>
//   > => ({
//     typeId: "associated",
//     data: {
//       Transfers: data.transfers.map((transfer) => ({
//         network: metadata.network.id,
//         type: "log",
//         query: `${transfer.transactionHash}#${transfer.logIndex}`,
//       })),
//       Holders: data.holders.map((holder) => ({
//         network: metadata.network.id,
//         type: "account",
//         query: holder.accountAddress,
//       })),
//     },
//   }),
// };

export {}