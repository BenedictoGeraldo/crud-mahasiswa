import { promises as fs } from "node:fs";
import path from "node:path";

const writeQueue = new Map<string, Promise<void>>();

export function mockDataPath(filename: string) {
  return path.join(process.cwd(), "src", "data", "mock", filename);
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFile<T>(
  filePath: string,
  data: T,
): Promise<void> {
  const previous = writeQueue.get(filePath) ?? Promise.resolve();

  const next = previous.then(async () => {
    const json = JSON.stringify(data, null, 2);
    const tempPath = `${filePath}.tmp`;

    await fs.writeFile(tempPath, json, "utf-8");
    await fs.rename(tempPath, filePath);
  });

  writeQueue.set(filePath, next);

  try {
    await next;
  } finally {
    if (writeQueue.get(filePath) === next) {
      writeQueue.delete(filePath);
    }
  }
}

export function getNextNumericId(items: Array<{ id: number }>): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
}

export function nowIsoString(): string {
  return new Date().toISOString();
}
