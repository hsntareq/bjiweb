type Level = {
  key: string;
  en: string;
  bn: string;
};

export const LEVELS: Level[] = [
  { key: "central", en: "Central", bn: "কেন্দ্রীয়" },
  { key: "city", en: "City/State", bn: "সিটি/স্টেট" },
  { key: "thana", en: "Thana", bn: "থানা" },
  { key: "ward", en: "Ward", bn: "ওয়ার্ড" },
  { key: "unit", en: "Unit", bn: "ইউনিট" },
];

export function getLevelLabel(key: string, locale: "en" | "bn" = "en") {
  const l = LEVELS.find((x) => x.key === key);
  if (!l) return key;
  return (l as any)[locale] || l.en;
}

export function allLevels(locale: "en" | "bn" = "en") {
  return LEVELS.map((l) => ({ key: l.key, label: (l as any)[locale] || l.en }));
}
