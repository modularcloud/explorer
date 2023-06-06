import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { PrismaClient } from '@prisma/client'
import verifyContract from './contract-verification' // path to your handler

// Create prisma instance
const prisma = new PrismaClient()

// Define our mocked endpoints
const handlers = [
  // Intercept POST requests to our local sourcify instance
  rest.post('http://localhost:5555/', (req, res, ctx) => {
    // Mock successful response
    return res(ctx.json({ result: [{ status: "perfect" }] }))
  }),
]

// Setup requests interception
const server = setupServer(...handlers)

beforeAll(() => {
  // Enable requests interception
  server.listen()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})

describe('verifyContract handler', () => {
  it('verifies contract and inserts record into database', async () => {
    // Mock request and response
    const req: any = {
      body: {
        contractAddress: "0x254A2867D1B653Bf93456A3B5B74cb8edf5C3B71",
        chainId: "91002",   // Nautilus Triton testnet
        files: [
          {
            fileName: "Contract.sol",
            content: "This is mock file content",
          },
        ],
      },
    }

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    // Invoke the handler
    await verifyContract(req, res)

    // Expect the handler to respond with a 200 status
    expect(res.status).toHaveBeenCalledWith(200)

    // Check database record
    const record = await prisma.verification.findUnique({
      where: {
        contractAddress: req.body.contractAddress,
      },
    })
    
    expect(record?.verificationStatus).toBe("FULL")
    expect(record?.contractAddress).toBe(req.body.contractAddress)
    expect(record?.chainID).toBe(req.body.chainId)
    expect(record?.isVerified).toBe(true)
    expect(record?.sourceCode).toStrictEqual(req.body.files[0].content)    

    // Clean up the database
    await prisma.verification.deleteMany()
  }, 60000) // 60 seconds timeout for this test case
})