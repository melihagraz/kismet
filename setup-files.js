// Kismet Starter Files Setup Script
// Bu dosyayı D:\uygulamalar\kismet klasöründe çalıştır:
// node setup-files.js

const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✅ ' + filePath);
}

// ============================================
// 1. app.json — Expo Config
// ============================================
writeFile('app.json', `
{
  "expo": {
    "name": "Kismet",
    "slug": "kismet",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "kismet",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#0a0a16"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.kismetai.app",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "Kismet uses the camera for coffee cup, palm, and face readings.",
        "NSPhotoLibraryUsageDescription": "Kismet needs access to your photos to read coffee cup images."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#0a0a16"
      },
      "package": "com.kismetai.app"
    },
    "plugins": [
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow Kismet to access your camera for fortune readings."
        }
      ]
    ]
  }
}
`);

// ============================================
// 2. constants/colors.ts
// ============================================
writeFile('constants/colors.ts', `
export const Colors = {
  deep: '#0a0a16',
  accent: '#151528',
  mystical: '#121a35',
  gold: '#d4a574',
  goldLight: '#e8c9a0',
  purple: '#533483',
  star: '#f0e6d3',
  gray: 'rgba(255,255,255,0.4)',
  white: '#ffffff',
  black: '#000000',
  success: '#2ecc71',
  premium: '#a78bfa',
  error: '#e74c3c',
};

export const Gradients = {
  gold: ['#d4a574', '#c4956a'] as const,
  background: ['#0a0a16', '#151528', '#121a35', '#0a0a16'] as const,
  purple: ['#533483', '#3a1f6e'] as const,
  card: ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.01)'] as const,
};
`);

// ============================================
// 3. constants/zodiac.ts
// ============================================
writeFile('constants/zodiac.ts', `
export interface ZodiacSign {
  symbol: string;
  tr: string;
  en: string;
  dates: string;
  monthRange: [number, number, number, number]; // m1, d1, m2, d2
}

export const zodiacSigns: ZodiacSign[] = [
  { symbol: '♈', tr: 'Koç', en: 'Aries', dates: '21 Mar - 19 Apr', monthRange: [3,21,4,19] },
  { symbol: '♉', tr: 'Boğa', en: 'Taurus', dates: '20 Apr - 20 May', monthRange: [4,20,5,20] },
  { symbol: '♊', tr: 'İkizler', en: 'Gemini', dates: '21 May - 20 Jun', monthRange: [5,21,6,20] },
  { symbol: '♋', tr: 'Yengeç', en: 'Cancer', dates: '21 Jun - 22 Jul', monthRange: [6,21,7,22] },
  { symbol: '♌', tr: 'Aslan', en: 'Leo', dates: '23 Jul - 22 Aug', monthRange: [7,23,8,22] },
  { symbol: '♍', tr: 'Başak', en: 'Virgo', dates: '23 Aug - 22 Sep', monthRange: [8,23,9,22] },
  { symbol: '♎', tr: 'Terazi', en: 'Libra', dates: '23 Sep - 22 Oct', monthRange: [9,23,10,22] },
  { symbol: '♏', tr: 'Akrep', en: 'Scorpio', dates: '23 Oct - 21 Nov', monthRange: [10,23,11,21] },
  { symbol: '♐', tr: 'Yay', en: 'Sagittarius', dates: '22 Nov - 21 Dec', monthRange: [11,22,12,21] },
  { symbol: '♑', tr: 'Oğlak', en: 'Capricorn', dates: '22 Dec - 19 Jan', monthRange: [12,22,1,19] },
  { symbol: '♒', tr: 'Kova', en: 'Aquarius', dates: '20 Jan - 18 Feb', monthRange: [1,20,2,18] },
  { symbol: '♓', tr: 'Balık', en: 'Pisces', dates: '19 Feb - 20 Mar', monthRange: [2,19,3,20] },
];

export function getZodiacSign(day: number, month: number): ZodiacSign {
  for (const sign of zodiacSigns) {
    const [m1, d1, m2, d2] = sign.monthRange;
    if (m1 === m2) {
      if (month === m1 && day >= d1 && day <= d2) return sign;
    } else if (m1 > m2) {
      if ((month === m1 && day >= d1) || (month === m2 && day <= d2)) return sign;
    } else {
      if ((month === m1 && day >= d1) || (month === m2 && day <= d2)) return sign;
    }
  }
  return zodiacSigns[0];
}
`);

// ============================================
// 4. constants/tarot.ts
// ============================================
writeFile('constants/tarot.ts', `
export interface TarotCard {
  id: number;
  numeral: string;
  name: { tr: string; en: string };
  meaning: { tr: string; en: string };
  reversedMeaning: { tr: string; en: string };
}

// Major Arcana - İlk 22 kart (MVP için yeterli)
export const tarotCards: TarotCard[] = [
  { id: 0, numeral: '0', name: { tr: 'Deli', en: 'The Fool' }, meaning: { tr: 'Yeni başlangıçlar, macera ve saf potansiyel.', en: 'New beginnings, adventure, and pure potential.' }, reversedMeaning: { tr: 'Tedbirsizlik, risk almaktan kaçınma.', en: 'Recklessness, avoidance of risk.' } },
  { id: 1, numeral: 'I', name: { tr: 'Büyücü', en: 'The Magician' }, meaning: { tr: 'Yaratıcı güçlerin dorukta. Harekete geç.', en: 'Creative powers peak. Take action.' }, reversedMeaning: { tr: 'Manipülasyon, yeteneklerin boşa harcanması.', en: 'Manipulation, wasted talents.' } },
  { id: 2, numeral: 'II', name: { tr: 'Yüksek Rahibe', en: 'The High Priestess' }, meaning: { tr: 'Sezgilerin güçlü. İç sesini dinle.', en: 'Strong intuition. Listen to your inner voice.' }, reversedMeaning: { tr: 'İç sesin bastırılması, yüzeysellik.', en: 'Suppressed inner voice, superficiality.' } },
  { id: 3, numeral: 'III', name: { tr: 'İmparatoriçe', en: 'The Empress' }, meaning: { tr: 'Bolluk, bereket ve yaratıcılık dönemi.', en: 'Abundance, fertility, and creativity.' }, reversedMeaning: { tr: 'Yaratıcı tıkanıklık, bağımlılık.', en: 'Creative block, dependence.' } },
  { id: 4, numeral: 'IV', name: { tr: 'İmparator', en: 'The Emperor' }, meaning: { tr: 'Otorite, yapı ve istikrar.', en: 'Authority, structure, and stability.' }, reversedMeaning: { tr: 'Katılık, kontrol kaybı.', en: 'Rigidity, loss of control.' } },
  { id: 5, numeral: 'V', name: { tr: 'Hierofant', en: 'The Hierophant' }, meaning: { tr: 'Gelenek, bilgelik ve rehberlik.', en: 'Tradition, wisdom, and guidance.' }, reversedMeaning: { tr: 'Dogmatizm, sorgulama ihtiyacı.', en: 'Dogmatism, need to question.' } },
  { id: 6, numeral: 'VI', name: { tr: 'Aşıklar', en: 'The Lovers' }, meaning: { tr: 'Derin bağlantı, uyum ve seçim.', en: 'Deep connection, harmony, and choice.' }, reversedMeaning: { tr: 'Uyumsuzluk, zor seçimler.', en: 'Disharmony, difficult choices.' } },
  { id: 7, numeral: 'VII', name: { tr: 'Savaş Arabası', en: 'The Chariot' }, meaning: { tr: 'Zafer, irade gücü ve kararlılık.', en: 'Victory, willpower, and determination.' }, reversedMeaning: { tr: 'Yön kaybı, kontrol eksikliği.', en: 'Loss of direction, lack of control.' } },
  { id: 8, numeral: 'VIII', name: { tr: 'Güç', en: 'Strength' }, meaning: { tr: 'İç güç, cesaret ve sabır.', en: 'Inner strength, courage, and patience.' }, reversedMeaning: { tr: 'Özgüven eksikliği, zayıflık.', en: 'Self-doubt, weakness.' } },
  { id: 9, numeral: 'IX', name: { tr: 'Ermiş', en: 'The Hermit' }, meaning: { tr: 'İç arayış, yalnızlık ve bilgelik.', en: 'Inner search, solitude, and wisdom.' }, reversedMeaning: { tr: 'İzolasyon, yalnızlık korkusu.', en: 'Isolation, fear of loneliness.' } },
  { id: 10, numeral: 'X', name: { tr: 'Kader Çarkı', en: 'Wheel of Fortune' }, meaning: { tr: 'Dönüm noktası. Evren lehine dönüyor.', en: 'Turning point. Universe turns in your favor.' }, reversedMeaning: { tr: 'Kötü şans, direnç.', en: 'Bad luck, resistance.' } },
  { id: 11, numeral: 'XI', name: { tr: 'Adalet', en: 'Justice' }, meaning: { tr: 'Denge, doğruluk ve adil sonuçlar.', en: 'Balance, truth, and fair outcomes.' }, reversedMeaning: { tr: 'Adaletsizlik, dengesizlik.', en: 'Injustice, imbalance.' } },
  { id: 12, numeral: 'XII', name: { tr: 'Asılan Adam', en: 'The Hanged Man' }, meaning: { tr: 'Yeni bakış açısı, teslim olma ve sabır.', en: 'New perspective, surrender, and patience.' }, reversedMeaning: { tr: 'Erteleme, gereksiz fedakarlık.', en: 'Procrastination, unnecessary sacrifice.' } },
  { id: 13, numeral: 'XIII', name: { tr: 'Ölüm', en: 'Death' }, meaning: { tr: 'Dönüşüm, bitiş ve yeni başlangıç.', en: 'Transformation, ending, and new beginning.' }, reversedMeaning: { tr: 'Değişime direnç, korku.', en: 'Resistance to change, fear.' } },
  { id: 14, numeral: 'XIV', name: { tr: 'Denge', en: 'Temperance' }, meaning: { tr: 'Uyum, sabır ve orta yol.', en: 'Harmony, patience, and moderation.' }, reversedMeaning: { tr: 'Dengesizlik, aşırılık.', en: 'Imbalance, excess.' } },
  { id: 15, numeral: 'XV', name: { tr: 'Şeytan', en: 'The Devil' }, meaning: { tr: 'Bağımlılık, tutku ve gölge benlik.', en: 'Addiction, passion, and shadow self.' }, reversedMeaning: { tr: 'Özgürleşme, zincirleri kırma.', en: 'Liberation, breaking chains.' } },
  { id: 16, numeral: 'XVI', name: { tr: 'Kule', en: 'The Tower' }, meaning: { tr: 'Ani değişim, yıkım ve aydınlanma.', en: 'Sudden change, upheaval, and revelation.' }, reversedMeaning: { tr: 'Değişimden kaçış, iç çalkantı.', en: 'Avoiding change, inner turmoil.' } },
  { id: 17, numeral: 'XVII', name: { tr: 'Yıldız', en: 'The Star' }, meaning: { tr: 'Umut, ilham ve iyileşme zamanı.', en: 'Hope, inspiration, and healing.' }, reversedMeaning: { tr: 'Umutsuzluk, inanç kaybı.', en: 'Hopelessness, loss of faith.' } },
  { id: 18, numeral: 'XVIII', name: { tr: 'Ay', en: 'The Moon' }, meaning: { tr: 'Bilinçaltı mesajlar, sezgi ve gizem.', en: 'Subconscious messages, intuition, mystery.' }, reversedMeaning: { tr: 'Kafa karışıklığı, yanılsama.', en: 'Confusion, illusion.' } },
  { id: 19, numeral: 'XIX', name: { tr: 'Güneş', en: 'The Sun' }, meaning: { tr: 'Başarı, mutluluk ve ışık.', en: 'Success, happiness, and light.' }, reversedMeaning: { tr: 'Geçici başarısızlık, aşırı iyimserlik.', en: 'Temporary setback, over-optimism.' } },
  { id: 20, numeral: 'XX', name: { tr: 'Yargı', en: 'Judgement' }, meaning: { tr: 'Uyanış, yenilenme ve iç çağrı.', en: 'Awakening, renewal, and inner calling.' }, reversedMeaning: { tr: 'Kendini yargılama, pişmanlık.', en: 'Self-judgment, regret.' } },
  { id: 21, numeral: 'XXI', name: { tr: 'Dünya', en: 'The World' }, meaning: { tr: 'Tamamlanma, bütünlük ve başarı.', en: 'Completion, wholeness, and achievement.' }, reversedMeaning: { tr: 'Eksiklik hissi, tamamlanmamış iş.', en: 'Feeling incomplete, unfinished business.' } },
];
`);

// ============================================
// 5. i18n/index.ts
// ============================================
writeFile('i18n/index.ts', `
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import tr from './tr';
import en from './en';

const i18n = new I18n({ tr, en });

const deviceLang = getLocales()[0]?.languageCode ?? 'en';
i18n.locale = deviceLang === 'tr' ? 'tr' : 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
export type LangKey = 'tr' | 'en';
`);

// ============================================
// 6. i18n/tr.ts
// ============================================
writeFile('i18n/tr.ts', `
export default {
  app: {
    name: 'Kismet',
    tagline: 'AI Destekli Fal & Astroloji',
  },
  onboarding: {
    welcomeTitle: 'Kismet seni tanımak istiyor',
    welcomeSub: 'Birkaç soru ile deneyimini kişiselleştirelim',
    start: 'Başlayalım ✦',
    nameQ: 'Sana nasıl hitap edelim?',
    namePlaceholder: 'İsmini yaz...',
    next: 'Devam',
    skip: 'Atla',
    birthQ: 'Doğum tarihin nedir?',
    day: 'Gün',
    month: 'Ay',
    year: 'Yıl',
    youAre: 'Sen bir',
    birthPlaceQ: 'Nerede doğdun?',
    cityPlaceholder: 'Şehir ara...',
    genderQ: 'Cinsiyetin',
    female: 'Kadın',
    male: 'Erkek',
    notSay: 'Belirtmek istemiyorum',
    relationQ: 'İlişki durumun',
    single: 'Bekar',
    inRelation: 'İlişkide',
    married: 'Evli',
    complicated: 'Karmaşık',
    lifeQ: 'Hayatında ne ön planda?',
    love: 'Aşk',
    career: 'Kariyer',
    money: 'Para',
    health: 'Sağlık',
    family: 'Aile',
    growth: 'Kişisel Gelişim',
    interestQ: 'Hangi özellikler ilgini çekiyor?',
    expQ: 'Astroloji deneyimin?',
    newbie: 'Yeniyim',
    some: 'Biraz bilgim var',
    advanced: 'İleri seviye',
    ready: 'Profilin Hazır!',
    readyCta: 'Keşfetmeye Başla ✦',
  },
  modules: {
    coffee: 'Kahve Falı',
    tarot: 'Tarot',
    horoscope: 'Burç',
    dream: 'Rüya Tabiri',
    palmface: 'El & Yüz Falı',
    coffeeDesc: 'Fincanını çek, anında yorumla',
    tarotDesc: 'Kartlarını seç, geleceğini oku',
    horoscopeDesc: 'Günlük kişisel burç yorumun',
    dreamDesc: 'Rüyanı anlat, anlamını keşfet',
    palmfaceDesc: 'Elini veya yüzünü tarat',
  },
  camera: {
    coffeeGuideTitle: 'Fincanını Hazırla',
    coffeeGuide1: 'Kahveni iç ve fincanı ters çevir',
    coffeeGuide2: 'Soğumasını bekle (2-3 dk)',
    coffeeGuide3: 'Fincanı düz çevir ve fotoğrafını çek',
    coffeeGuideTip: 'İyi aydınlatılmış ortamda, fincanın içini yukarıdan çek',
    palmGuideTitle: 'Elini Hazırla',
    palmGuide1: 'Sol elini aç ve avuç içini kameraya döndür',
    palmGuide2: 'Parmaklarını hafifçe aç',
    palmGuide3: 'İyi aydınlatılmış ortamda çek',
    palmGuideTip: 'Çizgilerin net görünmesi için eli düz tut',
    faceGuideTitle: 'Yüzünü Hazırla',
    faceGuide1: 'Yüzünü kameraya doğru tut',
    faceGuide2: 'Saçını yüzünden uzak tut',
    faceGuide3: 'Doğal ışıkta, düz bak',
    faceGuideTip: 'Makyajsız ve gözlüksüz en iyi sonucu verir',
    takePhoto: 'Fotoğraf Çek',
    cameraReady: 'Kamera Hazır',
  },
  common: {
    back: '← Geri',
    next: 'Devam',
    newReading: 'Yeni Okuma',
    free: 'ÜCRETSİZ',
    premium: 'PREMIUM',
    instant: 'ANLIK',
    ai: 'AI',
    analyzing: 'Analiz ediliyor...',
    symbolFound: 'Bulunan Sembol',
    yourReading: 'Yorumun',
    selectSign: 'Burcunu seç',
    todayHoroscope: 'Bugünün Yorumu',
    enterDream: 'Rüyanı anlat...',
    interpret: 'Yorumla',
    interpreting: 'Rüyan yorumlanıyor...',
    selectCards: '3 kart seç',
    reveal: 'Kartları Aç',
    welcome: 'Hoş geldin',
    palmTitle: 'El Falı',
    faceTitle: 'Yüz Analizi',
    scanning: 'Taranıyor...',
  },
};
`);

// ============================================
// 7. i18n/en.ts
// ============================================
writeFile('i18n/en.ts', `
export default {
  app: {
    name: 'Kismet',
    tagline: 'AI-Powered Fortune & Astrology',
  },
  onboarding: {
    welcomeTitle: 'Kismet wants to know you',
    welcomeSub: 'A few questions to personalize your experience',
    start: "Let's Begin ✦",
    nameQ: 'What should we call you?',
    namePlaceholder: 'Enter your name...',
    next: 'Continue',
    skip: 'Skip',
    birthQ: "What's your date of birth?",
    day: 'Day',
    month: 'Month',
    year: 'Year',
    youAre: 'You are a',
    birthPlaceQ: 'Where were you born?',
    cityPlaceholder: 'Search city...',
    genderQ: 'Your gender',
    female: 'Female',
    male: 'Male',
    notSay: 'Prefer not to say',
    relationQ: 'Relationship status',
    single: 'Single',
    inRelation: 'In a relationship',
    married: 'Married',
    complicated: "It's complicated",
    lifeQ: "What's your focus right now?",
    love: 'Love',
    career: 'Career',
    money: 'Money',
    health: 'Health',
    family: 'Family',
    growth: 'Personal Growth',
    interestQ: 'Which features interest you?',
    expQ: 'Your astrology experience?',
    newbie: 'Beginner',
    some: 'Some knowledge',
    advanced: 'Advanced',
    ready: 'Your Profile is Ready!',
    readyCta: 'Start Exploring ✦',
  },
  modules: {
    coffee: 'Coffee Cup',
    tarot: 'Tarot',
    horoscope: 'Horoscope',
    dream: 'Dream',
    palmface: 'Palm & Face',
    coffeeDesc: 'Snap your cup, read instantly',
    tarotDesc: 'Choose cards, read your future',
    horoscopeDesc: 'Your personalized daily horoscope',
    dreamDesc: 'Describe your dream, find its meaning',
    palmfaceDesc: 'Scan your palm or face',
  },
  camera: {
    coffeeGuideTitle: 'Prepare Your Cup',
    coffeeGuide1: 'Drink your coffee and flip the cup upside down',
    coffeeGuide2: 'Wait for it to cool (2-3 min)',
    coffeeGuide3: 'Turn the cup right side up and take a photo',
    coffeeGuideTip: 'Shoot from above in a well-lit area',
    palmGuideTitle: 'Prepare Your Hand',
    palmGuide1: 'Open your left hand, palm facing the camera',
    palmGuide2: 'Slightly spread your fingers',
    palmGuide3: 'Take the photo in good lighting',
    palmGuideTip: 'Keep your hand flat so the lines are clearly visible',
    faceGuideTitle: 'Prepare Your Face',
    faceGuide1: 'Face the camera directly',
    faceGuide2: 'Keep hair away from your face',
    faceGuide3: 'Use natural light, look straight',
    faceGuideTip: 'Best results without makeup or glasses',
    takePhoto: 'Take Photo',
    cameraReady: 'Camera Ready',
  },
  common: {
    back: '← Back',
    next: 'Continue',
    newReading: 'New Reading',
    free: 'FREE',
    premium: 'PREMIUM',
    instant: 'INSTANT',
    ai: 'AI',
    analyzing: 'Analyzing...',
    symbolFound: 'Symbol Found',
    yourReading: 'Your Reading',
    selectSign: 'Select your sign',
    todayHoroscope: "Today's Reading",
    enterDream: 'Describe your dream...',
    interpret: 'Interpret',
    interpreting: 'Interpreting your dream...',
    selectCards: 'Select 3 cards',
    reveal: 'Reveal Cards',
    welcome: 'Welcome',
    palmTitle: 'Palm Reading',
    faceTitle: 'Face Analysis',
    scanning: 'Scanning...',
  },
};
`);

// ============================================
// 8. services/storage.ts
// ============================================
writeFile('services/storage.ts', `
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  PROFILE: '@kismet_profile',
  ONBOARDING_DONE: '@kismet_onboarding_done',
  LANGUAGE: '@kismet_language',
  READINGS_HISTORY: '@kismet_readings',
};

export interface UserProfile {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  city: string;
  gender: string;
  relation: string;
  focus: string[];
  interests: string[];
  experience: string;
}

export const storage = {
  // Profile
  async saveProfile(profile: UserProfile): Promise<void> {
    await AsyncStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  async getProfile(): Promise<UserProfile | null> {
    const data = await AsyncStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  },

  // Onboarding
  async setOnboardingDone(): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_DONE, 'true');
  },

  async isOnboardingDone(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEYS.ONBOARDING_DONE);
    return val === 'true';
  },

  // Language
  async setLanguage(lang: 'tr' | 'en'): Promise<void> {
    await AsyncStorage.setItem(KEYS.LANGUAGE, lang);
  },

  async getLanguage(): Promise<'tr' | 'en' | null> {
    const val = await AsyncStorage.getItem(KEYS.LANGUAGE);
    return val as 'tr' | 'en' | null;
  },

  // Readings history
  async saveReading(reading: any): Promise<void> {
    const history = await this.getReadings();
    history.unshift({ ...reading, date: new Date().toISOString() });
    // Son 100 okumayı tut
    await AsyncStorage.setItem(KEYS.READINGS_HISTORY, JSON.stringify(history.slice(0, 100)));
  },

  async getReadings(): Promise<any[]> {
    const data = await AsyncStorage.getItem(KEYS.READINGS_HISTORY);
    return data ? JSON.parse(data) : [];
  },

  // Reset
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  },
};
`);

// ============================================
// 9. hooks/useProfile.ts
// ============================================
writeFile('hooks/useProfile.ts', `
import { useState, useEffect, useCallback } from 'react';
import { storage, UserProfile } from '../services/storage';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const p = await storage.getProfile();
      setProfile(p);
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = useCallback(async (p: UserProfile) => {
    await storage.saveProfile(p);
    setProfile(p);
    await storage.setOnboardingDone();
  }, []);

  return { profile, loading, saveProfile };
}
`);

// ============================================
// 10. hooks/useLanguage.ts
// ============================================
writeFile('hooks/useLanguage.ts', `
import { useState, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';
import i18n from '../i18n';

export type Lang = 'tr' | 'en';

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(i18n.locale as Lang);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const saved = await storage.getLanguage();
    if (saved) {
      i18n.locale = saved;
      setLangState(saved);
    }
  };

  const setLang = useCallback(async (l: Lang) => {
    i18n.locale = l;
    setLangState(l);
    await storage.setLanguage(l);
  }, []);

  const t = useCallback((key: string) => {
    return i18n.t(key);
  }, [lang]);

  return { lang, setLang, t };
}
`);

// ============================================
// 11. app/_layout.tsx — Root Layout
// ============================================
writeFile('app/_layout.tsx', `
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '../constants/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.deep, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.gold} size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.deep },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}
`);

// ============================================
// 12. app/index.tsx — Entry Point
// ============================================
writeFile('app/index.tsx', `
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { storage } from '../services/storage';
import { Colors } from '../constants/colors';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    const done = await storage.isOnboardingDone();
    setOnboardingDone(done);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.deep, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.gold} size="large" />
      </View>
    );
  }

  if (onboardingDone) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/onboarding/welcome" />;
}
`);

// ============================================
// DONE
// ============================================
console.log('\\n🔮 Tüm starter dosyalar oluşturuldu!');
console.log('\\nSonraki adım: npx expo start --web ile test et');
console.log('(Web modunda kamera çalışmaz ama UI/onboarding test edilebilir)\\n');
