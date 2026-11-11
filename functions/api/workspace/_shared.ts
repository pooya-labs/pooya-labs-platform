export interface WorkspaceAuthEnv {
  WORKSPACE_USERNAME: string;
  WORKSPACE_PASSWORD: string;
}

const COOKIE_NAME = 'pooya_workspace_session';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function encodeBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
}

function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(normalized + '='.repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function constantTimeEqual(left: string, right: string): boolean {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

async function signingKey(password: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function createToken(username: string, password: string): Promise<string> {
  const payload = encodeBase64Url(new TextEncoder().encode(JSON.stringify({ sub: username, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })));
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', await signingKey(password), new TextEncoder().encode(payload)));
  return payload + '.' + encodeBase64Url(signature);
}

export async function hasWorkspaceSession(request: Request, env: WorkspaceAuthEnv): Promise<boolean> {
  if (!env.WORKSPACE_USERNAME || !env.WORKSPACE_PASSWORD) return false;
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookie = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(COOKIE_NAME + '='));
  if (!cookie) return false;
  const token = cookie.slice(COOKIE_NAME.length + 1);
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;
  try {
    const [payload, signature] = parts;
    const valid = await crypto.subtle.verify('HMAC', await signingKey(env.WORKSPACE_PASSWORD), decodeBase64Url(signature), new TextEncoder().encode(payload));
    if (!valid) return false;
    const session = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as { sub?: string; exp?: number };
    return session.sub === env.WORKSPACE_USERNAME && typeof session.exp === 'number' && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function issueWorkspaceSession(username: string, password: string): Promise<string> {
  const token = await createToken(username, password);
  return COOKIE_NAME + '=' + token + '; Max-Age=' + SESSION_SECONDS + '; Path=/api/workspace; Secure; HttpOnly; SameSite=Lax';
}

export function clearWorkspaceSession(): string {
  return COOKIE_NAME + '=; Max-Age=0; Path=/api/workspace; Secure; HttpOnly; SameSite=Lax';
}

export function jsonResponse(body: Record<string, unknown>, status = 200, extraHeaders?: HeadersInit): Response {
  const headers = new Headers(extraHeaders);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'no-store, max-age=0');
  headers.set('Pragma', 'no-cache');
  return new Response(JSON.stringify(body), { status, headers });
}

export function credentialsMatch(username: string, password: string, env: WorkspaceAuthEnv): boolean {
  return constantTimeEqual(username, env.WORKSPACE_USERNAME || '') && constantTimeEqual(password, env.WORKSPACE_PASSWORD || '');
}