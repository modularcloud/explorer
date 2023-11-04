"use client";
import Link from "next/link";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "~/ui/shadcn/components/ui/use-toast";
import { ButtonBody } from "./button-body";
import useSWR from "swr";

async function Copy({ url }: { url: string }) {
  const response = await fetch(url);
  const blob = await response.blob();
  const text = Buffer.from(await blob.arrayBuffer()).toString("base64");
  const onClick = async () => {
    const copied = await copyValueToClipboard(text);

    if (copied) {
      toast({
        title: "Copied",
        description: `"${truncateHash(text)}" copied to clipboard`,
      });
    }
  };
  return (
    <ButtonBody className="cursor-pointer" onClick={onClick}>
      Copy Base64
    </ButtonBody>
  );
}

export function Blob({ url, mimeType }: { url: string; mimeType: string }) {
  const { data, isLoading } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const text = Buffer.from(await blob.arrayBuffer()).toString("base64");
    return text;
  });
  const onClick = async () => {
    if (!data) return;
    const copied = await copyValueToClipboard(data);

    if (copied) {
      toast({
        title: "Copied",
        description: `"${truncateHash(data)}" copied to clipboard`,
      });
    }
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
        <object data={url} type="application/pdf" width="100%" height="500px">
          <embed src={url} type="application/pdf" />
        </object>
      ) : null}
    </div>
  );
}
