import { hasWorkspaceSession, jsonResponse, type WorkspaceAuthEnv } from './_shared';

interface EventContext { request: Request; env: WorkspaceAuthEnv; }

export const onRequestGet = async ({ request, env }: EventContext): Promise<Response> => {
  if (!env.WORKSPACE_USERNAME || !env.WORKSPACE_PASSWORD) return jsonResponse({ authenticated: false, error: 'Workspace sign-in is not configured.' }, 503);
  const authenticated = await hasWorkspaceSession(request, env);
  return jsonResponse({ authenticated }, authenticated ? 200 : 401);
}