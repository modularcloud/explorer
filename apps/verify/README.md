## Getting Started

First, run the development server:

```bash

yarn  dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Prisma

Prisma is an open-source database toolkit that simplifies database management, schema definition, and migrations. It allows you to interact with your database through a type-safe and auto-generated query builder.

The npx prisma generate command is used to generate the Prisma client. Prisma generates a client library based on your database schema, which provides type-safe methods for interacting with your database. This command should be executed whenever your schema changes.

To initialize Prisma in your project, run the following command:

```bash

npx prisma init

```

To generate the Prisma client, run the following command:

```bash

npx  prisma  generate

```

The npx prisma migrate command is used to manage database migrations. Migrations allow you to evolve your database schema over time without losing data. With Prisma, you can create new migrations, apply them, and revert them if necessary.

To create a new migration, run the following command:

```bash

npx  prisma  migrate  dev  --name  <migration_name>

```

To apply pending migrations to the database, run:

```bash

npx  prisma  migrate  deploy

```

## API

### Contract Verification

This documentation provides details on the three key API endpoints included within the contract verification system. These endpoints allow for the verification and retrieval of smart contracts, providing developers with a way to check and validate their contracts.

**/api/contract-verification/verify-contract**

Request method:

POST

Description:

Verifies the provided smart contract code against the deployed contract address. This endpoint is used to ensure that the deployed contract matches the submitted source code. 

Request Body:

```json
{
  "contractAddress": "string",

  "files": "Object",

  "chain": "string"
}
```
Example Data:
``` {
  "contractAddress": "0x329d0c10A7d86f9d80d520B78990e46224720131",
  "chain": "88002",
  "files": {
    "HelloWorld_metadata.json": "{\n\t\"compiler\": {\n\t\t\"version\": \"0.8.18+commit.87f61d96\"\n\t},\n\t\"language\": \"Solidity\",\n\t\"output\": {\n\t\t\"abi\": [\n\t\t\t{\n\t\t\t\t\"inputs\": [],\n\t\t\t\t\"stateMutability\": \"nonpayable\",\n\t\t\t\t\"type\": \"constructor\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"inputs\": [],\n\t\t\t\t\"name\": \"speak\",\n\t\t\t\t\"outputs\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"internalType\": \"string\",\n\t\t\t\t\t\t\"name\": \"\",\n\t\t\t\t\t\t\"type\": \"string\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"stateMutability\": \"view\",\n\t\t\t\t\"type\": \"function\"\n\t\t\t}\n\t\t],\n\t\t\"devdoc\": {\n\t\t\t\"kind\": \"dev\",\n\t\t\t\"methods\": {},\n\t\t\t\"version\": 1\n\t\t},\n\t\t\"userdoc\": {\n\t\t\t\"kind\": \"user\",\n\t\t\t\"methods\": {},\n\t\t\t\"version\": 1\n\t\t}\n\t},\n\t\"settings\": {\n\t\t\"compilationTarget\": {\n\t\t\t\"HelloWorld.sol\": \"HelloWorld\"\n\t\t},\n\t\t\"evmVersion\": \"paris\",\n\t\t\"libraries\": {},\n\t\t\"metadata\": {\n\t\t\t\"bytecodeHash\": \"ipfs\"\n\t\t},\n\t\t\"optimizer\": {\n\t\t\t\"enabled\": false,\n\t\t\t\"runs\": 200\n\t\t},\n\t\t\"remappings\": []\n\t},\n\t\"sources\": {\n\t\t\"HelloWorld.sol\": {\n\t\t\t\"keccak256\": \"0x8f54065335b9a9019f30a20b9e2cb182aeec5d823ded5c67e71c22f42422b892\",\n\t\t\t\"license\": \"MIT\",\n\t\t\t\"urls\": [\n\t\t\t\t\"bzz-raw://21b5e98caff1f4831c23977aa77c9063fe735d843cb722ebda428715f586dcf2\",\n\t\t\t\t\"dweb:/ipfs/QmSk3zRdU2fxWEaw7em9PJ6LJuupxWgM1snGwqbNZgBB2W\"\n\t\t\t]\n\t\t}\n\t},\n\t\"version\": 1\n}",
    "HelloWorld.sol": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract HelloWorld {\n\n    string saySomething;\n\n    constructor() {\n        saySomething = \"Hello World!\";\n    }\n\n    function speak() public view returns(string memory) {\n        return saySomething;\n    }\n}"
  }
} 
```

The body of the request must be a JSON object with the following properties:

- address: The smart contract address that needs to be verified.

- files: The contract source files inside a string.

- chain: The ID of the blockchain where the contract has been deployed.

Responses:

- 200 OK: The contract was verified successfully. The JSON response body will contain information about the contract address and if the contract was verified fully or partially.
	-	eg: 
	```
	 { "result": [ { "address": "0x123f681646d4a755815f9cb19e1acc8565a0c2ac", "chainId": "1", "status": "perfect", "libraryMap": { "lib1": "0x3f681646d4a755815f9cb19e1acc8565a0c2ac", "lib2": "0x4f681646d4a755815f9cb19e1acc8565a0c2ac" } } ] }  
- 400 Bad Request: It can be returned due to the errors mentioned below 
	- Unexpected token in JSON:
		eg.: 
		```
		 {  "error":  "Unexpected token ' in JSON at position 107"  }
		 ```
	- Metadata file not found.
		eg.:
		```
		{  "error":  "Metadata file not found. Did you include \"metadata.json\"?"  }
		 ```
	 - Validation Error  address:
	 eg: 	 
		 ```
		{"message":  "Validation Error: address", "errors":  [{"field":"address" "message":  "Invalid addresses: Contract Address"}]}
	
- 404 Not found:  
	- Couldn't extract files from the request.
		eg: 
		```
		{  "error":  "Couldn't extract files from the request. Please make sure you have added files"  }
		 ```
- 500 Internal Server Error:  
	-	All the other errors including compilation mismatch and resources missing 

**/api/contract-verification/persist-verified**

Request method:

POST

Description: 
This endpoint is used to persist the verified contracts in the database. 

Request Body:
 ``` 
 {"verificationStatus": "string",
  "contractAddress": "string",
  "chainID": "string",
  "isVerified": "boolean",
  "uploadedUrl": "string",}
 ```
 The body of the request must be a JSON object with the following properties:
- verificationStatus: Indicates  whether the contract is fully verified or partially verified 
- contractAddress: The smart contract address Which has been verified.
- chainId: The ID of the blockchain where the contract has been deployed.
- isVerified:  Indicates whether the contract has been verified or not, with `true` representing a successful verification and `false` indicating a failed or incomplete verification.
- uploadedUrl: Contains the URL where the files associated with the contract have been stored
	
Responses:
- 200 OK: The operation was successful. The response body will contain the verification data for the contract. 
	- Eg:
	```
	{
  "Id": 17,
  "ContractAddress": "0x90cd9b9f69d1db3f66dd209784c90b92b0157b40",
  "ChainID": 91002,
  "IsVerified": true,
  "CreatedAt": "2023-06-22 21:49:10+05:30",
  "UpdatedAt": "2023-06-22 21:49:10+05:30"
  "VerificationStatus": "FULL",
  "UploadedUrl": "https://verified-contracts.s3.us-west-2.amazonaws.com/0x90cd9b9f69d1db3f66dd209784c90b92b0157b40/0x90cd9b9f69d1db3f66dd209784c90b92b0157b40_sourcefiles.zip"
  }
  ```


- 500 Internal Server Error: If there's an error while querying the database, a 500 error will be returned along with an error message.

 

**/api/contract-verification/fetch-verified**

Request method:

GET

Description:

This endpoint is used to check if a contract has been previously verified.

Query parameters:

- contractaddress: The Ethereum address of the contract whose verification status you want to fetch.
- readfiles(Optional): True or False If you want to get the data of uploadfiles as string added along with the contract verification data

If `readFiles` is `true`, the response schema will look like this:

```
{
  "id": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "verificationStatus": "string",
  "contractAddress": "string",
  "chainID": "string",
  "isVerified": "boolean",
  "uploadedUrl": "string",
  "files": "Object"
}
```

Responses:

- 200 OK: The operation was successful. The response body will contain the verification data for the contract. If no contract is found with the provided address, { "isVerified": false } will be returned.

- 500 Internal Server Error: If there's an error while querying the database, a 500 error will be returned along with an error message.

### S3 File Upload

This documentation provides details on the two key API endpoints included within the S3 file upload system. These endpoints enable the generation of an S3 URL, which can be used to upload a file to an Amazon S3 bucket.

**/api/file-upload/generateurl**

Request method:

GET

Description:

This endpoint is used to generate an S3 URL for a specific file. The generated URL can be used to upload a file to an Amazon S3 bucket.

Query parameters:

- file: The name of the file for which you want to generate an S3 URL.

- contractaddress: The Ethereum address of the contract to which the file belongs.

Responses:

- 200 OK: The operation was successful. The response body will contain the generated S3 URL.

- 400 Bad Request: If the file or contractaddress parameters are not provided, a 400 error will be returned along with an error message.

**/api/file-upload/s3file-upload**

Request method:

This is not an API endpoint, but a function that is used by the generateurl endpoint to generate an S3 URL.

Description:

This function takes in a file name and a contract address, combines them to create a file address, and then uses AWS S3 SDK to generate a signed URL that can be used to upload the file to an S3 bucket.
