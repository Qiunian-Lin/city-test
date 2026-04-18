// 28道题目
// tags 用于城市匹配评分
// 每道题4个选项，每个选项对应若干城市标签

const QUESTIONS = [
  {
    id: 1,
    tag: "生活节奏",
    text: "清晨，你最理想的醒来方式是？",
    options: [
      { text: "被窗外人声与咖啡香气轻轻唤醒，街道已开始喧嚣", cities: ["tokyo", "newyork", "istanbul", "mexico_city"] },
      { text: "在绝对的安静中自然醒，窗帘外只有鸟鸣与微光", cities: ["reykjavik", "zurich", "kyoto", "oslo"] },
      { text: "赖在床上，阳光斜斜打进来，今天没有任何急事", cities: ["lisbon", "barcelona", "bali", "oaxaca"] },
      { text: "被规律的闹钟叫醒，立刻进入高效模式，日程已在脑中排好", cities: ["singapore", "seoul", "london", "dubai"] }
    ]
  },
  {
    id: 2,
    tag: "饮食哲学",
    text: "如果你只能选择一种饮食文化伴随余生，你会选择？",
    options: [
      { text: "精细、仪式感极强，每道菜都是一次对食材的致敬", cities: ["tokyo", "kyoto", "paris", "zurich"] },
      { text: "热烈、辛辣、多元，街头小吃和市场才是灵魂所在", cities: ["istanbul", "mexico_city", "oaxaca", "bali"] },
      { text: "简单、新鲜、阳光充足，面包、橄榄油和海鲜就够了", cities: ["lisbon", "barcelona", "athens", "dubai"] },
      { text: "前沿、跨界、实验性，米其林星和无国界料理才是追求", cities:["newyork", "london", "singapore", "seoul"] }
    ]
  },
  {
    id: 3,
    tag: "社交模式",
    text: "一个周五夜晚，你最希望是这样度过的：",
    options: [
      { text: "和三五好友待在某个微光昏暗的小酒吧，聊到凌晨", cities: ["lisbon", "reykjavik", "barcelona", "athens"] },
      { text: "换上最好看的衣服，去某个展览或演出开幕式", cities: ["paris", "london", "newyork", "berlin"] },
      { text: "独自逛夜市或街道，在陌生人的喧嚣中感受孤独与自由", cities: ["tokyo", "istanbul", "oaxaca", "bali"] },
      { text: "在家读书或工作，偶尔刷刷新内容，内心很满足", cities: ["oslo", "zurich", "kyoto", "singapore"] }
    ]
  },
  {
    id: 4,
    tag: "空间美学",
    text: "你的理想居住空间是？",
    options: [
      { text: "极简、线条克制、每件物品都有其意义，留白是主角", cities: ["tokyo", "kyoto", "oslo", "zurich"] },
      { text: "层叠、色彩饱满、充满从各地带回的物件与记忆", cities: ["istanbul", "oaxaca", "bali", "mexico_city"] },
      { text: "工业感与艺术感并存，高天花板、裸露砖墙、大型装置", cities: ["berlin", "newyork", "london", "seoul"] },
      { text: "明亮、通透、朝向大海或广阔自然，空间与外界模糊边界", cities: ["lisbon", "reykjavik", "athens", "dubai"] }
    ]
  },
  {
    id: 5,
    tag: "时间感知",
    text: "你如何看待"效率"这件事？",
    options: [
      { text: "效率是一种美德，我厌恶浪费时间，凡事要做到最好最快", cities: ["tokyo", "singapore", "seoul", "zurich"] },
      { text: "节奏应该是有机的，急则急、慢则慢，顺其自然", cities: ["bali", "oaxaca", "lisbon", "athens"] },
      { text: "效率服务于目标，我在乎结果，过程可以灵活", cities: ["newyork", "london", "dubai", "berlin"] },
      { text: "慢生活是一种高级选择，我在乎深度而非速度", cities: ["kyoto", "paris", "reykjavik", "oslo"] }
    ]
  },
  {
    id: 6,
    tag: "自然关系",
    text: "你和自然的关系更像是？",
    options: [
      { text: "自然是我的充电场所，每隔一段时间必须深入山野或海边", cities: ["reykjavik", "oslo", "bali", "zurich"] },
      { text: "我欣赏自然，但更爱自然与城市文明交织的边界地带", cities: ["lisbon", "athens", "istanbul", "kyoto"] },
      { text: "城市本身就是我的自然，人流、光影、建筑是我的森林", cities: ["newyork", "tokyo", "seoul", "london"] },
      { text: "沙漠、戈壁、极端地形——越野性越好", cities: ["dubai", "mexico_city", "oaxaca", "reykjavik"] }
    ]
  },
  {
    id: 7,
    tag: "创造欲望",
    text: "你最渴望的创造性表达是？",
    options: [
      { text: "文字——写作、诗歌、剧本，语言是我的材料", cities: ["paris", "lisbon", "berlin", "oaxaca"] },
      { text: "视觉——摄影、设计、装置，图像是我与世界的对话", cities: ["tokyo", "seoul", "berlin", "newyork"] },
      { text: "音乐或表演，需要观众，需要能量交换", cities: ["istanbul", "barcelona", "london", "mexico_city"] },
      { text: "手工与工艺，陶器、料理、园艺，慢而具体的创作", cities: ["kyoto", "bali", "oaxaca", "zurich"] }
    ]
  },
  {
    id: 8,
    tag: "人际关系",
    text: "对于陌生人，你的第一反应通常是？",
    options: [
      { text: "充满好奇，喜欢主动搭话，旅行中最大收获常是偶遇", cities: ["istanbul", "mexico_city", "oaxaca", "barcelona"] },
      { text: "保持礼貌距离，先观察再决定是否深入", cities: ["tokyo", "london", "singapore", "oslo"] },
      { text: "开放但选择性，我分得清哪些是可以深入的灵魂", cities: ["paris", "berlin", "newyork", "seoul"] },
      { text: "在人群中其实是疏离的，我更喜欢一个人穿越热闹", cities: ["kyoto", "lisbon", "reykjavik", "athens"] }
    ]
  },
  {
    id: 9,
    tag: "消费观",
    text: "你愿意为以下哪类事物花最多的钱？",
    options: [
      { text: "体验——一次难忘的晚餐、一张前排的音乐会门票", cities: ["paris", "tokyo", "newyork", "dubai"] },
      { text: "物件——一件做工精良的器物、一本绝版书、一件设计师作品", cities: ["kyoto", "zurich", "oslo", "berlin"] },
      { text: "旅行——把钱花在移动本身，城市与城市之间的距离", cities: ["lisbon", "singapore", "london", "reykjavik"] },
      { text: "对美好事物的投资是本能，很难只选一类", cities: ["seoul", "istanbul", "barcelona", "oaxaca"] }
    ]
  },
  {
    id: 10,
    tag: "美学倾向",
    text: "以下哪种美学最让你心动？",
    options: [
      { text: "侘寂之美——不完整、短暂、不完美中的深刻", cities: ["kyoto", "lisbon", "reykjavik", "athens"] },
      { text: "摩登都会感——玻璃幕墙、霓虹、速度与密度", cities: ["newyork", "tokyo", "dubai", "singapore"] },
      { text: "历史的厚度——石板路、老建筑、几个世纪的痕迹叠加", cities: ["istanbul", "paris", "athens", "oaxaca"] },
      { text: "设计理性主义——功能即形式，克制中有力量", cities: ["zurich", "berlin", "oslo", "seoul"] }
    ]
  },
  {
    id: 11,
    tag: "气候偏好",
    text: "你最能接受哪种极端气候？",
    options: [
      { text: "极昼极夜，漫长冬季与短暂夏日的强烈对比", cities: ["reykjavik", "oslo", "zurich", "berlin"] },
      { text: "干燥、炎热、太阳永远在头顶", cities: ["dubai", "athens", "oaxaca", "bali"] },
      { text: "潮湿、阴雨、一年中大半时间是灰色天空", cities: ["london", "lisbon", "paris", "tokyo"] },
      { text: "我就要温和、温和、再温和，春秋最好", cities: ["barcelona", "istanbul", "singapore", "seoul"] }
    ]
  },
  {
    id: 12,
    tag: "精神世界",
    text: "精神上，你最认同哪种生存哲学？",
    options: [
      { text: "万物皆流动，接受无常，在当下此刻找到意义", cities: ["bali", "kyoto", "reykjavik", "oaxaca"] },
      { text: "理性是灯塔，系统、逻辑与自律是我信赖的东西", cities: ["zurich", "oslo", "singapore", "berlin"] },
      { text: "感官与激情是存在的核心，活着要有温度与欲望", cities: ["istanbul", "barcelona", "paris", "mexico_city"] },
      { text: "不断突破边界，野心是道德的，成长是终身使命", cities: ["newyork", "london", "seoul", "dubai"] }
    ]
  },
  {
    id: 13,
    tag: "文化态度",
    text: "旅行时，你最感兴趣的是？",
    options: [
      { text: "当地人真实的日常生活，菜市场、理发店、社区广场", cities: ["oaxaca", "istanbul", "bali", "athens"] },
      { text: "博物馆、艺术馆、剧院——文化积累是城市最深的东西", cities: ["paris", "london", "berlin", "newyork"] },
      { text: "建筑与城市肌理，在街道上读一座城市的历史逻辑", cities: ["kyoto", "lisbon", "barcelona", "zurich"] },
      { text: "当地的当代创意场景——画廊、独立音乐、新媒体艺术", cities: ["seoul", "tokyo", "oslo", "reykjavik"] }
    ]
  },
  {
    id: 14,
    tag: "孤独感",
    text: "对于"孤独"，你的真实感受是？",
    options: [
      { text: "孤独是我最喜欢的状态之一，是清醒与创造的温床", cities: ["reykjavik", "kyoto", "oslo", "paris"] },
      { text: "我需要孤独，但也需要被人群包围的时刻，两者缺一不可", cities: ["lisbon", "berlin", "tokyo", "athens"] },
      { text: "孤独让我焦虑，我的能量来自连接与共鸣", cities: ["istanbul", "barcelona", "mexico_city", "bali"] },
      { text: "我可以完全沉浸在城市的匿名感中——人群中最彻底的孤独", cities: ["newyork", "london", "singapore", "seoul"] }
    ]
  },
  {
    id: 15,
    tag: "身份认同",
    text: "你如何定义"成功"？",
    options: [
      { text: "财富与社会地位的可见证明，影响力与资源是成功的货币", cities: ["newyork", "dubai", "london", "singapore"] },
      { text: "深度的专业积累，成为某领域中不可替代的存在", cities: ["tokyo", "zurich", "oslo", "paris"] },
      { text: "自由——能够按自己意志生活，不被任何外在标准定义", cities: ["lisbon", "bali", "oaxaca", "reykjavik"] },
      { text: "创造出了真正打动人的东西，被感受到，被记住", cities: ["berlin", "seoul", "kyoto", "istanbul"] }
    ]
  },
  {
    id: 16,
    tag: "移动欲望",
    text: "你对"根"的态度是？",
    options: [
      { text: "需要根，一个固定的家给我安全感，从那里出发探索", cities: ["tokyo", "zurich", "oslo", "kyoto"] },
      { text: "浅根，随时可以移植，每次重新开始都很兴奋", cities: ["newyork", "singapore", "london", "dubai"] },
      { text: "根在于人，不在于地，只要对的人在，哪里都是家", cities: ["istanbul", "barcelona", "bali", "mexico_city"] },
      { text: "我就是自己的根，流动本身就是我的家", cities: ["lisbon", "reykjavik", "berlin", "oaxaca"] }
    ]
  },
  {
    id: 17,
    tag: "声音景观",
    text: "你最喜欢的城市声音是？",
    options: [
      { text: "远处海浪拍岸，偶尔夹杂海鸥的叫声", cities: ["lisbon", "reykjavik", "athens", "barcelona"] },
      { text: "地铁运行声、人群嗡嗡声、城市机器永不停歇的低鸣", cities: ["newyork", "tokyo", "london", "singapore"] },
      { text: "清晨礼拜的召唤、市场的喧嚣、所有语言交混的噪音", cities: ["istanbul", "oaxaca", "mexico_city", "bali"] },
      { text: "风声、静默，偶尔钟楼报时，宁静到能听见自己心跳", cities: ["kyoto", "zurich", "oslo", "reykjavik"] }
    ]
  },
  {
    id: 18,
    tag: "工作方式",
    text: "你最理想的工作状态是？",
    options: [
      { text: "高压、高速、高回报，我在压力下最有活力", cities: ["newyork", "london", "singapore", "dubai"] },
      { text: "精深、细腻、不追求数量，把一件事做到极致", cities: ["tokyo", "zurich", "kyoto", "oslo"] },
      { text: "创意自由、弹性时间、最好能在咖啡馆或海边工作", cities: ["bali", "lisbon", "berlin", "oaxaca"] },
      { text: "团队协作与创新碰撞，初创氛围与跨界文化", cities: ["seoul", "barcelona", "istanbul", "paris"] }
    ]
  },
  {
    id: 19,
    tag: "历史感",
    text: "对于历史，你的态度更接近？",
    options: [
      { text: "历史是地基，我想生活在有厚度、有记忆的地方", cities: ["istanbul", "paris", "kyoto", "athens"] },
      { text: "历史是灵感源泉，但我更关心当下的创造", cities: ["berlin", "seoul", "oaxaca", "lisbon"] },
      { text: "我对未来更感兴趣，历史可以学习但不必执着", cities: ["newyork", "singapore", "dubai", "reykjavik"] },
      { text: "历史即自然，古老的山川比人类建筑更令我动容", cities: ["oslo", "bali", "zurich", "mexico_city"] }
    ]
  },
  {
    id: 20,
    tag: "夜晚性格",
    text: "夜晚对你来说意味着什么？",
    options: [
      { text: "白天的延续——夜市、夜场、深夜的活力才是真实的城市", cities: ["tokyo", "newyork", "istanbul", "seoul"] },
      { text: "私密时光，用于深度阅读、写作、或与内心对话", cities: ["paris", "oslo", "reykjavik", "zurich"] },
      { text: "放松与放纵——美食、美酒、音乐，享乐是夜晚的主题", cities: ["barcelona", "lisbon", "oaxaca", "bali"] },
      { text: "连接——最好的对话总在深夜，无论线上还是线下", cities: ["london", "berlin", "singapore", "mexico_city"] }
    ]
  },
  {
    id: 21,
    tag: "艺术媒介",
    text: "你认为最能触动你的艺术形式是？",
    options: [
      { text: "文学与诗歌，一本好书能改变一个人的世界观", cities: ["paris", "lisbon", "berlin", "athens"] },
      { text: "当代艺术——装置、行为、概念，冲破视觉的边界", cities: ["newyork", "berlin", "london", "seoul"] },
      { text: "传统工艺与民间艺术，根植于土地与人民的表达", cities: ["kyoto", "oaxaca", "bali", "istanbul"] },
      { text: "电影与音乐，大众媒介才能真正改变文化情绪", cities: ["tokyo", "seoul", "barcelona", "mexico_city"] }
    ]
  },
  {
    id: 22,
    tag: "城市密度",
    text: "你对城市密度的感受是？",
    options: [
      { text: "越密集越好，我爱那种每平方米都充满能量的感觉", cities: ["tokyo", "newyork", "seoul", "singapore"] },
      { text: "适度密集，走路十分钟能到一切，但不至于窒息", cities: ["barcelona", "paris", "lisbon", "istanbul"] },
      { text: "我需要呼吸的空间，城市够用，大自然要近在咫尺", cities: ["zurich", "oslo", "reykjavik", "kyoto"] },
      { text: "宽阔、地广人稀，用空间换自由感", cities: ["dubai", "oaxaca", "bali", "mexico_city"] }
    ]
  },
  {
    id: 23,
    tag: "语言魔力",
    text: "你与语言的关系是？",
    options: [
      { text: "我爱在完全不懂语言的地方生活，被陌生的声音包围", cities: ["tokyo", "bali", "oaxaca", "reykjavik"] },
      { text: "语言是融入的关键，我希望用当地语言生活", cities: ["paris", "lisbon", "barcelona", "istanbul"] },
      { text: "英语为母语或工作语言的地方让我更自如", cities: ["london", "newyork", "singapore", "dubai"] },
      { text: "语言不重要，音乐与食物才是真正的通用语", cities: ["mexico_city", "athens", "berlin", "kyoto"] }
    ]
  },
  {
    id: 24,
    tag: "身体感知",
    text: "你的身体最喜欢哪种城市运动方式？",
    options: [
      { text: "漫无目的地步行，没有目标地在街道中游荡数小时", cities: ["lisbon", "paris", "istanbul", "athens"] },
      { text: "骑行——用自行车感受城市的风和节奏", cities: ["oslo", "berlin", "zurich", "amsterdam"] },
      { text: "跑步——清晨沿着海边或公园，快节奏的冥想", cities: ["reykjavik", "singapore", "london", "barcelona"] },
      { text: "冲浪、潜水、登山——城市是出发点，极限是目的地", cities: ["bali", "oaxaca", "reykjavik", "lisbon"] }
    ]
  },
  {
    id: 25,
    tag: "集体记忆",
    text: "你希望在一座城市里获得什么样的归属感？",
    options: [
      { text: "成为某个次文化社群的一员，有自己的暗语、场所、仪式", cities: ["berlin", "tokyo", "newyork", "seoul"] },
      { text: "被街坊邻居认识，菜市场的老板知道我要什么", cities: ["oaxaca", "istanbul", "bali", "athens"] },
      { text: "在这座城市中成为隐形人，用匿名感换取最大自由", cities: ["london", "paris", "singapore", "lisbon"] },
      { text: "这座城市的天际线属于我，我是这里不可分割的一部分", cities: ["newyork", "dubai", "tokyo", "barcelona"] }
    ]
  },
  {
    id: 26,
    tag: "黄昏时刻",
    text: "最完美的黄昏应该在哪里度过？",
    options: [
      { text: "海边，太阳落入地平线，余光染红海面", cities: ["lisbon", "athens", "bali", "barcelona"] },
      { text: "在某栋高楼顶层，俯瞰整座城市开始亮灯", cities: ["newyork", "tokyo", "dubai", "seoul"] },
      { text: "森林或山丘，一个人，安静地目送白天消失", cities: ["reykjavik", "oslo", "zurich", "kyoto"] },
      { text: "老城区的某个广场或市场，人群的温度是最好的黄昏", cities: ["istanbul", "oaxaca", "mexico_city", "paris"] }
    ]
  },
  {
    id: 27,
    tag: "生命意义",
    text: "你认为一座城市最重要的品质是？",
    options: [
      { text: "它能让你感到被激励——每天都有新的可能性", cities: ["newyork", "london", "seoul", "berlin"] },
      { text: "它允许你慢下来，并不为慢而感到羞耻", cities: ["kyoto", "lisbon", "bali", "oaxaca"] },
      { text: "它让你感到安全与有序，生活是可预期的", cities: ["zurich", "singapore", "oslo", "tokyo"] },
      { text: "它有灵魂——无法言说，但你一踏上它就感受得到", cities: ["istanbul", "paris", "athens", "reykjavik"] }
    ]
  },
  {
    id: 28,
    tag: "终极想象",
    text: "十年后，你最希望自己的生活状态是？",
    options: [
      { text: "在一个国际化的大城市中叱咤风云，拥有真实的影响力", cities: ["newyork", "london", "singapore", "dubai"] },
      { text: "在一座小而精的城市里深耕，成为某个领域不可忽视的存在", cities: ["kyoto", "zurich", "oslo", "lisbon"] },
      { text: "在某个充满温度的地方过着知足而自由的生活，时间是自己的", cities: ["bali", "oaxaca", "reykjavik", "athens"] },
      { text: "在创意与文化激荡的城市里，持续地创作与对话", cities: ["berlin", "paris", "seoul", "istanbul"] }
    ]
  }
];
