export type Block = {
  id: number;
  height: number;
  createdAt: number;
  minerAddress: string;
  blockreward: number;
};

export type Transaction = {
  id: number;
  hash: string;
  from: string;
  recipient: string;
  amount: number;
  timestamp: number;
};

export const MockBlockData: Block[] = [
  {
    id: 1,
    height: 17108874,
    createdAt: 1682947662404,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2000,
  },
  {
    id: 2,
    height: 17108873,
    createdAt: 1682947654404,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2345.29,
  },
  {
    id: 3,
    height: 17108870,
    createdAt: 1682947653384,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2000,
  },
  {
    id: 4,
    height: 17108869,
    createdAt: 1682947653400,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2345.29,
  },
  {
    id: 5,
    height: 17108874,
    createdAt: 1682947653390,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2000,
  },
  {
    id: 6,
    height: 17108873,
    createdAt: 1682947653382,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2345.29,
  },
  {
    id: 7,
    height: 17108870,
    createdAt: 1682947653284,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2000,
  },
  {
    id: 8,
    height: 17108869,
    createdAt: 1682947653384,
    minerAddress: "0xa8CF2fA4850f0Cd524AF5474bC33325D5b3d5E13",
    blockreward: 2345.29,
  },
];

export const MockTransactionsData: Transaction[] = [
  {
    id: 1,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 100,
    timestamp: new Date().getTime(),
  },
  {
    id: 2,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 1000,
    timestamp: new Date().getTime(),
  },
  {
    id: 3,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 2003,
    timestamp: new Date().getTime(),
  },
  {
    id: 4,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 1000,
    timestamp: new Date().getTime(),
  },
  {
    id: 5,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 2364.34,
    timestamp: new Date().getTime(),
  },
  {
    id: 6,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 1000,
    timestamp: new Date().getTime(),
  },
  {
    id: 7,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 100,
    timestamp: new Date().getTime(),
  },
  {
    id: 8,
    hash: "0x68aeb3dbb09735e7ddf1f07df53d0218aaee35277f04fbbc950555520efe5c19",
    from: "0xc749a72E92b78B7AC0E23E372358446992f1613C",
    recipient: "0xAD93D04a1BeB076Dc18FD0EA11CcDB60B7A3eD98",
    amount: 1000,
    timestamp: new Date().getTime(),
  },
];

export const MockShortcutsData = [
  {
    title: "Search",
    key: "/",
    code: 191,
  },
  {
    title: "Latest block",
    key: "E",
    code: 69,
  },
  {
    title: "Clipboard",
    key: "⌥",
    code: 18,
  },
  {
    title: "Search blocks",
    key: "B",
    code: 66,
  },
  {
    title: "Search hash",
    key: "O",
    code: 79,
  },
];
