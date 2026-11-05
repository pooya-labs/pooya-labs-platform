/**
 * Pooya Labs Platform — HtmlService-first RPC entry point.
 * The UI is served by doGet() and calls rpcCall() through google.script.run.
 * This is intentionally not a cross-origin ContentService HTTP API.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Pooya Labs Platform')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Single allowlisted RPC entry point.
 * Add actions only after validation, authorization, and persistence semantics
 * have been designed and tested.
 *
 * @param {Object} request Versioned RPC envelope.
 * @return {Object} JSON-serializable response envelope.
 */
function rpcCall(request) {
  var requestId = request && typeof request.requestId === 'string'
    ? request.requestId.slice(0, 128)
    : '';

  try {
    if (!request || typeof request !== 'object' || Array.isArray(request)) {
      return rpcError_(requestId, 'INVALID_ENVELOPE', 'A request object is required.');
    }

    if (JSON.stringify(request).length > 16000) {
      return rpcError_(requestId, 'PAYLOAD_TOO_LARGE', 'The request exceeds the allowed size.');
    }
    if (request.apiVersion !== 1) {
      return rpcError_(requestId, 'UNSUPPORTED_API_VERSION', 'This API version is not supported.');
    }
    if (typeof request.action !== 'string' || request.action.length > 64) {
      return rpcError_(requestId, 'INVALID_ACTION', 'A valid action is required.');
    }
    if (request.payload != null &&
        (typeof request.payload !== 'object' || Array.isArray(request.payload))) {
      return rpcError_(requestId, 'INVALID_PAYLOAD', 'Payload must be an object.');
    }

    // Phase 0 allowlist: a health check only. No data is read or written.
    if (request.action === 'health.check') {
      return {
        apiVersion: 1,
        requestId: requestId,
        ok: true,
        data: { status: 'ok', transport: 'google.script.run' },
        error: null,
        serverTime: new Date().toISOString()
      };
    }
    return rpcError_(requestId, 'ACTION_NOT_ALLOWED', 'This action is not enabled.');
  } catch (error) {
    // Never return stack traces or internal exception details to the browser.
    return rpcError_(requestId, 'INTERNAL_ERROR', 'The request could not be completed.');
  }
}

/** Temporary compatibility wrapper; remove after the owner updates the deployment. */
function rpcHealth() {
  return rpcCall({
    apiVersion: 1,
    requestId: 'legacy-health-check',
    action: 'health.check',
    payload: {}
  });
}

function rpcError_(requestId, code, message) {
  return {
    apiVersion: 1,
    requestId: requestId,
    ok: false,
    data: null,
    error: { code: code, message: message },
    serverTime: new Date().toISOString()
  };
}
