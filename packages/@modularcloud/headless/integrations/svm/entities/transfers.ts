import { Entry, PageContext } from "../../../schemas/page";
import { TransactionSchema } from "./schemas";
import { Sidebar } from "./transaction";

export function Column(spl?: boolean) {
  const columns = [
    {
      columnLabel: "From",
    },
    {
      columnLabel: "To",
    },
    {
      columnLabel: "Amount",
    },
  ];
  if (spl) {
    columns.push({
      columnLabel: "Token",
    });
  }
  return columns;
}

export function Row(
  context: PageContext,
  transaction: any,
  instructionIndex: number,
): Entry {
  const tx = TransactionSchema.parse(transaction);
  const instruction = tx.transaction.message.instructions[instructionIndex];
  if (!("parsed" in instruction)) {
    throw new Error("Parsed JSON is required for transfers");
  }

  const sidebar = Sidebar(context, transaction);

  // Native transfer
  if ("lamports" in instruction.parsed.info) {
    const amount = instruction.parsed.info.lamports / 10 ** 9;
    const from = instruction.parsed.info.source;
    const to = instruction.parsed.info.destination;

    return {
      row: {
        From: {
          type: "longval",
          payload: {
            value: from,
            maxLength: 30,
          },
        },
        To: {
          type: "longval",
          payload: {
            value: to,
            maxLength: 30,
          },
        },
        Amount: {
          type: "standard",
          payload: `${amount} ${context.nativeToken.toUpperCase()}`,
        },
      },
      link: `/${context.slug}/transactions/${tx.transaction.signatures[0]}`,
      key: `/${context.slug}/transactions/${tx.transaction.signatures[0]}/instructions/${instructionIndex}`,
      sidebar: {
        headerKey: "Transaction",
        headerValue: tx.transaction.signatures[0],
        properties: sidebar,
      },
    };
  }

  // SPL transfer
  const amount = instruction.parsed.info.tokenAmount.uiAmountString;
  const from = instruction.parsed.info.source;
  const to = instruction.parsed.info.destination;

  return {
    row: {
      From: {
        type: "longval",
        payload: {
          value: from,
          maxLength: 20,
        },
      },
      To: {
        type: "longval",
        payload: {
          value: to,
          maxLength: 20,
        },
      },
      Amount: {
        type: "standard",
        payload: amount,
      },
      Token: {
        type: "longval",
        payload: {
          value: instruction.parsed.info.mint,
          maxLength: 20,
        },
      },
    },
    link: `/${context.slug}/transactions/${tx.transaction.signatures[0]}`,
    key: `/${context.slug}/transactions/${tx.transaction.signatures[0]}`,
    sidebar: {
      headerKey: "Transaction",
      headerValue: tx.transaction.signatures[0],
      properties: sidebar,
    },
  };
}
