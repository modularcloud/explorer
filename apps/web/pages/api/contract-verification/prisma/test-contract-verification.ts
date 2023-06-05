import request from 'supertest';
import yourServer from '../path/to/your/server'; // import your server
import { PrismaClient, VerificationStatus } from '@prisma/client';

const prisma = new PrismaClient();

describe('POST /api/verifyContract', () => {
  afterAll(async () => {
    // Disconnect Prisma client after tests
    await prisma.$disconnect();
  });

  it('creates verification and responds with JSON', async () => {
    const mockRequestBody = {
      contractAddress: 'testContractAddress',
      chainId: 'testChainId',
      files: 'testFiles',
    };

    // Mock axios.post here

    const res = await request(yourServer)
      .post('/api/verifyContract')
      .send(mockRequestBody)
      .expect('Content-Type', /json/)
      .expect(200); // replace 200 with the status code you are expecting

    // Validate response body

    // Fetch the created verification from database
    const createdVerification = await prisma.verification.findFirst({
      where: {
        contractAddress: mockRequestBody.contractAddress,
        chainID: mockRequestBody.chainId,
      },
    });

    expect(createdVerification).toBeDefined();
    expect(createdVerification.isVerified).toBe(true);
    expect(createdVerification.sourceCode).toBe(mockRequestBody.files);
    expect(createdVerification.verificationStatus).toBe(VerificationStatus.FULL); // or .PARTIAL depending on your mock axios response
  });
});
