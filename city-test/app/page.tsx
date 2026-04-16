"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

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
  scene?: string;
  dimension: Dimension;
  reverse?: boolean;
};

const cities: City[] = [
  {
    name: "New York",
    country: "United States",
    tagline: "野心、流动、碰撞、高速运转",
    description:
      "你并不怕被推着走，反而需要那种持续涌动的能量来维持自己的状态。这座城市不会等你，但也正是这样，你才感到真实。",
    tags: { pace: 10, pressure: 10, social: 8, freedom: 7, stability: 5 },
  },
  {
    name: "Tokyo",
    country: "Japan",
    tagline: "精细、有序、克制、密度中的静默",
    description:
      "你对规则并不抗拒，甚至在清晰的秩序里会感到一种奇特的自由。这里是给那些内心热烈、外表收敛的人的城市。",
    tags: { pace: 9, pressure: 8, social: 4, freedom: 3, stability: 9 },
  },
  {
    name: "Paris",
    country: "France",
    tagline: "美感、漫游、松弛、有点傲慢的优雅",
    description:
      "生活对你而言不只是功能，而是一种值得被认真对待的质地。你会在这里的街角找到某种共鸣。",
    tags: { pace: 5, pressure: 4, social: 6, freedom: 8, stability: 5 },
  },
  {
    name: "Berlin",
    country: "Germany",
    tagline: "实验性、非主流、允许出走、不问来路",
    description:
      "你不太在意别人怎么定义正确的人生路线。这座城市给你的，不是答案，而是不需要答案的空间。",
    tags: { pace: 5, pressure: 3, social: 7, freedom: 10, stability: 3 },
  },
  {
    name: "Barcelona",
    country: "Spain",
    tagline: "阳光、身体感、社交、不赶时间",
    description:
      "你相信生活本来就应该有余地。这里的节奏会让你重新找到和身体、和他人真实相处的感觉。",
    tags: { pace: 4, pressure: 3, social: 9, freedom: 8, stability: 5 },
  },
  {
    name: "Singapore",
    country: "Singapore",
    tagline: "高效、清洁、国际化、系统感强",
    description:
      "你喜欢知道事情是可预期、可依靠的。这里的稳定感不是无聊，而是让你可以把精力放到真正重要的事上。",
    tags: { pace: 8, pressure: 7, social: 5, freedom: 3, stability: 10 },
  },
  {
    name: "Shanghai",
    country: "China",
    tagline: "务实、速度、机会密度高、中西混杂",
    description:
      "你能在变化里找到立足点，也不排斥在压力中保持行动力。这里适合脑子转得快、又肯扎下去的人。",
    tags: { pace: 9, pressure: 9, social: 7, freedom: 5, stability: 7 },
  },
  {
    name: "London",
    country: "United Kingdom",
    tagline: "层次丰富、克制多元、历史感与当代并存",
    description:
      "你会在复杂里感到自在，而不是不知所措。这座城市不会主动靠近你，但只要你懂得找，它的深度是无尽的。",
    tags: { pace: 7, pressure: 7, social: 5, freedom: 6, stability: 8 },
  },
  {
    name: "Vancouver",
    country: "Canada",
    tagline: "自然、平静、安全、留白够用",
    description:
      "你知道什么时候该停下来。比起一直往前冲，你更在意生活本身还值不值得好好过。",
    tags: { pace: 3, pressure: 3, social: 6, freedom: 7, stability: 9 },
  },
  {
    name: "Sydney",
    country: "Australia",
    tagline: "开阔、阳光、工作与生活之间有边界",
    description:
      "你希望下班后还是你自己。不用把全部时间都给工作，也不用随时保持兴奋——这座城市允许你只是好好活着。",
    tags: { pace: 5, pressure: 4, social: 8, freedom: 7, stability: 8 },
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    tagline: "包容、脚踏实地、个性空间大",
    description:
      "你不太需要被理解，但需要不被干涉。这里的人会给彼此足够的空间，你可以做自己，不需要解释。",
    tags: { pace: 4, pressure: 4, social: 7, freedom: 9, stability: 7 },
  },
  {
    name: "Lisbon",
    country: "Portugal",
    tagline: "慵懒、诗意、负担得起的美好",
    description:
      "你有时候只是想换一种活法。这里的阳光和缓慢，不是逃避，而是让你重新想清楚什么是真正想要的。",
    tags: { pace: 3, pressure: 2, social: 7, freedom: 8, stability: 5 },
  },
  {
    name: "Seoul",
    country: "South Korea",
    tagline: "审美、高压、潮流、自我要求极高",
    description:
      "你对品质有一种近乎本能的敏感，也能承受高强度的自我驱动。这里是给那些不甘平庸又懂得美的人的城市。",
    tags: { pace: 9, pressure: 9, social: 7, freedom: 5, stability: 7 },
  },
  {
    name: "Vienna",
    country: "Austria",
    tagline: "古典、精致、慢、有文化积淀",
    description:
      "你不急于抵达，更在意过程本身是否值得。这里的生活节奏允许你把时间花在真正有深度的事物上。",
    tags: { pace: 3, pressure: 3, social: 5, freedom: 6, stability: 9 },
  },
  {
    name: "Dubai",
    country: "UAE",
    tagline: "目标感强、上升快、资源密集、外向性强",
    description:
      "你的驱动力不需要外界来激活，你本来就很清楚自己要什么。这里给的是舞台，剩下的要靠你自己。",
    tags: { pace: 9, pressure: 8, social: 8, freedom: 5, stability: 7 },
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    tagline: "热烈、文艺、情感浓度高、有点乱但很有劲",
    description:
      "你需要生活里有真实的温度，有可以真正相遇的人，有不那么整洁但更有生命力的日常。",
    tags: { pace: 5, pressure: 4, social: 10, freedom: 8, stability: 3 },
  },
];

const questions: Question[] = [
  {
    id: 1,
    text: "时间被安排得很满的时候，我通常不觉得累，反而有种充实感。",
    dimension: "pace",
  },
  {
    id: 2,
    scene: "周一早上，你的日历已经排满了会议和截止日期。",
    text: "看到这样的一周，我的第一反应是兴奋多过压力。",
    dimension: "pace",
  },
  {
    id: 3,
    text: "激烈的竞争环境不会让我崩溃，有时甚至让我状态更好。",
    dimension: "pressure",
  },
  {
    id: 4,
    scene: "你所在的行业竞争极其激烈，同龄人的进展随时可见。",
    text: "这种氛围会推着我跑，而不是把我压垮。",
    dimension: "pressure",
  },
  {
    id: 5,
    text: "在陌生人多的场合，我通常不难开口，甚至会主动找话题。",
    dimension: "social",
  },
  {
    id: 6,
    scene: "你搬到了一座新城市，周围全是不认识的人。",
    text: "我会比较快地开始认识新朋友，觉得这是件有意思的事。",
    dimension: "social",
  },
  {
    id: 7,
    text: "规则清晰、秩序井然的环境，会让我感到踏实，而不是窒息。",
    dimension: "freedom",
    reverse: true,
  },
  {
    id: 8,
    scene: "公司提供了两种工作模式：一是有完整规范和流程，二是高度自主但结构模糊。",
    text: "我会更倾向于选择高度自主的那种，哪怕结构不清晰。",
    dimension: "freedom",
  },
  {
    id: 9,
    text: "稳定和可预期感，对我来说排在很高的位置。",
    dimension: "stability",
  },
  {
    id: 10,
    scene: "有人给你一个机会：收入更高，但需要频繁搬城市，未来不确定。",
    text: "这种不确定对我来说是代价，而不是吸引力。",
    dimension: "stability",
  },
  {
    id: 11,
    text: "忙起来的时候，我会觉得自己真正在活着。",
    dimension: "pace",
  },
  {
    id: 12,
    scene: "你有一个难得的空闲周末，什么安排都没有。",
    text: "我多半会觉得有些无所适从，想找点事情做。",
    dimension: "pace",
  },
  {
    id: 13,
    text: "我愿意选不太主流的生活方式，哪怕周围人不太理解。",
    dimension: "freedom",
  },
  {
    id: 14,
    scene: "你的朋友都在走一条「正常」的路，而你在考虑一条很不一样的方向。",
    text: "别人的困惑或质疑，不太会动摇我的判断。",
    dimension: "freedom",
  },
  {
    id: 15,
    text: "被拿来比较、被评判，不会让我特别难受。",
    dimension: "pressure",
  },
  {
    id: 16,
    scene: "你的工作成果会被定期排名，结果对所有人公开。",
    text: "这种透明竞争不会让我特别抵触，甚至有点被激励到。",
    dimension: "pressure",
  },
  {
    id: 17,
    text: "理想的周末里，有一定的社交和外出对我很重要。",
    dimension: "social",
  },
  {
    id: 18,
    text: "生活太固定、太重复的时候，我会有一种说不清的压抑感。",
    dimension: "freedom",
  },
  {
    id: 19,
    scene: "你正在为下一步做决定：一边是熟悉稳定的环境，一边是陌生但充满变数的新起点。",
    text: "我会需要很强的理由，才愿意放弃那个稳定的选项。",
    dimension: "stability",
  },
  {
    id: 20,
    text: "我理想中的生活，更接近「慢慢展开」，而不是「一切都有安排」。",
    dimension: "freedom",
  },
  {
    id: 21,
    scene: "工作进入一个需要长时间高度专注的阶段，几乎没有社交空间。",
    text: "我能进入那种状态，不觉得特别消耗，甚至享受这种沉浸感。",
    dimension: "pressure",
  },
  {
    id: 22,
    text: "一个城市的美感和文化氛围，会真实影响我是否想在那里生活。",
    dimension: "freedom",
  },
  {
    id: 23,
    scene: "你在一座陌生城市住了三个月，认识了一些新朋友，但关系还很浅。",
    text: "这种状态会让我有点孤独，我更需要深度稳定的社交关系。",
    dimension: "social",
    reverse: true,
  },
  {
    id: 24,
    scene: "你的生活在过去半年里发生了很多变化，节奏和环境都不一样了。",
    text: "这种持续的变化，对我来说是一种活力的来源，而不是消耗。",
    dimension: "stability",
    reverse: true,
  },
  {
    id: 25,
    text: "我能在快节奏里找到自己的位置，有时候那种速度感正是我需要的。",
    dimension: "pace",
  },
  {
    id: 26,
    scene: "你有机会加入一个高速成长的团队，但每天都像在救火。",
    text: "这样的环境听起来有挑战但也有意思，不会直接让我退缩。",
    dimension: "pace",
  },
];

const options = [
  { label: "完全不像我", value: 1 },
  { label: "不太像", value: 2 },
  { label: "说不准", value: 3 },
  { label: "比较像", value: 4 },
  { label: "非常像我", value: 5 },
];

const dimensionLabels: Record<Dimension, string> = {
  pace: "生活节奏",
  pressure: "压力耐受",
  social: "社交开放",
  freedom: "个性自由",
  stability: "稳定安全感",
};

function toTenScale(avg: number): number {
  return Number((1 + ((avg - 1) / 4) * 9).toFixed(1));
}

function calculateProfile(answers: Record<number, number>): Record<Dimension, number> {
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

function getCityDistance(profile: Record<Dimension, number>, city: City): number {
  return (Object.keys(profile) as Dimension[]).reduce(
    (sum, key) => sum + Math.abs(profile[key] - city.tags[key]),
    0
  );
}

function getResults(profile: Record<Dimension, number>) {
  const ranked = cities
    .map((city) => ({ ...city, distance: getCityDistance(profile, city) }))
    .sort((a, b) => a.distance - b.distance);
  const top3 = ranked.slice(0, 3);
  const challenge =
    [...ranked]
      .sort((a, b) => {
        const fa =
          Math.abs(profile.freedom - a.tags.freedom) +
          Math.abs(profile.pressure - a.tags.pressure);
        const fb =
          Math.abs(profile.freedom - b.tags.freedom) +
          Math.abs(profile.pressure - b.tags.pressure);
        return fa - fb;
      })
      .reverse()
      .find((c) => !top3.some((t) => t.name === c.name)) || ranked[ranked.length - 1];
  return { top3, challenge };
}

function getProfileSummary(profile: Record<Dimension, number>): string {
  const keys = Object.keys(profile) as Dimension[];
  const sorted = [...keys].sort((a, b) => profile[b] - profile[a]);
  const highest = sorted[0];
  const lowest = [...keys].sort((a, b) => profile[a] - profile[b])[0];
  const highText: Record<Dimension, string> = {
    pace: "你对有推进感、有流动性的生活有天然的适应力。",
    pressure: "你对竞争和上升空间有一定的耐受力，甚至需要它来维持状态。",
    social: "你在人与人的连接里找到能量，需要一定的外部活力。",
    freedom: "你很看重个性空间，不太喜欢被框定得太死。",
    stability: "安全感和可预期性对你来说很重要，你需要稳固的地基。",
  };
  const lowText: Record<Dimension, string> = {
    pace: "被持续催赶的生活节奏，并不适合你。",
    pressure: "高压高卷的环境，会比较明显地消耗你。",
    social: "你更需要安静和边界，而不是持续不断的社交输入。",
    freedom: "你并不排斥清晰的规则和结构，有时反而需要它。",
    stability: "你对变化和不确定性的容纳度比较高。",
  };
  return `${highText[highest]} ${lowText[lowest]}`;
}

function getMatchPercent(distance: number, floor = 72): number {
  return Math.max(floor, 100 - Math.round(distance * 2));
}

export default function CityQuizPage() {
 const [started, setStarted] = useState(false);
 const [submitted, setSubmitted] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);
 const [answers, setAnswers] = useState<Record<number, number>>({});
 const [transitioning, setTransitioning] = useState(false);
 const [cityPage, setCityPage] = useState(0);
 const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const currentQuestion = questions[currentIndex];
  const profile = useMemo(() => calculateProfile(answers), [answers]);
  const results = useMemo(() => getResults(profile), [profile]);

  const citiesPerPage = 6;
 const totalCityPages = Math.ceil(cities.length / citiesPerPage);
 const visibleCities = cities.slice(
   cityPage * citiesPerPage,
   (cityPage + 1) * citiesPerPage
 );

  const handleSelect = (value: number) => {
    if (transitioning) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSubmitted(true);
      }
    }, 240);
  };

  const resetAll = () => {
    setStarted(false);
    setSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
  };

  if (!started) {
    return (
      <main className={styles.root}>
        <div className={styles.landingWrap}>
          <div className={styles.landingLeft}>
            <span className={styles.badge}>城市气质测试</span>
            <h1 className={styles.landingTitle}>
              哪座城市，<br />
              <em className={styles.titleEm}>适合你生活？</em>
            </h1>
            <p className={styles.landingDesc}>
              通过一组关于节奏感、稳定性、社交偏好与自由空间的题目，
              找到与你内在气质更接近的城市。
            </p>
            <div className={styles.btnRow}>
              <button className={styles.btnPrimary} onClick={() => setStarted(true)}>
                开始测试
              </button>
              <span className={styles.btnMeta}>{questions.length} 道题 · 约 4 分钟</span>
            </div>
          </div>
          <div className={styles.cityGridWrap}>
  <div className={styles.cityGrid}>
  {visibleCities.map((city) => (
    <button
      key={city.name}
      type="button"
      className={styles.cityCardSm}
      onClick={() => setSelectedCity(city)}
    >
      <div className={styles.cityNameSm}>{city.name}</div>
      <div className={styles.cityCountrySm}>{city.country}</div>
      <div className={styles.cityTagSm}>{city.tagline}</div>
    </button>
  ))}
</div>

  <div className={styles.cityPager}>
    <button
      type="button"
      className={styles.pageBtn}
      onClick={() => setCityPage((p) => Math.max(p - 1, 0))}
      disabled={cityPage === 0}
    >
      ← 上一页
    </button>

    <span className={styles.pageInfo}>
      第 {cityPage + 1} / {totalCityPages} 页
    </span>

    <button
      type="button"
      className={styles.pageBtn}
      onClick={() => setCityPage((p) => Math.min(p + 1, totalCityPages - 1))}
      disabled={cityPage === totalCityPages - 1}
    >
      下一页 →
    </button>
  </div>
 </div>
</div>

{selectedCity && (
  <div className={styles.modalOverlay} onClick={() => setSelectedCity(null)}>
    <div
      className={styles.modalCard}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={styles.modalClose}
        onClick={() => setSelectedCity(null)}
      >
        ×
      </button>

      <div className={styles.modalContent}>
        <div className={styles.modalCountry}>{selectedCity.country}</div>
        <h2 className={styles.modalTitle}>{selectedCity.name}</h2>
        <div className={styles.modalTagline}>{selectedCity.tagline}</div>
        <p className={styles.modalDesc}>{selectedCity.description}</p>
      </div>
    </div>
  </div>
)}
        
     </main>
    );
  }

  if (submitted) {
    const mainCity = results.top3[0];
    return (
      <main className={styles.root}>
        <div className={styles.resultWrap}>
          <div className={styles.resultHero}>
            <div className={styles.resultLabel}>你的城市画像</div>
            <div className={styles.resultCity}>{mainCity.name}</div>
            <div className={styles.resultCountry}>{mainCity.country}</div>
            <p className={styles.resultSummary}>{getProfileSummary(profile)}</p>
            <span className={styles.matchPill}>匹配度 {getMatchPercent(mainCity.distance)}%</span>
          </div>

          <div className={styles.resultGrid}>
            <div className={styles.resultCard}>
              <div className={styles.cardLabel}>为什么是这里</div>
              <span className={styles.taglinePill}>{mainCity.tagline}</span>
              <p className={styles.cityDesc}>{mainCity.description}</p>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.cardLabel}>你的偏好画像</div>
              <div className={styles.dimList}>
                {(Object.keys(profile) as Dimension[]).map((key) => (
                  <div key={key} className={styles.dimRow}>
                    <div className={styles.dimLabelRow}>
                      <span>{dimensionLabels[key]}</span>
                      <span className={styles.dimScore}>{profile[key]}</span>
                    </div>
                    <div className={styles.dimTrack}>
                      <div
                        className={styles.dimFill}
                        style={{ width: `${(profile[key] / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.sectionRow}>
            <div className={styles.resultCard}>
              <div className={styles.cardLabel}>也很适合你的地方</div>
              {results.top3.slice(1).map((city) => (
                <div key={city.name} className={styles.altCityItem}>
                  <div>
                    <div className={styles.altCityName}>{city.name}</div>
                    <div className={styles.altCityCountry}>{city.country}</div>
                    <div className={styles.altCityTag}>{city.tagline}</div>
                  </div>
                  <div className={styles.altMatch}>{getMatchPercent(city.distance, 68)}%</div>
                </div>
              ))}
            </div>
            <div className={styles.resultCard}>
              <div className={styles.cardLabel}>你可能向往，却未必适合的城市</div>
              <div className={styles.challengeBox}>
                <div className={styles.challengeFlag}>反差城市</div>
                <div className={styles.challengeName}>{results.challenge.name}</div>
                <div className={styles.challengeCountry}>{results.challenge.country}</div>
                <div className={styles.challengeTag}>{results.challenge.tagline}</div>
                <p className={styles.challengeDesc}>{results.challenge.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <button className={styles.btnPrimary} onClick={resetAll}>
              重新测试
            </button>
          </div>
        </div>
      </main>
    );
  }

  const pct = Math.round((currentIndex / questions.length) * 100);

  return (
    <main className={styles.root}>
      <div className={styles.quizWrap}>
        <div className={styles.quizHeader}>
          <span className={styles.badge}>城市气质测试</span>
          <span className={styles.quizPct}>{pct}%</span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>

        <div
          className={styles.questionCard}
          style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.22s ease" }}
        >
          <div className={styles.questionMeta}>
            第 {currentIndex + 1} / {questions.length} 题
          </div>

          {currentQuestion.scene && (
            <div className={styles.scene}>{currentQuestion.scene}</div>
          )}

          <p className={styles.questionText}>{currentQuestion.text}</p>

          <div className={styles.optionsRow}>
            {options.map((opt) => {
              const active = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  className={`${styles.optBtn} ${active ? styles.optBtnActive : ""}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className={styles.optDots}>
                    {Array.from({ length: opt.value }).map((_, i) => (
                      <span key={i} className={styles.dot} />
                    ))}
                  </span>
                  <span className={styles.optLabel}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.quizNav}>
          <button
            className={styles.btnBack}
            onClick={() => currentIndex > 0 && setCurrentIndex((p) => p - 1)}
            disabled={currentIndex === 0}
          >
            ← 上一题
          </button>
          <span className={styles.hintText}>选择后自动进入下一题</span>
        </div>
      </div>
    </main>
  );
}
