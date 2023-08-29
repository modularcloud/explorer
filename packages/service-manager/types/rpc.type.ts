export type JSONRPCResponse<T> = {
  jsonrpc: string;
  id: number;
  result: T;
};

export type ABCIResponse = {
  response: {
    code: number;
    log: string;
    info: string;
    index: string;
    key: any;
    value: string;
    proofOps: any;
    height: string;
    codespace: string;
  };
};

export type Transaction = {
  hash: string;
  height: string;
  index: number;
  tx_result: {
    code: number;
    data: string;
    log: string;
    info: string;
    gas_wanted: string;
    gas_used: string;
    events: {
      type: string;
      attributes: {
        key: string;
        value: string;
        index: boolean;
      }[];
    }[];
    codespace: string;
  };
  tx: string;
};

export type TxSearch = {
  txs: Transaction[];
  total_count: string;
};

export type Block = {
  block_id: {
    hash: string;
    parts: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      version: {
        block: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
        parts: {
          total: number;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
      evidence: {
        // TODO: remove any
        evidence: any[];
      };
      msgs: {
        // TODO: remove any
        msgs: null | any[];
      };
      blobs?: {
        NamespaceID: string;
        Data: string;
        ShareVersion: number;
      }[];
      square_size?: string;
    };
    last_commit: {
      height: string;
      round: number;
      block_id: {
        hash: string;
        parts: {
          total: number;
          hash: string;
        };
      };
      signatures: [
        {
          block_id_flag: number;
          validator_address: string;
          timestamp: string;
          signature: string;
        }[],
      ];
    };
  };
};
