export type ParsedSPLTransfer = {
  parsed: {
    info: {
      authority: string;
      destination: string;
      mint: string;
      source: string;
      tokenAmount: {
        amount: string;
        decimals: number;
        uiAmount: number;
        uiAmountString: string;
      };
    };
    type: string;
  };
  program: string;
  programId: string;
  stackHeight: any;
};

export type ParsedNativeTransfer = {
  parsed: {
    info: {
      destination: string;
      lamports: number;
      source: string;
    };
    type: string;
  };
  program: string;
  programId: string;
  stackHeight: any;
};
