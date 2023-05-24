import Web3 from 'web3';
import solc from 'solc';
import { PrismaClient } from '@prisma/client';

// Initialize a Web3 instance connected to the Celestia-Mocha testnet
// (assuming the RPC URL is stored in process.env.MOCHA_RPC)
const web3 = new Web3(process.env.MOCHA_RPC);
const prisma = new PrismaClient();

// Step 1: Fetch the Contract from the Blockchain
async function fetchContractBytecode(contractAddress: string): Promise<string> {
  try {
    const bytecode = await web3.eth.getCode(contractAddress);
    console.log(bytecode);
    return bytecode;
  } catch (error) {
    console.error(`Could not fetch contract bytecode: ${error}`);
    throw error;
  }
}

// Compile a Solidity contract
const input = {
  language: 'Solidity',
  sources: {
    'contract.sol': {
      content: 'contract C { function f() public { } }',
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
const compiledBytecode = compiledContract.contracts['contract.sol']['C'].evm.bytecode.object;

// Fetch the bytecode of a specific contract
const contractAddress = 'yourContractAddress';
fetchContractBytecode(contractAddress)
  .then(async (bytecodeOnChain) => {
    console.log('Bytecode on chain:', bytecodeOnChain);
    console.log('Compiled bytecode:', compiledBytecode);

    // Step 3: Compare the bytecode on chain with the compiled bytecode
    const isVerified = bytecodeOnChain === compiledBytecode;

    // Step 4: Store Verification Data in Vercel Postgres
    try {
      const record = await prisma.verification.create({
        data: {
          contractAddress,
          isVerified,
          sourceCode: input.sources['contract.sol'].content,
          bytecode: compiledBytecode,
        },
      });
      console.log(record);
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })
  .catch((error) => console.error('An error occurred:', error));