---
name: Git Worktree Design
description: 當使用者提到 "worktree"、"git worktree"、"多分支開發"、"parallel branches"，或是判斷使用者的需求適合拆分成多個 feature branch 並行開發時，自動觸發此 Skill。先分析需求並建議 worktree 拆分方案，經使用者確認後執行建立。
---

# Git Worktree Design — 智慧拆分平行開發

分析使用者需求，判斷是否適合以 `git worktree` 拆分成多個 feature branch 平行開發，提供建議方案並執行。

---

## 流程

### 1. 分析當前狀態

執行以下指令了解 repo 狀態：

```bash
# 確認當前分支
git branch --show-current

# 列出既有 worktree
git worktree list

# 取得 remote 資訊
git remote -v

# 確認工作目錄狀態
git status --short
```

若有未提交的變更，提醒使用者先處理（commit 或 stash）再繼續。

---

### 2. 需求拆分與建議

根據使用者需求，分析並拆分成多個獨立的 feature branch。

#### 拆分原則

| 原則 | 說明 |
|------|------|
| **功能獨立性** | 每個 worktree 負責一個獨立功能，減少跨分支衝突 |
| **最小相依** | 盡量避免分支間互相依賴，可獨立開發與測試 |
| **合理粒度** | 不宜太細（增加管理負擔），不宜太粗（失去平行開發優勢） |
| **命名語意** | 分支名清楚描述功能，格式 `feature/<功能名>` |

#### 輸出建議格式

以表格 + 指令預覽的形式向使用者呈現方案：

```
📋 Worktree 拆分方案（共 N 個分支）

| # | 分支名稱 | Worktree 目錄 | 負責功能 |
|---|----------|---------------|----------|
| 1 | feature/hero-redesign | ../project-hero | Hero 區塊重新設計 |
| 2 | feature/pricing-page | ../project-pricing | 定價頁面 |
| 3 | feature/testimonials | ../project-testimonials | 用戶見證區塊 |

將執行的指令：

git worktree add -b feature/hero-redesign ../project-hero
git worktree add -b feature/pricing-page ../project-pricing
git worktree add -b feature/testimonials ../project-testimonials

確認執行？(Y/n)
```

使用 `notify_user` 工具向使用者展示方案並等待確認。

---

### 3. 建立 Worktree

使用者確認後，依序執行：

```bash
# 建立各 worktree（新分支）
git worktree add -b <branch_name> <worktree_path>
```

#### Worktree 目錄命名規則

- 目錄放在當前 repo 的**同層級**（`../`）
- 格式：`../<project-name>-<feature-short-name>`
- 取 repo 目錄名作為 `<project-name>` 前綴，避免與其他專案混淆

---

### 4. 安裝依賴

偵測專案使用的套件管理器並安裝依賴：

```bash
# 偵測 lock file 判斷套件管理器
# pnpm-lock.yaml → pnpm install
# yarn.lock → yarn install
# package-lock.json → npm install
# bun.lockb → bun install
```

對每個 worktree 執行：

```bash
cd <worktree_path> && <package_manager> install
```

> **注意**：每個 worktree 有獨立的工作目錄，`node_modules` 不會共享，必須各自安裝。

---

### 5. 確認結果

所有 worktree 建立完成後，執行：

```bash
git worktree list
```

以表格形式展示結果：

```
✅ Worktree 建立完成！

| Worktree 目錄 | 分支 | 狀態 |
|---------------|------|------|
| /path/to/project-hero | feature/hero-redesign | ✅ 就緒 |
| /path/to/project-pricing | feature/pricing-page | ✅ 就緒 |
| /path/to/project-testimonials | feature/testimonials | ✅ 就緒 |

💡 提示：
- 切換工作目錄到對應 worktree 即可開始開發
- 完成後用 `git worktree remove <path>` 清理
- 所有 worktree 共享同一個 .git，commit 歷史互通
```

---

## 邊界情況處理

- **分支已存在**：偵測到分支已存在時，改用不帶 `-b` 的指令（`git worktree add <path> <existing-branch>`），並提示使用者確認
- **目錄已存在**：提示衝突並建議替代目錄名
- **有未提交變更**：提醒先 commit 或 stash
- **遠端分支同步**：建議先 `git fetch` 取得最新遠端狀態
- **Worktree 清理**：提醒使用者開發完成後用 `git worktree remove` 和 `git branch -d` 清理

---

## 常用維護指令

```bash
# 列出所有 worktree
git worktree list

# 移除 worktree（保留分支）
git worktree remove <path>

# 強制移除（有未提交變更時）
git worktree remove --force <path>

# 清理失效的 worktree 參照
git worktree prune

# 刪除分支（合併後）
git branch -d <branch_name>
```
