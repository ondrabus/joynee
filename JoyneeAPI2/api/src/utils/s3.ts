import { S3Client, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const REGION = process.env.AWS_S3_REGION || 'eu-central-1';
const BUCKET = process.env.AWS_S3_BUCKET || '';
const ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID || '';
const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY || '';

const s3Config: any = { region: REGION };
if (ACCESS_KEY_ID && SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  };
}
export const s3Client = new S3Client(s3Config);

export function generateGuid(): string {
  return crypto.randomUUID();
}

export async function uploadBufferToS3(key: string, buffer: Buffer, contentType: string): Promise<void> {
  if (!BUCKET) throw new Error('AWS_S3_BUCKET is not configured');
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  } as any);
  await s3Client.send(command);
}

export function getPublicS3Url(key: string): string {
  if (!BUCKET) throw new Error('AWS_S3_BUCKET is not configured');
  // Virtual-hosted–style URL
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

export function getKeyFromPublicUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // Expect /{key}
    const key = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
    return key || null;
  } catch {
    return null;
  }
}

export async function renameObject(oldKey: string, newKey: string): Promise<void> {
  if (!BUCKET) throw new Error('AWS_S3_BUCKET is not configured');
  if (oldKey === newKey) return;
  // Copy then delete original (S3 has no rename)
  await s3Client.send(new CopyObjectCommand({ Bucket: BUCKET, CopySource: `/${BUCKET}/${oldKey}`, Key: newKey } as any));
  await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: oldKey }));
}

export async function markObjectAsDeletedByUrl(url: string): Promise<void> {
  const key = getKeyFromPublicUrl(url);
  if (!key) return; // Not our URL or invalid
  if (key.startsWith('deleted_')) return; // already marked
  const newKey = `deleted_${key}`;
  await renameObject(key, newKey);
} 