export type Ticket = {
  id: number;
  category: "blessing" | "task" | "prank" | "xmas" | "future" | "healing";
  text: string;
};

export const tickets: Ticket[] = [
  // A 祝福 1-8
  { id: 1, category: "blessing", text: "願你今年的努力，都在明年慢慢發芽 🌱" },
  { id: 2, category: "blessing", text: "聖誕快樂，你值得被好好對待 🤍" },
  { id: 3, category: "blessing", text: "願你在寒冷的季節，也有人替你保溫" },
  { id: 4, category: "blessing", text: "今年辛苦了，請對自己溫柔一點" },
  { id: 5, category: "blessing", text: "明年的你，會感謝現在沒有放棄的自己" },
  { id: 6, category: "blessing", text: "世界有點吵，但你可以慢慢走" },
  { id: 7, category: "blessing", text: "願你被理解，也被需要" },
  { id: 8, category: "blessing", text: "所有的好事，都在路上 🎁" },

  // B 任務 9-16
  { id: 9, category: "task", text: "傳一張你最近最喜歡的照片" },
  { id: 10, category: "task", text: "今天請自己喝一杯喜歡的飲料 🧋" },
  { id: 11, category: "task", text: "跟第一個看到你的人說：你今天很好看" },
  { id: 12, category: "task", text: "放下手機 10 分鐘，好好發呆" },
  { id: 13, category: "task", text: "傳一個你最常用的表情符號" },
  { id: 14, category: "task", text: "把今年最開心的一件事寫下來" },
  { id: 15, category: "task", text: "聖誕節當天要對某個人說謝謝" },
  { id: 16, category: "task", text: "這週給自己一個小獎勵" },

  // C 微惡作劇 17-24
  { id: 17, category: "prank", text: "在群組裡用一句話假裝你很有哲學" },
  { id: 18, category: "prank", text: "傳一張『完全沒有意義』的圖片" },
  { id: 19, category: "prank", text: "用貼圖回覆任何訊息一次" },
  { id: 20, category: "prank", text: "假裝今天是你的幸運日" },
  { id: 21, category: "prank", text: "隨機稱讚一個人（不能說漂亮）" },
  { id: 22, category: "prank", text: "把手機桌布換成聖誕主題一天" },
  { id: 23, category: "prank", text: "發一句讓人看不懂但很有自信的話" },
  { id: 24, category: "prank", text: "今天對所有事情都先說：好啊" },

  // D 聖誕限定 25-32
  { id: 25, category: "xmas", text: "你是今晚的小聖誕老人 🎅" },
  { id: 26, category: "xmas", text: "聖誕交換禮物時你會抽到好東西" },
  { id: 27, category: "xmas", text: "今天適合吃甜的，不會胖 🍪" },
  { id: 28, category: "xmas", text: "聖誕夜會有小驚喜" },
  { id: 29, category: "xmas", text: "願你的襪子裝滿好運" },
  { id: 30, category: "xmas", text: "聖誕節可以任性一次" },
  { id: 31, category: "xmas", text: "這個冬天有人會想到你" },
  { id: 32, category: "xmas", text: "聖誕快樂，世界因你多一點光 ✨" },

  // E 未來暗示 33-40
  { id: 33, category: "future", text: "你正在接近一個重要轉變" },
  { id: 34, category: "future", text: "明年會遇到一個讓你安心的人" },
  { id: 35, category: "future", text: "你以為錯過的機會，會用別的形式回來" },
  { id: 36, category: "future", text: "你的選擇正在累積力量" },
  { id: 37, category: "future", text: "很快你會對某件事感到確定" },
  { id: 38, category: "future", text: "有一段關係會變得更清楚" },
  { id: 39, category: "future", text: "你會為自己感到驕傲" },
  { id: 40, category: "future", text: "某個計畫，值得繼續走下去" },

  // F 療癒 41-48
  { id: 41, category: "healing", text: "不用急，你沒有落後" },
  { id: 42, category: "healing", text: "有時候休息也是前進" },
  { id: 43, category: "healing", text: "你不需要對所有人解釋" },
  { id: 44, category: "healing", text: "感受不到快樂，不代表你錯了" },
  { id: 45, category: "healing", text: "你可以慢慢來" },
  { id: 46, category: "healing", text: "有些答案，時間會給" },
  { id: 47, category: "healing", text: "你已經做得比想像中好" },
  { id: 48, category: "healing", text: "今天的你，也值得被擁抱" },
];
