export interface Reading {
  title: { tr: string; en: string };
  meaning: { tr: string; en: string };
  icon: string;
}

export const palmReadings: Reading[] = [
  { title: { tr: 'Yaşam Çizgisi', en: 'Life Line' }, meaning: { tr: 'Yaşam çizginiz derin ve belirgin. Güçlü bir yaşam enerjiniz var. Uzun ve sağlıklı bir ömrün işaretleri görünüyor. Değişimlere kolayca uyum sağlıyorsunuz. Hayatınızda birkaç önemli dönüm noktası var.', en: 'Your life line is deep and prominent. You possess strong life energy. Signs of a long, healthy life are visible. You adapt easily to changes. Several important turning points exist in your life.' }, icon: '🖐️' },
  { title: { tr: 'Kalp Çizgisi', en: 'Heart Line' }, meaning: { tr: 'Kalp çizginiz yukarı doğru kıvrılmış, bu duygusal zenginlik ve tutku işareti. İlişkilerinizde sadık ama bağımsızlığınıza düşkünsünüz. Derin bağlar kurmayı tercih ediyorsunuz.', en: 'Your heart line curves upward, a sign of emotional richness and passion. Loyal in relationships but value your independence. You prefer building deep connections.' }, icon: '💕' },
  { title: { tr: 'Akıl Çizgisi', en: 'Head Line' }, meaning: { tr: 'Akıl çizginiz uzun ve net. Analitik düşünce yapınız güçlü, karmaşık sorunları kolayca çözebiliyorsunuz. Hem mantıksal hem yaratıcı tarafınız dengeli.', en: 'Your head line is long and clear. Strong analytical thinking, you solve complex problems easily. Both logical and creative sides are balanced.' }, icon: '🧠' },
  { title: { tr: 'Kader Çizgisi', en: 'Fate Line' }, meaning: { tr: 'Kader çizginiz kesintisiz ve net. Kariyerinizde kararlı adımlarla ilerliyorsunuz. Hedeflerinize ulaşmak için gerekli azim ve disipline sahipsiniz.', en: 'Your fate line is unbroken and clear. You advance with determination in your career. You possess the perseverance and discipline to reach your goals.' }, icon: '✨' },
  { title: { tr: 'Güneş Çizgisi', en: 'Sun Line' }, meaning: { tr: 'Güneş çizginiz belirgin, bu şöhret ve başarı potansiyelini gösteriyor. Yaratıcı yetenekleriniz takdir görecek. Karizmatik bir auranız var.', en: 'Your sun line is prominent, showing potential for fame and success. Creative talents will be appreciated. You have a charismatic aura.' }, icon: '☀️' },
];

export const faceReadings: Reading[] = [
  { title: { tr: 'Geniş Alın', en: 'Broad Forehead' }, meaning: { tr: 'Analitik düşünce yapısı ve güçlü zihinsel kapasite. Stratejik planlama yeteneğiniz gelişmiş. Liderlik potansiyeliniz yüksek. Vizyon sahibisiniz.', en: 'Analytical mind and strong mental capacity. Advanced strategic planning skills. High leadership potential. You are a visionary.' }, icon: '🧠' },
  { title: { tr: 'Belirgin Elmacık Kemikleri', en: 'Prominent Cheekbones' }, meaning: { tr: 'Sosyal ve karizmatik bir enerjiniz var. İnsanları etkileme ve bir araya getirme yeteneğiniz güçlü. Diplomatik kişiliğiniz ön plana çıkıyor.', en: 'You radiate social and charismatic energy. Strong ability to influence and bring people together. Diplomatic personality shines.' }, icon: '✨' },
  { title: { tr: 'Derin Gözler', en: 'Deep-Set Eyes' }, meaning: { tr: 'İç gözlem yeteneğiniz çok gelişmiş. Sezgileriniz güçlü, insanları okumada başarılısınız. Duygusal derinliğiniz ilişkilerinize yansıyor.', en: 'Highly developed introspective ability. Strong intuition, skilled at reading people. Emotional depth reflects in relationships.' }, icon: '👁️' },
  { title: { tr: 'Güçlü Çene Hattı', en: 'Strong Jawline' }, meaning: { tr: 'Kararlılık ve dayanıklılığın göstergesi. Zorluklara karşı dirençlisiniz. Hedeflerinizden kolay vazgeçmezsiniz. Güvenilir bir kişiliğe sahipsiniz.', en: 'Indicator of determination and resilience. You are resistant to challenges. You don\'t easily give up on goals. You have a trustworthy personality.' }, icon: '💪' },
  { title: { tr: 'Geniş Dudaklar', en: 'Full Lips' }, meaning: { tr: 'Cömert ve sevgi dolu bir yapınız var. İletişim yeteneğiniz güçlü. İnsanlarla kolayca bağ kuruyorsunuz. Hayattan zevk almayı biliyorsunuz.', en: 'You have a generous, loving nature. Strong communication skills. You connect easily with people. You know how to enjoy life.' }, icon: '💋' },
];

export function getRandomReading(type: 'palm' | 'face'): Reading {
  const pool = type === 'palm' ? palmReadings : faceReadings;
  return pool[Math.floor(Math.random() * pool.length)];
}
