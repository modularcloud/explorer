"use client";

import Image from "next/image";
import { cn } from "~/ui/shadcn/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useMemo } from "react";
import Link from "next/link";
import { useSpotlightStore } from "~/ui/right-panel/spotlight-store";
import { useParams } from "next/navigation";
import { jsonFetch, parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CACHE_KEYS } from "~/lib/cache-keys";
import type { ResolutionResponse } from "@modularcloud-resolver/core";
import { env } from "~/env";

type MsgRef = {
  slug: string;
  txHash: string;
  msgIndex: string;
  logo: string;
};
type IBCFlow = {
  transfer?: MsgRef;
  receive?: MsgRef;
  acknowledge?: MsgRef;
};

type Node =
  | {
      type: "completed";
      id: string;
      shortId?: string;
      label: string;
      timestamp: string | number;
      link: string;
      //sidebar: Record<string, Value>;
      image: string;
    }
  | {
      type: "error";
      label: string;
      message: string;
      image: string;
    }
  | {
      type: "pending";
      label: string;
      waitingFor?: string;
      image?: string;
    };

enum Step {
  ROLLAPP_TR = "ROLLAPP_TR",
  HUB_RECV = "HUB_RECV",
  ROLLAPP_RECV = "ROLLAPP_RECV",
  HUB_ACK = "HUB_ACK",
  ROLLAPP_ACK = "ROLLAPP_ACK",
  CHAIN_TR = "CHAIN_TR",
  CHAIN_RECV = "CHAIN_RECV",
  CHAIN_ACK = "CHAIN_ACK",
}

type NodeProps = {
  num: number;
  data?: MsgRef;
  image?: string;
};

function Node({ num, data, image }: NodeProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const label = useMemo(() => {
    switch (num) {
      case 0:
        return "Transfer";
      case 1:
        return "Receipt";
      case 2:
        return "Acknowledgement";
      default:
        return "Unknown";
    }
  }, [num]);
  const shortHash = useMemo(
    () => `${data?.txHash.slice(0, 3)}...${data?.txHash.slice(-3)}`,
    [data?.txHash],
  );

  const isNext = false;
  const time = "";
  return (
    <Link
      href={
        data
          ? `/${data.slug}/transactions/${data.txHash}/messages/${data.msgIndex}`
          : "#"
      }
      onClick={(e) => {
        // if (node.type === "error") {
        //   //nodeResponse.mutate(fallbackData);
        // }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        // if (node.sidebar) {
        //   setSpotlight?.({
        //     headerKey: "Spotlight",
        //     headerValue: "Message",
        //     properties: node.sidebar,
        //   });
        // }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={cn(
        "border flex grow basis-[0%] flex-col items-stretch p-2.5 rounded-lg border-solid",
        {
          "border-[color:var(--gray-50,#ECEFF3)] bg-slate-50 text-[#272835] hover:border-[#E6EAEF] hover:bg-[#EFF2F6":
            !isNext && !data,
          "border-[color:var(--yellow-100,#FAEDCC)] bg-yellow-50 text-yellow-900 hover:bg-[#FFF1CC] hover:border-[#FAEDCC]":
            isNext,
          "border-[color:var(--green-100,#DDF3EF)] bg-teal-50 text-teal-900 hover:border-[#DDF3EF] hover:bg-[#DDFDF4]":
            !!data,
        },
      )}
    >
      <div className="flex items-stretch justify-between gap-2">
        <div className="items-center shadow bg-white flex aspect-square flex-col p-1 rounded-md w-7 h-7">
          {data ? (
            <Image
              src={data.logo}
              width={20}
              height={20}
              alt={`${label} chain logo`}
              className="rounded-full"
            />
          ) : null}
        </div>
        <div className="text-sm font-medium leading-5 tracking-tight self-center grow whitespace-nowrap my-auto">
          {label}
        </div>
      </div>
      {data ? (
        <div className="flex justify-between align-items gap-5 mt-4">
          <div className="text-xs font-medium leading-4 whitespace-nowrap">
            {shortHash}
          </div>
          <div className="text-right text-xs font-medium leading-4 self-stretch whitespace-nowrap">
            {time}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden text-ellipsis text-xs font-medium leading-4 whitespace-nowrap mt-4">
          {/* {node.type === "error" ? (
            isHovered ? (
              "Try Again"
            ) : (
              <>
                (&quot;message&quot; in node ? node.message : &quot;Error&quot;)
              </>
            )
          ) : (
            `Waiting for ${("waitingFor" in node && node.waitingFor
              ? node.waitingFor
              : node.label
            ).toLowerCase()}...`
          )} */}
          {`Waiting for ${label.toLowerCase()}...`}
        </div>
      )}
    </Link>
  );
}

function Address({ address }: { address: string }) {
  const pieces = RegExp(/^([a-zA-Z]+)1([a-z0-9]{38})$/).exec(address);

  if (!pieces) return null;

  const [, prefix, suffix] = pieces;

  return (
    <div className="items-center border border-[color:var(--gray-50,#ECEFF3)] bg-slate-50 flex gap-2 px-2.5 py-0.5 rounded-[32px] border-solid max-md:justify-center">
      <div className="text-xs font-medium leading-4 text-[#666D80]">
        {suffix.slice(0, 4).toUpperCase()}
      </div>
      <svg
        width="4"
        height="5"
        viewBox="0 0 4 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.0032 4.39773C1.65945 4.39773 1.34553 4.31392 1.06143 4.14631C0.777344 3.97585 0.550071 3.74858 0.379617 3.46449C0.212003 3.1804 0.128196 2.86648 0.128196 2.52273C0.128196 2.17614 0.212003 1.86222 0.379617 1.58097C0.550071 1.29687 0.777344 1.07102 1.06143 0.903409C1.34553 0.732954 1.65945 0.647727 2.0032 0.647727C2.34979 0.647727 2.66371 0.732954 2.94496 0.903409C3.22905 1.07102 3.4549 1.29687 3.62251 1.58097C3.79297 1.86222 3.8782 2.17614 3.8782 2.52273C3.8782 2.86648 3.79297 3.1804 3.62251 3.46449C3.4549 3.74858 3.22905 3.97585 2.94496 4.14631C2.66371 4.31392 2.34979 4.39773 2.0032 4.39773Z"
          fill="#666D80"
        />
      </svg>

      <div className="text-xs font-medium leading-4">
        {prefix.toUpperCase()}
      </div>
      <svg
        width="4"
        height="5"
        viewBox="0 0 4 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.0032 4.39773C1.65945 4.39773 1.34553 4.31392 1.06143 4.14631C0.777344 3.97585 0.550071 3.74858 0.379617 3.46449C0.212003 3.1804 0.128196 2.86648 0.128196 2.52273C0.128196 2.17614 0.212003 1.86222 0.379617 1.58097C0.550071 1.29687 0.777344 1.07102 1.06143 0.903409C1.34553 0.732954 1.65945 0.647727 2.0032 0.647727C2.34979 0.647727 2.66371 0.732954 2.94496 0.903409C3.22905 1.07102 3.4549 1.29687 3.62251 1.58097C3.79297 1.86222 3.8782 2.17614 3.8782 2.52273C3.8782 2.86648 3.79297 3.1804 3.62251 3.46449C3.4549 3.74858 3.22905 3.97585 2.94496 4.14631C2.66371 4.31392 2.34979 4.39773 2.0032 4.39773Z"
          fill="#666D80"
        />
      </svg>

      <div className="text-xs font-medium leading-4 whitespace-nowrap text-[#666D80]">
        {suffix.slice(-4).toUpperCase()}
      </div>
    </div>
  );
}

function Transfer({ hash, slug }: { hash: string; slug: string }) {
  const body = {
    resolverId: "rollapp-ibc-0.0.0",
    input: {
      hash,
      step: 0,
      slug,
    },
  };

  const nodeResponse = useQuery({
    queryKey: CACHE_KEYS.ibcResolve(body.resolverId, body.input),
    queryFn: async () => {
      const apiURL = new URL(
        "/api/resolve",
        env.NEXT_PUBLIC_TARGET === "electron"
          ? "https://explorer.modular.cloud"
          : "",
      );

      return await jsonFetch<ResolutionResponse>(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
    retry: 2,
    placeholderData: keepPreviousData,
  });

  const amount = React.useMemo(() => {
    const node =
      nodeResponse.data &&
      nodeResponse.data.type === "success" &&
      nodeResponse.data.result;
    if (node && node.type === "completed" && node.sidebar?.Token?.payload) {
      const [value, denom] = node.sidebar.Token.payload.split(" ");
      const formattedDenom = denom.slice(1).toUpperCase();
      return `${Number(value) / 10 ** 18} ${
        formattedDenom.length > 7
          ? formattedDenom.slice(0, 7) + "..."
          : formattedDenom
      }`;
    }
    return null;
  }, [nodeResponse.data]);

  const node =
    nodeResponse.data &&
    nodeResponse.data.type === "success" &&
    nodeResponse.data.result;
  if (!node || !node.sidebar) return null;

  return (
    <div className="items-stretch self-stretch flex gap-1 max-md:justify-center">
      <Address address={node.sidebar.Sender.payload} />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.33341 5.33317L11.6465 7.64628C11.8418 7.84155 11.8418 8.15813 11.6465 8.35339L9.33341 10.6665M4.66674 5.33317L6.97986 7.64628C7.17512 7.84155 7.17512 8.15813 6.97986 8.35339L4.66674 10.6665"
          stroke="#272835"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="text-xs font-medium leading-4 self-center my-auto">
        {amount}
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.33341 5.33317L11.6465 7.64628C11.8418 7.84155 11.8418 8.15813 11.6465 8.35339L9.33341 10.6665M4.66674 5.33317L6.97986 7.64628C7.17512 7.84155 7.17512 8.15813 6.97986 8.35339L4.66674 10.6665"
          stroke="#272835"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <Address address={node.sidebar.Receiver.payload} />
    </div>
  );
}

export function FlowChart({ index }: { index: number }) {
  const params = useParams<{ network: string; path: string[] }>();
  const { network: slug, path } = parseHeadlessRouteVercelFix(params);
  const txHash = path[1];
  if (!slug || typeof slug !== "string" || !txHash) return null;

  return <FlowChartContent slug={slug} txHash={txHash} index={index} />;
}

type FlowChartContentProps = {
  slug: string;
  txHash: string;
  index: number;
};

function FlowChartContent({ slug, txHash, index }: FlowChartContentProps) {
  const { data = {} } = useQuery({
    queryKey: CACHE_KEYS.ibcCardFlow(slug, txHash, index),
    queryFn: ({ signal }) =>
      jsonFetch<IBCFlow>(`/api/ibc/${slug}/${txHash}/${index}`, { signal }),
  });

  return (
    <div className="border-b-[color:var(--gray-50,#ECEFF3)] bg-white flex flex-col items-stretch pl-4 pr-6 max-md:pr-5">
      <div className="flex w-full justify-between items-center gap-5 mt-3 flex-wrap">
        <div className="text-xs font-medium leading-4">IBC Transfer</div>
        <Transfer hash={txHash} slug={slug} />
      </div>
      <div className="items-stretch flex gap-2 mt-3 mb-4 max-md:max-w-full max-md:flex-wrap max-md:justify-center flex-col md:flex-row  ">
        <Node num={0} data={data?.transfer} />
        <Node num={1} data={data?.receive} />
        <Node num={2} data={data?.acknowledge} />
      </div>
    </div>
  );
}
