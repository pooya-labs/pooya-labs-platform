export interface RpcRequest<TPayload = Record<string, unknown>> {
  apiVersion: 1;
  requestId: string;
  action: string;
  payload: TPayload;
}

export interface RpcResponse<TData = unknown> {
  apiVersion: 1;
  requestId: string;
  ok: boolean;
  data: TData | null;
  error: { code: string; message: string } | null;
  serverTime: string;
}

interface GoogleScriptRun {
  withSuccessHandler<T>(callback: (value: T) => void): GoogleScriptRun;
  withFailureHandler(callback: (error: unknown) => void): GoogleScriptRun;
  rpcCall(request: RpcRequest): void;
}

declare global {
  interface Window {
    google?: {
      script?: {
        run?: GoogleScriptRun;
      };
    };
  }
}

export function createRequestId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return 'req-' + Date.now() + '-' + Math.random().toString(16).slice(2);
}

export function isHtmlServiceHost(): boolean {
  return typeof window !== 'undefined' && typeof window.google?.script?.run?.rpcCall === 'function';
}

export function rpcCall<TData = unknown>(
  action: string,
  payload: Record<string, unknown> = {},
): Promise<RpcResponse<TData>> {
  const runner = window.google?.script?.run;

  if (!runner) {
    return Promise.reject(new Error('The live Apps Script RPC bridge is unavailable in this host.'));
  }

  const request: RpcRequest = {
    apiVersion: 1,
    requestId: createRequestId(),
    action,
    payload,
  };

  return new Promise((resolve, reject) => {
    runner
      .withSuccessHandler((response: RpcResponse<TData>) => resolve(response))
      .withFailureHandler(reject)
      .rpcCall(request);
  });
}
