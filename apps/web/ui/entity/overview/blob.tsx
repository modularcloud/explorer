/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "~/ui/shadcn/components/ui/use-toast";
import useSWR from "swr";
import { ButtonBody } from "./button-body";
import Link from "next/link";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export function Blob({ url, mimeType }: { url: string; mimeType: string }) {
  const { data, isLoading } = useBlobData(url);
  const [numPages, setNumPages] = React.useState<number>();

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
      {mimeType === "application/pdf" && data ? (
        <div className="overflow-auto w-full max-h-screen">
          <Document
            file={data.arrayBuffer}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages || 0 }, (_, i) => i + 1).map(
              (page: number) => (
                <Page key={page} pageNumber={page} />
              ),
            )}
          </Document>
        </div>
      ) : null}
    </div>
  );
}

function useBlobData(url: string) {
  return useSWR(url, async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const text = Buffer.from(await blob.arrayBuffer()).toString("base64");
    const arrayBuffer = await blob.arrayBuffer();
    return { text, arrayBuffer };
  });
}
