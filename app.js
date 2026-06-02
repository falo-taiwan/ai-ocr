// App Controller for FALO AI Capability Runtime Dashboard
// Copyright (c) FALO/TAAT x Force Cheng 2026/6/2. All rights reserved.

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initSMESlider();
  initLedgerReconciliation();
  initFinOpsOptimizer();
  initArchBlockHighlights();
  initBMCHighlights();
});

// 1. Navigation Panel Controller
function initNavigation() {
  // Copyright (c) FALO/TAAT x Force Cheng 2026/6/2. All rights reserved.
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');

      // Update active nav item
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Update active content section
      sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === targetTab) {
          sec.classList.add('active');
        }
      });
    });
  });
}

// 2. SME Presentation Slide Controller
const smeSlides = [
  {
    emoji: "📥",
    title: "1. 非結構化數據的 ETL 清洗",
    desc: "中小企業安裝能力卡（如 OCR Card #1）後，一鍵將雜亂的發票、收據、合約影像上傳，FALO AI Proxy 自動將其清洗為結構化 JSON 資料，免除人工打字登打。"
  },
  {
    emoji: "⚙️",
    title: "2. 自動對接工作流與 ERP 系統",
    desc: "數據清洗後，自動回填企業既有的進銷存、報銷流程或 ERP 記帳系統。工作流（Workflow）才是系統主體，將打字流程縮短 90%，效率提升 5 倍！"
  },
  {
    emoji: "🛡️",
    title: "3. 雙軌 ledger 稽核與治理",
    desc: "系統即時寫入客戶計費（內帳）與模型商實際實耗（外帳）。AI 自動偵測超時 Timeout 與失敗扣款，幫企業查帳，杜絕雲端 API 計費黑盒。"
  },
  {
    emoji: "🧠",
    title: "4. 沉澱為企業專屬知識庫 (KM)",
    desc: "所有經由能力卡處理的歷史單據，自動匯入企業大腦知識庫（KM），建構出企業專屬的語意搜尋系統，為管理決策與合規審核提供長期護城河。"
  }
];

let currentSlideIdx = 0;

function initSMESlider() {
  // Copyright (c) FALO/TAAT x Force Cheng 2026/6/2. All rights reserved.
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const progressBar = document.getElementById('slide-progress-bar');
  const slideGraphic = document.getElementById('slide-graphic');
  const slideTitle = document.getElementById('slide-title');
  const slideDesc = document.getElementById('slide-desc');
  const slideContent = document.getElementById('slide-content');

  function updateSlideUI() {
    const current = smeSlides[currentSlideIdx];
    
    // Add visual switch fade transition
    slideContent.style.opacity = 0;
    slideContent.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      slideGraphic.textContent = current.emoji;
      slideTitle.textContent = current.title;
      slideDesc.textContent = current.desc;
      
      slideContent.style.opacity = 1;
      slideContent.style.transform = 'translateY(0)';
    }, 200);

    // Update buttons
    prevBtn.disabled = currentSlideIdx === 0;
    nextBtn.disabled = currentSlideIdx === smeSlides.length - 1;

    // Update slide progress bar width
    const progressPercent = ((currentSlideIdx + 1) / smeSlides.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  function goSlide(idx) {
    currentSlideIdx = idx;
    updateSlideUI();
  }

  prevBtn.addEventListener('click', () => {
    if (currentSlideIdx > 0) goSlide(currentSlideIdx - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlideIdx < smeSlides.length - 1) goSlide(currentSlideIdx + 1);
  });

  updateSlideUI();
}

// 3. AI Ledger Auto-Reconciliation Engine (Interactive logs)
const internalLedgerData = [
  { id: "TX-001", client: "SME-Alpha", pages: 1, cost: "$0.05", status: "SUCCESS", time: "13:50:02" },
  { id: "TX-002", client: "SME-Beta", pages: 3, cost: "$0.15", status: "SUCCESS", time: "13:51:14" },
  { id: "TX-003", client: "SME-Gamma", pages: 10, cost: "$0.50", status: "SUCCESS", time: "13:51:50" }, // Conflict: External Timeout
  { id: "TX-004", client: "SME-Alpha", pages: 2, cost: "$0.10", status: "SUCCESS", time: "13:52:10" },
  { id: "TX-005", client: "SME-Delta", pages: 1, cost: "$0.05", status: "SUCCESS", time: "13:52:45" },
  { id: "TX-006", client: "SME-Beta", pages: 4, cost: "$0.20", status: "SUCCESS", time: "13:53:01" },
  { id: "TX-007", client: "SME-Epsilon", pages: 12, cost: "$0.60", status: "SUCCESS", time: "13:53:30" }, // Conflict: External Failed (0 pages)
  { id: "TX-008", client: "SME-Alpha", pages: 2, cost: "$0.10", status: "SUCCESS", time: "13:54:12" },
  { id: "TX-009", client: "SME-Gamma", pages: 1, cost: "$0.02", status: "SUCCESS", time: "13:54:55" }, // Conflict: Cost Discrepancy ($0.02 vs $0.08)
  { id: "TX-010", client: "SME-Delta", pages: 5, cost: "$0.25", status: "SUCCESS", time: "13:55:18" }
];

const externalLedgerData = [
  { reqId: "REQ-091a", provider: "Gemini V", pages: 1, cost: "$0.030", status: "SUCCESS", time: "13:50:03" },
  { reqId: "REQ-092b", provider: "PaddleOCR", pages: 3, cost: "$0.015", status: "SUCCESS", time: "13:51:15" },
  { reqId: "REQ-093c", provider: "Azure OCR", pages: 10, cost: "$0.000", status: "TIMEOUT", time: "13:52:30" }, // Conflict with TX-003
  { reqId: "REQ-094d", provider: "PaddleOCR", pages: 2, cost: "$0.010", status: "SUCCESS", time: "13:52:11" },
  { reqId: "REQ-095e", provider: "Gemini V", pages: 1, cost: "$0.030", status: "SUCCESS", time: "13:52:46" },
  { reqId: "REQ-096f", provider: "Google V", pages: 4, cost: "$0.060", status: "SUCCESS", time: "13:53:02" },
  { reqId: "REQ-097g", provider: "Qwen-VL", pages: 0, cost: "$0.005", status: "FAILED", time: "13:53:32" }, // Conflict with TX-007 (0 pages processed)
  { reqId: "REQ-098h", provider: "PaddleOCR", pages: 2, cost: "$0.010", status: "SUCCESS", time: "13:54:13" },
  { reqId: "REQ-099i", provider: "Gemini V", pages: 1, cost: "$0.080", status: "SUCCESS", time: "13:54:57" }, // Conflict with TX-009 (Cost mismatch)
  { reqId: "REQ-100j", provider: "PaddleOCR", pages: 5, cost: "$0.025", status: "SUCCESS", time: "13:55:19" }
];

function initLedgerReconciliation() {
  const internalBody = document.getElementById('internal-ledger-body');
  const externalBody = document.getElementById('external-ledger-body');
  const reconcileBtn = document.getElementById('reconcile-btn');
  const consoleLogs = document.getElementById('console-logs');

  // Render tables
  function renderTables(withHighlights = false) {
    internalBody.innerHTML = '';
    internalLedgerData.forEach((row) => {
      const tr = document.createElement('tr');
      tr.id = `int-row-${row.id}`;
      
      let highlightClass = '';
      let statusHtml = `<span class="status-badge success">${row.status}</span>`;
      
      if (withHighlights) {
        if (row.id === "TX-003") {
          highlightClass = 'style="background: rgba(245, 158, 11, 0.12); color: var(--amber);"';
          statusHtml = `<span class="status-badge timeout">TIMEOUT FAIL</span>`;
        } else if (row.id === "TX-007") {
          highlightClass = 'style="background: rgba(244, 63, 94, 0.12); color: var(--rose);"';
          statusHtml = `<span class="status-badge fail">FAIL</span>`;
        } else if (row.id === "TX-009") {
          highlightClass = 'style="background: rgba(245, 158, 11, 0.12); color: var(--amber);"';
          statusHtml = `<span class="status-badge success">${row.status}</span> <span style="font-size:10px; font-weight:700; color:var(--amber);">[Cost Diff]</span>`;
        }
      }
      
      tr.innerHTML = `
        <td ${highlightClass}>${row.id}</td>
        <td ${highlightClass}>${row.client}</td>
        <td ${highlightClass}>${row.pages}</td>
        <td ${highlightClass}>${row.cost}</td>
        <td ${highlightClass}>${statusHtml}</td>
        <td ${highlightClass}>${row.time}</td>
      `;
      internalBody.appendChild(tr);
    });

    externalBody.innerHTML = '';
    externalLedgerData.forEach((row) => {
      const tr = document.createElement('tr');
      tr.id = `ext-row-${row.reqId}`;
      
      let highlightClass = '';
      let statusHtml = `<span class="status-badge ${row.status.toLowerCase()}">${row.status}</span>`;
      
      if (withHighlights) {
        if (row.reqId === "REQ-093c") {
          highlightClass = 'style="background: rgba(245, 158, 11, 0.12); color: var(--amber);"';
        } else if (row.reqId === "REQ-097g") {
          highlightClass = 'style="background: rgba(244, 63, 94, 0.12); color: var(--rose);"';
        } else if (row.reqId === "REQ-099i") {
          highlightClass = 'style="background: rgba(245, 158, 11, 0.12); color: var(--amber);"';
          statusHtml += ` <span style="font-size:10px; font-weight:700; color:var(--amber);">[Cost Diff]</span>`;
        }
      }
      
      tr.innerHTML = `
        <td ${highlightClass}>${row.reqId}</td>
        <td ${highlightClass}>${row.provider}</td>
        <td ${highlightClass}>${row.pages}</td>
        <td ${highlightClass}>${row.cost}</td>
        <td ${highlightClass}>${statusHtml}</td>
        <td ${highlightClass}>${row.time}</td>
      `;
      externalBody.appendChild(tr);
    });
  }

  // Initial render
  renderTables(false);

  // Reconcile Simulator Action
  reconcileBtn.addEventListener('click', () => {
    reconcileBtn.disabled = true;
    consoleLogs.innerHTML = '';
    
    const logs = [
      { text: "FALO-AUDIT-SH:~$ run-audit-engine --ledger=all", type: "info" },
      { text: "[System] FALO AI 智能自動對帳模組啟動...", type: "info" },
      { text: "[Loading] 讀取本機內部交易帳本 (Internal Ledger): 10 筆記錄...", type: "info" },
      { text: "[Loading] 讀取外部 AI Provider 實用記錄 (External Ledger): 10 筆記錄...", type: "info" },
      { text: "[AI Analyze] 開始雙向關聯比對 (預估時間 1.5 秒)...", type: "info" }
    ];

    let logIdx = 0;
    
    function printLog() {
      if (logIdx < logs.length) {
        const line = document.createElement('div');
        line.className = `log-line ${logs[logIdx].type}`;
        line.innerText = logs[logIdx].text;
        consoleLogs.appendChild(line);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
        logIdx++;
        setTimeout(printLog, 250);
      } else {
        // Run deep logic analysis logs
        setTimeout(detailedReconciliation, 300);
      }
    }
    
    printLog();
  });

  function detailedReconciliation() {
    const detailedLogs = [
      { text: "[Checking] TX-001 <-> REQ-091a: Pages (1 == 1) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Checking] TX-002 <-> REQ-092b: Pages (3 == 3) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Anomaly Detected] TX-003 <-> REQ-093c: 內帳顯示已辨識 10 頁，但 Azure OCR 回傳 TIMEOUT (Cost $0)。", type: "warn" },
      { text: "  >> 治理引擎決策：已標記此交易並自動發送重送指令予備援 Provider (Gemini)，保障 SME 用戶體驗。", type: "info" },
      { text: "[Checking] TX-004 <-> REQ-094d: Pages (2 == 2) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Checking] TX-005 <-> REQ-095e: Pages (1 == 1) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Checking] TX-006 <-> REQ-096f: Pages (4 == 4) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Anomaly Detected] TX-007 <-> REQ-097g: 內帳列為 SUCCESS，但 Qwen-VL 狀態為 FAILED，實際處理頁數為 0！", type: "error" },
      { text: "  >> 治理引擎決策：此為無效 API 請求。向 API 供應商退款申請單自動存檔，並重導向至 Google V 重新辨識。", type: "info" },
      { text: "[Checking] TX-008 <-> REQ-098h: Pages (2 == 2) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Anomaly Detected] TX-009 <-> REQ-099i: 內帳成本登記為 $0.02 (Paddle預估)，外部 Gemini 帳單實扣 $0.08。原因：使用者上傳複雜手寫單據，觸發動態路由切換為 Gemini。", type: "warn" },
      { text: "  >> 治理引擎決策：修正內帳真實成本，重新計算利潤空間。此用例列入成本治理模型優化評估點。", type: "info" },
      { text: "[Checking] TX-010 <-> REQ-100j: Pages (5 == 5) | Cost OK. [MATCHED]", type: "success" },
      { text: "[Complete] 對帳完成。共分析 10 筆。成功匹配: 7 | 異常檢測: 3 (已全數由 AI 自動修復 / 調整記錄)。", type: "success" },
      { text: "[FinOps Report] 本次自動對帳幫助節省/追回異常支出：$0.065 USD。", type: "success" }
    ];

    let logIdx = 0;
    
    function printDetailedLog() {
      if (logIdx < detailedLogs.length) {
        const line = document.createElement('div');
        line.className = `log-line ${detailedLogs[logIdx].type}`;
        line.innerText = detailedLogs[logIdx].text;
        consoleLogs.appendChild(line);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
        logIdx++;
        setTimeout(printDetailedLog, 200);
      } else {
        // Render tables again with highlights
        renderTables(true);
        reconcileBtn.disabled = false;
      }
    }

    printDetailedLog();
  }
}

// 4. FinOps Cost Optimizer Simulator
function initFinOpsOptimizer() {
  const slider = document.getElementById('routing-slider');
  const paddleRatioDisplay = document.getElementById('paddle-ratio');
  const geminiRatioDisplay = document.getElementById('gemini-ratio');
  const savingsDisplay = document.getElementById('savings-percent');
  const summaryText = document.getElementById('optimizer-summary-text');

  function calculateSavings(paddleRatio) {
    const geminiRatio = 100 - paddleRatio;
    
    // Baselines (Cost per page):
    // Gemini V: $0.05 per page
    // PaddleOCR: $0.005 per page
    const totalPages = 10000;
    
    // Baseline cost if 100% Gemini
    const baselineCost = totalPages * 0.05; // $500
    
    // Mixed routing cost
    const paddleCost = (totalPages * (paddleRatio / 100)) * 0.005;
    const geminiCost = (totalPages * (geminiRatio / 100)) * 0.05;
    const mixedCost = paddleCost + geminiCost;
    
    // Savings percentage
    const savingsPercent = ((baselineCost - mixedCost) / baselineCost) * 100;
    
    return {
      geminiRatio,
      savingsPercent: Math.round(savingsPercent),
      mixedCost: mixedCost.toFixed(2),
      baselineCost: baselineCost.toFixed(2)
    };
  }

  function updateOptimizerUI() {
    const val = parseInt(slider.value, 10);
    const results = calculateSavings(val);

    paddleRatioDisplay.textContent = `${val}%`;
    geminiRatioDisplay.textContent = `${results.geminiRatio}%`;
    savingsDisplay.textContent = `${results.savingsPercent}%`;

    // Dynamic AI Recommendation text
    if (val === 0) {
      summaryText.innerHTML = `<strong>AI 治理建議：</strong> 目前 100% 路由使用 <strong>Gemini Vision</strong>，雖然辨識精準度高，但每萬頁成本高達 <strong>$${results.baselineCost} USD</strong>。這對大量一般單據（如發票、收據）極為昂貴。建議將滑桿向右滑動以優化路由成本。`;
    } else if (val < 50) {
      summaryText.innerHTML = `<strong>AI 治理建議：</strong> 已導入 <strong>${val}%</strong> 的 <strong>PaddleOCR</strong>。萬頁成本降至 <strong>$${results.mixedCost} USD</strong>（原 $${results.baselineCost}）。此配置適合高比例複雜文件或古籍手寫文件的場景。`;
    } else if (val < 90) {
      summaryText.innerHTML = `<strong>AI 治理建議：</strong> 當前路由配置平衡。 <strong>${val}%</strong> 文件經由 PaddleOCR 辨識， <strong>${results.geminiRatio}%</strong> 難題轉由 Gemini 處理。這能兼顧品質與成本，省下 <strong>${results.savingsPercent}%</strong> 的費用！`;
    } else {
      summaryText.innerHTML = `<strong>AI 治理建議（最佳實踐）：</strong> 將 <strong>${val}%</strong> 的標準發票/單據自動路由至 <strong>PaddleOCR</strong>，其餘 <strong>${results.geminiRatio}%</strong> 異常或手寫影像透過 <strong>Gemini</strong> 進行多模態兜底。此組合可幫助您省下高達 <strong>${results.savingsPercent}%</strong> 的預算，萬頁成本僅需 <strong>$${results.mixedCost} USD</strong>！`;
    }
  }

  slider.addEventListener('input', updateOptimizerUI);
  updateOptimizerUI();
}

// 5. Technical Architecture Layer Interactive Block Highlight
function initArchBlockHighlights() {
  const blocks = document.querySelectorAll('.arch-block');
  const detailsTitle = document.getElementById('arch-details-title');
  const detailsDesc = document.getElementById('arch-details-desc');
  const detailsBadge = document.getElementById('arch-details-badge');

  const archMeta = {
    "sdk": { title: "FALO SDK / API Client", layer: "應用接入層", desc: "輕量化 SDK。SME 開發者或軟體系統僅需導入三行程式碼，並在 FALO 主控台取得金鑰 (API Key)，即可快速啟用多合一 AI 能力，無需對接各大雲端供應商。" },
    "pwa": { title: "PWA Card Sandbox", layer: "應用接入層", desc: "符合 Progressive Web App 規範的獨立功能沙盒。可獨立安裝於電腦或手機中作為桌面小工具，也供 FALO Prompt Manager 等主系統一鍵喚起使用。" },
    "gateway": { title: "API Gateway (安全與驗證)", layer: "AI Proxy 治理核心", desc: "處理 API 金鑰驗證、流量限額控制 (Rate Limiting)、防禦性 Audit 審計、以及統一的資料格式轉換（確保輸出標準的 JSON 格式）。" },
    "logger": { title: "Ledger Syncer (內外雙帳同步)", layer: "AI Proxy 治理核心", desc: "重要創新點。在呼叫 API 的瞬間，將客戶所見的售價用量（內帳）與雲端商回傳的實際計費（外帳）進行雙向寫入。這是後續 AI 自動對帳的資料基礎。" },
    "router": { title: "Dynamic Provider Router", layer: "AI Proxy 治理核心", desc: "專利級路由調度中心。根據文件解析難度、即時 Provider 延遲、以及預算限制，動態決定將請求送往 PaddleOCR、Gemini V 還是其他模型。支援自動 Failover。" },
    "audit": { title: "FinOps & Audit Analytics", layer: "AI Proxy 治理核心", desc: "持續監控 API 呼叫的成功率、延遲、費用異常。產生治理分析報表（P50/P90 延遲），並對偏離常態 of 異常費用發出主動警告。" },
    "paddle": { title: "PaddleOCR Plugin", layer: "AI Providers 執行層", desc: "開源輕量化 OCR 引擎，適合標準字體、高對比度的表單與統一發票。成本極低（幾乎為零），響應速度在 100ms 內。" },
    "gemini": { title: "Gemini Vision V2 Plugin", layer: "AI Providers 執行層", desc: "Google 多模態大語言模型。適合辨識複雜的合約條款、污損單據、手寫簽名，甚至能進行語意理解，但成本與延遲相對較高。" },
    "qwen": { title: "Qwen VL Plugin", layer: "AI Providers 執行層", desc: "阿里開源多模態模型，對亞洲語系、表格結構提取有極強的性價比優勢。作為中等複雜度任務的首選路由節點。" },
    "human": { title: "Human-in-the-loop (人工覆核)", layer: "AI Providers 執行層", desc: "當所有 AI 路由引擎回傳的信心度低於閥值時，自動觸發非同步人工審查機制。這是金融級應用確保 100% 辨識率的最終保險機制。" }
  };

  blocks.forEach(block => {
    block.addEventListener('click', () => {
      // Toggle active states
      blocks.forEach(b => b.classList.remove('active'));
      block.classList.add('active');

      const key = block.getAttribute('data-block');
      const data = archMeta[key];

      if (data) {
        detailsTitle.textContent = data.title;
        detailsBadge.textContent = data.layer;
        detailsDesc.textContent = data.desc;
      }
    });
  });
}

// 6. Business Model Canvas Highlights (With Premium Slide-out Drawer Modal)
function initBMCHighlights() {
  const cells = document.querySelectorAll('.bmc-cell');
  const detailsTitle = document.getElementById('bmc-details-title');
  const detailsDesc = document.getElementById('bmc-details-desc');
  
  // Modal DOM elements
  const modal = document.getElementById('bmc-modal');
  const modalTitle = document.getElementById('bmc-modal-title');
  const modalDesc = document.getElementById('bmc-modal-desc');
  const modalClose = document.getElementById('bmc-modal-close');

  const bmcDetails = {
    "segments": {
      title: "目標客群 (Customer Segments)",
      desc: "1. <strong>中小型企業 (SMEs)</strong>: 缺乏專門的 AI 團隊與算力優化能力，但日常有大量單據、發票、合約辨識需求，且對成本極度敏感。<br><br>2. <strong>軟體服務商 (ISVs)</strong>: 尋求為既有 ERP、CRM 或會計系統嵌入可靠 OCR 功能，但希望免去維護多個 AI 連線、故障轉移與龐大對帳單的麻煩。<br><br>3. <strong>開發者與顧問</strong>: 需要一個高穩定性、統一接口與計費透明的 AI 代理服務治理中台。"
    },
    "relations": {
      title: "顧客關係 (Customer Relationships)",
      desc: "1. <strong>完全自助的開發主控台</strong>: 提供極致順暢的 API 金鑰管理、額度調配與實時監控。<br><br>2. <strong>財務對帳透明化</strong>: 推出內外雙軌對帳報表，讓 SME 客戶完全掌握每一分錢的算力消耗，建立極高信任度。<br><br>3. <strong>主動式 FinOps 節費優化</strong>: 系統會根據客戶歷史單據結構，主動推薦最佳的路由分流模型，幫客戶省錢。"
    },
    "channels": {
      title: "通路渠道 (Channels)",
      desc: "1. <strong>FALO Prompt Manager 內建商場</strong>: 作為首發的內置核心能力卡（Capability Card #1）供一鍵安裝。<br><br>2. <strong>第三方整合套件</strong>: 包括 Chrome Extension、Google Apps Script 外掛與 Webhook 連接器，覆蓋 SME 日常所處之辦公流程。<br><br>3. <strong>SI 系統集成代理</strong>: 與地區 ERP 代理商、會計師事務所建立分銷合作渠道。"
    },
    "propositions": {
      title: "價值主張 (Value Propositions)",
      desc: "1. <strong>AI 能力服務治理中台</strong>: OCR 只是切入點，平台根本上提供的是一整套能力治理機制 (動態路由、內外帳自動審計、FinOps 最佳化)。<br><br>2. <strong>極致性價比 (FinOps)</strong>: 透過智能雙軌路由，幫企業平均節省 60% 模型成本，同時維持 99% 的綜合辨識率。<br><br>3. <strong>無痛 AI 整合 (免 API 踩坑)</strong>: 客戶只需串接 FALO API，底層自動負責雲端巨頭 Failover 容災調度。<br><br>4. <strong>安全合規性與 AI 審計</strong>: 內外雙軌帳本自動退款稽核，守護企業資金，並為 AI 行為保留完整稽核軌跡 (Audit Trail)。"
    },
    "activities": {
      title: "關鍵活動 (Key Activities)",
      desc: "1. <strong>AI 路由分流算法迭代</strong>: 持續優化圖像難易度分類器，精準平衡 PaddleOCR 與大模型之呼叫比重。<br><br>2. <strong>多模型插件與 Provider 維護</strong>: 對接最新多模態模型，提供隨插即用的 API 卡片適配。<br><br>3. <strong>內外雙帳同步與智能稽核引擎開發</strong>: 保障雙軌 Ledger 在高併發時的同步寫入速度與對帳正確率。"
    },
    "resources": {
      title: "關鍵資源 (Key Resources)",
      desc: "1. <strong>核心專利技術</strong>: FALO AI Runtime Gateway 路由算法、Ledger 雙軌審計引擎技術。<br><br>2. <strong>大宗算力採購折讓</strong>: 與模型供應商建立的大規模 API 批發協議折扣通道。<br><br>3. <strong>眾包 HITL 人工覆核網絡</strong>: 自建彈性人工在線核對平台，提供低延遲的兜底校驗。"
    },
    "partners": {
      title: "關鍵合作夥伴 (Key Partners)",
      desc: "1. <strong>AI 基礎模型供應商</strong>: Google Cloud (Gemini), Microsoft Azure, Alibaba Cloud (Qwen) 等提供底層能力支撐。<br><br>2. <strong>ERP/SaaS 系統整合商</strong>: 串接核心工作流系統，將資料直接導入入帳流程。<br><br>3. <strong>TAAT/FALO 地域代理夥伴</strong>: 協助將平台推廣至不同行業場景，進行客製化 Workflow 設計。"
    },
    "costs": {
      title: "成本結構 (Cost Structure)",
      desc: "1. <strong>底層 API 呼叫支出</strong>: 給予 Gemini、Azure、Qwen 等 Provider 的實際消耗用量費用。<br><br>2. <strong>平台算力與託管成本</strong>: Runtime Gateway、Ledger 雙向寫入數據庫、安全沙盒的雲端代管維護。<br><br>3. <strong>人工審核佣金</strong>: 支付給 Human-in-the-loop 人力網絡的單筆計件佣金。"
    },
    "revenues": {
      title: "收益來源 (Revenue Streams)",
      desc: "1. <strong>API 用量加成差價 (Markup)</strong>: 依 By-Case (按件) 對客戶收取穩定服務價，後台經由路由與大宗折讓賺取利潤差。<br><br>2. <strong>FinOps 治理進階功能年費 (SaaS)</strong>: 針對中大型企業提供進階雙軌自動查帳、超扣退款發起、BI 數據分析報表。<br><br>3. <strong>能力卡應用市場分成 (Cap Store)</strong>: 未來第三方開發者上架自訂能力卡 (Capability Card) 時，平台抽取 30% 分成佣金。"
    }
  };

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const key = cell.getAttribute('data-cell');
      const data = bmcDetails[key];

      if (data) {
        // Set fallback UI elements text
        detailsTitle.innerHTML = data.title;
        detailsDesc.innerHTML = data.desc;

        // Open custom premium modal drawer
        modalTitle.innerHTML = data.title;
        modalDesc.innerHTML = data.desc;
        modal.classList.add('active');
      }
    });
  });

  // Close modal logic
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// 7. Light / Dark Theme Toggle Controller (With localStorage Persistence)
function initThemeToggle() {
  // Copyright (c) FALO/TAAT x Force Cheng 2026/6/2. All rights reserved.
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const toggleText = document.getElementById('theme-toggle-text');
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('falo-theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleIcon.textContent = '🌙';
    toggleText.textContent = '切換暗黑色系';
  } else {
    document.body.classList.remove('light-theme');
    toggleIcon.textContent = '☀️';
    toggleText.textContent = '切換明亮色系';
  }
  
  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    
    if (isLight) {
      localStorage.setItem('falo-theme', 'light');
      toggleIcon.textContent = '🌙';
      toggleText.textContent = '切換暗黑色系';
    } else {
      localStorage.setItem('falo-theme', 'dark');
      toggleIcon.textContent = '☀️';
      toggleText.textContent = '切換明亮色系';
    }
  });
}
