import { registerResolver } from "../router";
import * as SVM from "./svm";
import { CelestiaTransactionResolver } from "./celestia/routes/transactions/[hash]/page";
import { CelestiaBlockResolver } from "./celestia/routes/blocks/[hashOrHeight]/page";
import { CelestiaLatestTransactionsResolver } from "./celestia/routes/transactions/page";
import { CelestiaLatestBlocksResolver } from "./celestia/routes/blocks/page";
import { CelestiaBlockTransctionsResolver } from "./celestia/routes/blocks/[hashOrHeight]/transactions/page";
import { CelestiaBlockBlobsResolver } from "./celestia/routes/blocks/[hashOrHeight]/blobs/page";
import { CelestiaTransactionBlobsResolver } from "./celestia/routes/transactions/[hash]/blobs/page";
import { CelestiaTransactionMessagesResolver } from "./celestia/routes/transactions/[hash]/messages/page";
import { CelestiaNamespaceResolver } from "./celestia/routes/namespaces/[id]/page";
import { CelestiaAddressBalancesResolver } from "./celestia/routes/addresses/[address]/page";
import { CelestiaBlobResolver } from "./celestia/routes/transactions/[hash]/blobs/[index]/page";
import { CelestiaMessageResolver } from "./celestia/routes/transactions/[hash]/messages/[index]/page";
import { CelestiaAddressTransactionsResolver } from "./celestia/routes/addresses/[address]/transactions/page";
import { addressOverviewResolver } from "./svm/addresses/[address]/page";
import { addressTransactionsResolver } from "./svm/addresses/[address]/transactions/page";
import { transactionOverviewResolver } from "./svm/transactions/[signature]/page";
import { transactionInstructionsResolver } from "./svm/transactions/[signature]/instructions/page";
import { blockOverviewResolver } from "./svm/blocks/[slot]/page";
import { blockTransactionsResolver } from "./svm/blocks/[slot]/transactions/page";
import { instructionResolver } from "./svm/transactions/[signature]/instructions/[index]/page";
import { latestTransactionsPageResolver } from "./svm/transactions/page";
import { latestBlocksPageResolver } from "./svm/blocks/page";
import { RollappTransactionResolver } from "./rollapp/routes/transactions/[hash]/page";
import { RollappBlockResolver } from "./rollapp/routes/blocks/[hashOrHeight]/page";
import { RollappLatestBlocksResolver } from "./rollapp/routes/blocks/page";
import { RollappBlockTransctionsResolver } from "./rollapp/routes/blocks/[hashOrHeight]/transactions/page";
import { RollappTransactionMessagesResolver } from "./rollapp/routes/transactions/[hash]/messages/page";
import { RollappMessageResolver } from "./rollapp/routes/transactions/[hash]/messages/[index]/page";
import { IBCResolver } from "./rollapp/misc/ibc";

export function registerResolvers() {
  registerResolver(addressOverviewResolver);
  registerResolver(addressTransactionsResolver);
  registerResolver(transactionOverviewResolver);
  registerResolver(transactionInstructionsResolver);
  registerResolver(blockOverviewResolver);
  registerResolver(blockTransactionsResolver);
  registerResolver(instructionResolver);
  registerResolver(latestTransactionsPageResolver);
  registerResolver(latestBlocksPageResolver);
  registerResolver(SVM.latestBlocksResolver);
  registerResolver(SVM.latestTransactionsResolver);

  registerResolver(CelestiaTransactionResolver);
  registerResolver(CelestiaBlockResolver);
  registerResolver(CelestiaLatestTransactionsResolver);
  registerResolver(CelestiaLatestBlocksResolver);
  registerResolver(CelestiaBlockTransctionsResolver);
  registerResolver(CelestiaBlockBlobsResolver);
  registerResolver(CelestiaTransactionBlobsResolver);
  registerResolver(CelestiaTransactionMessagesResolver);
  registerResolver(CelestiaNamespaceResolver);
  registerResolver(CelestiaAddressBalancesResolver);
  registerResolver(CelestiaBlobResolver);
  registerResolver(CelestiaMessageResolver);
  registerResolver(CelestiaAddressTransactionsResolver);

  registerResolver(RollappTransactionResolver);
  registerResolver(RollappBlockResolver);
  registerResolver(RollappLatestBlocksResolver);
  registerResolver(RollappBlockTransctionsResolver);
  registerResolver(RollappTransactionMessagesResolver);
  registerResolver(RollappMessageResolver);
  registerResolver(IBCResolver);
  // registerResolver(CelestiaAddressTransactionsResolver);
  // registerResolver(CelestiaLatestTransactionsResolver);
  // registerResolver(CelestiaAddressBalancesResolver);
}
