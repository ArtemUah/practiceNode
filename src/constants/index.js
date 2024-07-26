import path from 'node:path';

export const ACCESS_TOKEN_LIFE = 15 * 60 * 1000;
export const REFRESH_TOKEN_LIFE = 30 * 24 * 3600 * 1000;
export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');
export const PUBLIC_DIR = path.resolve('src', 'public');
export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
