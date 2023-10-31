import { BlobTx } from "./submodules/celestia-app/proto/celestia/core/v1/blob/blob";

export function getBlobTx(txstr: string) {
    return BlobTx.decode(Buffer.from(txstr, "base64"));
}