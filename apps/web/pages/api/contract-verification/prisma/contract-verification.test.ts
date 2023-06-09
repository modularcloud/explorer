import { Prisma, PrismaClient, Verification } from "@prisma/client";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { NextApiRequest, NextApiResponse } from 'next';
import verifyContract from './contract-verification';
import prisma from '../../../../../web/prisma/lib/prisma';

const mockVerification = {
  id: 1,
  contractAddress: '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40',
  chainID: '91002',
  isVerified: true,
  sourceCode: 'This is mock file content',
  verificationStatus: 'FULL',
  bytecode: '',
  createdAt: new Date(),
  updatedAt: new Date(),
} as Verification;

jest.mock('../../../../../web/prisma/lib/prisma', () => ({
  verification: {
    create: jest.fn(() => Promise.resolve(mockVerification)),
    findUnique: jest.fn().mockImplementation((args) => {
      console.log('findUnique was called with these arguments:', args);
      return Promise.resolve(mockVerification);
    }),
    // Add other methods you need to mock here
  },
}));

const handlers = [
  rest.post('http://localhost:3000/api/contract-verification/prisma/fetch-contract/', (req, res, ctx) => {
    return res(ctx.json({ result: [{ status: 'perfect' }] }));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('verifyContract handler', () => {
  it('verifies contract and inserts record into database', async () => {
    const req = {
      body: {
        contractAddress: '0x90CD9B9f69d1dB3F66DD209784c90b92B0157B40',
        chainId: '91002',
        files: [
          {
            fileName: 'Contract.sol',
            content: 'This is mock file content',
          },
        ],
      },
      query: {},
      cookies: {},
      env: {},
      aborted: false,
      complete: false,
      headers: {},
      httpVersion: '1.1',
      method: 'POST',
      trailers: {},
      url: '/mock-url',
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await verifyContract(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(prisma.verification.findUnique).toHaveBeenCalledWith({
      where: {
        contractAddress: req.body.contractAddress,
      },
    });

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      contractAddress: req.body.contractAddress,
      chainID: req.body.chainId,
      isVerified: true,
      sourceCode: req.body.files[0].content,
      verificationStatus: 'FULL',
      bytecode: '',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  }, 60000);
});