# Ownership, Intellectual Property & Attribution Policy

**Status:** Baseline policy — project-by-project rights review required  
**Maintainer identity:** Pooya Goodarzi  
**Brand / project ecosystem:** Pooya Labs  
**Last reviewed:** 9 November 2026

This document defines how repositories in the Pooya Labs ecosystem should describe authorship, maintenance, licenses, third-party material, and project-specific ownership. It is an engineering and documentation policy, not a legal assignment, contract, or legal opinion.

## 1. Keep four concepts separate

- **Creator / author:** the person or people who actually created a particular contribution.
- **Copyright holder / rights holder:** the person or entity that legally owns the relevant rights. This must be established from the facts, contracts, applicable law, and any prior assignment.
- **Maintainer:** the person responsible for reviewing, maintaining, and releasing the repository.
- **Brand:** the name and visual identity used to present a project or ecosystem.

Pooya Labs is the ecosystem and presentation brand used for these repositories. Naming Pooya Labs or linking to the Pooya Labs Platform does not, by itself, transfer copyright, create a separate legal entity, or override a customer's, contributor's, or third party's rights.

## 2. Attribution baseline

Repository READMEs should use precise, factual attribution. Where accurate, the preferred wording is:

> **Project direction and engineering:** Pooya Goodarzi  
> **Maintained as part of:** Pooya Labs

A repository may additionally show the Pooya Monogram as a brand/maintainer mark. The mark must link to the intended Pooya Labs destination and must not be described as proof of legal ownership.

Do not use a blanket statement such as "All rights belong to Pooya Labs" across every repository. Do not add a copyright notice naming a person or entity until the relevant rights holder and scope have been verified.

## 3. Project-specific rights register

Before adding or changing a LICENSE, COPYRIGHT, NOTICE, or ownership claim, record:

1. Who authored the original code and design.
2. Whether any part was commissioned, created for a client, or developed under an employment or other agreement.
3. Whether a contract or written assignment changes who owns the relevant rights.
4. Which assets, fonts, libraries, datasets, APIs, and other third-party materials are included.
5. Which license currently applies, including licenses inherited from dependencies or upstream projects.
6. Whether the repository contains customer data, private operational details, credentials, or client-owned branding.

If any material fact is unknown, mark the rights status **Needs confirmation** and do not infer ownership.

## 4. License policy

- A public repository is not automatically open source. Without an explicit license, default copyright rules apply; do not tell users they may freely reuse the code.
- Never add MIT, Apache-2.0, GPL, or another license merely to make repositories look complete. The rights holder must authorize the grant.
- Preserve existing project licenses unless an authorized rights holder explicitly approves a change.
- **AetherFlow:** retain its existing Apache-2.0 licensing. Review bundled assets and third-party notices separately; do not silently relicense them.
- **ORBIT:** its README currently states that no open-source license has been selected and that all rights are reserved by default. Preserve that position unless the rights holder chooses otherwise.
- For repositories without a LICENSE file, record the current status as **No explicit repository license — rights review pending**. Do not add a LICENSE file as part of a cosmetic cleanup.

For dependencies and bundled materials, retain upstream license notices and add a third-party notices inventory where required by the applicable licenses.

## 5. Client and commissioned projects

A repository's developer attribution does not establish ownership of the client's brand, business data, customer records, domain, deployed accounts, or commissioned deliverables.

For client-facing projects:

- Identify client-owned names, logos, copy, data, and operational accounts separately from developer-created reusable tooling.
- Do not publish private customer records, production credentials, deployment secrets, or private integration identifiers.
- Do not claim exclusive ownership of the complete product unless the agreement and applicable law support that claim.
- Keep public source-code licensing separate from client usage rights and service arrangements.
- Obtain written approval before publishing client-owned assets or screenshots that may expose personal or business-sensitive information.

**Salon Booking:** treat the salon's business identity, customer/booking data, Google Apps Script deployment, private spreadsheet, and operational accounts as client-controlled unless documented agreements establish otherwise. Pooya's engineering contribution may be credited, but this policy does not decide ownership of commissioned deliverables. Preserve the live website URL and current production integrations during all governance work.

## 6. Contributions and external material

- Preserve authorship attribution for meaningful contributions.
- Do not copy code, designs, text, images, or datasets from third parties without checking the source and license.
- Require contributors to confirm they have the right to submit their contributions.
- A Contributor License Agreement (CLA) or copyright assignment must be introduced only when there is a concrete legal and project need, with explicit review and consent. A CLA is not automatically a transfer of copyright.
- Keep THIRD_PARTY_NOTICES.md or equivalent notices when required or useful for the repository's actual dependencies and bundled assets.

## 7. Repository governance and security

Each repository should progressively adopt:

- A contribution guide appropriate to its actual workflow.
- A security reporting policy that does not ask people to disclose vulnerabilities publicly.
- Least-privilege GitHub Actions permissions.
- Protected release paths and required checks, introduced only after all legitimate automation paths are compatible.
- Secret scanning and dependency/security checks appropriate to the stack.
- Release notes that distinguish verified behavior from plans, demos, and unverified production claims.

Do not enable a pull-request-only rule on a branch until direct-push automation, release publishers, Pages deployment, and other required workflows have been migrated and tested.

## 8. Required repository status labels

Use one of these explicit states in the internal ownership matrix:

- **Verified:** authorship, rights holder, license, and third-party obligations have been checked against available records.
- **Needs confirmation:** one or more material rights or agreement details remain unknown.
- **Third-party / client-controlled elements:** the repository includes material that must remain separately attributed or controlled.
- **No explicit license:** no repository-level reuse permission has been granted.

A repository can have more than one status.

## 9. Change control

Any change to a repository's license, copyright notice, ownership claim, trademark statement, or client-rights statement requires:

1. A recorded project-specific rights review.
2. Confirmation from the person or entity authorized to grant the relevant rights.
3. A review of bundled third-party material.
4. A pull request or documented change with a clear rationale.
5. Verification that deployment URLs and runtime integrations remain unchanged where required.

This baseline policy does not itself change any repository's license, transfer any intellectual-property rights, or modify any live deployment.

---

## فارسی — سیاست مالکیت، حقوق فکری و انتساب

**وضعیت:** سیاست پایه؛ بررسی حقوق هر پروژه جداگانه الزامی است  
**هویت سازنده و نگه‌دارنده:** پویا گودرزی  
**برند و اکوسیستم پروژه‌ها:** پویا لبز  
**آخرین بازبینی:** ۱۸ آبان ۱۴۰۵

این سند شیوهٔ درج نام سازنده، نگه‌دارنده، مجوزها، دارایی‌های اشخاص ثالث و وضعیت مالکیت هر پروژه را مشخص می‌کند. این سند به‌تنهایی قرارداد، انتقال حقوق یا مشاورهٔ حقوقی نیست.

### ۱. چهار مفهوم متفاوت

- **سازنده:** شخصی که واقعاً کد، طراحی یا محتوای مشخصی را ایجاد کرده است.
- **دارندهٔ حقوق:** شخص یا نهادی که طبق واقعیت‌ها، قراردادها و قانون مربوط، حقوق اثر را در اختیار دارد.
- **نگه‌دارنده:** شخصی که مسئول بررسی، نگه‌داری و انتشار مخزن است.
- **برند:** نام و هویت بصری مورد استفاده برای معرفی پروژه یا اکوسیستم.

«پویا لبز» نام برند و اکوسیستم این پروژه‌هاست. درج این نام یا پیوند پلتفرم پویا لبز به‌خودی‌خود حقوق مادی یا معنوی را منتقل نمی‌کند و وجود یک شخصیت حقوقی مستقل را ثابت نمی‌کند.

### ۲. الگوی انتساب

در مواردی که با واقعیت پروژه مطابقت دارد، عبارت پیشنهادی:

> **جهت‌دهی پروژه و مهندسی:** پویا گودرزی  
> **نگه‌داری در چارچوب:** پویا لبز

نشان پویا مونوگرام می‌تواند به‌عنوان نشان برند یا نگه‌دارنده درج شود؛ اما نباید به‌عنوان مدرک مالکیت حقوقی معرفی شود.

از عبارت کلی «تمام حقوق متعلق به پویا لبز است» برای همهٔ مخزن‌ها استفاده نکن. درج اعلان کپی‌رایت به نام یک شخص یا نهاد نیز باید تا زمان احراز دارندهٔ حقوق و محدودهٔ آن به تعویق بیفتد.

### ۳. بررسی حقوق هر پروژه

پیش از افزودن یا تغییر فایل‌های LICENSE، COPYRIGHT یا NOTICE باید این موارد ثبت شوند:

1. نویسندگان واقعی کد و طراحی چه کسانی هستند؟
2. آیا پروژه سفارشی، متعلق به مشتری یا حاصل رابطهٔ استخدامی/قراردادی است؟
3. آیا قرارداد یا واگذاری کتبی، دارندهٔ حقوق را تغییر داده است؟
4. چه کتابخانه‌ها، فونت‌ها، تصاویر، داده‌ها و دارایی‌های ثالثی استفاده شده‌اند؟
5. مجوز فعلی پروژه و وابستگی‌های آن چیست؟
6. آیا مخزن حاوی اطلاعات مشتری، اسرار عملیاتی یا نشان تجاری متعلق به شخص دیگری است؟

اگر اطلاعات مهمی مشخص نیست، وضعیت باید «نیازمند تأیید» ثبت شود و نباید مالکیت را حدس زد.

### ۴. سیاست مجوز

- عمومی‌بودن مخزن به معنی متن‌بازبودن آن نیست.
- هیچ مجوزی مانند MIT، Apache-2.0 یا GPL صرفاً برای کامل‌تر به‌نظررسیدن پروژه اضافه نشود.
- مجوزهای فعلی بدون تأیید دارندهٔ حقوق تغییر نکنند.
- **AetherFlow:** مجوز Apache-2.0 فعلی حفظ شود و دارایی‌ها و اعلان‌های اشخاص ثالث جداگانه بررسی شوند.
- **ORBIT:** عبارت فعلی README مبنی بر انتخاب‌نشدن مجوز متن‌باز و محفوظ‌بودن حقوق حفظ شود، مگر آنکه دارندهٔ حقوق تصمیم دیگری بگیرد.
- برای مخزن‌های فاقد LICENSE وضعیت «بدون مجوز صریح مخزن؛ بررسی حقوق در انتظار» ثبت شود.

### ۵. پروژه‌های مشتری و سفارشی

انتساب نام توسعه‌دهنده به معنی مالکیت نشان تجاری مشتری، داده‌های کسب‌وکار، سوابق مشتریان، دامنه، حساب‌های عملیاتی یا تمام خروجی‌های سفارشی نیست.

در پروژه‌های مشتری باید دارایی‌های مشتری از ابزارها و کدهای قابل استفادهٔ مجدد توسعه‌دهنده جدا شوند. انتشار تصویر، داده یا اطلاعات مشتری نیز به تأیید مناسب نیاز دارد.

**Salon Booking:** هویت تجاری سالن، داده‌های رزرو و مشتریان، استقرار Google Apps Script، صفحه‌گستردهٔ خصوصی و حساب‌های عملیاتی باید تحت کنترل مشتری فرض شوند، مگر آنکه قرارداد معتبر خلاف آن را مشخص کند. سهم مهندسی پویا قابل انتساب است، اما این سند مالکیت حقوقی خروجی سفارشی را تعیین نمی‌کند. نشانی سایت زنده و اتصال‌های عملیاتی آن باید در تمام اصلاحات حاکمیتی حفظ شوند.

### ۶. مشارکت‌ها و دارایی‌های خارجی

- انتساب مشارکت‌کنندگان حفظ شود.
- کد، طراحی، متن، تصویر و دادهٔ اشخاص ثالث بدون بررسی منبع و مجوز استفاده نشود.
- مشارکت‌کننده باید حق ارائهٔ تغییر خود را داشته باشد.
- CLA یا واگذاری کپی‌رایت فقط در صورت نیاز واقعی و با بررسی و رضایت صریح اجرا شود.
- در صورت نیاز مجوزها و اعلان‌های وابستگی‌ها در THIRD_PARTY_NOTICES.md نگه‌داری شوند.

### ۷. حاکمیت و امنیت مخزن

هر مخزن باید به‌تدریج راهنمای مشارکت، مسیر گزارش آسیب‌پذیری، حداقل دسترسی لازم برای GitHub Actions، بررسی امنیت وابستگی‌ها و دروازه‌های انتشار متناسب با ساختار واقعی خود را داشته باشد.

قانون الزام PR برای شاخهٔ اصلی نباید پیش از سازگارکردن و آزمایش انتشاردهنده‌های خودکار، GitHub Pages و سایر گردش‌کارهای ضروری فعال شود.

### ۸. وضعیت حقوقی در ماتریس داخلی

- **تأییدشده:** نویسندگی، دارندهٔ حقوق، مجوز و تعهدات دارایی‌های ثالث بررسی شده‌اند.
- **نیازمند تأیید:** اطلاعات مهمی دربارهٔ حقوق یا قرارداد هنوز مشخص نیست.
- **دارای عناصر متعلق به مشتری/شخص ثالث:** بخشی از مخزن باید جداگانه منتسب یا کنترل شود.
- **بدون مجوز صریح:** مجوز استفادهٔ مجدد در سطح مخزن اعطا نشده است.

هر پروژه می‌تواند هم‌زمان چند وضعیت داشته باشد.

### ۹. کنترل تغییرات

تغییر مجوز، اعلان کپی‌رایت، ادعای مالکیت، نشان تجاری یا متن مربوط به حقوق مشتری باید پس از بررسی اختصاصی پروژه، تأیید شخص مجاز، بررسی دارایی‌های ثالث و ثبت دلیل تغییر انجام شود. همچنین در پروژه‌های منتشرشده باید ثابت‌ماندن نشانی سایت و اتصال‌های عملیاتی بررسی شود.

این سیاست به‌تنهایی مجوز هیچ مخزنی را تغییر نمی‌دهد، حقوق فکری را منتقل نمی‌کند و هیچ استقرار زنده‌ای را دست‌کاری نمی‌کند.
