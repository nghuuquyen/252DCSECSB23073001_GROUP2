# Self-Report — Nguyễn Duy Thái Bảo

## Thông tin cá nhân

| | |
|---|---|
| **Họ tên** | Nguyễn Duy Thái Bảo |
| **MSSV** | 24020015 |
| **Nhóm** | CaloMate |
| **Vai trò trong nhóm** | Leader |
| **GitHub** | [nguyenduythaibao1611-eng](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io) |

---

## Task 1 — Planning & Setup

**Tuần:** Tuần 1, ngày 01/05/2026 – 08/05/2026

**Công việc đã làm:**

- **Lên ý tưởng & xác định tính năng cốt lõi** của ứng dụng CaloMate: ghi nhận calories hàng ngày, tracking macro-nutrients (Protein, Carbs, Fat), tính năng streak, dashboard dinh dưỡng, trang thống kê, quản lý profile người dùng.
- **Chọn tech stack** cho toàn nhóm: Next.js 15, React 19, TypeScript strict mode, Tailwind CSS v4, Zustand, Recharts, Framer Motion, Prisma ORM + Supabase.
- **Khởi tạo dự án Next.js**, thiết lập cấu trúc thư mục (`app`, `components`, `lib`, `store`, `types`), cấu hình `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- **Thiết lập Git workflow** cho cả nhóm: branch naming convention, commit message convention.
- **Viết tài liệu** `README.md` và `AGENTS.md` (coding conventions).
- **Định nghĩa TypeScript interfaces**: `UserProfile`, `MacroTarget`, `Ingredient`, `MealEntry`, `DailyLog`.
- **Xây dựng localStorage abstraction layer**: `getProfile`, `saveProfile`, `getLog`, `saveLog`, `getLogs`.
- **Thiết kế wireframe** các trang chính: Homepage/Dashboard, Diary/Food Log, Stats/Progress, Settings/Profile.
- **Phân tích yêu cầu** và định nghĩa user stories, acceptance criteria cho các features chính.

**Bằng chứng đóng góp (Commits):**

| Commit | Mô tả |
|--------|--------|
| [`9e8fd83`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/9e8fd83) | `initial commit` |
| [`be61f61`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/be61f61) | `setup: initialize Next.js project with Tailwind, TypeScript and setup project structure (app, components, lib, store, types)` |
| [`8a7bb38`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/8a7bb38) | `add UserProfile, MacroTarget, Ingredient, MealEntry, DailyLog + add localStorage layer - getProfile, saveProfile, getLog, saveLog, getLogs` |
| [`d6cc0db`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/d6cc0db) | `update file readme` |
| [`86f80d7`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/86f80d7) | `update file docs` |
| [`3332bca`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/3332bca) | `update file docs` |
| [`5848826`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/5848826) | `update file docs` |

**Khó khăn gặp phải:**

- Cân bằng giữa tech stack hiện đại (Next.js 15, React 19) và độ khó phù hợp để cả nhóm có thể đóng góp được.
- Đồng thuận với toàn bộ nhóm về design patterns và code structure trước khi bắt đầu lập trình.
- Quyết định data structure và database schema phù hợp với yêu cầu dự án.

**Đánh giá bản thân:** 8/10

---

## Task 2 — UI Implementation

**Tuần:** Tuần 2–3, ngày 08/05/2026 – 19/05/2026

**Công việc đã làm:**

- **Setup file layout** cho toàn bộ app (`app/page.tsx`, layout files).
- **Xây dựng Root Page** (`app/page.tsx`) — trang điều hướng tự động: có profile → `/dashboard`, chưa có → `/homepage`.
- **Kết nối trang Diary** với dữ liệu thật từ `diaryStore`.
- **Đồng bộ hóa trang tổng quan và nhật ký**, tạo nút settings.
- **Đồng bộ trang thống kê** với dữ liệu thật.
- **Cập nhật giao diện trang tổng quan** (dashboard layout).
- **Xây dựng trang Homepage** (`app/homepage/page.tsx`) — landing page với hero section, features, stats, CTA, footer.
- **Sửa workflow Homepage**: thêm logic điều hướng cho button "Bắt đầu với CaloMate" và "Bắt đầu" trong nav — kiểm tra localStorage, lần đầu → `/setup`, đã có profile → `/dashboard`.
- **Đồng bộ dữ liệu modal thêm món**: truyền `existingIngredients` vào `AddMealModalV2` để hiển thị món đã lưu khi mở lại modal.

**Bằng chứng đóng góp (Commits):**

| Commit | Ngày | Mô tả |
|--------|------|--------|
| [`d990022`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/d990022) | 09/05 | `setup file layout` |
| [`d8dbad8`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/d8dbad8) | 09/05 | `setup file layout` |
| [`1202d68`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/1202d68) | 09/05 | `feat: kết nối diary với dữ liệu thật` |
| [`dbbe44d`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/dbbe44d) | 10/05 | `Đồng bộ lại trang tổng quan, trang nhật ký. Tạo ra nút setting` |
| [`d49205e`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/d49205e) | 11/05 | `Đồng bộ trang thống kê` |
| [`d1401f3`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/d1401f3) | 10/05 | `Cập nhật lại trang tổng quan` |
| [`ea2063c`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/ea2063c) | 17/05 | `homepage` |
| [`40a82ef`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/40a82ef) | 18/05 | `homepage` |
| [`60e85ce`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/60e85ce) | 18/05 | `homepage` |
| [`5bb81de`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/5bb81de) | 19/05 | `Fix workflow web - dong bo du lieu them mon` |
| [`98d189f`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/98d189f) | 19/05 | `Fix workflow web - dong bo du lieu them mon` |
| [`beb4f22`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/beb4f22) | 19/05 | `Fix workflow web - dong bo du lieu them mon` |
| [`8e04bd9`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/8e04bd9) | 13/05 | `Update Readme` |

**Pull Requests đã tạo/merge:** PR #48, #51, #52, #55, #56, #62, #66, #67, #94

**Khó khăn gặp phải:**

- **Hydration mismatch** giữa server và client khi dùng localStorage với Zustand — giải quyết bằng `queueMicrotask` và `isMounted` flag.
- **Merge conflict** khi pull `main` về branch `fixbug/homepage-workflow` — resolve thủ công file `app/page.tsx`.

**Đánh giá bản thân:** 8/10

---

## Task 3 — Database Integration

**Tuần:** Tuần 2–3, ngày 09/05/2026 – 19/05/2026

**Công việc đã làm:**

- **Kết nối dữ liệu thật vào UI**: kết nối diary page với dữ liệu từ `diaryStore` (commit `1202d68`).
- **Review và merge các PR liên quan đến database** với tư cách Leader: PR #94, #97, #99.
- **Đảm bảo UI không bị breaking** khi chuyển đổi giữa localStorage layer sẵn có và Prisma API mới tích hợp.

- **Phần tích hợp Prisma/Supabase trực tiếp (schema design, API routes)** do thành viên khác đảm nhiệm.

**Bằng chứng đóng góp (Commits & PRs):**

| Bằng chứng | Mô tả |
|------------|--------|
| [`1202d68`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/1202d68) | `feat: kết nối diary với dữ liệu thật` |


**Khó khăn gặp phải:**

- Hỗ trợ phối hợp giữa localStorage layer sẵn có và Prisma API mới tích hợp — đảm bảo UI không bị breaking khi chuyển đổi.

**Đánh giá bản thân:** 6/10

---

## Task 4 — Optimization & Quality Assurance

**Tuần:** Tuần 3, ngày 10/05/2026 – 19/05/2026

**Công việc đã làm:**

- **Cấu hình `next.config.ts`**: bật `optimizeCss`, xóa `console.log` ở production, thêm security headers, cấu hình image optimization (avif/webp).
- **Fix lỗi TypeScript build**: xóa `"ignoreDeprecations": "6.0"` khỏi `tsconfig.json` (giá trị không được TypeScript hỗ trợ).
- **Fix merge conflict trong `app/page.tsx`** gây lỗi build.
- **Chạy `npm run build`** để phát hiện và giải quyết compilation errors — đảm bảo zero TypeScript errors.
- **Verify kết quả build thành công**:
  - ✓ Compiled successfully in 2.8s
  - ✓ Finished TypeScript in 4.5s
  - ✓ Generated 10/10 static pages prerendered
  - ✓ Exit Code: 0
- **Review và merge PR tối ưu performance** của thành viên (Task 25 — lazy load, Lighthouse > 75) — PR #71.

**Bằng chứng đóng góp (Commits):**

| Commit | Ngày | Mô tả |
|--------|------|--------|
| [`80a9f37`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/80a9f37) | 19/05 | `fix: resolve merge conflict` |
| `next.config.ts` | — | Compiler options, security headers, image config (avif/webp) |
| Merge PR #71 | 11/05 | Task 25 — performance optimization (lazy load, Lighthouse > 75) |

**Branch đang làm việc:** `fixbug/homepage-workflow` (pushed to origin)

**Khó khăn gặp phải:**

- Lỗi `Invalid value for '--ignoreDeprecations'` khi build do TypeScript version không hỗ trợ giá trị `"6.0"` — fix bằng cách xóa dòng đó khỏi `tsconfig.json`.
- Next.js build process sử dụng worker threads khiến error message không lúc nào rõ ràng.

**Đánh giá bản thân:** 7/10

---

## Task 5 — Peer Review & Collaboration

**Tuần:** Tuần 3, ngày 15/05/2026 – 19/05/2026

**Công việc đã làm:**

- **Tối ưu hóa quy trình phát triển nhóm (Git Workflow)**: trực tiếp giải quyết các merge conflicts phức tạp, gộp nhánh và thiết lập cơ chế gộp code an toàn.
- **Review và approve PRs** của các thành viên trong nhóm (với vai trò Leader): PR #71, #84, #87, #93, #94, #97, #99, #100, #101.
- **Mở GitHub Issue mới cho nhóm WindToDo** để lên kế hoạch tính năng tiếp theo: [[Feature] Thêm nút "Export" vào trang Statistics #58](https://github.com/TonyLikeDev/WindTodo-V1/issues/58) — mô tả rõ problem description, steps to reproduce, expected behavior và suggested implementation chi tiết (client-side export CSV, dùng lucide-react icon Download, xử lý lint errors đồng thời).
- **Cập nhật tài liệu dự án**: README, AGENTS.md, self-report.

**Bằng chứng đóng góp:**

| Bằng chứng | Mô tả |
|------------|--------|
| [`728da27`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/728da27) | `Merge branch 'main' into fixbug/homepage-workflow` |
| [`80a9f37`](https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io/commit/80a9f37) | `fix: resolve merge conflict` |
| GitHub Issue #58 | [[Feature] Thêm nút "Export" vào trang Statistics](https://github.com/TonyLikeDev/WindTodo-V1/issues/58) — mô tả đầy đủ problem, behavior mong đợi, suggested implementation |
| Merge PRs | #71, #84, #87, #93, #94, #97, #99, #100, #101 |

**Khó khăn gặp phải:**

- Tích hợp code từ nhiều nhánh phát triển song song đòi hỏi rà soát kỹ lưỡng để giải quyết xung đột mà không làm gián đoạn tiến trình chung.

**Đánh giá bản thân:** 8/10

---

## Tóm tắt đóng góp

| Task | Nội dung chính | Trạng thái | Đánh giá |
|------|---------------|-----------|---------|
| Task 1 — Planning & Setup | Khởi tạo project, tech stack, TypeScript types, localStorage layer, Git workflow | ✓ Hoàn thành | 8/10 |
| Task 2 — UI Implementation | Root page routing, Diary sync, Dashboard, Stats, Homepage, workflow fix | ✓ Hoàn thành | 8/10 |
| Task 3 — Database Integration | Kết nối UI với data thật, merge & review PR database | ✓ Hoàn thành | 6/10 |
| Task 4 — Optimization | next.config.ts, TypeScript build fix, merge conflict fix, verify build | ✓ Hoàn thành | 7/10 |
| Task 5 — Peer Review | Git workflow, PR reviews, GitHub issue #58, documentation | ✓ Hoàn thành | 8/10 |
| **Tổng hợp** | | ✓ Hoàn thành | **7.7/10** |

---

## Tổng Kết Đóng Góp Cá Nhân

**Tóm tắt những gì đã đóng góp:**

Là Leader của nhóm CaloMate, tôi chịu trách nhiệm từ khâu lên ý tưởng, chọn tech stack (Next.js 15, React 19, TypeScript, Zustand), đến khởi tạo toàn bộ project structure và thiết lập Git workflow cho nhóm. Về UI, tôi desgin lên UI cơ bản bằng stitch, xây dựng hệ thống onboarding workflow tự động (điều hướng người dùng lần đầu vào ProfileForm, lần tiếp theo vào Dashboard), đồng bộ hóa toàn bộ các trang chính (tổng quan, nhật ký, thống kê), và hoàn thiện trang Homepage với đầy đủ landing page sections. Ngoài ra, tôi giải quyết các vấn đề kỹ thuật quan trọng như hydration mismatch với Zustand, TypeScript build errors, và merge conflicts. Phần tôi tự hào nhất là kiến trúc tổng thể của dự án, localStorage abstraction layer, và việc giữ cho codebase luôn build thành công trong suốt quá trình phát triển.

**Ước tính % đóng góp so với cả nhóm:** ~25%

**Điểm tự đánh giá tổng thể:** 7.7/10

---

## Ghi chú kỹ thuật

- **Build status cuối cùng:** ✓ Compiled successfully — 10/10 static routes prerendered — Exit Code: 0
- **Repository:** https://github.com/nguyenduythaibao1611-eng/calorie-web.github.io
- **Tất cả TypeScript errors đã được giải quyết hoàn toàn**
- **Development server sẵn sàng** với `npm run dev`