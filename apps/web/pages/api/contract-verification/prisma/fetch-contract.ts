/* eslint-disable turbo/no-undeclared-env-vars */
const solc = require('solc');
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const axios = require('axios');

const app = express();

// Middlewares
app.use(bodyParser.json());

// Initialize a Web3 instance connected to the Eclipse testnet
// eslint-disable-next-line turbo/no-undeclared-env-vars
const web3 = new Web3(process.env.WEB3_PROVIDER_URL);
const prisma = new PrismaClient();

// Fetch the Contract from the Blockchain
const fetchContractBytecode = async (contractAddress) => {
  try {
    const bytecode = await web3.eth.getCode(contractAddress);
    return bytecode;
  } catch (error) {
    console.error(`Could not fetch contract bytecode: ${error}`);
    throw new Error(`Could not fetch contract bytecode: ${error}`);
  }
};

// Compile a Solidity contract
const compileContract = (sourceCode) => {
  const input = {
    language: 'Solidity',
    sources: {
      'contract.sol': {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
  return compiledContract.contracts['contract.sol']['C'].evm.bytecode.object;
};

// Verify contract using Sourcify API
const verifyContractWithSourcify = async (bytecode) => {
  try {
    const response = await axios.post('https://api.sourcify.dev/verify', {
      bytecode,
    });
    const { verified, sourceCode, abi } = response.data;
    return { verified, sourceCode, abi };
  } catch (error) {
    console.error('An error occurred during contract verification with Sourcify:', error);
    throw new Error('Contract verification with Sourcify failed');
  }
};

// Verify contract using Etherscan API
const verifyContractWithEtherscan = async (bytecode) => {
  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'contract',
        action: 'getsourcecode',
        bytecode,
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });
    const { status, result } = response.data;
    if (status === '1' && result && result.length > 0) {
      const { SourceCode, ABI } = result[0];
      return { verified: true, sourceCode: SourceCode, abi: ABI };
    } else {
      return { verified: false, sourceCode: null, abi: null };
    }
  } catch (error) {
    console.error('An error occurred during contract verification with Etherscan:', error);
    throw new Error('Contract verification with Etherscan failed');
  }
};

app.post('/verify', async (req, res) => {
  const { contractAddress, sourceCode } = req.body;

  // Fetch the bytecode of the specific contract
  try {
    const bytecodeOnChain = await fetchContractBytecode(contractAddress);

    // Search existing verified contracts in our DB to match the bytecode with source code/ABI
    const existingContract = await prisma.verification.findFirst({
      where: {
        bytecode: bytecodeOnChain,
      },
    });

    if (existingContract) {
      // Bytecode matches an existing contract in our DB
      res.json({ message: 'Contract verification completed', record: existingContract });
      return;
    }

    // Verify contract with Sourcify API
    const sourcifyResult = await verifyContractWithSourcify(bytecodeOnChain);
    if (sourcifyResult.verified) {
      // Contract is verified by Sourcify
      const { sourceCode: verifiedSourceCode, abi: verifiedAbi } = sourcifyResult;
      // Store Verification Data in the database
      const record = await prisma.verification.create({
        data: {
          contractAddress,
          isVerified: true,
          sourceCode: verifiedSourceCode,
          bytecode: bytecodeOnChain,
          abi: verifiedAbi,
        },
      });
      res.json({ message: 'Contract verification completed', record });
      return;
    }

    // Verify contract with Etherscan API
    const etherscanResult = await verifyContractWithEtherscan(bytecodeOnChain);
    if (etherscanResult.verified) {
      // Contract is verified by Etherscan
      const { sourceCode: verifiedSourceCode, abi: verifiedAbi } = etherscanResult;
      // Store Verification Data in the database
      const record = await prisma.verification.create({
        data: {
          contractAddress,
          isVerified: true,
          sourceCode: verifiedSourceCode,
          bytecode: bytecodeOnChain,
          abi: verifiedAbi,
        },
      });
      res.json({ message: 'Contract verification completed', record });
      return;
    }

    // Contract verification not found, ask user for source code and compile it
    const compiledBytecode = compileContract(sourceCode);
    const isVerified = bytecodeOnChain === compiledBytecode;

    // Store Verification Data in the database
    const record = await prisma.verification.create({
      data: {
        contractAddress,
        isVerified,
        sourceCode,
        bytecode: compiledBytecode,
      },
    });

    res.json({ message: 'Contract verification completed', record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during contract verification' });
  } finally {
    await prisma.$disconnect();
  }
});

// eslint-disable-next-line turbo/no-undeclared-env-vars
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
