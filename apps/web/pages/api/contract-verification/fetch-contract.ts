import express from 'express';
import bodyParser from 'body-parser';
import Web3 from 'web3';
import solc from 'solc';
import { PrismaClient, Verification } from '@prisma/client';

const app = express();

// Middlewares
app.use(bodyParser.json());

// Initialize a Web3 instance connected to the Celestia-Mocha testnet
const web3 = new Web3(process.env.MOCHA_RPC);
const prisma = new PrismaClient();

// Compile a Solidity contract
const compileContract = (sourceCode: string) => {
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
}

app.post('/verify', async (req: { body: { contractAddress: any; sourceCode: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; json: (arg0: { message: string; record: Verification; }) => void; }) => {
  const { contractAddress, sourceCode } = req.body;

  // Fetch the Contract from the Blockchain
  const fetchContractBytecode = async (contractAddress: string): Promise<string> => {
    try {
      const bytecode = await web3.eth.getCode(contractAddress);
      return bytecode;
    } catch (error) {
      console.error(`Could not fetch contract bytecode: ${error}`);
      res.status(500).json({ error: `Could not fetch contract bytecode: ${error}` });
    }
  };

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));