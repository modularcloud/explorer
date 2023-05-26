import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { InventoryExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof InventoryExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: {
      tableData: [
        {
          column: {
            columnLabel: "Image",
          },
          cell: {
            type: "image",
            payload: data.metadata
              ? {
                  src: data.metadata.image ?? "/images/placeholder-square.jpg",
                  alt: data.metadata.description ?? data.metadata.name ?? "",
                  height: 24,
                  width: 24,
                }
              : undefined,
          },
        },
        {
          column: {
            columnLabel: "ID",
          },
          cell: {
            type: "standard",
            payload: "#" + data.balance.balance.tokenId,
          },
        },
        {
          column: {
            columnLabel: "Name",
            breakpoint: "xs",
          },
          cell: {
            type: "longval",
            payload: {
              value: data.metadata?.name ?? "N/A",
              maxLength: 25,
              stepDown: 5,
              strategy: "end",
            },
          },
        },
        {
          column: {
            columnLabel: "Type",
          },
          cell: {
            type: "badge",
            payload: {
              text: data.tokenType,
            },
          },
        },
        // TODO: fix decimals
        {
          column: {
            columnLabel: "Qty",
          },
          cell: {
            type: "standard",
            payload: data.balance.balance.value ?? "1",
          },
        },
        {
          column: {
            columnLabel: "Address",
          },
          cell: {
            type: "longval",
            payload: {
              value: data.balance.token.address,
              maxLength: 30,
              stepDown: 6,
            },
          },
        },
      ],
      // Right now we don't have an NFT page
      // link: {
      //   network: metadata.network.id,
      //   type: "transaction",
      //   query: data.log.transactionHash,
      // },
    },
  }),
};
