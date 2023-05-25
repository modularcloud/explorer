import { fetchContractBytecode } from './fetch-contract';

const Web3 = require('web3');

// Create a Web3 instance connected to the appropriate network
const web3 = new Web3(process.env.WEB3_PROVIDER_URL);

// Call the fetchContractBytecode function with a contract address
const contractAddress = '0x254A2867D1B653Bf93456A3B5B74cb8edf5C3B71';   // Change this to your dynamic contract address (thi is simply a test contract)
fetchContractBytecode(contractAddress)
  .then((bytecode) => {
    console.log('Contract bytecode:', bytecode);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
