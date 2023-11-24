"use client";

import type { Value } from "@modularcloud/headless";
import Image from "next/image";
import { cn } from "../shadcn/utils";
import useSWR from "swr";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo } from "react";

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
      type: "pending";
      label: string;
      waitingFor?: string;
      image?: string;
    };

type Props = {
  title: string;
  nodes: Node[];
  transfer: {
    from: string;
    to: string;
    amount: string;
    denom: string;
  };
};

function Node({
  isNext,
  step,
}: {
  node: Node;
  isNext?: boolean;
  step: number;
}) {
  const body = {
    resolverId: "rollapp-ibc-0.0.0",
    input: {
      hash: "0D75ED0D780CCF66D20A3B2A5DED59190103832B03382A40DF67F5EF694541F0",
      step,
      slug: "coinhunterstrrollapp_9084503-1",
    },
  };
  const label = ["Transfer", "Received", "Received", "Acknowledgement"][step];
  const nodeResponse = useSWR(
    ["/api/resolve/transactions", body],
    async () => {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    },
    {
      //refreshInterval: THIRTY_SECONDS,
      errorRetryCount: 2,
      keepPreviousData: true,
      revalidateOnFocus: false, // don't revalidate on window focus as it can cause rate limit errors
      placeholderData: {
        type: "pending",
        label,
        waitingFor: "test",
        //waitingFor: label === "received" ? "receipt" : undefined
      },
    },
  );
  const time = useMemo(() => {
    const node = nodeResponse.data?.result;
    if (node && node.timestamp) {
      dayjs.extend(relativeTime);
      return dayjs(node.timestamp * 1000).fromNow();
    }
    return null;
  }, [nodeResponse.data]);
  if (!nodeResponse.data) return null;
  const node = nodeResponse.data.result;
  if (step === 0) console.log(node.sidebar.Sender.payload);
  if (step === 0) console.log(node.sidebar.Receiver.payload);
  if (step === 0) console.log(node.sidebar);

  let colors =
    "border-[color:var(--gray-50,#ECEFF3)] bg-slate-50 text-[#272835]";
  if (isNext) {
    colors =
      "border-[color:var(--yellow-100,#FAEDCC)] bg-yellow-50 text-yellow-900";
  }
  if (node.type === "completed") {
    colors = "border-[color:var(--green-100,#DDF3EF)] bg-teal-50 text-teal-900";
  }
  return (
    <div
      className={cn(
        "border flex grow basis-[0%] flex-col items-stretch p-2.5 rounded-lg border-solid",
        colors,
      )}
    >
      <div className="flex items-stretch justify-between gap-2">
        <div className="items-center shadow bg-white flex aspect-square flex-col p-1 rounded-md">
          {node.image ? (
            <div className="rounded-full overflow-hidden">
              <Image
                src={node.image}
                width={20}
                height={20}
                alt={`${node.label} chain logo`}
                // className="aspect-square object-contain object-center w-5 overflow-hidden"
              />
            </div>
          ) : null}
        </div>
        <div className="text-sm font-medium leading-5 tracking-tight self-center grow whitespace-nowrap my-auto">
          {node.label}
        </div>
      </div>
      {node.type === "completed" ? (
        <div className="flex justify-between align-items gap-5 mt-4">
          <div className="text-xs font-medium leading-4">
            {node.shortId ?? node.id}
          </div>
          <div className="text-right text-xs font-medium leading-4 self-stretch whitespace-nowrap">
            {time}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden text-ellipsis text-xs font-medium leading-4 whitespace-nowrap mt-4">
          {`Waiting for ${(node.waitingFor ?? node.label).toLowerCase()}...`}
        </div>
      )}
    </div>
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

function Transfer() {
    const body = {
        resolverId: "rollapp-ibc-0.0.0",
        input: {
          hash: "0D75ED0D780CCF66D20A3B2A5DED59190103832B03382A40DF67F5EF694541F0",
          step: 0,
          slug: "coinhunterstrrollapp_9084503-1",
        },
      };
    const nodeResponse = useSWR(
        ["/api/resolve/transactions", body],
        async () => {
          const response = await fetch("/api/resolve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          return data;
        },
        {
          //refreshInterval: THIRTY_SECONDS,
          errorRetryCount: 2,
          keepPreviousData: true,
          revalidateOnFocus: false, // don't revalidate on window focus as it can cause rate limit errors
        },
      );
        const amount = useMemo(() => {
            const node = nodeResponse.data?.result;
            if (node && node.sidebar.Token.payload) {
                const [value, denom] = node.sidebar.Token.payload.split(" ");
                return `${Number(value) / 10 ** 18} ${denom.slice(1).toUpperCase()}`
            }
            return null;
        }, [nodeResponse.data]);
        const node = nodeResponse.data?.result;
        if (!node) return null;
        return <div className="items-stretch self-stretch flex gap-1 max-md:justify-center">
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
}

export function FlowChart() {
  const props: Props = {
    title: "IBC Transfer",
    transfer: {
      from: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      to: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      amount: "14",
      denom: "ATOM",
    },
    nodes: [
      {
        type: "completed",
        id: "1",
        shortId: "1",
        label: "Transfer",
        timestamp: "7 Min Ago",
        link: "https://google.com",
        //sidebar: {},
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/7aa5a24f-c7a1-479b-bbc3-ebc91e890a3b?apiKey=4eb9542baac94fe8b4d3b82e21ed7c3a&",
      },
      {
        type: "pending",
        label: "Received",
        waitingFor: "receipt",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/27f754ac-8120-4aaa-952b-56daf8bb7a9a?apiKey=4eb9542baac94fe8b4d3b82e21ed7c3a&",
      },
      {
        type: "pending",
        label: "Received",
        waitingFor: "receipt",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/27f754ac-8120-4aaa-952b-56daf8bb7a9a?apiKey=4eb9542baac94fe8b4d3b82e21ed7c3a&",
      },
      {
        type: "pending",
        label: "Acknowledgement",
        waitingFor: "acknowledgement",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/7aa5a24f-c7a1-479b-bbc3-ebc91e890a3b?apiKey=4eb9542baac94fe8b4d3b82e21ed7c3a&",
      },
    ],
  } as any;
  return (
    <div className="border-b-[color:var(--gray-50,#ECEFF3)] bg-white flex flex-col items-stretch pl-4 pr-6 max-md:pr-5">
      <div className="flex w-full justify-between items-center gap-5 mt-3 flex-wrap">
        <div className="text-xs font-medium leading-4">{props.title}</div>
        <Transfer />
      </div>
      <div className="items-stretch flex gap-2 mt-3 mb-4 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
        {props.nodes.map((node, index, nodes) => (
          <Node
            key={index}
            node={node}
            // isNext={node.type === "pending" && nodes[index - 1].type === "completed"}
            step={index}
          />
        ))}
      </div>
    </div>
  );
}

