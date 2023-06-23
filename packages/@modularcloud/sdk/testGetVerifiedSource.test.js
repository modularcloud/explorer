const { createModularCloud } = require('@modularcloud/sdk');
const { z } = require('zod');

// Mock fetch
global.fetch = jest.fn();

// Sample responses
const verificationResponse = {
  result: {
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HelloWorld {

string saySomething;

constructor() {
    saySomething = "Hello World!";
}

function speak() public view returns(string memory) {
    return saySomething;
}

}
{
  "compiler": {
    "version": "0.8.18+commit.87f61d96"
  },
  "language": "Solidity",
  "output": {
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "speak",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "devdoc": {
      "kind": "dev",
      "methods": {},
      "version": 1
    },
    "userdoc": {
      "kind": "user",
      "methods": {},
      "version": 1
    }
  },
  "settings": {
    "compilationTarget": {
      "Caldera.sol": "HelloWorld"
    },
    "evmVersion": "paris",
    "libraries": {},
    "metadata": {
      "bytecodeHash": "ipfs"
    },
    "optimizer": {
      "enabled": false,
      "runs": 200
    },
    "remappings": []
  },
  "sources": {
    "Caldera.sol": {
      "keccak256": "0x8f54065335b9a9019f30a20b9e2cb182aeec5d823ded5c67e71c22f42422b892",
      "license": "MIT",
      "urls": [
        "bzz-raw://21b5e98caff1f4831c23977aa77c9063fe735d843cb722ebda428715f586dcf2",
        "dweb:/ipfs/QmSk3zRdU2fxWEaw7em9PJ6LJuupxWgM1snGwqbNZgBB2W"
      ]
    }
  },
  "version": 1
}`
},
}

const sourceResponse = {
  result: {
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HelloWorld {

string saySomething;

constructor() {
    saySomething = "Hello World!";
}

function speak() public view returns(string memory) {
    return saySomething;
}

}
{
  "compiler": {
    "version": "0.8.18+commit.87f61d96"
  },
  "language": "Solidity",
  "output": {
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "speak",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "devdoc": {
      "kind": "dev",
      "methods": {},
      "version": 1
    },
    "userdoc": {
      "kind": "user",
      "methods": {},
      "version": 1
    }
  },
  "settings": {
    "compilationTarget": {
      "Caldera.sol": "HelloWorld"
    },
    "evmVersion": "paris",
    "libraries": {},
    "metadata": {
      "bytecodeHash": "ipfs"
    },
    "optimizer": {
      "enabled": false,
      "runs": 200
    },
    "remappings": []
  },
  "sources": {
    "Caldera.sol": {
      "keccak256": "0x8f54065335b9a9019f30a20b9e2cb182aeec5d823ded5c67e71c22f42422b892",
      "license": "MIT",
      "urls": [
        "bzz-raw://21b5e98caff1f4831c23977aa77c9063fe735d843cb722ebda428715f586dcf2",
        "dweb:/ipfs/QmSk3zRdU2fxWEaw7em9PJ6LJuupxWgM1snGwqbNZgBB2W"
      ]
    }
  },
  "version": 1
}`
},
}


// Define the VerificationResponseSchema
const VerificationResponseSchema = z.object({
  files: z.record(z.string())
});

describe('ModularCloud', () => {
  let cloud;

  beforeEach(() => {
    cloud = createModularCloud('https://contract-verification.vercel.app');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify contract correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(verificationResponse)
    });

    const result = await cloud.evm.isContractVerified('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40');

    expect(result).toEqual({ sourceCode: verificationResponse.result.sourceCode });
    expect(fetch).toHaveBeenCalledWith(
      'https://contract-verification.vercel.app/api/contract-verification/fetch-verified?contractaddress=0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40'
    );
  });

  it('should fail to verify contract with error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(cloud.evm.isContractVerified('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40')).rejects.toThrow(
      'Failed to fetch verified contract'
    );
  });

  it('should fetch verified source correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(sourceResponse)
    });
  
    const result = await cloud.evm.getVerifiedSource('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40');
  
    expect(result).toEqual({ sourceCode: sourceResponse.result.sourceCode });
    expect(fetch).toHaveBeenCalledWith(
      'https://contract-verification.vercel.app/91002/contract-verification/source/0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40'
    );
  });  

  it('should fail to fetch verified source with error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(cloud.evm.getVerifiedSource('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40')).rejects.toThrow(
      'Failed to fetch verified contract source'
    );    
  });
});