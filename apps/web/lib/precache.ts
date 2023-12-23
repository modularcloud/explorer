import { kv } from "@vercel/kv";

export function unstableCacheReplacement(resolver: Function, key: any) {
  return async (...input: any) => {
    const keyStr = JSON.stringify(key);

    // Even if it is returned from cache below, this will run in the background and revalidate it
    const time = new Date().getTime();
    console.time(`[${time} SET] ${keyStr}`);
    const resolution = resolver(...input).then(async (r: any) => {
      if (r?.type === "success") {
        await kv.set(keyStr, r);
        console.timeEnd(`[${time} SET] ${keyStr}`);
      }
      return r;
    });

    console.time(`[${time} GET] ${keyStr}`);
    const cachedValue = await kv.get(keyStr);
    console.timeEnd(`[${time} GET] ${keyStr}`);

    if (cachedValue) {
      console.log(
        `\x1b[32mCACHE HIT \x1b[37mFOR key \x1b[90m"\x1b[33m${keyStr}\x1b[90m"\x1b[37m`,
      );
      return cachedValue;
    }

    console.log(
      `\x1b[31mCACHE MISS \x1b[37mFOR key \x1b[90m"\x1b[33m${keyStr}\x1b[90m"\x1b[37m`,
    );

    return await resolution;
  };
}
