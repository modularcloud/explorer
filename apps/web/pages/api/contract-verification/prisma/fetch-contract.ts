const solc = require('solc');
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');

const app = express();

// Middlewares
app.use(bodyParser.json());

// Initialize a Web3 instance connected to the Eclipse testnet
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

app.post('/verify', async (req, res) => {
  const { contractAddress, sourceCode } = req.body;

  // Fetch the bytecode of the specific contract
  try {
    const bytecodeOnChain = await fetchContractBytecode(contractAddress);
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

    // Send response
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
