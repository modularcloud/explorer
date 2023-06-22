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

  

This documentation provides details on the two key API endpoints included within the contract verification system. These endpoints allow for the verification and retrieval of smart contracts, providing developers a way to check and validate their contracts.

  

**/api/contract-verification/verify-contract**

  

Request method:

POST

  

Description:

This endpoint is used to verify a smart contract. The verification is done by making an API call to a Sourcify service (or a localhost if no Sourcify URL is provided in the environment variables). Depending on the response from this service, a record is created in the database that stores the verification status of the contract.

  

Request Body:

```json

{

"contractAddress":  "string",

"files":  "Object",

"uploadedUrl":  "string"

}

```

  

* contractAddress: The Ethereum address of the contract you want to verify.

* files: The contract source files.

* uploadedUrl: The URL where the contract was uploaded.

  

Responses:

* 200 OK: The contract was verified successfully. The response body will contain data from the Sourcify service.

* 500 Internal Server Error: If the chainId isn't available for verification, or if there's an error while creating a record in the database, a 500 error will be returned along with an error message.

  

**/api/contract-verification/fetch-verified**

  

Request method:

GET

  

Description:

This endpoint is used to check if a contract has been previously verified.

  

Query parameters:

* contractaddress: The Ethereum address of the contract whose verification status you want to fetch.
* readfiles(Optional):  True or False If you want to get the data of uploadfiles as string added along with the contract verification data

  

Responses:

* 200 OK: The operation was successful. The response body will contain the verification data for the contract. If no contract is found with the provided address, { "isVerified": false } will be returned.

* 500 Internal Server Error: If there's an error while querying the database, a 500 error will be returned along with an error message.

  

### S3 File Upload

  

This documentation provides details on the two key API endpoints included within the S3 file upload system. These endpoints enable the generation of an S3 URL, which can be used to upload a file to an Amazon S3 bucket.

  

**/api/file-upload/generateurl**

  

Request method:

GET

  

Description:

This endpoint is used to generate an S3 URL for a specific file. The generated URL can be used to upload a file to an Amazon S3 bucket.

  

Query parameters:

* file: The name of the file for which you want to generate an S3 URL.

* contractaddress: The Ethereum address of the contract to which the file belongs.

  

Responses:

* 200 OK: The operation was successful. The response body will contain the generated S3 URL.

* 400 Bad Request: If the file or contractaddress parameters are not provided, a 400 error will be returned along with an error message.

  

**/api/file-upload/s3file-upload**

  

Request method:

This is not an API endpoint, but a function that is used by the generateurl endpoint to generate an S3 URL.

  

Description:

This function takes in a file name and a contract address, combines them to create a file address, and then uses AWS S3 SDK to generate a signed URL that can be used to upload the file to an S3 bucket.