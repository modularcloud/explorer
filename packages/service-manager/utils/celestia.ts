import { BlobTx } from "../proto/celestia";

export function getDataFromBlockTx(tx: string) {
  // decode base64 string to bytes
  const bytes = Buffer.from(tx, "base64");

  // decode bytes to blob tx
  const blobTx = BlobTx.decode(bytes);

  // return blobs
  return blobTx.blobs;
}

export async function getTxHashFromBlockTx(tx: string) {
  // decode base64 string to bytes
  const bytes = Buffer.from(tx, "base64");

  // encode bytes to blob tx
  const blobTx = BlobTx.decode(bytes);

  // get sha256 hash of blobTx.tx
  const hash = await crypto.subtle.digest("SHA-256", blobTx.tx);

  // return as hex string
  return Buffer.from(hash).toString("hex");
}
