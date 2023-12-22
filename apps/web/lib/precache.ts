import { kv } from "@vercel/kv";

export function unstableCacheReplacement(resolver: Function, key: any) {
  return async (...input: any) => {
    const keyStr = JSON.stringify(key);

    // Even if it is returned from cache below, this will run in the background and revalidate it
    const resolution = resolver(...input).then((r: any) => {
      if (r?.type === "success") {
        kv.set(keyStr, r);
      }
      return r;
    });

    const cachedValue = await kv.get(keyStr);

    if (cachedValue) {
      console.log("Cache HIT for", keyStr);
      return cachedValue;
    }

    console.log("Cache MISS for", keyStr);

    return await resolution;
  };
}
