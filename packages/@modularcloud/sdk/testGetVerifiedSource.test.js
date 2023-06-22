const { createModularCloud } = require('@modularcloud/sdk');

// Mock fetch
global.fetch = jest.fn();

// Sample responses
const verificationResponse = {
  result: {
    sourceCode: "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract HelloWorld {\n\nstring saySomething;\n\nconstructor() {\n    saySomething = \"Hello World!\";\n}\n\nfunction speak() public view returns(string memory) {\n    return saySomething;\n}\n}"
  }
};

const sourceResponse = {
  result: {
    sourceCode: "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract HelloWorld {\n\nstring saySomething;\n\nconstructor() {\n    saySomething = \"Hello World!\";\n}\n\nfunction speak() public view returns(string memory) {\n    return saySomething;\n}\n}"
  }
};

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

    expect(result).toEqual({sourceCode: verificationResponse.result.sourceCode});
    expect(fetch).toHaveBeenCalledWith(
      'https://contract-verification.vercel.app/api/contract-verification/fetch-verified?contractaddress=0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40'
    );
  });

  it('should fail to verify contract with error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(cloud.evm.isContractVerified('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40')).rejects.toThrow('Failed to fetch verified contract');
  });

  it('should fetch verified source correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(sourceResponse)
    });

    const result = await cloud.evm.getVerifiedSource('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40');

    expect(result).toEqual({sourceCode: sourceResponse.result.sourceCode});
    expect(fetch).toHaveBeenCalledWith(
      'https://contract-verification.vercel.app/91002/contract-verification/source/0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40'
    );
  });

  it('should fail to fetch verified source with error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(cloud.evm.getVerifiedSource('91002', '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40')).rejects.toThrow('Failed to fetch verified contract source');
  });
});
