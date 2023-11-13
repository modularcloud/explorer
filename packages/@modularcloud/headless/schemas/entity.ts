type EntityType = {
    pluralDisplayName: string;
    singularDisplayName: string;
}

type AttributeMetadata = {
    description: string;
}

type Value = {
    payload: string;
    metadata: {
        encoding: "hex" | "base64" | "utf-8" | "base58" | "decimal";   
    }
}

export type Entity = {
    type: EntityType;
}

// Balance
// Transaction
// Block
// Address
// Token
// Collection
// NFT
// Contract
// Event
// Validator
// Delegation
// Message
// Proposal
// Blob
// Swap/transfer ?
// Settlement/da ?
// Metric ?
