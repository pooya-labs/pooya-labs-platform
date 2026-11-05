/**
 * Pooya Labs Platform — Phase 0 transport proof only.
 * No persistent data, secrets, or privileged actions are exposed here.
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Pooya Labs GAS Transport Proof')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
    var request = raw ? JSON.parse(raw) : {};
    if (request.action !== 'health.check') {
      return jsonOutput_({
        apiVersion: 1,
        ok: false,
        error: { code: 'ACTION_NOT_ALLOWED', message: 'Only health.check is enabled in this proof.' }
      });
    }
    return jsonOutput_({
      apiVersion: 1,
      requestId: String(request.requestId || ''),
      ok: true,
      data: { status: 'ok', transport: 'content-service-post' },
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    return jsonOutput_({
      apiVersion: 1,
      ok: false,
      error: { code: 'INVALID_REQUEST', message: 'Request body must be valid JSON.' }
    });
  }
}

function rpcHealth() {
  return {
    apiVersion: 1,
    ok: true,
    data: { status: 'ok', transport: 'google.script.run' },
    serverTime: new Date().toISOString()
  };
}

function jsonOutput_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
