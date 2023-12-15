import {
  IBCTransferEvent,
  IBCTransferEventCard,
} from "~/ui/network-widgets/widgets/ibc-transfert-event-card";

export type DymensionWidgetLayoutProps = {};

// TODO : To remove
const events = [
  {
    type: "transfer",
    hash: "e77b964d4dbc360a897395155073cbede22f12601111a59e0f225c0ff4370544",
    timestamp: 1702296520839,
    amount: "1000000000000 DYM",
    from: {
      address: "dym1p8mwxtsavrczm0qs8v9vnd7aexf8x28lezdp2l",
      chainName: "Froopyland",
      chainSlug: "dymension-froopyland",
      chainLogo:
        "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png",
    },
    to: {
      address: "ethm1p8mwxtsavrczm0qs8v9vnd7aexf8x28ls309vn",
      chainName: "RollApp (amazing)",
      chainSlug: "amazing_4113393-1",
      chainLogo:
        "https://github.com/dymensionxyz/rollapp-registry/blob/main/devnet/amazing_4113393-1/logos/amazing_4113393-1.png?raw=true",
    },
  },
  {
    type: "transfer",
    hash: "fccda1375a88aef26cd1bfc9d321264af28fdb02584a584a4c7c5835f4af8393",
    timestamp: 1702296520839,
    amount: "1000000000000 DYM",
    from: {
      address: "dym1qxj86tzvevqxztyvme75hmthqx6aa8sghetjz7",
      chainName: "Froopyland",
      chainSlug: "dymension-froopyland",
      chainLogo:
        "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png",
    },
    to: {
      address: "ethm19xjf3r9j6uvyktas5pw8wye525t4wy6e0sp7uc",
      chainName: "RollApp (augustine)",
      chainSlug: "augustine_7670520-1",
      chainLogo:
        "https://github.com/dymensionxyz/rollapp-registry/blob/main/devnet/augustine_7670520-1/logos/augustine_7670520-1.png?raw=true",
    },
  },
  {
    type: "transfer",
    hash: "a1ef301f46d5938dfa1a579b16bd6938d5bfa0911ef7f781d566cbe0d014c3ee",
    timestamp: 1702296520839,
    amount: "500000000000 DYM",
    from: {
      address: "dym1kcz8asczdhm8fsqwznm40kcvwjq2l6p7g73f30",
      chainName: "Froopyland",
      chainSlug: "dymension-froopyland",
      chainLogo:
        "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png",
    },
    to: {
      address: "ethm1hmssffakpll0d3hesk2j8s286zd9yfv0pzlcag",
      chainName: "RollApp (rues)",
      chainSlug: "rues_2215298-1",
      chainLogo:
        "https://github.com/dymensionxyz/rollapp-registry/blob/main/devnet/rues_2215298-1/logos/rues_2215298-1.jpg?raw=true",
    },
  },
  {
    type: "transfer",
    hash: "484e843175e04e8be2b194adbec1a492f8d8f8e38f5a268fd39717c3035cd46e",
    timestamp: 1702296515009,
    amount: "7000000000000 DYM",
    from: {
      address: "dym1s44a7zg2q3s4dqudaggv62t3l9s4spkp2ycm4g",
      chainName: "Froopyland",
      chainSlug: "dymension-froopyland",
      chainLogo:
        "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png",
    },
    to: {
      address: "ethm1s44a7zg2q3s4dqudaggv62t3l9s4spkprh6lny",
      chainName: "RollApp (ongtrong)",
      chainSlug: "ongtrong_3365809-1",
      chainLogo:
        "https://github.com/dymensionxyz/rollapp-registry/blob/main/devnet/ongtrong_3365809-1/logos/ongtrong_3365809-1.jpg?raw=true",
    },
  },
] satisfies Array<IBCTransferEvent>;

export async function DymensionWidgetLayout({}: DymensionWidgetLayoutProps) {
  return (
    <ul>
      {events.map((event, index) => (
        <li key={event.hash} className="flex flex-col items-center">
          <IBCTransferEventCard event={event} />
          {index < events.length - 1 && (
            <div aria-hidden="true" className="w-[1px] bg-mid-dark-100 h-4" />
          )}
        </li>
      ))}
    </ul>
  );
}
