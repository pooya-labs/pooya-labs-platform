import { credentialsMatch, issueWorkspaceSession, jsonResponse, type WorkspaceAuthEnv } from './_shared';

interface EventContext { request: Request; env: WorkspaceAuthEnv; }

export const onRequestPost = async ({ request, env }: EventContext): Promise<Response> => {
  if (!env.WORKSPACE_USERNAME || !env.WORKSPACE_PASSWORD) return jsonResponse({ error: 'Workspace sign-in is not configured.' }, 503);
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return jsonResponse({ error: 'Unsupported request.' }, 415);
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).origin !== new URL(request.url).origin) return jsonResponse({ error: 'Origin not allowed.' }, 403);
  const body = await request.json().catch(() => null) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === 'string' ? body.username : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!credentialsMatch(username, password, env)) return jsonResponse({ error: 'Invalid username or password.' }, 401);
  const cookie = await issueWorkspaceSession(env.WORKSPACE_USERNAME, env.WORKSPACE_PASSWORD);
  return jsonResponse({ authenticated: true }, 200, { 'Set-Cookie': cookie });
}