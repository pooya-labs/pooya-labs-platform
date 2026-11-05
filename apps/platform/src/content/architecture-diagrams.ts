export interface LocalizedDiagramText {
  fa: string;
  en: string;
}

export interface ArchitectureNode {
  id: string;
  x: number;
  y: number;
  title: LocalizedDiagramText;
  detail: LocalizedDiagramText;
  kind?: 'core' | 'storage' | 'external' | 'local';
}

export interface ArchitectureDiagram {
  title: LocalizedDiagramText;
  caption: LocalizedDiagramText;
  nodes: ArchitectureNode[];
  edges: Array<{ from: string; to: string }>;
}

const node = (
  id: string, x: number, y: number,
  fa: string, en: string,
  faDetail: string, enDetail: string,
  kind: ArchitectureNode['kind'] = 'core'
): ArchitectureNode => ({
  id, x, y, title: { fa, en }, detail: { fa: faDetail, en: enDetail }, kind
});

export const architectureDiagrams: Record<string, ArchitectureDiagram> = {
  aetherflow: {
    title: { fa: 'جریان اجرای گردش‌کار', en: 'Workflow execution flow' },
    caption: { fa: 'نمای ساده‌شده بر اساس معماری و قراردادهای ثبت‌شده در مخزن', en: 'A simplified view based on the repository architecture and documented contracts' },
    nodes: [
      node('clients', 70, 215, 'CLI / SDK / API', 'CLI / SDK / API', 'ورودی نسخه‌دار v1', 'Versioned v1 entry', 'external'),
      node('core', 455, 215, 'هسته Rust + Tokio', 'Rust + Tokio core', 'هماهنگ‌سازی Workflow و Task', 'Workflow and task coordination'),
      node('postgres', 840, 215, 'PostgreSQL', 'PostgreSQL', 'وضعیت پایدار، Outbox و Inbox', 'Durable state, outbox, and inbox', 'storage'),
      node('nats', 1225, 215, 'NATS JetStream', 'NATS JetStream', 'انتقال و نگه‌داری پیام', 'Message transport and persistence', 'external'),
      node('workers', 840, 535, 'Workerهای بازیابی‌پذیر', 'Recoverable workers', 'Lease، heartbeat و retry محدود', 'Leases, heartbeats, bounded retries'),
      node('wasm', 455, 535, 'Wasmtime runtime', 'Wasmtime runtime', 'اجرای handlerهای افزونه', 'Extension handler execution'),
      node('otel', 70, 535, 'OpenTelemetry', 'OpenTelemetry', 'Trace، log و metrics', 'Traces, logs, and metrics', 'local')
    ],
    edges: [
      { from: 'clients', to: 'core' }, { from: 'core', to: 'postgres' },
      { from: 'postgres', to: 'nats' }, { from: 'nats', to: 'workers' },
      { from: 'workers', to: 'wasm' }, { from: 'core', to: 'otel' },
      { from: 'workers', to: 'otel' }
    ]
  },
  orbit: {
    title: { fa: 'دو مسیر جدا در ORBIT', en: 'Two separate ORBIT paths' },
    caption: { fa: 'دموی عمومی داده مصنوعی دارد؛ stack مهندسی telemetry مسیر محلی و مستقل است', en: 'The public demo uses synthetic data; the telemetry engineering stack is a separate local path' },
    nodes: [
      node('public', 70, 210, 'داشبورد عمومی', 'Public dashboard', 'Next.js / GitHub Pages', 'Next.js / GitHub Pages', 'external'),
      node('bridge', 650, 210, 'Apps Script bridge', 'Apps Script bridge', 'iframe و google.script.run', 'iframe and google.script.run'),
      node('sheet', 1230, 210, 'Google Sheets خصوصی', 'Private Google Sheets', 'فقط رکوردهای مصنوعی دمو', 'Synthetic demo records only', 'storage'),
      node('workload', 70, 545, 'سرویس نمونه instrumented', 'Instrumented sample service', 'تولید Metrics / Logs / Traces', 'Emits metrics, logs, and traces', 'external'),
      node('collector', 455, 545, 'OTel Collector', 'OTel Collector', 'دریافت و مسیریابی OTLP', 'OTLP ingestion and routing'),
      node('stores', 840, 545, 'Prometheus / Loki / Tempo', 'Prometheus / Loki / Tempo', 'ذخیره‌سازهای telemetry محلی', 'Local telemetry backends', 'storage'),
      node('api', 1230, 545, 'Go API', 'Go API', 'queryهای محدود و workspace-scoped', 'Bounded workspace-scoped queries')
    ],
    edges: [
      { from: 'public', to: 'bridge' }, { from: 'bridge', to: 'sheet' },
      { from: 'workload', to: 'collector' }, { from: 'collector', to: 'stores' },
      { from: 'stores', to: 'api' }
    ]
  },
  'pooya-os': {
    title: { fa: 'محیط دسکتاپ کاملاً مرورگری', en: 'Browser-only desktop workspace' },
    caption: { fa: 'وضعیت برنامه و ابزارها در خود مرورگر اجرا می‌شوند؛ backend یا shell واقعی وجود ندارد', en: 'Application state and tools run in the browser; there is no backend or real shell' },
    nodes: [
      node('hosting', 70, 350, 'Static export', 'Static export', 'انتشار روی GitHub Pages', 'Published on GitHub Pages', 'external'),
      node('app', 455, 350, 'Next.js + React', 'Next.js + React', 'محیط دسکتاپ تعاملی', 'Interactive desktop workspace'),
      node('state', 840, 350, 'Zustand state', 'Zustand state', 'پنجره‌ها و state محلی', 'Windows and local state', 'local'),
      node('tools', 1225, 350, 'ابزارهای داخل صفحه', 'In-browser tools', 'CLI مجاز، token inspector و frame monitor', 'Allowlisted CLI, token inspector, frame monitor', 'local')
    ],
    edges: [
      { from: 'hosting', to: 'app' }, { from: 'app', to: 'state' }, { from: 'state', to: 'tools' }
    ]
  },
  'nexus-canvas': {
    title: { fa: 'چرخه طراحی و اعتبارسنجی گراف', en: 'Graph design and validation flow' },
    caption: { fa: 'گراف و شبیه‌سازی محلی‌اند؛ خروجی Compose یک starter است، نه استقرار خودکار', en: 'The graph and simulation are local; Compose output is a starter, not an automatic deployment' },
    nodes: [
      node('editor', 70, 350, 'Canvas / Rack editor', 'Canvas / Rack editor', 'ساخت Node و Edge', 'Create nodes and edges'),
      node('analysis', 455, 350, 'Graph analyzer', 'Graph analyzer', 'چرخه، endpoint و مسیر وابستگی', 'Cycles, endpoints, dependency paths'),
      node('model', 840, 350, 'مدل معتبر', 'Validated graph model', 'Snapshot نسخه‌دار و قابل انتقال', 'Versioned, portable snapshot', 'storage'),
      node('export', 1225, 350, 'Export tools', 'Export tools', 'JSON snapshot و Compose starter', 'JSON snapshot and Compose starter', 'external'),
      node('simulation', 650, 620, 'Stress simulation', 'Stress simulation', 'ورودی‌های عملکردی مدل‌شده', 'Illustrative performance inputs', 'local')
    ],
    edges: [
      { from: 'editor', to: 'analysis' }, { from: 'analysis', to: 'model' },
      { from: 'model', to: 'export' }, { from: 'model', to: 'simulation' }
    ]
  },
  'lumina-glass': {
    title: { fa: 'دو آزمایشگاه در یک مرورگر', en: 'Two labs in one browser' },
    caption: { fa: 'جلوه‌های بصری و زنجیره صوت محلی‌اند؛ تنظیمات و presetها در همان مرورگر می‌مانند', en: 'Optical effects and audio processing are local; presets and settings stay in this browser' },
    nodes: [
      node('controls', 70, 205, 'Optical controls', 'Optical controls', 'پارامترهای Liquid Glass', 'Liquid Glass parameters'),
      node('svg', 455, 205, 'SVG optical scene', 'SVG optical scene', 'پیش‌نمایش لایه‌ها و شکست نور', 'Layer and refraction preview'),
      node('canvas', 840, 205, 'Canvas export', 'Canvas export', 'خروجی تصویر PNG', 'PNG image export', 'external'),
      node('audio', 70, 545, 'منبع صوت', 'Audio source', 'Oscillator / file / microphone', 'Oscillator / file / microphone', 'external'),
      node('filters', 455, 545, 'Web Audio API', 'Web Audio API', 'زنجیره پنج Biquad filter', 'Five Biquad filter chain'),
      node('output', 840, 545, 'Audio output', 'Audio output', 'پخش محلی در مرورگر', 'Local browser playback', 'local'),
      node('storage', 1225, 545, 'LocalStorage', 'LocalStorage', 'Preset، EQ و task board', 'Presets, EQ, and task board', 'storage')
    ],
    edges: [
      { from: 'controls', to: 'svg' }, { from: 'svg', to: 'canvas' },
      { from: 'audio', to: 'filters' }, { from: 'filters', to: 'output' },
      { from: 'controls', to: 'storage' }
    ]
  },
  aurapulse: {
    title: { fa: 'داده بازار در برابر معامله آزمایشی', en: 'Market data versus paper trading' },
    caption: { fa: 'ticker عمومی در صورت دسترسی؛ chart و حساب آزمایشی در مرورگر، بدون سفارش واقعی', en: 'Public tickers when reachable; charts and demo account stay in-browser with no real orders' },
    nodes: [
      node('feed', 70, 205, 'Binance public ticker', 'Binance public ticker', 'BTC / ETH / SOL · 24h', 'BTC / ETH / SOL · 24h', 'external'),
      node('fallback', 70, 545, 'Illustrative fallback', 'Illustrative fallback', 'داده نمونه با برچسب اتصال', 'Sample data with connection label', 'local'),
      node('dashboard', 455, 365, 'Market dashboard', 'Market dashboard', 'Chart و وضعیت بازار', 'Charts and market state'),
      node('paper', 840, 365, 'Paper-trading engine', 'Paper-trading engine', 'محاسبه سفارش و P&L نمایشی', 'Simulated orders and P&L', 'local'),
      node('storage', 1225, 365, 'Browser storage', 'Browser storage', 'موجودی و history محلی', 'Local balance and history', 'storage'),
      node('boundary', 840, 650, 'بدون اجرای سفارش', 'No order execution', 'هیچ معامله‌ای به صرافی ارسال نمی‌شود', 'No trade is sent to an exchange', 'external')
    ],
    edges: [
      { from: 'feed', to: 'dashboard' }, { from: 'fallback', to: 'dashboard' },
      { from: 'dashboard', to: 'paper' }, { from: 'paper', to: 'storage' },
      { from: 'paper', to: 'boundary' }
    ]
  },
  'global-cart': {
    title: { fa: 'دو منبع کاتالوگ و سبد آزمایشی', en: 'Two catalog sources and a demo cart' },
    caption: { fa: 'snapshot محلی و discovery زمان‌اجرا جدا هستند؛ Shopify cache نمی‌شود و cart نمایشی است', en: 'The local snapshot and runtime discovery are separate; Shopify results are not cached and the cart is simulated' },
    nodes: [
      node('abo', 70, 205, 'ABO local snapshot', 'ABO local snapshot', 'کاتالوگ منتخب ۱۰۰۰ محصول', 'Curated 1,000-product catalog', 'storage'),
      node('shopify', 70, 545, 'Shopify Global Catalog', 'Shopify Global Catalog', 'پیشنهادهای فروشندگان در لحظه', 'Live merchant offers at query time', 'external'),
      node('worker', 455, 545, 'Cloudflare Worker', 'Cloudflare Worker', 'اعتبارسنجی درخواست · no-store', 'Request validation · no-store'),
      node('fx', 455, 205, 'TGJU FX snapshot', 'TGJU FX snapshot', 'نرخ USD با timestamp منبع', 'USD quote with source timestamp', 'external'),
      node('storefront', 840, 365, 'GlobalCart storefront', 'GlobalCart storefront', 'صفحه محصول، جست‌وجو و قیمت', 'Product pages, search, and pricing'),
      node('cart', 1225, 365, 'Demo cart / checkout', 'Demo cart / checkout', 'بدون پرداخت یا fulfillment واقعی', 'No real payment or fulfillment', 'local')
    ],
    edges: [
      { from: 'abo', to: 'storefront' }, { from: 'fx', to: 'storefront' },
      { from: 'shopify', to: 'worker' }, { from: 'worker', to: 'storefront' },
      { from: 'storefront', to: 'cart' }
    ]
  },
  'salon-booking': {
    title: { fa: 'مسیر رزرو و اعلان مدیر', en: 'Booking and manager-notification flow' },
    caption: { fa: 'مسیر فعال در حال پذیرش نهایی است؛ Google Sheets خصوصی و push وابسته به تنظیم FCM است', en: 'The active path is awaiting final acceptance; Sheets is private and push depends on FCM configuration' },
    nodes: [
      node('people', 70, 350, 'مشتری / مدیر', 'Customer / owner', 'مرورگر و PWA', 'Browser and PWA', 'external'),
      node('pages', 455, 350, 'React + Vite', 'React + Vite', 'GitHub Pages frontend', 'GitHub Pages frontend'),
      node('bridge', 840, 350, 'Hidden iframe bridge', 'Hidden iframe bridge', 'ارتباط same-origin و RPC', 'Same-origin transport and RPC'),
      node('gas', 1225, 350, 'Apps Script API', 'Apps Script API', 'قواعد رزرو و اعتبارسنجی', 'Booking rules and validation'),
      node('sheets', 1225, 640, 'Private Sheets', 'Private Sheets', 'رکوردهای رزرو و تنظیمات', 'Bookings and configuration', 'storage'),
      node('push', 455, 640, 'Firebase Cloud Messaging', 'Firebase Cloud Messaging', 'Push به دستگاه مدیر پس از setup', 'Push to manager device after setup', 'external')
    ],
    edges: [
      { from: 'people', to: 'pages' }, { from: 'pages', to: 'bridge' },
      { from: 'bridge', to: 'gas' }, { from: 'gas', to: 'sheets' },
      { from: 'gas', to: 'push' }
    ]
  }
};
