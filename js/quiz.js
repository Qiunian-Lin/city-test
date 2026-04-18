// ============================================================
// QUIZ LOGIC
// ============================================================

const CITY_IDS = Object.keys(CITIES);

// 状态
let scores = {};
let currentQ = 0;
let answers = []; // 记录每题选择（用于回退）

function initScores() {
  scores = {};
  CITY_IDS.forEach(id => scores[id] = 0);
}

// ============================================================
// 页面切换
// ============================================================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('page--active', 'page--exit');
  });
  const target = document.getElementById(id);
  target.classList.add('page--active');
  target.scrollTop = 0;
}

// ============================================================
// 渲染题目
// ============================================================
function renderQuestion(index) {
  const q = QUESTIONS[index];
  const total = QUESTIONS.length;

  // 进度
  document.getElementById('progress-fill').style.width = `${(index / total) * 100}%`;
  document.getElementById('progress-text').textContent = `${index + 1} / ${total}`;

  // 标签 & 题目
  document.getElementById('question-tag').textContent = q.tag;

  const questionEl = document.getElementById('question-text');
  questionEl.style.opacity = '0';
  questionEl.style.transform = 'translateY(10px)';
  setTimeout(() => {
    questionEl.textContent = q.text;
    questionEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    questionEl.style.opacity = '1';
    questionEl.style.transform = 'translateY(0)';
  }, 50);

  // 选项
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  grid.classList.remove('no-anim');

  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => selectOption(i, opt.cities));
    grid.appendChild(btn);
  });

  // 返回按钮
  document.getElementById('btn-back').style.display = index === 0 ? 'none' : 'block';
}

// ============================================================
// 选择选项
// ============================================================
function selectOption(optIndex, cities) {
  // 视觉反馈
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.classList.remove('option-btn--selected'));
  btns[optIndex].classList.add('option-btn--selected');

  // 记录本题答案
  answers[currentQ] = { optIndex, cities };

  // 加分
  cities.forEach(cityId => {
    if (scores[cityId] !== undefined) {
      scores[cityId] += 1;
    }
  });

  // 延迟推进
  setTimeout(() => {
    currentQ++;
    if (currentQ < QUESTIONS.length) {
      renderQuestion(currentQ);
    } else {
      showResult();
    }
  }, 340);
}

// ============================================================
// 回退
// ============================================================
document.getElementById('btn-back').addEventListener('click', () => {
  if (currentQ === 0) return;

  // 撤回上题加分
  const prev = answers[currentQ - 1];
  if (prev) {
    prev.cities.forEach(cityId => {
      if (scores[cityId] !== undefined) {
        scores[cityId] = Math.max(0, scores[cityId] - 1);
      }
    });
    answers[currentQ - 1] = null;
  }

  currentQ--;
  renderQuestion(currentQ);
});

// ============================================================
// 计算结果
// ============================================================
function getTopCities(n) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([id]) => id);
}

function showResult() {
  const top = getTopCities(4);
  const winner = top[0];
  const city = CITIES[winner];

  document.getElementById('result-city-name').textContent = city.name;
  document.getElementById('result-city-country').textContent = city.country + ' · ' + city.nameEn;
  document.getElementById('result-tagline').textContent = city.tagline;
  document.getElementById('result-desc').textContent = city.desc;

  // 标签
  const traitsEl = document.getElementById('result-traits');
  traitsEl.innerHTML = city.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

  // 其他城市
  const othersEl = document.getElementById('result-other-cities');
  othersEl.innerHTML = top.slice(1).map(id => {
    const c = CITIES[id];
    return `<span class="other-city-tag">${c.name} <small style="opacity:0.5;font-size:0.7rem;">${c.nameEn}</small></span>`;
  }).join('');

  // 结果页accent色
  document.documentElement.style.setProperty('--accent', city.color || '#c8a96e');

  showPage('page-result');

  // 进度条满
  document.getElementById('progress-fill').style.width = '100%';
}

// ============================================================
// 分享
// ============================================================
document.getElementById('btn-share').addEventListener('click', () => {
  const winner = getTopCities(1)[0];
  const city = CITIES[winner];
  const text = `我的灵魂城市是「${city.name}」\n${city.tagline}\n——来自"你属于哪座城市？"测试`;

  navigator.clipboard.writeText(text).then(() => {
    showToast();
  }).catch(() => {
    showToast();
  });
});

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('toast--show');
  setTimeout(() => toast.classList.remove('toast--show'), 2200);
}

// ============================================================
// 重新开始
// ============================================================
document.getElementById('btn-restart').addEventListener('click', () => {
  initScores();
  currentQ = 0;
  answers = [];
  document.documentElement.style.setProperty('--accent', '#c8a96e');
  showPage('page-quiz');
  renderQuestion(0);
});

// ============================================================
// 开始
// ============================================================
document.getElementById('btn-start').addEventListener('click', () => {
  initScores();
  currentQ = 0;
  answers = [];
  showPage('page-quiz');
  renderQuestion(0);
});

// ============================================================
// 初始化
// ============================================================
initScores();
