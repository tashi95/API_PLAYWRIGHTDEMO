import fs from 'fs';
import path from 'path';

export class JSONReader {
  static readJSON(fileName) {
    const filePath = path.resolve('data', fileName);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error al leer ${fileName}:`, error);
      throw error;
    }
  }
}
