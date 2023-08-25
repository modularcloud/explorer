import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { BalancesExtract } from ".";
import { AttributesComponent } from "~/ecs/components/attributes";
import { Value } from "~/schemas/value";

export const AttributesTransform = {
  schema: AttributesComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BalancesExtract>): Promise<
    TransformOutput<typeof AttributesComponent>
  > => {
    const balances: Record<string, Value> = {};
    if (data.nativeTokenBalance) {
      balances[metadata.network.nativeToken] = {
        type: "standard",
        // from wei
        payload: new Decimal(data.nativeTokenBalance)
          .dividedBy(new Decimal(10).pow(18))
          .toString(),
      };
    }
    for (const item of data.balancesV2 ?? []) {
      balances[item.balance.token.name] = {
        type: "standard",
        payload: new Decimal(item.balance.balance.value)
          .dividedBy(new Decimal(10).pow(String(item.balance.token.decimals)))
          .toString(),
      };
    }
    return {
      typeId: "attributes",
      data: balances,
    };
  },
};
