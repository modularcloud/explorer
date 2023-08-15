import { createResolver, NotFound, PendingException, ResolutionResponse } from './index';

describe('createResolver', () => {
  let resolver: ReturnType<typeof createResolver>;
  let result: any;

  const resolverOptions = { id: 'test', cache: false };
  const resolverInput = 'input';

  describe('when the resolution is successful', () => {
    beforeEach(async () => {
      resolver = createResolver(resolverOptions, async () => 'test', []);
      result = await resolver(resolverInput);
    });

    it('should return a function', () => {
      expect(typeof resolver).toBe('function');
    });

    it('should return a successful resolution', () => {
      expect(result).toEqual({
        trace: expect.objectContaining({
          resolverId: 'test',
          input: 'input',
          resolution: { type: 'success', result: 'test' },
          dependencies: [],
        }),
        type: 'success',
        result: 'test',
      });
    });
  });

  describe('when the resolution is an error', () => {
    beforeEach(async () => {
      resolver = createResolver(resolverOptions, async () => { throw new Error('error'); }, []);
      result = await resolver(resolverInput);
    });

    it('should return an error resolution', () => {
      expect(result).toEqual({
        trace: expect.objectContaining({
          resolverId: 'test',
          input: 'input',
          resolution: { type: 'error', error: 'test("input"): Error: error' },
          dependencies: [],
        }),
        type: 'error',
        error: 'test("input"): Error: error',
      });
    });
  });

  describe('when the resolution is pending', () => {
    beforeEach(async () => {
      resolver = createResolver(resolverOptions, async () => { throw PendingException; }, []);
      result = await resolver(resolverInput);
    });

    it('should return a pending resolution', () => {
      expect(result).toEqual({
        trace: expect.objectContaining({
          resolverId: 'test',
          input: 'input',
          resolution: { type: 'pending', resolverId: 'test', input: 'input' },
          dependencies: [],
        }),
        type: 'pending',
        resolverId: 'test',
        input: 'input',
      });
    });
  });

  describe('when there are dependencies', () => {
    beforeEach(async () => {
      const dependency = createResolver({ id: 'dep', cache: false }, async () => 'dep', []);
      resolver = createResolver(resolverOptions, async (input, dep) => `${input}-${await dep('dep')}`, [dependency]);
      result = await resolver(resolverInput);
    });

    it('should handle dependencies', () => {
      expect(result).toEqual(expect.objectContaining({
        trace: expect.objectContaining({
          resolverId: 'test',
          input: 'input',
          resolution: { type: 'success', result: expect.any(String) },
          dependencies: [
            expect.objectContaining({
              resolverId: 'dep',
              input: 'dep',
              resolution: { type: 'success', result: 'dep' },
            }),
          ],
        }),
        type: 'success',
        result: expect.any(String),
      }));
    });
  });
});

const test0 = createResolver(
  { id: "test0", cache: false },
  async (input) => {
    return input + "!"
  },
  []
);
const test1 = createResolver(
  { id: "test1", cache: false },
  async (input, test0) => {
    const test0Response = await test0(input.toUpperCase());
    return test0Response.type === "success" ? test0Response.result : null;
  },
  [test0]
);
const test1point5 = createResolver(
  { id: "test1.5", cache: false },
  async (input) => {
    return input.toLowerCase();
  },
  []
);
const test2 = createResolver(
  { id: "test2", cache: false },
  async (input, test1, test1point5) => {
    const result1Response = await test1(input);
    const result1 =
      result1Response.type === "success" ? result1Response.result : null;
    const result1point5Response: ResolutionResponse = await test1point5(
      input
    );
    const result1point5 =
      result1point5Response.type === "success"
        ? result1point5Response.result
        : null;
    return result1 && result1point5 ? result1 + " " + result1point5 : null;
  },

  [test1, test1point5]
);

describe('Deeply nested successful resolution', () => {
  let result: any;

  beforeEach(async () => {
    result = await test2("TESTing");
  });

  it('should return a function', () => {
    expect(typeof test2).toBe('function');
  });

  it('should return a successful resolution', () => {
    expect(result).toEqual({
      trace: expect.objectContaining({
        resolverId: 'test2',
        input: 'TESTing',
        resolution: { type: 'success', result: 'TESTING! testing' },
        dependencies: [
          expect.objectContaining({
            resolverId: 'test1',
            input: 'TESTing',
            resolution: { type: 'success', result: 'TESTING!' },
            dependencies: [
              expect.objectContaining({
                resolverId: 'test0',
                input: 'TESTING',
                resolution: { type: 'success', result: 'TESTING!' },
              }),
            ],
          }),
          expect.objectContaining({
            resolverId: 'test1.5',
            input: 'TESTing',
            resolution: { type: 'success', result: 'testing' },
          }),
        ],
      }),
      type: 'success',
      result: 'TESTING! testing',
    });
  });
});

const test3 = createResolver(
  { id: "test0", cache: false },
  async (input) => {
    NotFound();
  },
  []
);
const test4 = createResolver(
  { id: "test1", cache: false },
  async (input, test0) => {
    const test0Response = await test0(input.toUpperCase());
    return test0Response.type === "success" ? test0Response.result : null;
  },
  [test3]
);
const test4point5 = createResolver(
  { id: "test1.5", cache: false },
  async (input) => {
    return input.toLowerCase();
  },
  []
);
const test6 = createResolver(
  { id: "test2", cache: false },
  async (input, test1, test1point5) => {
    const result1Response = await test1(input);
    const result1 =
      result1Response.type === "success" ? result1Response.result : null;
    const result1point5Response: ResolutionResponse = await test1point5(
      input
    );
    const result1point5 =
      result1point5Response.type === "success"
        ? result1point5Response.result
        : null;
    return result1 && result1point5 ? result1 + " " + result1point5 : null;
  },

  [test4, test4point5]
); 

describe('Deeply nested pending resolution', () => {
  let result: any;

  beforeEach(async () => {
    result = await test6("TESTing");
  });

  it('should return a function', () => {
    expect(typeof test6).toBe('function');
  });

  it('should return a pending resolution', () => {
    expect(result).toEqual({
      trace: expect.objectContaining({
        resolverId: 'test2',
        input: 'TESTing',
        resolution: { type: 'pending', resolverId: 'test0', input: 'TESTING' },
        dependencies: [
          expect.objectContaining({
            resolverId: 'test1',
            input: 'TESTing',
            resolution: { type: 'pending', resolverId: 'test0', input: 'TESTING' },
            dependencies: [
              expect.objectContaining({
                resolverId: 'test0',
                input: 'TESTING',
                resolution: { type: 'pending', resolverId: 'test0', input: 'TESTING' },
              }),
            ],
          }),
          expect.objectContaining({
            resolverId: 'test1.5',
            input: 'TESTing',
            resolution: { type: 'success', result: 'testing' },
          }),
        ],
      }),
      type: 'pending',
      resolverId: 'test0',
      input: 'TESTING',
    });
  });
});

const test7 = createResolver(
  { id: "test0", cache: false },
  async (input) => {
    const x: any = {};
    return x.y.z;
  },
  []
);
const test8 = createResolver(
  { id: "test1", cache: false },
  async (input, test0) => {
    const test0Response = await test0(input.toUpperCase());
    return test0Response.type === "success" ? test0Response.result : null;
  },
  [test7]
);
const test9 = createResolver(
  { id: "test1.5", cache: false },
  async (input) => {
    return input.toLowerCase();
  },
  []
);
const test10 = createResolver(
  { id: "test2", cache: false },
  async (input, test1, test1point5) => {
    const result1Response = await test1(input);
    const result1 =
      result1Response.type === "success" ? result1Response.result : null;
    const result1point5Response: ResolutionResponse = await test1point5(
      input
    );
    const result1point5 =
      result1point5Response.type === "success"
        ? result1point5Response.result
        : null;
    return result1 && result1point5 ? result1 + " " + result1point5 : null;
  },

  [test8, test9]
); // This is a test to see if the resolver works

// if I do this:
// await test10("TESTing");
// I should get {"trace":{"resolverId":"test2","input":"TESTing","resolution":{"type":"error","error":"test0(\"TESTING\"): TypeError: Cannot read properties of undefined (reading 'z')"},"createdAt":1692078579138,"dependencies":[{"resolverId":"test1","input":"TESTing","resolution":{"type":"error","error":"test0(\"TESTING\"): TypeError: Cannot read properties of undefined (reading 'z')"},"createdAt":1692078579137,"dependencies":[{"resolverId":"test0","input":"TESTING","resolution":{"type":"error","error":"test0(\"TESTING\"): TypeError: Cannot read properties of undefined (reading 'z')"},"createdAt":1692078579137,"dependencies":[]}]},{"resolverId":"test1.5","input":"TESTing","resolution":{"type":"success","result":"testing"},"createdAt":1692078579138,"dependencies":[]}]},"type":"error","error":"test0(\"TESTING\"): TypeError: Cannot read properties of undefined (reading 'z')"}

describe('Deeply nested error resolution', () => {
  let result: any;

  beforeEach(async () => {
    result = await test10("TESTing");
  });

  it('should return a function', () => {
    expect(typeof test10).toBe('function');
  });

  it('should return an error resolution', () => {
    expect(result).toEqual({
      trace: expect.objectContaining({
        resolverId: 'test2',
        input: 'TESTing',
        resolution: { type: 'error', error: 'test0("TESTING"): TypeError: Cannot read properties of undefined (reading \'z\')' },
        dependencies: [
          expect.objectContaining({
            resolverId: 'test1',
            input: 'TESTing',
            resolution: { type: 'error', error: 'test0("TESTING"): TypeError: Cannot read properties of undefined (reading \'z\')' },
            dependencies: [
              expect.objectContaining({
                resolverId: 'test0',
                input: 'TESTING',
                resolution: { type: 'error', error: 'test0("TESTING"): TypeError: Cannot read properties of undefined (reading \'z\')' },
              }),
            ],
          }),
          expect.objectContaining({
            resolverId: 'test1.5',
            input: 'TESTing',
            resolution: { type: 'success', result: 'testing' },
          }),
        ],
      }),
      type: 'error',
      error: 'test0("TESTING"): TypeError: Cannot read properties of undefined (reading \'z\')',
    });
  });
});
