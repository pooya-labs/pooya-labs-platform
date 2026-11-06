# راهنمای کتابخانه رمان‌ها در Pooya Labs

این بخش بدون بک‌اند کار می‌کند؛ فهرست کتاب‌ها، جلد و متن هر رمان از فایل‌های همین مخزن GitHub خوانده می‌شوند.

## مسیر فایل‌ها

- فهرست: `apps/platform/public/novels/catalog.json`
- جلد: `apps/platform/public/novels/covers/<slug>.webp`
- متن: `apps/platform/public/novels/manuscripts/<slug>.md`

نمونه برای شناسهٔ `blue-city`:

```text
apps/platform/public/novels/
├── catalog.json
├── covers/blue-city.webp
└── manuscripts/blue-city.md
```

## افزودن از داخل GitHub

1. مخزن `pooya-labs/pooya-labs-platform` را باز کن.
2. وارد `apps/platform/public/novels/covers/` شو و از **Add file → Upload files** تصویر جلد را آپلود کن؛ نامش را `<slug>.webp` بگذار.
3. وارد `apps/platform/public/novels/manuscripts/` شو و فایل `<slug>.md` را با **Add file → Create new file** بساز یا فایل Markdown را آپلود کن.
4. فایل `apps/platform/public/novels/catalog.json` را با **Edit** باز کن و یک شیء تازه به آرایهٔ `novels` اضافه کن.
5. پس از آماده‌شدن جلد و متن نهایی، مقدار `published` را `true` کن و تغییرات را روی `main` ثبت کن. Actions سایت را build و deploy می‌کند.

اگر پوشه‌ای در GitHub دیده نمی‌شود، ابتدا با **Add file → Create new file** یک فایل `.gitkeep` داخل آن بساز.

## نمونهٔ ورودی catalog.json

```json
{
  "schemaVersion": 1,
  "novels": [
    {
      "slug": "blue-city",
      "title": { "fa": "عنوان فارسی رمان", "en": "Novel title" },
      "synopsis": { "fa": "معرفی فارسی", "en": "Optional English synopsis" },
      "language": "fa",
      "genres": ["داستانی"],
      "cover": "covers/blue-city.webp",
      "manuscript": "manuscripts/blue-city.md",
      "published": false
    }
  ]
}
```

عنوان فارسی الزامی و عنوان انگلیسی اختیاری است. معرفی و ژانرها نیز اختیاری‌اند. مقدار language یکی از fa/en/multi است. مسیر cover باید به فایل تصویری داخل covers و manuscript به فایل md/txt داخل manuscripts اشاره کند. شناسه باید یکتا و با حروف کوچک انگلیسی، عدد و خط تیره باشد. فقط رمان‌های دارای published=true در سایت فهرست می‌شوند.

## قالب Markdown

از عنوان فصل‌ها با `#` و `##`، پاراگراف‌ها، نقل‌قول با `>`، فهرست و تأکید با `**bold**` یا `*italic*` پشتیبانی می‌شود. HTML خام و لینک‌های تعبیه‌شده render نمی‌شوند.

## جلد

نسبت عمودی حدود ۲:۳ پیشنهاد می‌شود. فرمت‌های WebP، JPG و PNG پشتیبانی می‌شوند. WebP برای وب معمولاً حجم کمتری دارد.

## حریم خصوصی

این مخزن عمومی است. `published: false` فقط رمان را از فهرست سایت پنهان می‌کند؛ فایل خام همچنان از طریق GitHub و URL مستقیم قابل دسترسی است. پیش‌نویس محرمانه را در این مخزن قرار نده. متن را فقط زمانی منتقل کن که با عمومی‌شدن آن مشکلی نداشته باشی.

فهرست اولیه عمداً خالی می‌ماند؛ عنوان‌ها، معرفی‌ها و متن نهایی را بعداً با محتوایی که خودت می‌دهی تکمیل می‌کنیم.
