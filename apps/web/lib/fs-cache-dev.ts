import fs from "fs/promises";
import path from "path";

type CacheId = string | number | (string | number)[];
/**
 * This class is only meant to be on DEV, don't try to use this in production
 * as it might break
 */
export class FileSystemCacheDEV {
  private cacheDir: string = `.next/cache/fs-cache`;

  constructor() {
    this.initCacheDir();
  }

  private async initCacheDir(): Promise<void> {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true });
    } catch (error) {
      console.error("Error creating cache directory:", error);
    }
  }

  private async computeCacheKey(id: CacheId, updatedAt?: Date | number) {
    let fullKey = Array.isArray(id) ? id.join("-") : id.toString();
    if (updatedAt) {
      fullKey += `-${new Date(updatedAt).getTime()}`;
    }
    return fullKey;
  }

  async set<T>(key: CacheId, value: T): Promise<void> {
    const filePath = this.getFilePath(await this.computeCacheKey(key));
    await fs.writeFile(filePath, JSON.stringify(value), "utf-8");
  }

  async get<T>(key: string): Promise<T | null> {
    const filePath = this.getFilePath(key);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data) as T;
    } catch (error) {
      // If the file doesn't exist, return null
      return null;
    }
  }

  private getFilePath(key: string): string {
    return path.join(this.cacheDir, `${key}.json`);
  }
}
