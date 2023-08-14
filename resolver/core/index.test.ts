import { createResolver, PendingException } from './index';

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
          resolution: { type: 'error', error: 'Error: error' },
          dependencies: [],
        }),
        type: 'error',
        error: 'Error: error',
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
