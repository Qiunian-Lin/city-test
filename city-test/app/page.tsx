"use client";

import { useMemo, useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1625;
    --ink-2: #3d3650;
    --ink-3: #6b6280;
    --ink-4: #9d96b0;
    --surface: #faf9fc;
    --card: #ffffff;
    --border: #ede8f5;
    --accent: #6b5fa6;
    --accent-light: #f2eeff;
    --accent-mid: #c2b5e8;
    --warm: #d4956a;
    --warm-light: #fdf3ec;
  }

  body {
    background: var(--surface);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .serif { font-family: 'Playfair Display', serif; }

  .page {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 20px 60px;
  }

  .container {
    width: 100%;
    max-width: 900px;
  }

  /* LANDING */
  .landing-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }
  @media (max-width: 700px) {
    .landing-wrap { grid-template-columns: 1fr; }
    .city-grid { display: none !important; }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--accent-light);
    color: var(--accent);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid var(--accent-mid);
  }

  .landing-title {
    font-size: clamp(38px, 6vw, 60px);
    font-weight: 600;
    line-height: 1.1;
    color: var(--ink);
    margin-top: 20px;
    letter-spacing: -0.02em;
  }

  .landing-title em {
    font-style: italic;
    color: var(--accent);
  }

  .landing-desc {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.85;
    color: var(--ink-3);
    font-weight: 300;
    max-width: 400px;
  }

  .btn-row {
    display: flex;
    gap: 12px;
    margin-top: 36px;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 14px 28px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-primary:hover { background: #5a4f8f; transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: var(--ink-3);
    border: 1px solid var(--border);
    padding: 14px 20px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 400;
    cursor: default;
    font-family: 'DM Sans', sans-serif;
  }

  .city-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .city-card-sm {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 18px;
    transition: all 0.2s;
  }
  .city-card-sm:hover { transform: translateY(-2px); border-color: var(--accent-mid); }

  .city-name-sm {
    font-size: 16px;
    font-weight: 500;
    color: var(--ink);
  }
  .city-country-sm {
    font-size: 11px;
    color: var(--ink-4);
    margin-top: 2px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .city-tag-sm {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.7;
    color: var(--ink-3);
    font-weight: 300;
  }

  /* QUIZ */
  .quiz-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .quiz-num {
    font-size: 13px;
    color: var(--ink-4);
    font-weight: 400;
    margin-top: 8px;
  }

  .progress-track {
    height: 3px;
    background: var(--border);
    border-radius: 10px;
    margin-bottom: 40px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--warm));
    border-radius: 10px;
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  .question-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 48px;
    margin-bottom: 24px;
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 24px rgba(100,80,160,0.06);
  }
  @media (max-width: 600px) {
    .question-card { padding: 28px 24px; }
  }

  .question-text {
    font-size: clamp(20px, 3vw, 26px);
    line-height: 1.7;
    color: var(--ink);
    font-weight: 400;
    font-family: 'Playfair Display', serif;
    font-style: italic;
  }

  .options-row {
    display: flex;
    gap: 8px;
    margin-top: 36px;
    flex-wrap: wrap;
  }

  .option-btn {
    flex: 1;
    min-width: 80px;
    padding: 14px 8px;
    border-radius: 14px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    color: var(--ink-3);
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    text-align: center;
    transition: all 0.18s;
    line-height: 1.4;
    font-family: 'DM Sans', sans-serif;
  }
  .option-btn:hover {
    border-color: var(--accent-mid);
    background: var(--accent-light);
    color: var(--accent);
  }
  .option-btn.active {
    border-color: var(--accent);
    background: var(--accent-light);
    color: var(--accent);
    font-weight: 500;
  }

  .option-dots {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    margin-bottom: 6px;
  }
  .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--border);
    transition: background 0.18s;
  }
  .option-btn:hover .dot, .option-btn.active .dot { background: var(--accent); }

  .quiz-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn-back {
    background: transparent;
    color: var(--ink-4);
    border: 1px solid var(--border);
    padding: 10px 18px;
    border-radius: 12px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-back:hover:not(:disabled) { color: var(--ink); border-color: var(--ink-3); }
  .btn-back:disabled { opacity: 0.3; cursor: not-allowed; }

  .hint-text {
    font-size: 12px;
    color: var(--ink-4);
    letter-spacing: 0.02em;
  }

  /* RESULTS */
  .result-hero {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 48px;
    margin-bottom: 20px;
    box-shadow: 0 4px 24px rgba(100,80,160,0.06);
    position: relative;
    overflow: hidden;
  }
  .result-hero::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 280px; height: 280px;
    background: radial-gradient(ellipse at top right, var(--accent-light) 0%, transparent 70%);
    pointer-events: none;
  }
  @media (max-width: 600px) {
    .result-hero { padding: 28px 24px; }
  }

  .result-label {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-4);
    font-weight: 500;
  }

  .result-city {
    font-size: clamp(44px, 7vw, 72px);
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    color: var(--accent);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-top: 8px;
  }

  .result-country {
    font-size: 14px;
    color: var(--ink-4);
    margin-top: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .result-summary {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.9;
    color: var(--ink-3);
    font-weight: 300;
    max-width: 520px;
  }

  .match-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--warm-light);
    color: var(--warm);
    border: 1px solid #f0d5b8;
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 24px;
  }

  .result-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  @media (max-width: 700px) {
    .result-grid { grid-template-columns: 1fr; }
  }

  .result-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 28px;
  }

  .result-card-title {
    font-size: 13px;
    color: var(--ink-4);
    letter-spacing: 0.04em;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .city-desc {
    font-size: 15px;
    line-height: 1.85;
    color: var(--ink-3);
    font-weight: 300;
  }

  .tagline-pill {
    display: inline-block;
    background: var(--accent-light);
    color: var(--accent);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 12px;
    margin: 12px 0 16px;
    border: 1px solid var(--accent-mid);
  }

  .dimension-row {
    margin-bottom: 16px;
  }
  .dim-label-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 13px;
    color: var(--ink-3);
  }
  .dim-score {
    color: var(--ink-4);
    font-size: 12px;
  }
  .dim-track {
    height: 5px;
    background: var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .dim-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-mid), var(--accent));
    border-radius: 10px;
    transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
  }

  .alt-city-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 18px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    transition: all 0.2s;
  }
  .alt-city-item:hover { border-color: var(--accent-mid); }

  .alt-city-name { font-size: 15px; font-weight: 500; color: var(--ink); }
  .alt-city-country { font-size: 11px; color: var(--ink-4); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; }
  .alt-city-tag { font-size: 12px; color: var(--ink-3); margin-top: 8px; line-height: 1.6; font-weight: 300; }
  .alt-match { font-size: 12px; color: var(--ink-4); white-space: nowrap; }

  .challenge-box {
    background: var(--warm-light);
    border: 1px solid #f0d5b8;
    border-radius: 18px;
    padding: 20px;
  }
  .challenge-label { font-size: 11px; color: var(--warm); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; margin-bottom: 10px; }
  .challenge-name { font-size: 18px; font-weight: 500; color: var(--ink); }
  .challenge-country { font-size: 11px; color: #c4855a; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; }
  .challenge-tag { font-size: 12px; color: #9a6d52; margin-top: 8px; line-height: 1.7; }
  .challenge-desc { font-size: 14px; color: #7a5540; margin-top: 12px; line-height: 1.8; font-weight: 300; }

  .bottom-row {
    margin-top: 28px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .section-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  @media (max-width: 700px) {
    .section-row { grid-template-columns: 1fr; }
  }
`;

const cities = [
  {
    name: "New York",
    country: "United States",
    tagline: "野心、流动、碰撞、高速运转",
    description: "你并不怕被推着走，反而需要那种持续涌动的能量来维持自己的状态。这座城市不会等你，但也正是这样，你才感到真实。",
    tags: { pace: 10, pressure: 10, social: 8, freedom: 7, stability: 5 },
  },
  {
    name: "Tokyo",
    country: "Japan",
    tagline: "精细、有序、克制、密度中的静默",
    description: "你对规则并不抗拒，甚至在清晰的秩序里会感到一种奇特的自由。这里是给那些内心热烈、外表收敛的人的城市。",
    tags: { pace: 9, pressure: 8, social: 4, freedom: 3, stability: 9 },
  },
  {
    name: "Paris",
    country: "France",
    tagline: "美感、漫游、松弛、有点傲慢的优雅",
    description: "生活对你而言不只是功能，而是一种值得被认真对待的质地。你会在这里的街角找到某种共鸣。",
    tags: { pace: 5, pressure: 4, social: 6, freedom: 8, stability: 5 },
  },
  {
    name: "Berlin",
    country: "Germany",
    tagline: "实验性、非主流、允许出走、不问来路",
    description: "你不太在意别人怎么定义正确的人生路线。这座城市给你的，不是答案，而是不需要答案的空间。",
    tags: { pace: 5, pressure: 3, social: 7, freedom: 10, stability: 3 },
  },
  {
    name: "Barcelona",
    country: "Spain",
    tagline: "阳光、身体感、社交、不赶时间",
    description: "你相信生活本来就应该有余地。这里的节奏会让你重新找到和身体、和他人真实相处的感觉。",
    tags: { pace: 4, pressure: 3, social: 9, freedom: 8, stability: 5 },
  },
  {
    name: "Singapore",
    country: "Singapore",
    tagline: "高效、清洁、国际化、系统感强",
    description: "你喜欢知道事情是可预期的、可依靠的。这里的稳定感不是无聊，而是让你可以把精力放到真正重要的事上。",
    tags: { pace: 8, pressure: 7, social: 5, freedom: 3, stability: 10 },
  },
  {
    name: "Shanghai",
    country: "China",
    tagline: "务实、速度、机会密度高、中西混杂",
    description: "你能在变化里找到立足点，也不排斥在压力中保持行动力。这里适合脑子转得快、又肯扎下去的人。",
    tags: { pace: 9, pressure: 9, social: 7, freedom: 5, stability: 7 },
  },
  {
    name: "London",
    country: "United Kingdom",
    tagline: "层次丰富、克制多元、历史感与当代并存",
    description: "你会在复杂里感到自在，而不是不知所措。这座城市不会主动靠近你，但只要你懂得找，它的深度是无尽的。",
    tags: { pace: 7, pressure: 7, social: 5, freedom: 6, stability: 8 },
  },
  {
    name: "Vancouver",
    country: "Canada",
    tagline: "自然、平静、安全、留白够用",
    description: "你知道什么时候该停下来。比起一直往前冲，你更在意生活本身还值不值得好好过。",
    tags: { pace: 3, pressure: 3, social: 6, freedom: 7, stability: 9 },
  },
  {
    name: "Sydney",
    country: "Australia",
    tagline: "开阔、阳光、工作与生活之间有边界",
    description: "你希望下班后还是你自己。不用把全部时间都给工作，也不用随时保持兴奋——这座城市允许你只是好好活着。",
    tags: { pace: 5, pressure: 4, social: 8, freedom: 7, stability: 8 },
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    tagline: "包容、脚踏实地、个性空间大",
    description: "你不太需要被理解，但需要不被干涉。这里的人会给彼此足够的空间，你可以做自己，不需要解释。",
    tags: { pace: 4, pressure: 4, social: 7, freedom: 9, stability: 7 },
  },
  {
    name: "Lisbon",
    country: "Portugal",
    tagline: "慵懒、诗意、负担得起的美好",
    description: "你有时候只是想换一种活法。这里的阳光和缓慢，不是逃避，而是让你重新想清楚，什么是真正想要的。",
    tags: { pace: 3, pressure: 2, social: 7, freedom: 8, stability: 5 },
  },
  {
    name: "Seoul",
    country: "South Korea",
    tagline: "审美、高压、潮流、自我要求极高",
    description: "你对品质有一种近乎本能的敏感，也能承受高强度的自我驱动。这里是给那些不甘平庸又懂得美的人的城市。",
    tags: { pace: 9, pressure: 9, social: 7, freedom: 5, stability: 7 },
  },
  {
    name: "Vienna",
    country: "Austria",
    tagline: "古典、精致、慢、有文化积淀",
    description: "你不急于抵达，更在意过程本身是否值得。这里的生活节奏允许你把时间花在真正有深度的事物上。",
    tags: { pace: 3, pressure: 3, social: 5, freedom: 6, stability: 9 },
  },
  {
    name: "Dubai",
    country: "UAE",
    tagline: "目标感强、上升快、资源密集、强烈的外向性",
    description: "你的驱动力不需要外界来激活，你本来就很清楚自己要什么。这里给的是舞台，剩下的要靠你自己。",
    tags: { pace: 9, pressure: 8, social: 8, freedom: 5, stability: 7 },
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    tagline: "热烈、文艺、情感浓度高、有点乱但很有劲",
    description: "你需要生活里有真实的温度，有可以真正相遇的人，有不那么整洁但更有生命力的日常。",
    tags: { pace: 5, pressure: 4, social: 10, freedom: 8, stability: 3 },
  },
];

const questions = [
  { id: 1, text: "时间被安排得很满的时候，我通常不觉得累——反而有种充实感。", dimension: "pace" },
  { id: 2, text: "我会自然地期待每天有很多事情发生。", dimension: "pace" },
  { id: 3, text: "激烈的竞争环境不会让我崩溃，有时甚至让我兴奋。", dimension: "pressure" },
  { id: 4, text: "高压力、高机会的生活，对我来说有吸引力，而不是负担。", dimension: "pressure" },
  { id: 5, text: "在陌生人多的场合，我通常不难开口，甚至会主动找话题。", dimension: "social" },
  { id: 6, text: "我需要生活里有足够多的人气和流动感，才不会觉得沉闷。", dimension: "social" },
  { id: 7, text: "规则清晰、秩序井然的环境，会让我感到某种踏实。", dimension: "freedom", reverse: true },
  { id: 8, text: "我更想要自由探索的空间，而不是现成的清晰路径。", dimension: "freedom" },
  { id: 9, text: "稳定和可预期感，对我来说排在很高的位置。", dimension: "stability" },
  { id: 10, text: "就算未来不确定，只要更有意思，我也愿意去试。", dimension: "stability", reverse: true },
  { id: 11, text: "忙起来的时候，我会觉得自己真正在活着。", dimension: "pace" },
  { id: 12, text: "比起安静，我更容易被有活力、有流动感的环境吸引。", dimension: "social" },
  { id: 13, text: "我愿意选不太主流的生活方式，哪怕周围人不太理解。", dimension: "freedom" },
  { id: 14, text: "生活状态经常在变，我可以适应，甚至有点享受。", dimension: "stability", reverse: true },
  { id: 15, text: "被拿来比较、被评判，不会让我特别难受。", dimension: "pressure" },
  { id: 16, text: "我能适应快节奏，而且有时候反而需要那种速度感。", dimension: "pace" },
  { id: 17, text: "理想的周末里，有一定的社交和外出对我很重要。", dimension: "social" },
  { id: 18, text: "生活太固定、太重复的时候，我会有一种说不清的压抑感。", dimension: "freedom" },
  { id: 19, text: "比起更多的可能性，我更想要那种稳稳落地的安全感。", dimension: "stability" },
  { id: 20, text: "我理想中的生活，更接近'慢慢展开'，而不是'一切都有安排'。", dimension: "freedom" },
  { id: 21, text: "持续高度集中地工作，我不觉得很累——反而会进入一种状态。", dimension: "pressure" },
  { id: 22, text: "一个城市的美感和文化氛围，会影响我是否想在那里生活。", dimension: "freedom" },
  { id: 23, text: "我更喜欢城市里有熟悉的人、稳定的社群，而不是总在认识新朋友。", dimension: "social", reverse: true },
  { id: 24, text: "生活里的不确定，有时候是一种活力的来源。", dimension: "stability", reverse: true },
];

const options = [
  { label: "完全不像我", value: 1 },
  { label: "不太像", value: 2 },
  { label: "说不准", value: 3 },
  { label: "比较像", value: 4 },
  { label: "非常像我", value: 5 },
];

const dimensionLabels = {
  pace: "生活节奏",
  pressure: "压力耐受",
  social: "社交开放",
  freedom: "个性自由",
  stability: "稳定安全感",
};

function toTenScale(avg) {
  return Number((1 + ((avg - 1) / 4) * 9).toFixed(1));
}

function calculateProfile(answers) {
  const grouped = { pace: [], pressure: [], social: [], freedom: [], stability: [] };
  for (const q of questions) {
    const raw = answers[q.id];
    if (!raw) continue;
    const score = q.reverse ? 6 - raw : raw;
    grouped[q.dimension].push(score);
  }
  const profile = { pace: 5.5, pressure: 5.5, social: 5.5, freedom: 5.5, stability: 5.5 };
  Object.keys(grouped).forEach((key) => {
    const arr = grouped[key];
    if (arr.length) {
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      profile[key] = toTenScale(avg);
    }
  });
  return profile;
}

function getCityDistance(profile, city) {
  return Object.keys(profile).reduce((sum, key) => sum + Math.abs(profile[key] - city.tags[key]), 0);
}

function getResults(profile) {
  const ranked = cities.map((city) => ({ ...city, distance: getCityDistance(profile, city) })).sort((a, b) => a.distance - b.distance);
  const top3 = ranked.slice(0, 3);
  const challenge = [...ranked].sort((a, b) => {
    const fa = Math.abs(profile.freedom - a.tags.freedom) + Math.abs(profile.pressure - a.tags.pressure);
    const fb = Math.abs(profile.freedom - b.tags.freedom) + Math.abs(profile.pressure - b.tags.pressure);
    return fa - fb;
  }).reverse().find((city) => !top3.some((t) => t.name === city.name)) || ranked[ranked.length - 1];
  return { top3, challenge };
}

function getProfileSummary(profile) {
  const keys = Object.keys(profile);
  const highest = keys.sort((a, b) => profile[b] - profile[a])[0];
  const lowest = keys.sort((a, b) => profile[a] - profile[b])[0];
  const highText = {
    pace: "你对有推进感、有流动性的生活有天然的适应力。",
    pressure: "你对竞争和上升空间有一定的耐受力，甚至需要它来维持状态。",
    social: "你在人与人的连接里找到能量，需要一定的外部活力。",
    freedom: "你很看重个性空间，不太喜欢被框定得太死。",
    stability: "安全感和可预期性对你来说很重要，你需要稳固的地基。",
  };
  const lowText = {
    pace: "被持续催赶的生活节奏，并不适合你。",
    pressure: "高压高卷的环境，会比较明显地消耗你。",
    social: "你更需要安静和边界，而不是持续不断的社交输入。",
    freedom: "你并不排斥清晰的规则和结构，有时反而需要它。",
    stability: "你对变化和不确定性的容纳度比较高。",
  };
  return `${highText[highest]} ${lowText[lowest]}`;
}

function getMatchPercent(distance, floor = 72) {
  return Math.max(floor, 100 - Math.round(distance * 2));
}

export default function CityQuiz() {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const profile = useMemo(() => calculateProfile(answers), [answers]);
  const results = useMemo(() => getResults(profile), [profile]);

  const handleSelect = (value) => {
    if (animating) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSubmitted(true);
      }
    }, 220);
  };

  const resetAll = () => {
    setStarted(false);
    setSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
  };

  if (!started) {
    return (
      <>
        <style>{style}</style>
        <div className="page" style={{ paddingTop: 60 }}>
          <div className="container">
            <div className="landing-wrap">
              <div>
                <span className="badge">城市气质测试</span>
                <h1 className="landing-title serif">
                  哪座城市，<br />
                  <em>适合你生活？</em>
                </h1>
                <p className="landing-desc">
                  通过一组关于节奏感、稳定性、社交偏好与自由空间的问题，
                  找到与你内在气质更接近的城市。
                </p>
                <div className="btn-row">
                  <button className="btn-primary" onClick={() => setStarted(true)}>开始测试</button>
                  <div className="btn-ghost">{questions.length} 道题 · 约 3–4 分钟</div>
                </div>
              </div>
              <div className="city-grid">
                {cities.slice(0, 6).map((city) => (
                  <div key={city.name} className="city-card-sm">
                    <div className="city-name-sm">{city.name}</div>
                    <div className="city-country-sm">{city.country}</div>
                    <div className="city-tag-sm">{city.tagline}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (submitted) {
    const mainCity = results.top3[0];
    return (
      <>
        <style>{style}</style>
        <div className="page">
          <div className="container">
            <div className="result-hero">
              <div className="result-label">你的城市画像</div>
              <div className="result-city serif">{mainCity.name}</div>
              <div className="result-country">{mainCity.country}</div>
              <p className="result-summary">{getProfileSummary(profile)}</p>
              <div className="match-pill">匹配度 {getMatchPercent(mainCity.distance)}%</div>
            </div>

            <div className="result-grid">
              <div className="result-card">
                <div className="result-card-title">为什么是这里</div>
                <div className="tagline-pill">{mainCity.tagline}</div>
                <p className="city-desc">{mainCity.description}</p>
              </div>
              <div className="result-card">
                <div className="result-card-title">你的偏好画像</div>
                {Object.keys(profile).map((key) => (
                  <div key={key} className="dimension-row">
                    <div className="dim-label-row">
                      <span>{dimensionLabels[key]}</span>
                      <span className="dim-score">{profile[key]}</span>
                    </div>
                    <div className="dim-track">
                      <div className="dim-fill" style={{ width: `${(profile[key] / 10) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-row">
              <div className="result-card">
                <div className="result-card-title">也很适合你的地方</div>
                {results.top3.slice(1).map((city) => (
                  <div key={city.name} className="alt-city-item">
                    <div>
                      <div className="alt-city-name">{city.name}</div>
                      <div className="alt-city-country">{city.country}</div>
                      <div className="alt-city-tag">{city.tagline}</div>
                    </div>
                    <div className="alt-match">{getMatchPercent(city.distance, 68)}%</div>
                  </div>
                ))}
              </div>

              <div className="result-card">
                <div className="result-card-title">你可能向往，却未必适合的城市</div>
                <div className="challenge-box">
                  <div className="challenge-label">反差城市</div>
                  <div className="challenge-name">{results.challenge.name}</div>
                  <div className="challenge-country">{results.challenge.country}</div>
                  <div className="challenge-tag">{results.challenge.tagline}</div>
                  <p className="challenge-desc">{results.challenge.description}</p>
                </div>
              </div>
            </div>

            <div className="bottom-row">
              <button className="btn-primary" onClick={resetAll}>重新测试</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{style}</style>
      <div className="page">
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="quiz-header">
            <div>
              <span className="badge">城市气质测试</span>
              <div className="quiz-num" style={{ marginTop: 12 }}>
                第 {currentIndex + 1} 题 / 共 {questions.length} 题
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-4)', paddingTop: 8 }}>
              {Math.round(((currentIndex) / questions.length) * 100)}%
            </div>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((currentIndex) / questions.length) * 100}%` }} />
          </div>

          <div className="question-card" style={{ opacity: animating ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <p className="question-text">
              {currentQuestion.text}
            </p>

            <div className="options-row">
              {options.map((opt) => {
                const active = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    className={`option-btn${active ? ' active' : ''}`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <div className="option-dots">
                      {Array.from({ length: opt.value }).map((_, i) => (
                        <div key={i} className="dot" />
                      ))}
                    </div>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quiz-nav">
            <button
              className="btn-back"
              onClick={() => currentIndex > 0 && setCurrentIndex((p) => p - 1)}
              disabled={currentIndex === 0}
            >
              ← 上一题
            </button>
            <span className="hint-text">选择后自动进入下一题</span>
          </div>
        </div>
      </div>
    </>
  );
}
