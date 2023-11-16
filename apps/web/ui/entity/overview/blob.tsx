import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "~/ui/shadcn/components/ui/use-toast";
import useSWR from "swr";
import { ButtonBody } from "../../cta-button/button-body";
import Link from "next/link";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export function Blob({ url, mimeType }: { url: string; mimeType: string }) {
  const { data, isLoading } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const text = Buffer.from(await blob.arrayBuffer()).toString("base64");
    const arrayBuffer = await blob.arrayBuffer();
    return { text, arrayBuffer };
  });
  const [numPages, setNumPages] = useState<number>();
  const onClick = async () => {
    if (!data) return;
    const text = Buffer.from(data.text).toString("base64");
    const copied = await copyValueToClipboard(text);

    if (copied) {
      toast({
        title: "Copied",
        description: `"${truncateHash(text)}" copied to clipboard`,
      });
    }
  };
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex gap-2">
        {isLoading && (
          <ButtonBody className="cursor-not-allowed">Loading...</ButtonBody>
        )}
        {data && (
          <ButtonBody className="cursor-pointer" onClick={onClick}>
            Copy Base64
          </ButtonBody>
        )}
        <Link href={url} download>
          <ButtonBody>Download</ButtonBody>
        </Link>
      </div>
      {mimeType.startsWith("image/") && <img src={url} />}
      {mimeType.startsWith("video/") && (
        <video controls src={url} className="w-full" />
      )}
      {mimeType === "application/pdf" && data ? (
        <div className="overflow-auto w-full max-h-screen">
          <Document
            file={data.arrayBuffer}
            onLoadSuccess={onDocumentLoadSuccess}
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
