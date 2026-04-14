(() => {
  const DATA_URL = "data/kindle_models.json";
  const COMMUNITY_URL = "data/community.json";

  const fallbackModels = [
    {
      id: "kindle11",
      model: "Kindle (2022)",
      series: "Kindle",
      generation: "11th",
      year: 2022,
      screen: '6"',
      ppi: 167,
      frontlight: true,
      warm_light: false,
      waterproof: false,
      note_support: false,
      color_display: false,
      note: "无手写",
      color: "经典黑",
      status: "active",
      storage: "16 GB",
      target_users: "看小说+低价升级者",
      summary: "USB-C 与 16GB 的入门升级款，便携适合通勤阅读。",
      usage: ["小说", "通勤", "入门"],
      price_min: 520,
      price_max: 900,
      price_positioning: "基础升级",
      weight: "6.9 oz",
      charging_port: "USB-C",
      connectivity: "Wi-Fi",
      representative_features: ["USB-C", "16 GB", "轻便"],
      pros: ["轻巧", "USB-C", "价格友好"],
      cons: ["无防水", "PPI 167"],
    },
    {
      id: "paperwhite5",
      model: "Kindle Paperwhite 5 (11th Gen)",
      series: "Paperwhite",
      generation: "Paperwhite 5",
      year: 2021,
      screen: '6.8"',
      ppi: 300,
      frontlight: true,
      warm_light: true,
      waterproof: true,
      note_support: false,
      color_display: false,
      note: "无手写",
      color: "黑/雾蓝",
      status: "active",
      storage: "16 GB",
      target_users: "想要防水、大屏背光的读者",
      summary: "6.8 英寸 300ppi + 防水 + 暖光，是当前最稳妥的主力款。",
      usage: ["小说", "夜读", "旅行", "学生"],
      price_min: 900,
      price_max: 1400,
      price_positioning: "在售主流",
      weight: "7.3 oz",
      charging_port: "USB-C",
      connectivity: "Wi-Fi",
      representative_features: ["Waterproof", "Warm light", "USB-C"],
      pros: ["防水", "暖光", "大屏"],
      cons: ["略重", "无手写"],
    },
    {
      id: "paperwhite_signature",
      model: "Kindle Paperwhite Signature Edition",
      series: "Paperwhite",
      generation: "Signature",
      year: 2021,
      screen: '6.8"',
      ppi: 300,
      frontlight: true,
      warm_light: true,
      waterproof: true,
      note_support: false,
      color_display: false,
      note: "无手写",
      color: "黑/雾蓝",
      status: "active",
      storage: "32 GB",
      target_users: "想要无线充电 + 自动调光的读者",
      summary: "在 Paperwhite 5 上加无线充电与自动亮度，更省心。",
      usage: ["小说", "夜读", "旅行", "学生"],
      price_min: 1200,
      price_max: 1600,
      price_positioning: "高端",
      weight: "7.4 oz",
      charging_port: "USB-C",
      connectivity: "Wi-Fi",
      representative_features: ["Wireless charging", "Auto brightness", "32 GB"],
      pros: ["无线充电", "自动光感", "大容量"],
      cons: ["价格略高", "无手写"],
    },
    {
      id: "oasis3",
      model: "Kindle Oasis 3",
      series: "Oasis",
      generation: "Oasis 3",
      year: 2019,
      screen: '7"',
      ppi: 300,
      frontlight: true,
      warm_light: true,
      waterproof: true,
      note_support: false,
      color_display: false,
      note: "无手写",
      color: "金属银/香槟金",
      status: "historical",
      storage: "8 GB / 32 GB",
      target_users: "追求顶级背光与翻页键手感的读者",
      summary: "经典翻页键 + 7 英寸对称握持，虽停产但仍被高端用户偏爱。",
      usage: ["小说", "高端", "送礼"],
      price_min: 1500,
      price_max: 2300,
      price_positioning: "旗舰",
      weight: "6.9 oz",
      charging_port: "micro-USB",
      connectivity: "Wi-Fi",
      representative_features: ["Page buttons", "IPX8", "Warm light"],
      pros: ["翻页键", "防水", "暖光"],
      cons: ["停产", "micro-USB"],
    },
    {
      id: "scribe2023",
      model: "Kindle Scribe (2023 update)",
      series: "Scribe",
      generation: "Scribe 2023",
      year: 2023,
      screen: '10.2"',
      ppi: 300,
      frontlight: true,
      warm_light: true,
      waterproof: true,
      note_support: true,
      color_display: false,
      note: "支持手写",
      color: "石墨灰",
      status: "active",
      storage: "64 GB",
      target_users: "需要暖光 + 语音笔记同步",
      summary: "笔记/批注旗舰，支持暖光与 Refine Writing。",
      usage: ["笔记", "PDF", "工作", "学生"],
      price_min: 2600,
      price_max: 3600,
      price_positioning: "升级款",
      weight: "420 g",
      charging_port: "USB-C",
      connectivity: "Wi-Fi",
      representative_features: ["Handwriting", "Warm light", "Refine Writing"],
      pros: ["手写", "暖光", "大屏"],
      cons: ["较重", "价格高"],
    },
  ];

  const fallbackCommunity = [
    {
      id: "exp_demo_001",
      model: "Paperwhite 5",
      topic: "阅读体验",
      sentiment: "正面",
      summary: "300ppi + 暖光夜读舒服，公交上单手也能握稳。",
      tags: ["夜读", "通勤", "暖光"],
    },
    {
      id: "exp_demo_002",
      model: "Scribe 2023",
      topic: "做笔记",
      sentiment: "正面",
      summary: "Refine Writing 能把手写公式转文本，课堂整理很快。",
      tags: ["手写", "课堂"],
    },
    {
      id: "exp_demo_003",
      model: "Oasis 3",
      topic: "外观配色偏好",
      sentiment: "正面",
      summary: "金属机身送礼有质感，翻页键党依然爱用。",
      tags: ["送人", "翻页键"],
    },
  ];

  const tips = [
    { title: "新手设置", detail: "首次连接 Wi-Fi 后设置中文词典、关闭推荐广告，导入常读账号。" },
    { title: "字体与排版", detail: "Bookerly/思源 + 中等行距最耐看；300ppi 可将字重+1。" },
    { title: "导书方式", detail: "浏览器插件 Send to Kindle 推送网页；Calibre 批量整理 EPUB/PDF 元数据。" },
    { title: "背光与护眼", detail: "夜读开暖光 18-22 档，深色模式配防蓝光膜；白天把亮度压到 10 以下。" },
    { title: "通勤阅读", detail: "提前下载离线书，单手模式或横屏更稳；6 英寸机型可放外套口袋。" },
    { title: "PDF 使用", detail: "Scribe/PW 支持裁边，学术 PDF 选分栏；DX/Scribe 大屏适合原比例查看。" },
    { title: "笔记技巧", detail: "Scribe 选网格/康奈尔模板，手写后用高亮整理，再导出 PDF 或邮件。" },
    { title: "配件建议", detail: "轻薄磁吸壳保持手感；喜欢抹茶绿可挑浅绿/雾蓝保护套搭配浅色机身。" },
  ];

  const state = {
    models: [],
    community: [],
    tips,
    filters: {
      budget: "all",
      series: "all",
      status: "all",
      usage: "all",
      features: new Set(),
      search: "",
    },
    navLinks: [],
    modules: [],
  };

  const budgetOptions = {
    all: { label: "全部预算" },
    under400: { label: "< ¥400", max: 400 },
    low: { label: "¥400-800", min: 400, max: 800 },
    mid: { label: "¥800-1500", min: 800, max: 1500 },
    high: { label: "> ¥1500", min: 1500 },
  };

  const seriesList = ["Kindle", "Paperwhite", "Oasis", "Voyage", "Scribe", "Kids"];
  const statusOptions = [
    { value: "all", label: "全部状态" },
    { value: "active", label: "在售" },
    { value: "historical", label: "历史型号" },
  ];

  const featureMap = [
    { key: "frontlight", label: "带背光" },
    { key: "waterproof", label: "需防水" },
    { key: "note_support", label: "支持手写/笔记" },
    { key: "color_display", label: "彩屏/色彩偏好" },
  ];

  const elements = {};

  document.addEventListener("DOMContentLoaded", async () => {
    cacheElements();
    setupNav(elements.navLinks);
    setupHeroActions();
    const [modelsData, communityData] = await Promise.all([
      loadJson(DATA_URL, { models: fallbackModels }),
      loadJson(COMMUNITY_URL, { experiences: fallbackCommunity }),
    ]);

    state.models = normalizeModels(modelsData.models || fallbackModels);
    state.community = communityData.experiences || fallbackCommunity;

    setupFilters(elements.filterControls);
    setupFeatureToggles(elements.featureToggles);
    renderAll();
    showModule("heroSection");
  });

  function cacheElements() {
    elements.heroModelContainer = document.getElementById("heroModels");
    elements.heroPriceCards = document.getElementById("heroPriceCards");
    elements.quickActions = document.getElementById("quickActions");
    elements.filterControls = document.getElementById("filterControls");
    elements.featureToggles = document.getElementById("featureToggles");
    elements.modelTableBody = document.querySelector("#modelTable tbody");
    elements.databaseHighlights = document.getElementById("databaseHighlights");
    elements.pricingCards = document.getElementById("pricingCards");
    elements.tipsList = document.getElementById("tipsList");
    elements.communityList = document.getElementById("communityList");
    elements.assistantInput = document.getElementById("assistantInput");
    elements.assistantOutput = document.getElementById("assistantOutput");
    elements.assistantSubmit = document.getElementById("assistantSubmit");
    elements.modelDetailContent = document.getElementById("modelDetailContent");
    elements.navLinks = Array.from(document.querySelectorAll(".nav-link"));
    elements.modules = Array.from(document.querySelectorAll(".module"));
    elements.detailCard = document.getElementById("modelDetail");
  }

  async function loadJson(url, fallback) {
    try {
      const resp = await fetch(url, { cache: "no-store" });
      if (!resp.ok) throw new Error(resp.statusText);
      return await resp.json();
    } catch (err) {
      console.warn(`加载 ${url} 失败，使用备用数据`, err);
      return fallback;
    }
  }

  function normalizeModels(list) {
    return list.map((m) => ({
      ...m,
      series: m.series || "Kindle",
      status: m.status || "active",
      usage: m.usage || [],
      representative_features: m.representative_features || [],
      pros: m.pros || [],
      cons: m.cons || [],
      price_min: Number(m.price_min ?? 0),
      price_max: Number(m.price_max ?? 0),
      frontlight: !!m.frontlight,
      waterproof: !!m.waterproof,
      note_support: !!m.note_support,
      color_display: !!m.color_display,
      warm_light: !!m.warm_light,
      target_users: m.target_users || "",
      summary: m.summary || "",
      model: m.model || m.name || "未命名型号",
    }));
  }

  function renderAll() {
    renderHeroModels(elements.heroModelContainer);
    renderQuickActions(elements.quickActions);
    renderPriceCards(elements.heroPriceCards);
    renderDatabaseHighlights(elements.databaseHighlights);
    renderTable();
    renderPriceCards(elements.pricingCards);
    renderTips(elements.tipsList);
    renderCommunity(elements.communityList);
    setupAssistant(elements.assistantSubmit, elements.assistantInput, elements.assistantOutput);
    renderDefaultDetail();
  }

  function renderHeroModels(container) {
    container.innerHTML = "";
    state.models
      .filter((m) => m.status === "active")
      .slice(0, 6)
      .forEach((model) => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
          <div class="badge">${model.series}</div>
          <h3>${model.model}</h3>
          <p>${model.screen} · ${model.ppi} ppi · ${model.frontlight ? "背光" : "无背光"}</p>
          <p><strong>${model.price_positioning || "价格参考"}｜¥${model.price_min} - ¥${model.price_max}</strong></p>
          <p class="muted">${model.summary}</p>
        `;
        container.appendChild(card);
      });
  }

  function renderQuickActions(container) {
    const actions = [
      { label: "我想要便宜的", action: () => applyBudget("under400") },
      { label: "我想要带背光", action: () => toggleFeature("frontlight") },
      { label: "我想要做笔记", action: () => toggleFeature("note_support") },
      { label: "我想要彩屏", action: () => toggleFeature("color_display") },
      { label: "我主要看小说", action: () => applyUsage("小说") },
      { label: "想要抹茶绿风格", action: () => addColorPreference("绿") },
    ];
    container.innerHTML = "";
    actions.forEach((item) => {
      const btn = document.createElement("button");
      btn.textContent = item.label;
      btn.addEventListener("click", () => {
        item.action();
        syncFeatureButtons();
        renderTable();
      });
      container.appendChild(btn);
    });
  }

  function renderPriceCards(container) {
    const buckets = [
      {
        title: "入门预算",
        range: "¥400 内外",
        desc: "基础 Kindle/旧款 Paperwhite，便携读小说。",
        filter: (m) => m.price_max <= 800 && m.series === "Kindle",
      },
      {
        title: "中端主流",
        range: "¥800 - ¥1500",
        desc: "Paperwhite 5 / Signature：防水+暖光+300ppi。",
        filter: (m) => m.series === "Paperwhite" && m.price_min >= 800 && m.price_max <= 1500,
      },
      {
        title: "高端旗舰",
        range: "¥1500+",
        desc: "Oasis / 高配 Paperwhite / 新款 Scribe 小屏配置。",
        filter: (m) => (m.series === "Oasis" && m.price_max >= 1500) || (m.series === "Paperwhite" && m.price_max > 1500),
      },
      {
        title: "笔记与大屏",
        range: "¥2500+",
        desc: "Scribe 系列支持手写批注，适合 PDF 与课程笔记。",
        filter: (m) => m.note_support,
      },
      {
        title: "历史二手淘机",
        range: "淘汰但性价比高",
        desc: "Oasis 3 / Voyage / Paperwhite 4 二手价友好。",
        filter: (m) => m.status === "historical",
      },
    ];

    container.innerHTML = "";
    buckets.forEach((bucket) => {
      const matches = state.models.filter(bucket.filter);
      const names = matches.slice(0, 4).map((m) => m.model).join(" / ") || "可根据库存再看";
      const card = document.createElement("article");
      card.className = "price-card";
      card.innerHTML = `
        <strong>${bucket.title}</strong>
        <p>${bucket.range}</p>
        <p>${bucket.desc}</p>
        <p class="muted">推荐：${names}</p>
      `;
      container.appendChild(card);
    });
  }

  function renderDatabaseHighlights(container) {
    container.innerHTML = "";
    state.models.slice(0, 4).forEach((model) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="badge">${model.series}</div>
        <h3>${model.model}</h3>
        <p class="muted">${model.summary}</p>
        <p><strong>${model.price_positioning || ""}</strong></p>
      `;
      container.appendChild(card);
    });
  }

  function renderTable() {
    const body = elements.modelTableBody;
    const detailContainer = elements.modelDetailContent;
    const filtered = getFilteredModels();

    body.innerHTML = "";
    if (!filtered.length) {
      body.innerHTML = "<tr><td colspan='5'>当前筛选下暂无结果，已自动放宽条件。</td></tr>";
      renderModelDetail(state.models[0], detailContainer);
      return;
    }

    filtered.forEach((model, idx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${model.model}</strong><p class="muted">${model.summary}</p></td>
        <td>${model.screen} · ${model.ppi} ppi<br>${model.frontlight ? "背光" : "无背光"} · ${
        model.warm_light ? "暖光" : "常规光"
      }</td>
        <td>${model.storage}</td>
        <td>¥${model.price_min} - ¥${model.price_max}<br><small>${model.price_positioning || ""}</small></td>
        <td>${displayStatus(model.status)}<br><small>${model.series} · ${model.year}</small></td>
      `;
      row.addEventListener("click", () => {
        body.querySelectorAll("tr").forEach((tr) => tr.classList.remove("selected"));
        row.classList.add("selected");
        renderModelDetail(model, detailContainer);
      });
      body.appendChild(row);
      if (idx === 0) {
        row.classList.add("selected");
        renderModelDetail(model, detailContainer);
      }
    });
  }

  function renderTips(container) {
    container.innerHTML = "";
    state.tips.forEach((tip) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `<h3>${tip.title}</h3><p>${tip.detail}</p>`;
      container.appendChild(card);
    });
  }

  function renderCommunity(container) {
    container.innerHTML = "";
    state.community.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card community-card";
      card.innerHTML = `
        <h3>${item.topic}</h3>
        <p><strong>${item.model}</strong></p>
        <p>${item.summary}</p>
        <p class="muted">${item.sentiment} · 标签：${(item.tags || []).join(" / ")}</p>
      `;
      container.appendChild(card);
    });
  }

  function setupFilters(container) {
    container.innerHTML = "";
    const budgetSelect = createSelect(budgetOptions, "预算");
    const seriesSelect = createBasicSelect("全部系列", seriesList);
    const statusSelect = createBasicSelect(null, statusOptions, true);
    const usageSelect = document.createElement("select");
    usageSelect.innerHTML = `<option value="all">全部用途</option>`;
    const uniqueUsage = Array.from(new Set(state.models.flatMap((m) => m.usage || [])));
    uniqueUsage.forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u;
      opt.textContent = u;
      usageSelect.appendChild(opt);
    });

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "搜索型号/功能/关键词";

    budgetSelect.addEventListener("change", (e) => {
      state.filters.budget = e.target.value;
      renderTable();
    });
    seriesSelect.addEventListener("change", (e) => {
      state.filters.series = e.target.value;
      renderTable();
    });
    statusSelect.addEventListener("change", (e) => {
      state.filters.status = e.target.value;
      renderTable();
    });
    usageSelect.addEventListener("change", (e) => {
      state.filters.usage = e.target.value;
      renderTable();
    });
    searchInput.addEventListener("input", (e) => {
      state.filters.search = e.target.value.toLowerCase();
      renderTable();
    });

    container.append(budgetSelect, seriesSelect, statusSelect, usageSelect, searchInput);
    state.filters.controls = { budgetSelect, seriesSelect, statusSelect, usageSelect, searchInput };
  }

  function createSelect(options) {
    const select = document.createElement("select");
    Object.entries(options).forEach(([key, opt]) => {
      const o = document.createElement("option");
      o.value = key;
      o.textContent = opt.label;
      select.appendChild(o);
    });
    return select;
  }

  function createBasicSelect(defaultText, list, pairObject = false) {
    const select = document.createElement("select");
    if (defaultText) {
      const all = document.createElement("option");
      all.value = "all";
      all.textContent = defaultText;
      select.appendChild(all);
    }
    if (pairObject) {
      list.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        select.appendChild(o);
      });
    } else {
      list.forEach((value) => {
        const o = document.createElement("option");
        o.value = value;
        o.textContent = value;
        select.appendChild(o);
      });
    }
    return select;
  }

  function setupFeatureToggles(container) {
    container.innerHTML = "";
    featureMap.forEach((feature) => {
      const btn = document.createElement("button");
      btn.textContent = feature.label;
      btn.dataset.feature = feature.key;
      btn.addEventListener("click", () => {
        toggleFeature(feature.key);
        syncFeatureButtons();
        renderTable();
      });
      container.appendChild(btn);
    });
    syncFeatureButtons();
  }

  function toggleFeature(key) {
    if (state.filters.features.has(key)) {
      state.filters.features.delete(key);
    } else {
      state.filters.features.add(key);
    }
  }

  function applyBudget(key) {
    state.filters.budget = key;
    if (state.filters.controls?.budgetSelect) {
      state.filters.controls.budgetSelect.value = key;
    }
  }

  function applyUsage(value) {
    state.filters.usage = value;
    if (state.filters.controls?.usageSelect) {
      state.filters.controls.usageSelect.value = value;
    }
  }

  function syncFeatureButtons() {
    elements.featureToggles
      ?.querySelectorAll("button")
      .forEach((btn) => btn.classList.toggle("active", state.filters.features.has(btn.dataset.feature)));
  }

  function addColorPreference() {
    // helper for quick action; assistant uses文本解析，这里仅提示
    alert("已记录颜色偏好：建议选择浅色/绿色保护套搭配 Paperwhite/Kindle 机身。");
  }

  function getFilteredModels() {
    const { budget, series, status, usage, features, search } = state.filters;
    return state.models.filter((model) => {
      if (budget !== "all") {
        const opt = budgetOptions[budget];
        if (opt.min && model.price_max < opt.min) return false;
        if (opt.max && model.price_min > opt.max) return false;
      }
      if (series !== "all" && model.series !== series) return false;
      if (status !== "all" && model.status !== status) return false;
      if (usage !== "all" && !(model.usage || []).includes(usage)) return false;
      for (const f of features) {
        if (!model[f]) return false;
      }
      if (search) {
        const haystack = `${model.model} ${model.series} ${model.summary} ${(model.usage || []).join(" ")} ${model.target_users}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }

  function renderModelDetail(model, container) {
    container.innerHTML = `
      <div class="detail-grid">
        <div><strong>型号</strong><span>${model.model}</span></div>
        <div><strong>系列 / 状态</strong><span>${model.series} · ${displayStatus(model.status)}</span></div>
        <div><strong>代际 / 年份</strong><span>${model.generation || "-"} · ${model.year || "未知"}</span></div>
        <div><strong>屏幕</strong><span>${model.screen} · ${model.ppi} ppi</span></div>
        <div><strong>背光 / 暖光</strong><span>${model.frontlight ? "有" : "无"} / ${model.warm_light ? "有" : "无"}</span></div>
        <div><strong>防水 / 彩屏</strong><span>${model.waterproof ? "IPX8 防水" : "无"} / ${
      model.color_display ? "彩屏" : "黑白"
    }</span></div>
        <div><strong>手写支持</strong><span>${model.note_support ? "支持" : "无"}</span></div>
        <div><strong>存储 & 重量</strong><span>${model.storage} · ${model.weight || "未标注"}</span></div>
        <div><strong>接口 & 连接</strong><span>${model.charging_port} · ${model.connectivity}</span></div>
      </div>
      <p>${model.summary}</p>
      <p><strong>目标用户：</strong>${model.target_users}</p>
      <p><strong>价格定位：</strong>${model.price_positioning || ""}（¥${model.price_min}-${model.price_max}）</p>
      <p><strong>代表特性：</strong>${(model.representative_features || []).join("、")}</p>
      <p><strong>优点：</strong>${(model.pros || []).join("、")}</p>
      <p><strong>缺点：</strong>${(model.cons || []).join("、")}</p>
    `;
  }

  function renderDefaultDetail() {
    if (state.models.length) {
      renderModelDetail(state.models[0], elements.modelDetailContent);
    }
  }

  function displayStatus(status) {
    return status === "active" ? "在售" : "历史型号";
  }

  function setupAssistant(button, input, output) {
    const run = async () => {
      const prompt = input.value.trim();
      if (!prompt) return;
      appendChat(`你：${prompt}`, output);
      input.value = "";
      const result = await handleAssistantRequest(prompt);
      appendChat(result, output, true);
    };
    button.addEventListener("click", run);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        run();
      }
    });
  }

  function parseCriteria(prompt) {
    const lower = prompt.toLowerCase();
    const budgetMatch = lower.match(/(\d+)(?=\s*(元|块|rmb|人民币|usd|\$)?)/);
    const wantsCheap = /便宜|入门|低价|白菜|不贵/.test(lower);
    const wantsHigh = /高端|旗舰|贵一点|好一点/.test(lower);
    const usageKeywords = {
      小说: /(小说|看书|纯读)/,
      PDF: /(pdf|论文|讲义)/,
      笔记: /(笔记|手写|写字|批注|annotate|note)/,
      漫画: /(漫画|comic|连载)/,
      通勤: /(通勤|地铁|公交|旅行|出差)/,
      学生: /(学生|考试|考研|课堂|上课)/,
      送礼: /(送人|礼物)/,
    };
    const featureFlags = {
      backlight: /(背光|暖光|灯)/,
      waterproof: /(防水|浴室|海边|泡)/,
      pen: /(手写|笔记|笔)/,
      color_display: /(彩屏|color|彩色)/,
      portable: /(便携|轻便|轻)/,
    };
    const seriesPreferences = [
      { keywords: ["paperwhite", "pw"], series: "Paperwhite" },
      { keywords: ["oasis"], series: "Oasis" },
      { keywords: ["scribe"], series: "Scribe" },
      { keywords: ["voyage"], series: "Voyage" },
    ];
    const colorPref = /抹茶绿|绿色|绿|清新/.test(prompt) ? "绿" : null;

    const usage = [];
    Object.entries(usageKeywords).forEach(([key, reg]) => {
      if (reg.test(prompt)) usage.push(key);
    });

    let seriesPreference = null;
    for (const s of seriesPreferences) {
      if (s.keywords.some((k) => lower.includes(k))) {
        seriesPreference = s.series;
        break;
      }
    }

    return {
      budget: budgetMatch ? Number(budgetMatch[1]) : null,
      wantsCheap,
      wantsHigh,
      usage,
      backlight: featureFlags.backlight.test(prompt),
      waterproof: featureFlags.waterproof.test(prompt),
      pen: featureFlags.pen.test(prompt),
      color_display: featureFlags.color_display.test(prompt),
      portable: featureFlags.portable.test(prompt),
      seriesPreference,
      colorPreference: colorPref,
    };
  }

  function handleAssistantRequest(prompt) {
    const criteria = parseCriteria(prompt);
    const recommendations = scoreAndRank(criteria);
    if (!recommendations.length) {
      return "未找到匹配机型，可尝试放宽预算或去掉部分功能要求。";
    }
    const [primary, ...backup] = recommendations;
    const matched = describeMatchedNeeds(primary, criteria);
    const nearMatch = colorAdvice(criteria, recommendations);
    const response = [
      `主推荐：${primary.model}（¥${primary.price_min}-${primary.price_max}）。`,
      `理由：${primary.summary}；满足 ${matched.join("、")}；系列 ${primary.series}；状态 ${displayStatus(primary.status)}。`,
      backup.length ? `备选：${backup.map((b) => b.model).join(" / ")}` : "",
      nearMatch,
    ]
      .filter(Boolean)
      .join(" ");
    return response;
  }

  function scoreAndRank(criteria) {
    let candidates = state.models.slice();

    if (criteria.seriesPreference) {
      const prefer = candidates.filter((m) => m.series === criteria.seriesPreference);
      if (prefer.length) candidates = prefer;
    }

    if (criteria.wantsCheap) {
      candidates = candidates.filter((m) => m.price_max <= 1000 || m.status === "historical");
    }
    if (criteria.wantsHigh) {
      candidates = candidates.filter((m) => m.price_min >= 1200);
    }
    if (criteria.budget) {
      candidates = candidates.filter(
        (m) => criteria.budget >= m.price_min - 150 && criteria.budget <= m.price_max + 300
      );
      if (!candidates.length) candidates = state.models.slice();
    }

    const scored = candidates
      .map((m) => ({ model: m, score: calcScore(m, criteria) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.model);
    return scored;
  }

  function calcScore(model, c) {
    let score = 0;
    if (c.backlight && model.frontlight) score += 10;
    if (c.waterproof && model.waterproof) score += 8;
    if (c.pen && model.note_support) score += 14;
    if (c.color_display && model.color_display) score += 10;
    if (c.portable && /oz|g/.test(model.weight || "")) {
      const num = Number((model.weight || "").replace(/[^0-9.]/g, ""));
      if (!Number.isNaN(num) && num < 8) score += 6;
    }
    if (c.usage.includes("PDF") && model.screen.includes("10")) score += 6;
    if (c.usage.includes("漫画") && model.ppi >= 300) score += 4;
    if (c.usage.includes("学生") && (model.series === "Kids" || model.series === "Scribe")) score += 4;
    if (c.usage.includes("通勤") && model.series === "Kindle") score += 3;
    if (c.seriesPreference && model.series === c.seriesPreference) score += 5;
    if (c.colorPreference) score += model.color_display ? 2 : 1;
    if (c.budget) {
      const mid = (model.price_min + model.price_max) / 2;
      score += Math.max(0, 25 - Math.abs(mid - c.budget) / 40);
    }
    if (model.status === "active") score += 2;
    return score;
  }

  function describeMatchedNeeds(model, c) {
    const matches = [];
    if (c.backlight && model.frontlight) matches.push("背光");
    if (c.waterproof && model.waterproof) matches.push("防水");
    if (c.pen && model.note_support) matches.push("手写/笔记");
    if (c.color_display && model.color_display) matches.push("彩屏");
    if (c.usage.includes("PDF") && model.screen.includes("10")) matches.push("大屏 PDF");
    if (c.usage.includes("通勤") && model.series === "Kindle") matches.push("轻便通勤");
    if (!matches.length) matches.push("基础阅读");
    return matches;
  }

  function colorAdvice(criteria, recs) {
    if (!criteria.colorPreference) return "";
    const hasColor = recs.some((m) => m.color_display);
    if (hasColor) {
      return `已包含彩屏机型，可搭配 ${criteria.colorPreference} 风格。`;
    }
    return `未找到 ${criteria.colorPreference} 配色机身，建议选 Paperwhite/Kindle 基础色并搭配抹茶绿保护套。`;
  }

  function appendChat(text, container, isBot = false) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = (isBot ? "助手：" : "") + text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  function setupNav(links) {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        if (targetId) showModule(targetId);
      });
    });
  }

  function setupHeroActions() {
    document.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.action === "focusAssistant" ? "assistantSection" : "databaseSection";
        showModule(target);
      });
    });
  }

  function showModule(targetId) {
    state.modules = state.modules.length ? state.modules : elements.modules;
    state.navLinks = state.navLinks.length ? state.navLinks : elements.navLinks;
    elements.modules.forEach((m) => m.classList.toggle("active", m.id === targetId));
    elements.navLinks.forEach((link) => link.classList.toggle("active", link.dataset.target === targetId));
    const section = document.getElementById(targetId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();
