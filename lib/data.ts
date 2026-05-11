import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readData<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeData<T>(filename: string, data: T): void {
  const filepath = path.join(DATA_DIR, filename);
  // 임시 파일에 먼저 쓴 뒤 rename으로 교체 → 쓰기 도중 다운되어도 원본 파일이 깨지지 않음 (POSIX atomic).
  const tmpPath = `${filepath}.${process.pid}.${Date.now()}.tmp`;
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmpPath, filepath);
  } catch (e) {
    try {
      fs.unlinkSync(tmpPath);
    } catch {
      /* tmp 파일이 없으면 무시 */
    }
    throw e;
  }
}
