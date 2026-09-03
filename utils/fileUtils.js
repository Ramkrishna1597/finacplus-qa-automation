import fs from 'fs';

export function writeToFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}