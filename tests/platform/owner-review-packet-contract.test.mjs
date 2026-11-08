import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packet = await readFile(new URL('../../docs/OWNER-REVIEW-PACKET.md', import.meta.url), 'utf8');

test('owner review packet records the current bilingual homepage copy and presentation defaults', () => {
  assert.match(packet, /Turning ideas into thoughtful digital experiences/);
  assert.match(packet, /ایده‌ها را به تجربه‌های دیجیتال تبدیل می‌کنم/);
  assert.match(packet, /computer engineering student focused on product design/);
  assert.match(packet, /دانشجوی مهندسی کامپیوتر/);
  assert.match(packet, /English is the default language and LTR/);
  assert.match(packet, /light-theme option/);
});

test('owner review packet includes all eight projects, order, statuses, and attribution boundaries', () => {
  for (const slug of ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aurapulse', 'globalcart', 'salon-booking']) {
    assert.ok(packet.includes('github.com/pooya-labs/' + slug), 'Missing source link for ' + slug);
  }
  assert.match(packet, /In development · M08/);
  assert.match(packet, /Stable v1\.0\.0/);
  assert.match(packet, /v0\.2\.3-dev \/ M09\.8/);
  assert.match(packet, /Released · v1\.0\.0/);
  assert.match(packet, /does not identify an individual author or contribution split/);
  assert.match(packet, /salon owner as product owner/);
});

test('owner packet preserves current demo/simulation and privacy limitations', () => {
  for (const topic of ['synthetic demo records', 'not live telemetry', 'simulated', 'does not send real orders', 'not a live retailer', 'customer records', 'synthetic/redacted evidence']) {
    assert.ok(packet.toLowerCase().includes(topic.toLowerCase()), 'Missing boundary: ' + topic);
  }
  assert.match(packet, /External LinkedIn\/Facebook crawler rendering/);
  assert.match(packet, /29 PNG candidates and seven WebM reels/);
  assert.match(packet, /catalog is intentionally empty/i);
});

test('owner packet keeps approvals pending and does not imply permission to publish', () => {
  assert.match(packet, /owner approval is still pending/i);
  assert.match(packet, /No item is considered approved/);
  assert.match(packet, /Keep all eight project review states as needs-owner-review/);
  assert.match(packet, /Salon owner's separate permission/);
});
