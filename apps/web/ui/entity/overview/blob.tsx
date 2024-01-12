/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "~/ui/shadcn/components/ui/use-toast";
import useSWRImmutable from "swr/immutable";
import Script from "next/script";
import { ButtonBody } from "./button-body";
import Link from "next/link";

import { env } from "~/env.mjs";

export function Blob({ url, mimeType }: { url: string; mimeType: string }) {
  const { data, isLoading } = useBlobData(url);

  async function copyBase64Value() {
    if (!data) return;
    const text = Buffer.from(data.text).toString("base64");
    const copied = await copyValueToClipboard(text);

    if (copied) {
      toast({
        title: "Copied",
        description: `"${truncateHash(text)}" copied to clipboard`,
      });
    }
  }

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex gap-2">
        {isLoading && (
          <ButtonBody className="cursor-not-allowed">Loading...</ButtonBody>
        )}
        {data && (
          <ButtonBody className="cursor-pointer" onClick={copyBase64Value}>
            Copy Base64
          </ButtonBody>
        )}
        <Link href={url} download>
          <ButtonBody>Download</ButtonBody>
        </Link>
      </div>
      {mimeType.startsWith("image/") && <img src={url} alt="" />}
      {mimeType.startsWith("video/") && (
        <video controls src={url} className="w-full" />
      )}
      {mimeType === "application/pdf" && data && <BlobPDFViewer url={url} />}
    </div>
  );
}

type BlobPDFViewerProps = {
  url: string;
};

function BlobPDFViewer({ url }: BlobPDFViewerProps) {
  const id = React.useId();

  React.useEffect(() => {
    function showPreview() {
      if ("AdobeDC" in window) {
        let adobeDCView = new (window.AdobeDC as any).View({
          clientId: env.NEXT_PUBLIC_ADOBE_EMBED_API_KEY,
          divId: id,
        });

        const urlParts = url.split("/");
        adobeDCView.previewFile(
          {
            content: {
              location: {
                url,
              },
            },
            metaData: { fileName: urlParts[urlParts.length - 1] },
          },
          { embedMode: "SIZED_CONTAINER" },
        );
      }
    }

    showPreview();

    document.addEventListener("adobe_dc_view_sdk.ready", showPreview);
    return document.removeEventListener("adobe_dc_view_sdk.ready", showPreview);
  }, [id, url]);

  return (
    <>
      <Script src="https://acrobatservices.adobe.com/view-sdk/viewer.js" />
      <div className="overflow-auto w-full max-h-screen" id={id}></div>
    </>
  );
}

function useBlobData(url: string) {
  return useSWRImmutable(url, async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const text = Buffer.from(await blob.arrayBuffer()).toString("base64");
    const arrayBuffer = await blob.arrayBuffer();
    return { text, arrayBuffer };
  });
}
