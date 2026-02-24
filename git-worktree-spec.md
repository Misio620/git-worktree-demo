# Feature Spec: 常見 QA 問答區

> 此文件由 Git Worktree Design Skill 自動產生，供 AI Agent 作為開發指引。

## 分支資訊

| 項目 | 值 |
|------|-----|
| 分支名稱 | `feature/faq-section` |
| 基於分支 | `master` |
| Worktree 路徑 | `c:\Users\Misio\Desktop\git-worktree-demo-faq` |
| 建立時間 | `2026-02-24T18:09:51+08:00` |

## 目標

在 Pricing 區塊與 Footer 之間新增可展開/收合的 FAQ 手風琴元件，提供常見問題的解答。

## 實作範圍

- [x] 建立 `src/data/faq.js`：包含至少 6 組 QA 資料（依產品情境自行設計問題與答案）
- [x] 建立 `src/components/FAQ.jsx`：手風琴元件，支援點擊展開/收合，同時只開一項
- [x] 手風琴動畫：使用 CSS `max-height` transition 實現 smooth expand/collapse
- [x] 在 `src/App.jsx` 的 `<Pricing />` 和 `<CallToAction />` 之間插入 `<FAQ />`
- [x] 樣式撰寫至 `src/index.css`：標題列 hover 效果、展開箭頭旋轉動畫、區塊間距統一
- [x] 支援鍵盤導覽（按 Enter / Space 展開，Tab 切換項目）

## 驗收標準

- 至少 6 組 QA，內容與產品（SaaS / Landing Page）情境相關
- 點擊問題列展開答案，再點收合，動畫 smooth（`transition` 0.3s）
- 同時只有一項展開（點擊其他項目時自動收合當前展開項）
- 展開/收合箭頭圖示有旋轉動畫
- 鍵盤可操作（無障礙）
- 手機版排版正常（padding 自適應）

## 技術約束

- 不得引入新的 npm 依賴（純 React + CSS 實作）
- 若 `feature/theme-switcher` 已合併，FAQ 樣式應使用 CSS 變數；若尚未合併，可先用 hardcoded 色彩，待合併後調整
- 元件需具備良好可重用性（props 接受外部 QA 資料）

## 跨分支備註

- 與 `feature/theme-switcher` 無強制相依，可獨立開發
- 若 theme-switcher 先合併，FAQ 的 CSS 應改用 CSS 變數，否則 merge 後需補一次修改
- 合併順序建議：`feature/theme-switcher` 先合，再合本分支
