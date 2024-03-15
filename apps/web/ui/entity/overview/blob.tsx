/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import { ButtonBody } from "./button-body";
import Link from "next/link";

import { env } from "~/env.js";
import { CACHE_KEYS } from "~/lib/cache-keys";

export function Blob({ url, mimeType }: { url: string; mimeType: string }) {
  const { data, isLoading } = useBlobData(url);

  async function copyBase64Value() {
    if (!data) return;
    const text = Buffer.from(data.text).toString("base64");
    const copied = await copyValueToClipboard(text);

    if (copied) {
      toast("Copied", {
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

  const showPreview = React.useCallback(() => {
    // @ts-expect-error AdobeDC is injected by the adobe embed script
    if (window.AdobeDC !== undefined) {
      // @ts-expect-error
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
  }, [url, id]);

  React.useEffect(() => {
    document.addEventListener("adobe_dc_view_sdk.ready", showPreview);
  }, [showPreview]);

  return (
    <>
      <Script
        src="https://acrobatservices.adobe.com/view-sdk/viewer.js"
        onReady={showPreview}
      />
      <div
        className="w-full h-[350px] mb-20 bg-mid-dark-100 flex items-center justify-center"
        id={id}
      >
        loading pdf...
      </div>
    </>
  );
}

function useBlobData(url: string) {
  return useQuery({
    queryKey: CACHE_KEYS.blob(url),
    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });
      const blob = await response.blob();
      const text = Buffer.from(await blob.arrayBuffer()).toString("base64");
      const arrayBuffer = await blob.arrayBuffer();
      return { text, arrayBuffer };
    },
    staleTime: Infinity,
  });
}
