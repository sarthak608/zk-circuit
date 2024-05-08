import { config } from 'dotenv';
const result = config({ path: `.env` });

if (result.error) {
    console.log(`Error loading .env file: ${result.error.message}`);
    process.exit(1);
  }
//general
export const PORT = process.env['PORT'] || 3010;

//external services

export const PRIVATE_KEY = process.env['PRIVATE_KEY'] as string;
console.log('PRIVATE_KEY:', PRIVATE_KEY);

export const PROVIDER_URL = process.env['PROVIDER_URL'] as string;
console.log('PROVIDER_URL:', PROVIDER_URL);
