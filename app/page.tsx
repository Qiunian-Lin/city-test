"use client";

import { useMemo, useState } from "react";

type Dimension = "pace" | "pressure" | "social" | "freedom" | "stability";

type City = {
  name: string;
  country: string;
  tagline: string;
  description: string;
  tags: Record<Dimension, number>;
};

type Question = {
  id: number;
  text: string;
  dimension: Dimension;
  reverse?: boolean;
};

const cities: City[] = [
  {
    name: "New York",
    country: "United States",
    tagline: "高压、机会、竞争、极快节奏",
    description:
      "你适合在高度竞争和强烈流动中生活。这里会推着你成长，也会不断考验你的精力和野心。",
    tags: { pace: 10, pressure: 10, social: 8, freedom: 7, stability: 6 },
  },
  {
    name: "Tokyo",
    country: "Japan",
    tagline: "秩序、克制、精细、高密度",
    description:
      "你适合规则明确、细节充足、生活高度有序的环境。这里适合自律、耐心、重边界感的人。",
    tags: { pace: 9, pressure: 8, social: 4, freedom: 3, stability: 9 },
  },
  {
    name: "Paris",
    country: "France",
    tagline: "文艺、审美、松散、情绪感",
    description:
      "你更适合有生活质感、审美氛围和精神空间的地方。对你来说，城市不仅是功能，更是一种气质。",
    tags: { pace: 6, pressure: 5, social: 6, freedom: 7, stability: 5 },
  },
  {
    name: "Berlin",
    country: "Germany",
    tagline: "自由、实验性、非主流、不确定",
    description:
      "你适合允许个性伸展、允许试错、允许不走主流道路的城市。这里更看重做自己，而不是整齐划一。",
    tags: { pace: 5, pressure: 4, social: 7, freedom: 9, stability: 4 },
  },
  {
    name: "Barcelona",
    country: "Spain",
    tagline: "阳光、社交、松弛、生活感",
    description:
      "你更适合不被时间持续追赶的生活。对你来说，城市应该是可以呼吸、可以晒太阳、可以和人连接的地方。",
    tags: { pace: 4, pressure: 3, social: 9, freedom: 8, stability: 6 },
  },
  {
    name: "Singapore",
    country: "Singapore",
    tagline: "安全、秩序、功能性、高效率",
    description:
      "你适合稳定、整洁、清晰、可靠的生活框架。你会喜欢那些能给人确定感的系统和节奏。",
    tags: { pace: 8, pressure: 7, social: 5, freedom: 3, stability: 10 },
  },
  {
    name: "Shanghai",
    country: "China",
    tagline: "现实、速度、机会、混合气质",
    description:
      "你适合既现代又实际、既讲效率又讲机会的城市。你能在压力和变化中保持行动力。",
    tags: { pace: 9, pressure: 9, social: 7, freedom: 5, stability: 7 },
  },
  {
    name: "London",
    country: "United Kingdom",
    tagline: "多元、克制、传统与现代并存",
    description:
      "你适合复杂、包容、文化层次丰富的城市。你会在保留距离感的多元环境里找到自己的位置。",
    tags: { pace: 7, pressure: 7, social: 5, freedom: 6, stability: 8 },
  },
  {
    name: "Vancouver",
    country: "Canada",
    tagline: "自然、平静、安全、生活质量",
    description:
      "你更适合把生活质量放在高位。你需要留白、自然和稳定，而不是持续竞争。",
    tags: { pace: 3, pressure: 3, social: 6, freedom: 7, stability: 9 },
  },
  {
    name: "Sydney",
    country: "Australia",
    tagline: "阳光、平衡、健康、户外",
    description:
      "你适合工作与生活相对平衡的环境。你会偏好开阔、明亮、身体感强的生活方式。",
    tags: { pace: 5, pressure: 4, social: 8, freedom: 7, stability: 8 },
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "机会、金钱、速度、外向",
    description:
      "你适合目标明确、追求上升和资源密度的地方。你会被快节奏和高回报感吸引。",
    tags: { pace: 9, pressure: 8, social: 8, freedom: 6, stability: 7 },
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    tagline: "包容、自由、温和、生活方式导向",
    description:
      "你适合宽松、包容、强调个人空间和生活方式的城市。你想过得像自己，而不是像某种标准答案。",
    tags: { pace: 4, pressure: 4, social: 7, freedom: 9, stability: 7 },
  },
];

const questions: Question[] = [
  { id: 1, text: "如果你的一天被安排得很满，你通常会觉得充实。", dimension: "pace" },
  { id: 2, text: "理想的一天里，我希望完成很多事情。", dimension: "pace" },
  { id: 3, text: "竞争激烈的环境会激发我，而不是消耗我。", dimension: "pressure" },
  { id: 4, text: "高压力但高机会的生活，对我很有吸引力。", dimension: "pressure" },
  { id: 5, text: "在陌生人的聚会里，我通常愿意主动开口。", dimension: "social" },
  { id: 6, text: "我更喜欢热闹、有人气、随时能社交的生活氛围。", dimension: "social" },
  { id: 7, text: "规则明确、秩序很强的环境会让我安心。", dimension: "freedom", reverse: true },
  { id: 8, text: "比起清晰路径，我更想要自由探索。", dimension: "freedom" },
  { id: 9, text: "稳定和安全感，对我来说非常重要。", dimension: "stability" },
  { id: 10, text: "就算未来不确定，只要更精彩，我也愿意尝试。", dimension: "stability", reverse: true },
  { id: 11, text: "忙碌感会让我觉得自己真正活着。", dimension: "pace" },
  { id: 12, text: "比起安静，我更容易被有活力、有流动感的城市吸引。", dimension: "social" },
  { id: 13, text: "我愿意尝试不那么主流、也不那么标准的生活方式。", dimension: "freedom" },
  { id: 14, text: "经常变化的生活状态，我可以适应。", dimension: "stability", reverse: true },
  { id: 15, text: "被不断比较和衡量，不会让我太难受。", dimension: "pressure" },
  { id: 16, text: "我适应快速变化，甚至喜欢它。", dimension: "pace" },
  { id: 17, text: "理想的周末里，我希望有一定的社交和外出。", dimension: "social" },
  { id: 18, text: "生活太固定、太重复时，我会有压抑感。", dimension: "freedom" },
  { id: 19, text: "比起可能性，我更看重可预期的安全感。", dimension: "stability" },
  { id: 20, text: "我理想的生活更接近‘自由展开’，而不是‘稳稳落地’。", dimension: "freedom" },
];

const options = [
  { label: "非常不同意", value: 1 },
  { label: "不同意", value: 2 },
  { label: "一般", value: 3 },
  { label: "同意", value: 4 },
  { label: "非常同意", value: 5 },
];

const dimensionLabels: Record<Dimension, string> = {
  pace: "生活节奏",
  pressure: "压力竞争",
  social: "社交开放度",
  freedom: "自由个性空间",
  stability: "稳定安全感",
};

function toTenScale(avg: number) {
  return Number((1 + ((avg - 1) / 4) * 9).toFixed(1));
}

function calculateProfile(answers: Record<number, number>) {
  const grouped: Record<Dimension, number[]> = {
    pace: [],
    pressure: [],
    social: [],
    freedom: [],
    stability: [],
  };

  for (const q of questions) {
    const raw = answers[q.id];
    if (!raw) continue;
    const score = q.reverse ? 6 - raw : raw;
    grouped[q.dimension].push(score);
  }

  const profile: Record<Dimension, number> = {
    pace: 5.5,
    pressure: 5.5,
    social: 5.5,
    freedom: 5.5,
    stability: 5.5,
  };

  (Object.keys(grouped) as Dimension[]).forEach((key) => {
    const arr = grouped[key];
    if (arr.length) {
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      profile[key] = toTenScale(avg);
    }
  });

  return profile;
}

function getCityDistance(profile: Record<Dimension, number>, city: City) {
  return (Object.keys(profile) as Dimension[]).reduce((sum, key) => {
    return sum + Math.abs(profile[key] - city.tags[key]);
  }, 0);
}

function getResults(profile: Record<Dimension, number>) {
  const ranked = cities
    .map((city) => ({
      ...city,
      distance: getCityDistance(profile, city),
    }))
    .sort((a, b) => a.distance - b.distance);

  const top3 = ranked.slice(0, 3);

  const challenge = [...ranked]
    .sort((a, b) => {
      const freedomGap = Math.abs(profile.freedom - a.tags.freedom) - Math.abs(profile.freedom - b.tags.freedom);
      const pressureGap = Math.abs(profile.pressure - a.tags.pressure) - Math.abs(profile.pressure - b.tags.pressure);
      return freedomGap + pressureGap;
    })
    .reverse()
    .find((city) => !top3.some((top) => top.name === city.name)) || ranked[ranked.length - 1];

  return { top3, challenge };
}

function getProfileSummary(profile: Record<Dimension, number>) {
  const sortedHigh = [...(Object.keys(profile) as Dimension[])].sort((a, b) => profile[b] - profile[a]);
  const sortedLow = [...(Object.keys(profile) as Dimension[])].sort((a, b) => profile[a] - profile[b]);

  const highest = sortedHigh[0];
  const lowest = sortedLow[0];

  const highText: Record<Dimension, string> = {
    pace: "你偏好更有推进感、更有流动性的生活。",
    pressure: "你对竞争和上升空间的耐受度较高。",
    social: "你需要一定的人与人连接和外部活力。",
    freedom: "你很在意个性空间，不喜欢被框得太死。",
    stability: "你会把安全感和可预期性放在重要位置。",
  };

  const lowText: Record<Dimension, string> = {
    pace: "你并不适合被持续催赶的生活。",
    pressure: "高压高卷的环境会明显消耗你。",
    social: "你更需要安静和边界，而不是持续社交。",
    freedom: "你并不排斥规则和结构。",
    stability: "你对不确定性和变化的接受度更高。",
  };

  return `${highText[highest]} ${lowText[lowest]}`;
}

export default function CityQuizPage() {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = questions[currentIndex];
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  const profile = useMemo(() => calculateProfile(answers), [answers]);
  const results = useMemo(() => getResults(profile), [profile]);

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    setSubmitted(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetAll = () => {
    setStarted(false);
    setSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-stone-100 via-white to-zinc-100 text-zinc-900">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-10">
          <div className="grid w-full gap-8 rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                  全球城市匹配测试
                </p>
                <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                  哪座城市
                  <br />
                  适合你生活？
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
                  这不是严肃移居建议，而是一份带一点洞察感的轻测试。
                  它会根据你的生活节奏、稳定需求、自由偏好和社交气质，
                  给出最接近你的城市画像。
                </p>
              </div>

              <div className="mt-8 space-y-3 text-sm text-zinc-500">
                <p>· 20 道题</p>
                <p>· 约 2–3 分钟</p>
                <p>· 结果包含 3 个匹配城市 + 1 个“你会被吸引但未必适合”的城市</p>
              </div>
            </div>

            <div className="rounded-[28px] bg-zinc-50 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {cities.slice(0, 6).map((city) => (
                  <div
                    key={city.name}
                    className="rounded-2xl border border-zinc-200 bg-white p-4"
                  >
                    <div className="text-lg font-medium">{city.name}</div>
                    <div className="mt-1 text-sm text-zinc-500">{city.country}</div>
                    <div className="mt-3 text-sm leading-6 text-zinc-600">{city.tagline}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStarted(true)}
                className="mt-6 w-full rounded-2xl bg-zinc-900 px-5 py-4 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                开始测试
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (submitted) {
    const mainCity = results.top3[0];

    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm text-zinc-500">测试结果</p>
            <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
              你可能适合生活在 <span className="text-zinc-500">{mainCity.name}</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">
              {getProfileSummary(profile)}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:col-span-2">
                <div className="text-sm text-zinc-500">最匹配城市</div>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-3xl font-semibold">{mainCity.name}</div>
                    <div className="mt-1 text-sm text-zinc-500">{mainCity.country}</div>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-sm text-zinc-600">
                    匹配度 {Math.max(72, 100 - Math.round(mainCity.distance * 2))}%
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-zinc-700">{mainCity.tagline}</div>
                <p className="mt-4 leading-7 text-zinc-600">{mainCity.description}</p>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                <div className="text-sm text-zinc-500">你的城市偏好画像</div>
                <div className="mt-5 space-y-4">
                  {(Object.keys(profile) as Dimension[]).map((key) => (
                    <div key={key}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>{dimensionLabels[key]}</span>
                        <span className="text-zinc-500">{profile[key]}</span>
                      </div>
                      <div className="h-2 rounded-full bg-zinc-100">
                        <div
                          className="h-2 rounded-full bg-zinc-900"
                          style={{ width: `${(profile[key] / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                <div className="text-lg font-semibold">也很适合你的城市</div>
                <div className="mt-5 space-y-4">
                  {results.top3.slice(1).map((city) => (
                    <div
                      key={city.name}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-lg font-medium">{city.name}</div>
                          <div className="text-sm text-zinc-500">{city.country}</div>
                        </div>
                        <div className="text-sm text-zinc-500">
                          匹配度 {Math.max(68, 100 - Math.round(city.distance * 2))}%
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-zinc-600">{city.tagline}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                <div className="text-lg font-semibold">你可能会被它吸引，但未必适合</div>
                <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-lg font-medium">{results.challenge.name}</div>
                  <div className="text-sm text-zinc-500">{results.challenge.country}</div>
                  <div className="mt-3 text-sm text-zinc-600">{results.challenge.tagline}</div>
                  <p className="mt-4 leading-7 text-zinc-600">
                    {results.challenge.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={resetAll}
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                重新测试
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">城市匹配测试</p>
              <h1 className="mt-2 text-2xl font-semibold">
                第 {currentIndex + 1} / {questions.length} 题
              </h1>
            </div>
            <div className="text-sm text-zinc-500">{progress}%</div>
          </div>

          <div className="mt-5 h-2 rounded-full bg-zinc-100">
            <div
              className="h-2 rounded-full bg-zinc-900 transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="mt-10 rounded-3xl bg-zinc-50 p-6 md:p-8">
            <p className="text-xl leading-9 md:text-2xl">{currentQuestion.text}</p>

            <div className="mt-8 grid gap-3">
              {options.map((option) => {
                const active = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                      active
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              上一题
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentIndex === questions.length - 1 ? "查看结果" : "下一题"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}