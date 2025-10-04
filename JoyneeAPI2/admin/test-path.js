import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serviceAccountPath = join(__dirname, '..', 'serviceAccountKey.json');

console.log('Current directory:', process.cwd());
console.log('Script location:', __filename);
console.log('Looking for:', serviceAccountPath);
console.log('File exists:', existsSync(serviceAccountPath));

try {
  const content = readFileSync(serviceAccountPath, 'utf8');
  console.log('File content length:', content.length);
  console.log('First 100 chars:', content.substring(0, 100));
} catch (error) {
  console.log('Error reading file:', error.message);
}
