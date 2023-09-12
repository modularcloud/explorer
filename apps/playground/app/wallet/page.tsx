import { ethers } from "ethers";

const metadata = {
  compiler: {
    version: "0.8.7+commit.e28d00a7",
  },
  language: "Solidity",
  output: {
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "initialSupply",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "addedValue",
            type: "uint256",
          },
        ],
        name: "increaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    devdoc: {
      kind: "dev",
      methods: {
        "allowance(address,address)": {
          details: "See {IERC20-allowance}.",
        },
        "approve(address,uint256)": {
          details:
            "See {IERC20-approve}. NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.",
        },
        "balanceOf(address)": {
          details: "See {IERC20-balanceOf}.",
        },
        "decimals()": {
          details:
            "Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.",
        },
        "decreaseAllowance(address,uint256)": {
          details:
            "Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.",
        },
        "increaseAllowance(address,uint256)": {
          details:
            "Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.",
        },
        "name()": {
          details: "Returns the name of the token.",
        },
        "symbol()": {
          details:
            "Returns the symbol of the token, usually a shorter version of the name.",
        },
        "totalSupply()": {
          details: "See {IERC20-totalSupply}.",
        },
        "transfer(address,uint256)": {
          details:
            "See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `amount`.",
        },
        "transferFrom(address,address,uint256)": {
          details:
            "See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `amount`. - the caller must have allowance for ``from``'s tokens of at least `amount`.",
        },
      },
      version: 1,
    },
    userdoc: {
      kind: "user",
      methods: {},
      version: 1,
    },
  },
  settings: {
    compilationTarget: {
      "contracts/mcerc20.sol": "ERC20Token",
    },
    evmVersion: "london",
    libraries: {},
    metadata: {
      bytecodeHash: "ipfs",
    },
    optimizer: {
      enabled: false,
      runs: 200,
    },
    remappings: [],
  },
  sources: {
    "@openzeppelin/contracts/token/ERC20/ERC20.sol": {
      keccak256:
        "0xa56ca923f70c1748830700250b19c61b70db9a683516dc5e216694a50445d99c",
      license: "MIT",
      urls: [
        "bzz-raw://cac938788bc4be12101e59d45588b4e059579f4e61062e1cda8d6b06c0191b15",
        "dweb:/ipfs/QmV2JKCyjTVH3rkWNrfdJRhAT7tZ3usAN2XcnD4h53Mvih",
      ],
    },
    "@openzeppelin/contracts/token/ERC20/IERC20.sol": {
      keccak256:
        "0x287b55befed2961a7eabd7d7b1b2839cbca8a5b80ef8dcbb25ed3d4c2002c305",
      license: "MIT",
      urls: [
        "bzz-raw://bd39944e8fc06be6dbe2dd1d8449b5336e23c6a7ba3e8e9ae5ae0f37f35283f5",
        "dweb:/ipfs/QmPV3FGYjVwvKSgAXKUN3r9T9GwniZz83CxBpM7vyj2G53",
      ],
    },
    "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol": {
      keccak256:
        "0x8de418a5503946cabe331f35fe242d3201a73f67f77aaeb7110acb1f30423aca",
      license: "MIT",
      urls: [
        "bzz-raw://5a376d3dda2cb70536c0a45c208b29b34ac560c4cb4f513a42079f96ba47d2dd",
        "dweb:/ipfs/QmZQg6gn1sUpM8wHzwNvSnihumUCAhxD119MpXeKp8B9s8",
      ],
    },
    "@openzeppelin/contracts/utils/Context.sol": {
      keccak256:
        "0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7",
      license: "MIT",
      urls: [
        "bzz-raw://6df0ddf21ce9f58271bdfaa85cde98b200ef242a05a3f85c2bc10a8294800a92",
        "dweb:/ipfs/QmRK2Y5Yc6BK7tGKkgsgn3aJEQGi5aakeSPZvS65PV8Xp3",
      ],
    },
    "contracts/mcerc20.sol": {
      keccak256:
        "0x4945ee8994d4b4bb3f21259c3b05d70b1add6d6c1633ae4880581b146ba2de19",
      license: "MIT",
      urls: [
        "bzz-raw://0d4a2e4b1743ec59ed8b87eb94a8dbae684ebeb555369c5935b25d52a2614523",
        "dweb:/ipfs/QmcukNghvvqS1A4f8HCDiyuF2YD3dsHM1NKwDXLNdWL1XB",
      ],
    },
  },
  version: 1,
};

export default function Contract() {
    return (
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Contract Interface</h1>
        <h2 className="text-xl font-semibold mb-2">Functions</h2>
        {metadata.output.abi.map((item, index) => {
          if (item.type === 'function') {
            return (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <form>
                  {item.inputs.map((input, i) => (
                    <div key={i} className="mb-2">
                      <label className="font-medium">
                        {input.name} ({input.type}):
                        <input type="text" name={input.name} className="ml-2 p-1 border rounded" />
                      </label>
                    </div>
                  ))}
                  <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
                </form>
                <p className="font-medium">Outputs:</p>
                {item.outputs ? item.outputs.map((output, i) => (
                  <p key={i} className="ml-2">
                    {output.name} ({output.type})
                  </p>
                )) : null}
              </div>
            );
          }
          return null;
        })}
        {/* <h2 className="text-xl font-semibold mb-2">Events</h2>
        {metadata.output.abi.map((item, index) => {
          if (item.type === 'event') {
            return (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <form>
                  {item.inputs.map((input, i) => (
                    <div key={i} className="mb-2">
                      <label className="font-medium">
                        {input.name} ({input.type}):
                        <input type="text" name={input.name} className="ml-2 p-1 border rounded" />
                      </label>
                    </div>
                  ))}
                  <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
                </form>
              </div>
            );
          }
          return null;
        })} */}
      </div>
    );
    
}
