import { clearWorkspaceSession, jsonResponse } from './_shared';

export const onRequestPost = async (): Promise<Response> => {
  return jsonResponse({ authenticated: false }, 200, { 'Set-Cookie': clearWorkspaceSession() });
}