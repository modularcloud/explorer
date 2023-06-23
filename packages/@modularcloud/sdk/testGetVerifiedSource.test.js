const { createModularCloud } = require('@modularcloud/sdk');
const { z } = require('zod');
const { fetchMock } = require('jest-fetch-mock');

// Mock fetch
global.fetch = jest.fn();

// Sample responses
const verificationResponse = {
  result: {
    id: '17',
    createdAt: 'Thu Jun 22 2023 21:49:10 GMT-0400',
    updatedAt: 'Thu Jun 22 2023 21:49:10 GMT-0400',
    verificationStatus: 'verified',
    contractAddress: '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40',
    chainID: '91002',
    isVerified: true,
    uploadedUrl: 'https://verified-contracts.s3.us-west-2.amazonaws.com/0x90cd9b9f69d1db3f66dd209784c90b92b0157b40/0x90cd9b9f69d1db3f66dd209784c90b92b0157b40_sourcefiles.zip',
    files: {
      'Caldera.sol': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HelloWorld {

string saySomething;

constructor() {
    saySomething = "Hello World!";
}

function speak() public view returns(string memory) {
    return saySomething;
}

}`
,
      'metadata.json': `{
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
    }
  }
};

const sourceResponse = {
  result: {
    id: '17',
    createdAt: 'Thu Jun 22 2023 21:49:10 GMT-0400',
    updatedAt: 'Thu Jun 22 2023 21:49:10 GMT-0400',
    verificationStatus: 'verified',
    contractAddress: '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40',
    chainID: '91002',
    isVerified: true,
    uploadedUrl: 'https://verified-contracts.s3.us-west-2.amazonaws.com/0x90cd9b9f69d1db3f66dd209784c90b92b0157b40/0x90cd9b9f69d1db3f66dd209784c90b92b0157b40_sourcefiles.zip',
    files: {
      'Caldera.sol': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HelloWorld {

string saySomething;

constructor() {
    saySomething = "Hello World!";
}

function speak() public view returns(string memory) {
    return saySomething;
}

}`
,
      'metadata.json': `{
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
    }
  }
};

const VerificationResponseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  verificationStatus: z.string(),
  contractAddress: z.string(),
  chainID: z.string(),
  isVerified: z.boolean(),
  uploadedUrl: z.string(),
  files: z.record(z.string())
});

describe('ModularCloud', () => {
  let cloud;
  let originalFetch;

  beforeEach(() => {
    cloud = createModularCloud('https://contract-verification.vercel.app');
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(verificationResponse),
      ok: true
    });
  });  

  afterEach(() => {
    jest.clearAllMocks();
  });  

  it('should verify contract correctly', async () => {
    jest.spyOn(global, 'fetch').mockReturnValueOnce(Promise.resolve({
      json: () => Promise.resolve(verificationResponse),
      ok: true
    }));
  
    const { files } = verificationResponse.result;
    const expectedResponse = { files };
  
    const result = await cloud.evm.isContractVerified('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40');
  
    expect(result.files).toEqual(expectedResponse.files);
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
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(sourceResponse),
      ok: true
    });
  
    const { files } = sourceResponse.result;
    const expectedResponse = { files };
  
    const result = await cloud.evm.getVerifiedSource('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40');
  
    expect(result.files).toEqual(expectedResponse.files);
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

  it('should validate the verification response schema correctly', () => {
    const validationResult = VerificationResponseSchema.safeParse(verificationResponse.result);
  
    expect(validationResult.success).toBe(true);
    expect(validationResult.data).toEqual(verificationResponse.result);
  });  
});