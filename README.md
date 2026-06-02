# FALO AI Capability Runtime Hub

企業級 AI 能力服務治理平台展示與互動式主控台。本專案以 **OCR** 作為首發能力卡（Capability Card #1），具體呈現 FALO 作為 AI Runtime 治理中台的戰略價值。

> [!IMPORTANT]
> 本專案為 **FALO/TAAT x Force Cheng 2026/6/2** 共同研發之方法論落地驗證（PoC）。
> 核心定位：**Workflow × Governance × KM × ETL × AI Runtime**

---

## 🎨 核心系統定位

我們不應將本專案侷限於單純的「OCR 辨識工具」。OCR 只是平台執行的第一張能力卡。FALO 的核心價值在於為企業建立 AI 能力服務的**治理者**與**稽核者**角色：
*   **Workflow (工作流是主體)**：將結構化資料無縫導入 ERP、發票審計等核心業務系統。
*   **Governance (治理是靈魂)**：藉由「內外雙軌對帳」與 API 防火牆，監控每次 API 的狀態與成本。
*   **KM (知識整合是長期護城河)**：清洗後的非結構化資料會自動沉澱至企業專屬知識庫（如 NotebookLM）。
*   **FinOps & AI Audit**：動態調配模型路由，優化算力開銷並保留合規稽核軌跡。

---

## 🚀 互動式主控台功能亮點

本單頁應用（SPA）採用無框架原生前端技術（HTML5, Vanilla CSS, JS）打造，提供極致流暢的視覺體驗與互動邏輯：
1.  **專案定位與世界觀 (Manifesto)**：解構四維協同模型（Force Cheng、Strategic Consultant、Antigravity、Codex）與能力卡插槽計畫。
2.  **核心數據價值鏈概念圖 (Concept Flow)**：精美 SVG 互動流程圖，搭配 animated data lines 與一鍵開啟/下載 `falo_ocr_gate.png` 瀏覽器模型框。
3.  **SME 老闆價值簡報 (Apple-style Slide)**：以簡約流暢的 Keynote 動畫與橫向進度條展示 SME老闆最關心的 ROI 回報。
4.  **AI 雙軌帳本自動審計終端 (Reconciliation Console)**：
    *   **Retool風格雙軌帳本**：對比內帳（客戶計費）與外帳（Provider 實扣），標示 Timeout、失敗與金額差異。
    *   **CRT 終端機**：具備模擬 CRT 螢幕掃描線特效的 Audit Terminal，點擊運行即可執行 AI 對帳診斷與自動修復。
    *   **FinOps 路由滑桿**：動態模擬 PaddleOCR (省錢) 與 Gemini (精準) 的比例調整，實時計算萬頁成本與節費幅度。
5.  **商業模式畫布彈出式抽屜 (BMC Modal)**：點擊畫布任一區塊會直接滑出磨砂玻璃 modal 視窗，展示獨家護城河與落地策略。
6.  **積木式架構圖 (Layered Arch)**：以立體處理器卡片視覺呈現「應用接入層」、「AI Proxy 治理核心」與「執行層」。
7.  **演進路線圖 (Timeline)**：帶有發光節點的 vertical timeline，追蹤從工具 PoC 發展到 AI Runtime Market 的四個階段。

---

## 🌓 持續性雙色主題 (Dark / Light Theme)
*   **預設暗黑色系**：帶有極客感與科幻霓虹微光背景。
*   **明亮色系切換**：極簡亮白色系，兼顧陽光下的高對比度可讀性。
*   **本地記憶**：採用 `localStorage`（保存為 `falo-theme`），自動記憶使用者最後一次選擇的主題。

---

## 💻 本地安裝與運行

本專案為純前端靜態網頁，無須任何複雜的編譯或伺服器建置：
1. 下載專案原始碼。
2. 直接在瀏覽器中雙擊打開 `index.html` 即可瀏覽並開始互動！

---

## 🛡️ 版權與作者宣告
*   **作者**：FALO/TAAT x Force Cheng 2026/6/2
*   **版權所有**：Copyright (c) FALO/TAAT x Force Cheng 2026/6/2. All rights reserved.
