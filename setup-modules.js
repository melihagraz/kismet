// Kismet Modules Setup — Tüm 5 modül
// D:\uygulamalar\kismet klasöründe çalıştır:
// node setup-modules.js

const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✅ ' + filePath);
}

// ============================================
// Pre-generated Horoscope Data (FREE - no API)
// ============================================

writeFile('constants/horoscopes.ts', `
export interface DailyHoroscope {
  tr: string;
  en: string;
}

// Pre-generated günlük yorumlar — batch üretilip DB'ye yazılacak
// Şimdilik 12 burç x 5 yorum havuzu (rotasyon)
export const horoscopePool: Record<string, DailyHoroscope[]> = {
  aries: [
    { tr: 'Bugün enerjin dorukta. Mars\\'ın etkisiyle cesur adımlar atabilirsin. İş hayatında beklenmedik bir fırsat kapını çalabilir. Akşam saatlerinde sosyal çevren canlanacak.', en: 'Your energy peaks today. Mars empowers bold moves. An unexpected career opportunity may knock. Your social circle comes alive in the evening.' },
    { tr: 'Sabırlı ol, bugün her şey planladığın gibi gitmeyebilir. Ama akşama doğru güzel sürprizler seni bekliyor. Finansal konularda temkinli davran.', en: 'Be patient, things may not go as planned today. But pleasant surprises await by evening. Exercise caution with finances.' },
    { tr: 'Venüs aşk hayatını aydınlatıyor. Bekarsan yeni biriyle tanışabilirsin. İlişkideysen romantik bir akşam planla. Yaratıcılığın yüksek.', en: 'Venus illuminates your love life. Singles may meet someone new. Plan a romantic evening if partnered. Creativity runs high.' },
    { tr: 'Jüpiter transit sana şans getiriyor. Eğitim ve seyahat konularında güzel haberler alabilirsin. Yeni bir beceri öğrenmek için harika bir gün.', en: 'Jupiter transit brings luck. Good news about education or travel possible. A great day to learn a new skill.' },
    { tr: 'Bugün iç sesin güçlü. Sezgilerine güven ve büyük kararları ertele. Meditasyon veya doğa yürüyüşü sana iyi gelecek.', en: 'Your inner voice is strong today. Trust your intuition and postpone big decisions. Meditation or a nature walk will do you good.' },
  ],
  taurus: [
    { tr: 'Finansal konularda olumlu gelişmeler var. Uzun süredir beklediğin bir ödeme gelebilir. Akşam sevdiklerinle güzel vakit geçireceksin.', en: 'Positive financial developments ahead. A long-awaited payment may arrive. You\\'ll spend quality time with loved ones tonight.' },
    { tr: 'Bugün pratik zekan ön planda. Karmaşık sorunlara basit çözümler bulacaksın. İş arkadaşlarınla uyumun artıyor.', en: 'Your practical mind shines today. You\\'ll find simple solutions to complex problems. Harmony with colleagues increases.' },
    { tr: 'Sağlığına dikkat et, özellikle beslenme konusunda. Yeni bir diyet veya egzersiz programı başlatmak için iyi bir gün.', en: 'Pay attention to health, especially nutrition. A good day to start a new diet or exercise program.' },
    { tr: 'Ay burucunda ve duygusal derinliğin artıyor. Sanatsal faaliyetler seni mutlu edecek. Müzik dinle, resim yap.', en: 'The Moon is in your sign, deepening emotions. Artistic activities will bring joy. Listen to music, create art.' },
    { tr: 'Kariyer hedeflerinde önemli bir adım atabilirsin. Üstlerinin gözüne giriyorsun. Terfi veya zam haberi gelebilir.', en: 'You may take an important career step. You\\'re impressing superiors. News of promotion or raise possible.' },
  ],
  gemini: [
    { tr: 'İletişim yeteneklerin dorukta. Önemli bir sunum veya görüşme varsa bugün tam günü. Sosyal medyada paylaşımların ilgi görecek.', en: 'Communication skills peak. Perfect day for an important presentation. Your social media posts will get attention.' },
    { tr: 'Merkür\\'ün etkisiyle zihinsel enerjin yüksek. Yeni fikirler üretecek, yaratıcı projeler başlatabileceksin.', en: 'Mercury boosts mental energy. You\\'ll generate new ideas and may start creative projects.' },
    { tr: 'İkili ilişkilerde denge arayışındasın. Partner veya yakın arkadaşınla açık bir konuşma yapmanın zamanı geldi.', en: 'Seeking balance in relationships. Time for an open conversation with your partner or close friend.' },
    { tr: 'Bugün öğrenme kapasiten çok yüksek. Yeni bir kurs, kitap veya podcast keşfet. Bilgi seni güçlendirecek.', en: 'Learning capacity is very high today. Discover a new course, book, or podcast. Knowledge will empower you.' },
    { tr: 'Kısa mesafeli seyahatler şansını artırıyor. Beklenmedik bir davet alabilirsin. Evet de!', en: 'Short trips boost your luck. You may receive an unexpected invitation. Say yes!' },
  ],
  cancer: [
    { tr: 'Ev ve aile konuları ön planda. Evinizde küçük değişiklikler büyük mutluluk getirecek. Annenle veya bir kadın akrabanla güzel haberler.', en: 'Home and family matters take priority. Small changes at home bring great joy. Good news from mother or a female relative.' },
    { tr: 'Duygusal zekan bugün çok güçlü. Başkalarının hislerini kolayca okuyabileceksin. Bu yeteneğini iş hayatında da kullan.', en: 'Emotional intelligence is very strong today. You can easily read others\\' feelings. Use this talent in business too.' },
    { tr: 'Ay\\'ın etkisiyle nostaljik hissedebilirsin. Eski fotoğraflara bak, güzel anıları hatırla. Ama geçmişte takılma, ileri bak.', en: 'The Moon may make you nostalgic. Look at old photos, remember good times. But don\\'t dwell — look forward.' },
    { tr: 'Finansal güvenliğin artıyor. Biriktirme planın meyvelerini vermeye başlıyor. Yatırım fırsatlarını değerlendir.', en: 'Financial security grows. Your savings plan starts bearing fruit. Evaluate investment opportunities.' },
    { tr: 'Bugün şefkatli enerjin çevreni ısıtacak. Yardım ettiğin biri sana beklenmedik bir şekilde karşılık verecek.', en: 'Your compassionate energy warms those around you. Someone you helped will reciprocate unexpectedly.' },
  ],
  leo: [
    { tr: 'Sahne senin! Bugün dikkat çekecek ve takdir toplayacaksın. Liderlik özelliklerini göster, insanlar seni dinleyecek.', en: 'The stage is yours! You\\'ll attract attention and appreciation today. Show leadership — people will listen.' },
    { tr: 'Güneş\\'in gücüyle özgüvenin tavan. Ertelediğin projeleri bugün başlat. Başarı garantili.', en: 'The Sun supercharges your confidence. Start postponed projects today. Success is guaranteed.' },
    { tr: 'Aşk hayatında tutkulu bir dönem başlıyor. Bekarsan etkileyici biriyle karşılaşabilirsin. İlişkideysen ateş yeniden yanıyor.', en: 'A passionate period begins in love. Singles may meet someone impressive. Couples reignite the flame.' },
    { tr: 'Yaratıcı enerjin akıyor. Sanat, müzik, yazarlık — ne ilham veriyorsa ona yönel. Sonuçlar seni şaşırtacak.', en: 'Creative energy flows. Art, music, writing — follow whatever inspires. Results will surprise you.' },
    { tr: 'Cömertliğin takdir görüyor ama sınırlarını koru. Herkese evet demek zorunda değilsin. Önce kendin.', en: 'Your generosity is appreciated but set boundaries. You don\\'t have to say yes to everyone. Yourself first.' },
  ],
  virgo: [
    { tr: 'Detaylara dikkat ettiğin bir gün. Başkalarının kaçırdığı hataları sen bulacaksın. Bu yeteneğin bugün çok değerli.', en: 'A detail-oriented day. You\\'ll catch mistakes others miss. This talent is very valuable today.' },
    { tr: 'Sağlık ve wellness konuları ön planda. Yeni bir rutin başlatmak için mükemmel zamanlama. Vücudunu dinle.', en: 'Health and wellness take priority. Perfect timing to start a new routine. Listen to your body.' },
    { tr: 'İş hayatında verimlilik rekor seviyede. Yapılacaklar listeni hızla tamamlayacaksın. Organizasyon yeteneğin parlıyor.', en: 'Workplace productivity hits record levels. You\\'ll breeze through your to-do list. Organizational skills shine.' },
    { tr: 'Merkür analitik düşünceni güçlendiriyor. Karmaşık verileri anlamlandırabilir, stratejik kararlar alabilirsin.', en: 'Mercury strengthens analytical thinking. You can make sense of complex data and take strategic decisions.' },
    { tr: 'Bugün mütevazı kalmanın ödüllerini göreceksin. Sessizce yaptığın iyilikler fark ediliyor.', en: 'Today you\\'ll see rewards of humility. Your quiet good deeds are being noticed.' },
  ],
  libra: [
    { tr: 'Denge ve uyum bugünün teması. İlişkilerinde adalet duygun ön plana çıkıyor. Arabuluculuk yapabilirsin.', en: 'Balance and harmony are today\\'s theme. Your sense of justice shines in relationships. You may mediate.' },
    { tr: 'Venüs güzellik ve estetik algını güçlendiriyor. Gardırobunu yenile, evini düzenle. Güzel şeyler seni mutlu edecek.', en: 'Venus enhances beauty and aesthetic sense. Refresh your wardrobe, organize home. Beautiful things bring joy.' },
    { tr: 'Sosyal hayatın canlanıyor. Yeni insanlarla tanışma fırsatları var. Networking etkinliklerine katıl.', en: 'Social life picks up. Opportunities to meet new people arise. Attend networking events.' },
    { tr: 'Karar vermekte zorlanabilirsin ama sezgilerine güven. İlk içgüdün genellikle doğru olan.', en: 'You may struggle with decisions but trust intuition. Your first instinct is usually right.' },
    { tr: 'Partnershıp konuları ön planda. İş ortaklığı veya romantik ilişkide önemli bir dönüm noktası.', en: 'Partnership matters take priority. An important turning point in business partnership or romance.' },
  ],
  scorpio: [
    { tr: 'Dönüşüm enerjisi güçlü. Eski alışkanlıklardan kurtulma zamanı. Yeni sen doğuyor.', en: 'Transformation energy is strong. Time to break old habits. A new you is being born.' },
    { tr: 'Plüton sezgilerini derinleştiriyor. Yüzeyin altındakileri görebiliyorsun. Bu güçlü yeteneğini bilgece kullan.', en: 'Pluto deepens intuition. You can see beneath the surface. Use this powerful ability wisely.' },
    { tr: 'Finansal konularda stratejik düşün. Uzun vadeli yatırımlar bugün değerlendirilmeli. Araştırma yap.', en: 'Think strategically about finances. Evaluate long-term investments today. Do research.' },
    { tr: 'Tutkulu enerjin ilişkilerini derinleştiriyor. Yüzeysel konuşmalar yerine anlamlı bağlantılar kur.', en: 'Passionate energy deepens relationships. Build meaningful connections instead of surface conversations.' },
    { tr: 'Gizli bir bilgi ortaya çıkabilir. Şaşırma, bu seni güçlendirecek. Bilgi güçtür.', en: 'Hidden information may surface. Don\\'t be surprised — it will empower you. Knowledge is power.' },
  ],
  sagittarius: [
    { tr: 'Macera ruhu çağırıyor! Yeni yerler keşfet, farklı mutfakları dene. Comfort zone\\'undan çık.', en: 'Adventure calls! Discover new places, try different cuisines. Step out of your comfort zone.' },
    { tr: 'Jüpiter şansını artırıyor. Risk almaktan korkma ama hesaplı ol. Büyük ödüller cesurları bekliyor.', en: 'Jupiter boosts luck. Don\\'t fear risks but be calculated. Big rewards await the brave.' },
    { tr: 'Felsefi düşünceler zihninı meşgul ediyor. Hayatın anlamı üzerine derin sohbetler seni besleyecek.', en: 'Philosophical thoughts occupy your mind. Deep conversations about life\\'s meaning will nourish you.' },
    { tr: 'Eğitim ve öğretim konuları parlıyor. Öğretmen veya öğrenci olarak bugün çok verimli olacaksın.', en: 'Education and teaching shine. Whether teacher or student, you\\'ll be very productive today.' },
    { tr: 'Uluslararası bağlantılar güçleniyor. Yurtdışından bir haber veya fırsat gelebilir.', en: 'International connections strengthen. News or opportunity from abroad may come.' },
  ],
  capricorn: [
    { tr: 'Kariyer hedeflerinde kararlı adımlar atıyorsun. Disiplinin meyvelerini vermeye başlıyor. Devam et.', en: 'Taking determined career steps. Your discipline starts bearing fruit. Keep going.' },
    { tr: 'Satürn yapını güçlendiriyor. Uzun vadeli planların sağlam temeller üzerine kurulu. Sabır anahtar.', en: 'Saturn strengthens your structure. Long-term plans are built on solid foundations. Patience is key.' },
    { tr: 'Bugün otorite figürleriyle iyi ilişkiler kurabilirsin. Mentor veya üstlerinden destek alabilirsin.', en: 'Good relations with authority figures today. You may receive support from mentors or superiors.' },
    { tr: 'Maddi konularda tutumlu yaklaşımın doğru. Gereksiz harcamalardan kaçın, biriktirmeye devam et.', en: 'Your frugal approach to finances is right. Avoid unnecessary spending, keep saving.' },
    { tr: 'Sorumluluklarını yerine getirdikçe içsel huzurun artıyor. Kendine de zaman ayırmayı unutma.', en: 'Inner peace grows as you fulfill responsibilities. Don\\'t forget to make time for yourself.' },
  ],
  aquarius: [
    { tr: 'Yenilikçi fikirlerin bugün dikkat çekecek. Teknoloji ve bilim konularında ilham alıyorsun.', en: 'Innovative ideas attract attention today. You\\'re inspired by technology and science.' },
    { tr: 'Uranüs beklenmedik değişimler getiriyor. Esnekliğini koru, sürprizlere açık ol. İyi şeyler geliyor.', en: 'Uranus brings unexpected changes. Stay flexible, be open to surprises. Good things are coming.' },
    { tr: 'Sosyal sorumluluk projeleri seni çekiyor. Topluma katkıda bulunmak ruhunu besleyecek.', en: 'Social responsibility projects attract you. Contributing to community will nourish your soul.' },
    { tr: 'Arkadaş grubunda lider pozisyonundasın. Organize et, bir araya getir. Enerjin bulaşıcı.', en: 'You\\'re in a leadership position among friends. Organize, bring together. Your energy is contagious.' },
    { tr: 'Bağımsızlığın önemli ama yakınlarını ihmal etme. Sevgi göstermek zayıflık değil, güçtür.', en: 'Independence matters but don\\'t neglect loved ones. Showing love isn\\'t weakness — it\\'s strength.' },
  ],
  pisces: [
    { tr: 'Sezgilerin çok güçlü. Rüyalarına dikkat et, önemli mesajlar içerebilir. Günlük tut.', en: 'Intuition is very strong. Pay attention to dreams — they may contain important messages. Keep a journal.' },
    { tr: 'Neptün yaratıcılığını ateşliyor. Sanat, müzik, şiir — duygularını ifade et. İçindeki sanatçıyı serbest bırak.', en: 'Neptune fires creativity. Art, music, poetry — express emotions. Free the artist within.' },
    { tr: 'Empatik enerjin çevreni iyileştiriyor. Ama başkalarının enerjisini çok emme, kendini koru.', en: 'Empathic energy heals those around you. But don\\'t absorb too much — protect yourself.' },
    { tr: 'Spiritüel gelişim için güçlü bir gün. Meditasyon, yoga veya dua pratiğin derinleşecek.', en: 'A powerful day for spiritual growth. Meditation, yoga, or prayer practice will deepen.' },
    { tr: 'Su elementi enerjin akıyor. Deniz kenarı, havuz veya banyo — su seni yenileyecek ve arındıracak.', en: 'Water element energy flows. Beach, pool, or bath — water will renew and cleanse you.' },
  ],
};

// Burç key mapping
export const zodiacKeyMap: Record<string, string> = {
  '♈': 'aries', '♉': 'taurus', '♊': 'gemini', '♋': 'cancer',
  '♌': 'leo', '♍': 'virgo', '♎': 'libra', '♏': 'scorpio',
  '♐': 'sagittarius', '♑': 'capricorn', '♒': 'aquarius', '♓': 'pisces',
};

export function getDailyHoroscope(zodiacSymbol: string, lang: 'tr' | 'en'): string {
  const key = zodiacKeyMap[zodiacSymbol] || 'aries';
  const pool = horoscopePool[key] || horoscopePool.aries;
  // Güne göre rotasyon (her gün farklı yorum)
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % pool.length;
  return pool[index][lang];
}
`);

// ============================================
// Dream Symbols Database (for keyword matching)
// ============================================

writeFile('constants/dreams.ts', `
export interface DreamSymbol {
  keywords: { tr: string[]; en: string[] };
  meaning: { tr: string; en: string };
  icon: string;
}

export const dreamSymbols: DreamSymbol[] = [
  { keywords: { tr: ['su', 'nehir', 'göl'], en: ['water', 'river', 'lake'] }, meaning: { tr: 'Su, duygusal derinliği simgeler. Berrak su pozitif değişimlere, bulanık su çözülmemiş duygulara işaret eder. İç dünyanızla barışma zamanı.', en: 'Water symbolizes emotional depth. Clear water points to positive changes, murky water to unresolved emotions. Time to reconcile with your inner world.' }, icon: '💧' },
  { keywords: { tr: ['uçmak', 'uçuş', 'kanat'], en: ['flying', 'fly', 'wings'] }, meaning: { tr: 'Uçmak özgürlük arayışını ve sınırları aşma isteğini temsil eder. Yükseklerde uçuyorsanız hedeflerinize yaklaşıyorsunuz.', en: 'Flying represents desire for freedom and transcending limits. Soaring high means you are approaching your goals.' }, icon: '🦋' },
  { keywords: { tr: ['ev', 'bina', 'oda'], en: ['house', 'home', 'room', 'building'] }, meaning: { tr: 'Ev rüyaları iç dünyanızı yansıtır. Yeni ev hayatınızda yeni bir sayfa açılacağına, eski ev geçmişle yüzleşmeye işaret eder.', en: 'House dreams reflect your inner world. A new house signals a fresh chapter; an old house points to confronting the past.' }, icon: '🏠' },
  { keywords: { tr: ['yılan', 'kobra', 'engerek'], en: ['snake', 'serpent', 'cobra'] }, meaning: { tr: 'Yılan dönüşüm ve yenilenmenin güçlü sembolüdür. Korkutucu görünse de hayatınızda köklü bir pozitif değişimin habercisi.', en: 'The snake is a powerful symbol of transformation and renewal. Though frightening, it heralds fundamental positive change.' }, icon: '🐍' },
  { keywords: { tr: ['deniz', 'okyanus', 'dalga'], en: ['ocean', 'sea', 'wave'] }, meaning: { tr: 'Deniz sonsuz olasılıkları simgeler. Sakin deniz iç huzuru, fırtınalı deniz duygusal çalkantıları temsil eder.', en: 'The ocean symbolizes infinite possibilities. Calm seas represent inner peace; stormy seas represent emotional turmoil.' }, icon: '🌊' },
  { keywords: { tr: ['ölüm', 'cenaze', 'mezar'], en: ['death', 'funeral', 'grave'] }, meaning: { tr: 'Ölüm rüyaları genellikle sonu değil, dönüşümü simgeler. Hayatınızda bir dönem sona eriyor, yeni bir başlangıç yakın.', en: 'Death dreams usually symbolize transformation, not endings. A life chapter is closing; a new beginning is near.' }, icon: '🌅' },
  { keywords: { tr: ['bebek', 'çocuk', 'hamile'], en: ['baby', 'child', 'pregnant'] }, meaning: { tr: 'Bebek rüyaları yeni başlangıçları, yaratıcılığı ve içinizdeki masumiyeti temsil eder. Yeni bir proje veya fikir doğmak üzere.', en: 'Baby dreams represent new beginnings, creativity, and inner innocence. A new project or idea is about to be born.' }, icon: '👶' },
  { keywords: { tr: ['düşmek', 'uçurum', 'kayma'], en: ['falling', 'cliff', 'slip'] }, meaning: { tr: 'Düşmek kontrolü kaybetme korkusunu yansıtır. Hayatınızda güvensiz hissettiğiniz bir alan var. Ayaklarınızı yere basın.', en: 'Falling reflects fear of losing control. There is an area of life where you feel insecure. Ground yourself.' }, icon: '⬇️' },
  { keywords: { tr: ['araba', 'tren', 'otobüs', 'uçak'], en: ['car', 'train', 'bus', 'plane'] }, meaning: { tr: 'Taşıtlar hayat yolculuğunuzu simgeler. Sürücü koltuğundaysanız kontroldesiniz; yolcuysanız başkalarının yönlendirmesine açıksınız.', en: 'Vehicles symbolize your life journey. In the driver seat means control; as passenger, you are open to others\\' direction.' }, icon: '🚗' },
  { keywords: { tr: ['para', 'altın', 'mücevher'], en: ['money', 'gold', 'jewel', 'treasure'] }, meaning: { tr: 'Para rüyaları öz değerinizi yansıtır. Bol para bulmak kendinize güvenin arttığını, kaybetmek ise değer kaybı korkusunu gösterir.', en: 'Money dreams reflect self-worth. Finding abundant money shows growing confidence; losing it shows fear of losing value.' }, icon: '💰' },
];

export function interpretDream(text: string, lang: 'tr' | 'en'): { symbol: string; meaning: string; icon: string } | null {
  const lower = text.toLowerCase();
  for (const sym of dreamSymbols) {
    for (const kw of sym.keywords[lang]) {
      if (lower.includes(kw)) {
        return {
          symbol: sym.keywords[lang][0],
          meaning: sym.meaning[lang],
          icon: sym.icon,
        };
      }
    }
  }
  return null;
}
`);

// ============================================
// Palm & Face Reading Data
// ============================================

writeFile('constants/palmface.ts', `
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
  { title: { tr: 'Güçlü Çene Hattı', en: 'Strong Jawline' }, meaning: { tr: 'Kararlılık ve dayanıklılığın göstergesi. Zorluklara karşı dirençlisiniz. Hedeflerinizden kolay vazgeçmezsiniz. Güvenilir bir kişiliğe sahipsiniz.', en: 'Indicator of determination and resilience. You are resistant to challenges. You don\\'t easily give up on goals. You have a trustworthy personality.' }, icon: '💪' },
  { title: { tr: 'Geniş Dudaklar', en: 'Full Lips' }, meaning: { tr: 'Cömert ve sevgi dolu bir yapınız var. İletişim yeteneğiniz güçlü. İnsanlarla kolayca bağ kuruyorsunuz. Hayattan zevk almayı biliyorsunuz.', en: 'You have a generous, loving nature. Strong communication skills. You connect easily with people. You know how to enjoy life.' }, icon: '💋' },
];

export function getRandomReading(type: 'palm' | 'face'): Reading {
  const pool = type === 'palm' ? palmReadings : faceReadings;
  return pool[Math.floor(Math.random() * pool.length)];
}
`);

// ============================================
// MODULE 1: Horoscope (FREE)
// ============================================

writeFile('app/modules/horoscope/index.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { zodiacSigns, getZodiacSign } from '../../../constants/zodiac';
import { getDailyHoroscope } from '../../../constants/horoscopes';
import { useProfile } from '../../../hooks/useProfile';
import TypingText from '../../../components/ui/TypingText';
import KismetButton from '../../../components/ui/KismetButton';
import Badge from '../../../components/ui/Badge';
import i18n from '../../../i18n';

export default function HoroscopeModule() {
  const router = useRouter();
  const { profile } = useProfile();
  const [selectedSign, setSelectedSign] = useState<typeof zodiacSigns[0] | null>(null);
  const [reading, setReading] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  const userZodiac = profile ? getZodiacSign(profile.birthDay, profile.birthMonth) : null;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const selectSign = (sign: typeof zodiacSigns[0]) => {
    setSelectedSign(sign);
    setReading(getDailyHoroscope(sign.symbol, lang));
  };

  if (selectedSign) {
    return (
      <Animated.View style={{ flex: 1, backgroundColor: Colors.deep, padding: 24, paddingTop: 60, alignItems: 'center', opacity: fadeAnim }}>
        <Text style={{ fontSize: 56, marginBottom: 8 }}>{selectedSign.symbol}</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, marginBottom: 4 }}>{selectedSign[lang]}</Text>
        <Text style={{ color: Colors.gray, fontSize: 12, marginBottom: 20 }}>{selectedSign.dates}</Text>
        <View style={{ backgroundColor: 'rgba(212,165,116,0.08)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', maxWidth: 380, marginBottom: 24 }}>
          <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 12, textAlign: 'center' }}>
            {i18n.t('common.todayHoroscope')}
          </Text>
          <TypingText text={reading} speed={18} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
        </View>
        <KismetButton title={i18n.t('common.back')} onPress={() => setSelectedSign(null)} variant="outline" />
      </Animated.View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, alignItems: 'center' }}>
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
          <Text style={{ color: Colors.gold, fontSize: 15, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{i18n.t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 48, marginBottom: 8 }}>✨</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.horoscope')}</Text>
        <Badge type="free" />
        <Text style={{ color: Colors.gray, fontSize: 14, marginBottom: 24, marginTop: 8 }}>{i18n.t('common.selectSign')}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 380 }}>
          {zodiacSigns.map((sign) => {
            const isUser = userZodiac?.symbol === sign.symbol;
            return (
              <TouchableOpacity key={sign.symbol} onPress={() => selectSign(sign)} activeOpacity={0.7}
                style={{ width: 80, paddingVertical: 14, borderRadius: 16, alignItems: 'center', backgroundColor: isUser ? 'rgba(212,165,116,0.12)' : 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: isUser ? Colors.gold : 'rgba(255,255,255,0.06)' }}>
                <Text style={{ fontSize: 28 }}>{sign.symbol}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 11, color: Colors.star, marginTop: 4 }}>{sign[lang]}</Text>
                {isUser && <Text style={{ fontSize: 8, color: Colors.gold, marginTop: 2 }}>⭐ {lang === 'tr' ? 'Sen' : 'You'}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
`);

// ============================================
// MODULE 2: Tarot (PREMIUM)
// ============================================

writeFile('app/modules/tarot/index.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { tarotCards } from '../../../constants/tarot';
import KismetButton from '../../../components/ui/KismetButton';
import Badge from '../../../components/ui/Badge';
import i18n from '../../../i18n';

export default function TarotModule() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);
  const [phase, setPhase] = useState<'select' | 'reading' | 'result'>('select');
  const [revealedIdx, setRevealedIdx] = useState(-1);
  const shuffled = useRef([...tarotCards].sort(() => Math.random() - 0.5));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';
  const positions = lang === 'tr' ? ['Geçmiş', 'Şimdi', 'Gelecek'] : ['Past', 'Present', 'Future'];

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const toggleCard = (i: number) => {
    if (phase !== 'select') return;
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : prev.length < 3 ? [...prev, i] : prev);
  };

  const reveal = () => {
    setPhase('reading');
    let idx = 0;
    const iv = setInterval(() => {
      setRevealedIdx(idx);
      idx++;
      if (idx >= 3) { clearInterval(iv); setTimeout(() => setPhase('result'), 600); }
    }, 800);
  };

  const reset = () => {
    setSelected([]); setPhase('select'); setRevealedIdx(-1);
    shuffled.current = [...tarotCards].sort(() => Math.random() - 0.5);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, alignItems: 'center' }}>
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
          <Text style={{ color: Colors.gold, fontSize: 15, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{i18n.t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 48, marginBottom: 8 }}>🃏</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.tarot')}</Text>
        <Badge type="premium" />

        {phase === 'select' && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: Colors.gray, fontSize: 14, marginBottom: 16 }}>{i18n.t('common.selectCards')} ({selected.length}/3)</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 320 }}>
              {shuffled.current.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => toggleCard(i)} activeOpacity={0.7}
                  style={{ width: 65, height: 95, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: selected.includes(i) ? Colors.gold : 'rgba(255,255,255,0.03)',
                    borderWidth: selected.includes(i) ? 2 : 1, borderColor: selected.includes(i) ? Colors.gold : 'rgba(255,255,255,0.08)',
                    transform: [{ scale: selected.includes(i) ? 1.05 : 1 }] }}>
                  <Text style={{ fontSize: 18, opacity: selected.includes(i) ? 1 : 0.3, color: selected.includes(i) ? Colors.deep : Colors.star }}>✦</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selected.length === 3 && (
              <View style={{ marginTop: 20 }}>
                <KismetButton title={i18n.t('common.reveal')} onPress={reveal} />
              </View>
            )}
          </View>
        )}

        {(phase === 'reading' || phase === 'result') && (
          <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
              {selected.map((cardIdx, i) => {
                const card = shuffled.current[cardIdx];
                const shown = i <= revealedIdx;
                return (
                  <View key={i} style={{ width: 85, alignItems: 'center' }}>
                    <View style={{ width: 85, height: 120, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 6,
                      backgroundColor: shown ? Colors.purple : 'rgba(255,255,255,0.03)',
                      borderWidth: 1, borderColor: shown ? Colors.gold : 'rgba(255,255,255,0.08)',
                      opacity: shown ? 1 : 0.4 }}>
                      {shown ? (
                        <>
                          <Text style={{ fontSize: 12, color: Colors.gold, fontFamily: 'PlayfairDisplay_700Bold' }}>{card.numeral}</Text>
                          <Text style={{ fontSize: 10, color: Colors.star, fontFamily: 'PlayfairDisplay_400Regular', textAlign: 'center', marginTop: 4 }}>{card.name[lang]}</Text>
                        </>
                      ) : <Text style={{ fontSize: 20, opacity: 0.3, color: Colors.star }}>✦</Text>}
                    </View>
                    <Text style={{ fontSize: 10, color: Colors.gold, fontFamily: 'PlayfairDisplay_600SemiBold', marginTop: 6 }}>{positions[i]}</Text>
                  </View>
                );
              })}
            </View>

            {phase === 'result' && (
              <View style={{ width: '100%', maxWidth: 380 }}>
                {selected.map((cardIdx, i) => {
                  const card = shuffled.current[cardIdx];
                  return (
                    <View key={i} style={{ backgroundColor: 'rgba(212,165,116,0.06)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.12)', borderRadius: 14, padding: 14, marginBottom: 10 }}>
                      <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', marginBottom: 4 }}>{positions[i]} — {card.name[lang]}</Text>
                      <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 20, fontFamily: 'PlayfairDisplay_400Regular' }}>{card.meaning[lang]}</Text>
                    </View>
                  );
                })}
                <View style={{ alignItems: 'center', marginTop: 16 }}>
                  <KismetButton title={i18n.t('common.newReading')} onPress={reset} variant="outline" />
                </View>
              </View>
            )}
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}
`);

// ============================================
// MODULE 3: Coffee Cup (PREMIUM + Camera)
// ============================================

writeFile('app/modules/coffee/index.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import KismetButton from '../../../components/ui/KismetButton';
import TypingText from '../../../components/ui/TypingText';
import Badge from '../../../components/ui/Badge';
import i18n from '../../../i18n';

const coffeeReadings = {
  tr: [
    { symbol: 'Kuş', meaning: 'Fincanınızda bir kuş figürü belirdi. Yakında güzel haberler alacaksınız. Uzaklardan bir mesaj yolda. Kuş figürü özgürlüğe ve yeni başlangıçlara işaret ediyor. Hayatınızda yeni kapılar açılacak.', icon: '🕊️' },
    { symbol: 'Kalp', meaning: 'Fincanınızda belirgin bir kalp şekli görünüyor. Aşk hayatınızda önemli gelişmeler var. Duygusal bir yakınlaşma sizi bekliyor. Kalbinizi açık tutun, güzel sürprizler yolda.', icon: '❤️' },
    { symbol: 'Yol', meaning: 'Fincanınızda iki yola ayrılan bir çizgi var. Bir karar zamanı yaklaşıyor. Sezgilerinize güvenin, içinizdeki ses sizi doğru yöne çekecek. Her iki yol da farklı güzellikler sunuyor.', icon: '🛤️' },
    { symbol: 'Ağaç', meaning: 'Kökleri derine inen bir ağaç figürü belirdi. Temelleriniz sağlam, büyümeniz devam ediyor. Kariyer ve kişisel gelişimde verimli bir dönem başlıyor.', icon: '🌳' },
    { symbol: 'Yıldız', meaning: 'Fincanınızda parlak bir yıldız şekli var! Şans sizin yanınızda. Beklemediğiniz bir fırsat kapıda. Cesur adımlar atmanın tam zamanı. Evren sizinle uyum içinde.', icon: '⭐' },
  ],
  en: [
    { symbol: 'Bird', meaning: 'A bird figure appeared in your cup. Good news is on its way from afar. The bird points to freedom and new beginnings. New doors will open in your life.', icon: '🕊️' },
    { symbol: 'Heart', meaning: 'A clear heart shape is visible in your cup. Significant developments await in your love life. An emotional connection is deepening. Keep your heart open to possibilities.', icon: '❤️' },
    { symbol: 'Path', meaning: 'A line splitting into two paths appears in your cup. A decision time approaches. Trust your intuition — your inner voice will guide you. Both paths offer different beauties.', icon: '🛤️' },
    { symbol: 'Tree', meaning: 'A tree with deep roots appeared. Your foundations are strong, growth continues. A fruitful period in career and personal development begins.', icon: '🌳' },
    { symbol: 'Star', meaning: 'A bright star shape is in your cup! Luck is on your side. An unexpected opportunity is at the door. Now is the perfect time for bold moves.', icon: '⭐' },
  ],
};

export default function CoffeeModule() {
  const router = useRouter();
  const [phase, setPhase] = useState<'guide' | 'analyzing' | 'result'>('guide');
  const [reading, setReading] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const startReading = () => {
    setPhase('analyzing');
    setProgress(0);
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + 2; }), 50);
    setTimeout(() => {
      const pool = coffeeReadings[lang];
      setReading(pool[Math.floor(Math.random() * pool.length)]);
      setPhase('result');
    }, 3000);
  };

  const reset = () => { setPhase('guide'); setReading(null); setProgress(0); };

  const guideSteps = lang === 'tr'
    ? ['Kahvenizi için ve fincanı ters çevirin', 'Soğumasını bekleyin (2-3 dk)', 'Fincanı düz çevirip fotoğrafını çekin']
    : ['Drink your coffee and flip the cup', 'Wait for it to cool (2-3 min)', 'Turn it right side up and take a photo'];
  const guideTip = lang === 'tr' ? 'İyi aydınlatılmış ortamda, fincanın içini yukarıdan çekin' : 'Shoot from above in a well-lit area';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, alignItems: 'center', minHeight: '100%' }}>
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
          <Text style={{ color: Colors.gold, fontSize: 15, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{i18n.t('common.back')}</Text>
        </TouchableOpacity>

        {phase === 'guide' && (
          <View style={{ alignItems: 'center', maxWidth: 360 }}>
            <Text style={{ fontSize: 64, marginBottom: 12 }}>☕</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.coffee')}</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginBottom: 20 }}><Badge type="premium" /><Badge type="instant" /></View>

            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 18, color: Colors.star, marginBottom: 16 }}>
              {lang === 'tr' ? 'Fincanını Hazırla' : 'Prepare Your Cup'}
            </Text>
            {guideSteps.map((step, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14, width: '100%' }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: Colors.deep, fontSize: 14, fontWeight: '800' }}>{i + 1}</Text>
                </View>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular', flex: 1, lineHeight: 22 }}>{step}</Text>
              </View>
            ))}
            <View style={{ backgroundColor: 'rgba(212,165,116,0.08)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.15)', borderRadius: 12, padding: 12, marginBottom: 24, width: '100%' }}>
              <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_400Regular' }}>💡 {guideTip}</Text>
            </View>
            <KismetButton title={'📸 ' + i18n.t('camera.takePhoto')} onPress={startReading} />
          </View>
        )}

        {phase === 'analyzing' && (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>☕</Text>
            <Text style={{ color: Colors.goldLight, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 16 }}>{i18n.t('common.analyzing')}</Text>
            <View style={{ width: 200, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <View style={{ width: progress + '%', height: '100%', backgroundColor: Colors.gold, borderRadius: 2 }} />
            </View>
          </View>
        )}

        {phase === 'result' && reading && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>{reading.icon}</Text>
            <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 4 }}>{i18n.t('common.symbolFound')}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, marginBottom: 16 }}>{reading.symbol}</Text>
            <View style={{ backgroundColor: 'rgba(212,165,116,0.07)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', marginBottom: 24 }}>
              <TypingText text={reading.meaning} speed={18} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
            </View>
            <KismetButton title={i18n.t('common.newReading')} onPress={reset} variant="outline" />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}
`);

// ============================================
// MODULE 4: Dream Interpretation (PREMIUM)
// ============================================

writeFile('app/modules/dream/index.tsx', `
import { View, Text, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { interpretDream } from '../../../constants/dreams';
import KismetButton from '../../../components/ui/KismetButton';
import TypingText from '../../../components/ui/TypingText';
import Badge from '../../../components/ui/Badge';
import i18n from '../../../i18n';

export default function DreamModule() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'input' | 'interpreting' | 'result'>('input');
  const [result, setResult] = useState<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const interpret = () => {
    if (!text.trim()) return;
    setPhase('interpreting');
    setTimeout(() => {
      const found = interpretDream(text, lang);
      setResult(found || {
        symbol: lang === 'tr' ? 'Genel Yorum' : 'General Interpretation',
        meaning: lang === 'tr'
          ? 'Rüyanız bilinçaltınızın aktif olduğunu gösteriyor. Geçmiş deneyimleriniz ve gelecek beklentileriniz rüyanıza yansımış. İç huzurunuza odaklanmanız gereken bir dönemdesiniz. Meditasyon ve günlük tutmak size yardımcı olacaktır.'
          : 'Your dream shows an active subconscious. Past experiences and future expectations have reflected in your dream. You are in a period where you should focus on inner peace. Meditation and journaling will help.',
        icon: '🔮',
      });
      setPhase('result');
    }, 2500);
  };

  const reset = () => { setText(''); setPhase('input'); setResult(null); };

  const keywords = lang === 'tr' ? 'su, uçmak, ev, yılan, deniz, ölüm, bebek, düşmek, araba, para' : 'water, flying, house, snake, ocean, death, baby, falling, car, money';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, alignItems: 'center', minHeight: '100%' }}>
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
          <Text style={{ color: Colors.gold, fontSize: 15, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{i18n.t('common.back')}</Text>
        </TouchableOpacity>

        {phase === 'input' && (
          <View style={{ alignItems: 'center', width: '100%', maxWidth: 380 }}>
            <Text style={{ fontSize: 56, marginBottom: 12 }}>🌙</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.dream')}</Text>
            <Badge type="premium" />
            <TextInput value={text} onChangeText={setText} placeholder={i18n.t('common.enterDream')}
              placeholderTextColor="rgba(240,230,211,0.3)" multiline
              style={{ width: '100%', minHeight: 120, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212,165,116,0.2)', backgroundColor: 'rgba(255,255,255,0.04)', color: Colors.star, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular', lineHeight: 22, textAlignVertical: 'top', marginTop: 20 }} />
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 8, marginBottom: 20, textAlign: 'center' }}>
              {lang === 'tr' ? 'Anahtar kelimeler: ' : 'Keywords: '}{keywords}
            </Text>
            <KismetButton title={i18n.t('common.interpret')} onPress={interpret} disabled={!text.trim()} />
          </View>
        )}

        {phase === 'interpreting' && (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>🌙</Text>
            <Text style={{ color: Colors.goldLight, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{i18n.t('common.interpreting')}</Text>
          </View>
        )}

        {phase === 'result' && result && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>{result.icon}</Text>
            <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 4 }}>{i18n.t('common.symbolFound')}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 16, textTransform: 'capitalize' }}>{result.symbol}</Text>
            <View style={{ backgroundColor: 'rgba(212,165,116,0.07)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', marginBottom: 24 }}>
              <TypingText text={result.meaning} speed={18} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
            </View>
            <KismetButton title={i18n.t('common.newReading')} onPress={reset} variant="outline" />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}
`);

// ============================================
// MODULE 5: Palm & Face (PREMIUM + Camera)
// ============================================

writeFile('app/modules/palmface/index.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { getRandomReading } from '../../../constants/palmface';
import KismetButton from '../../../components/ui/KismetButton';
import TypingText from '../../../components/ui/TypingText';
import Badge from '../../../components/ui/Badge';
import i18n from '../../../i18n';

export default function PalmFaceModule() {
  const router = useRouter();
  const [mode, setMode] = useState<'palm' | 'face' | null>(null);
  const [phase, setPhase] = useState<'choose' | 'guide' | 'scanning' | 'result'>('choose');
  const [reading, setReading] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const startScan = (type: 'palm' | 'face') => {
    setMode(type);
    setPhase('guide');
  };

  const startAnalysis = () => {
    setPhase('scanning');
    setProgress(0);
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + 1.5; }), 40);
    setTimeout(() => {
      const r = getRandomReading(mode!);
      setReading(r);
      setPhase('result');
    }, 3000);
  };

  const reset = () => { setMode(null); setPhase('choose'); setReading(null); setProgress(0); };

  const guideConfig = {
    palm: {
      steps: lang === 'tr'
        ? ['Sol elinizi açın, avuç içinizi kameraya döndürün', 'Parmaklarınızı hafifçe açın', 'İyi aydınlatılmış ortamda çekin']
        : ['Open your left hand, palm facing camera', 'Slightly spread your fingers', 'Take photo in good lighting'],
      tip: lang === 'tr' ? 'Çizgilerin net görünmesi için eli düz tutun' : 'Keep hand flat so lines are clearly visible',
      icon: '🤚',
      title: i18n.t('common.palmTitle'),
    },
    face: {
      steps: lang === 'tr'
        ? ['Yüzünüzü kameraya doğru tutun', 'Saçınızı yüzünüzden uzak tutun', 'Doğal ışıkta, düz bakın']
        : ['Face the camera directly', 'Keep hair away from face', 'Use natural light, look straight'],
      tip: lang === 'tr' ? 'Makyajsız ve gözlüksüz en iyi sonucu verir' : 'Best results without makeup or glasses',
      icon: '😊',
      title: i18n.t('common.faceTitle'),
    },
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, alignItems: 'center', minHeight: '100%' }}>
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => phase === 'choose' ? router.back() : reset()} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
          <Text style={{ color: Colors.gold, fontSize: 15, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{i18n.t('common.back')}</Text>
        </TouchableOpacity>

        {phase === 'choose' && (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 56, marginBottom: 12 }}>🖐️</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.palmface')}</Text>
            <Badge type="premium" />
            <View style={{ flexDirection: 'row', gap: 14, marginTop: 28 }}>
              {(['palm', 'face'] as const).map(type => (
                <TouchableOpacity key={type} onPress={() => startScan(type)} activeOpacity={0.7}
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.15)', borderRadius: 20, padding: 28, alignItems: 'center', width: 150 }}>
                  <Text style={{ fontSize: 40, marginBottom: 10 }}>{type === 'palm' ? '🤚' : '😊'}</Text>
                  <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 14, color: Colors.star, marginBottom: 4 }}>{type === 'palm' ? i18n.t('common.palmTitle') : i18n.t('common.faceTitle')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {phase === 'guide' && mode && (
          <View style={{ alignItems: 'center', maxWidth: 360 }}>
            <Text style={{ fontSize: 56, marginBottom: 12 }}>{guideConfig[mode].icon}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: Colors.star, marginBottom: 20 }}>{guideConfig[mode].title}</Text>
            {guideConfig[mode].steps.map((step, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14, width: '100%' }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: Colors.deep, fontSize: 14, fontWeight: '800' }}>{i + 1}</Text>
                </View>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular', flex: 1, lineHeight: 22 }}>{step}</Text>
              </View>
            ))}
            <View style={{ backgroundColor: 'rgba(212,165,116,0.08)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.15)', borderRadius: 12, padding: 12, marginBottom: 24, width: '100%' }}>
              <Text style={{ color: Colors.gold, fontSize: 13 }}>💡 {guideConfig[mode].tip}</Text>
            </View>
            <KismetButton title={'📸 ' + i18n.t('camera.takePhoto')} onPress={startAnalysis} />
          </View>
        )}

        {phase === 'scanning' && (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>{mode === 'palm' ? '🤚' : '😊'}</Text>
            <Text style={{ color: Colors.goldLight, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 16 }}>{i18n.t('common.scanning')}</Text>
            <View style={{ width: 200, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <View style={{ width: progress + '%', height: '100%', backgroundColor: Colors.gold, borderRadius: 2 }} />
            </View>
          </View>
        )}

        {phase === 'result' && reading && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>{reading.icon}</Text>
            <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 4 }}>{mode === 'palm' ? i18n.t('common.palmTitle') : i18n.t('common.faceTitle')}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, marginBottom: 16 }}>{reading.title[lang]}</Text>
            <View style={{ backgroundColor: 'rgba(212,165,116,0.07)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', marginBottom: 24 }}>
              <TypingText text={reading.meaning[lang]} speed={18} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
            </View>
            <KismetButton title={i18n.t('common.newReading')} onPress={reset} variant="outline" />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}
`);

// ============================================
// Update Home screen to navigate to modules
// ============================================

writeFile('app/(tabs)/home.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import { useProfile } from '../../hooks/useProfile';
import Badge from '../../components/ui/Badge';
import i18n from '../../i18n';

const modules = [
  { key: 'coffee', icon: '☕', route: '/modules/coffee', tier: 'premium' as const },
  { key: 'tarot', icon: '🃏', route: '/modules/tarot', tier: 'premium' as const },
  { key: 'horoscope', icon: '✨', route: '/modules/horoscope', tier: 'free' as const },
  { key: 'dream', icon: '🌙', route: '/modules/dream', tier: 'premium' as const },
  { key: 'palmface', icon: '🖐️', route: '/modules/palmface', tier: 'premium' as const },
];

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(Animated.sequence([
      Animated.timing(floatAnim, { toValue: -8, duration: 2000, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Animated.Text style={{ fontSize: 42, marginBottom: 10, transform: [{ translateY: floatAnim }] }}>✦</Animated.Text>
          {profile && (
            <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 15, color: Colors.gold, marginBottom: 6 }}>
              {i18n.t('common.welcome')}, {profile.name}!
            </Text>
          )}
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, textAlign: 'center', lineHeight: 36 }}>
            {lang === 'tr' ? 'Fincandan geleceğe,' : 'From cup to cosmos,'}
          </Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.gold, textAlign: 'center', lineHeight: 36 }}>
            {lang === 'tr' ? 'yapay zeka ile.' : 'powered by AI.'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {modules.map((mod, idx) => {
            const isWide = idx === modules.length - 1 && modules.length % 2 !== 0;
            return (
              <TouchableOpacity key={mod.key} activeOpacity={0.7}
                onPress={() => router.push(mod.route as any)}
                style={{ width: isWide ? '100%' : '47%', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.1)', borderRadius: 20, padding: 24, alignItems: 'center', position: 'relative' }}>
                <Text style={{ fontSize: 36, marginBottom: 10 }}>{mod.icon}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 15, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.' + mod.key)}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 11, color: Colors.gray, textAlign: 'center', lineHeight: 16 }}>{i18n.t('modules.' + mod.key + 'Desc')}</Text>
                <View style={{ position: 'absolute', top: 8, right: 8 }}><Badge type={mod.tier} /></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
`);

console.log('\\n🔮 Tüm 5 modül oluşturuldu!');
console.log('\\n📦 Oluşturulan dosyalar:');
console.log('  - constants/horoscopes.ts (12 burç x 5 pre-generated yorum)');
console.log('  - constants/dreams.ts (10 rüya sembolü + keyword matching)');
console.log('  - constants/palmface.ts (5 el + 5 yüz okuma)');
console.log('  - app/modules/horoscope/index.tsx (FREE)');
console.log('  - app/modules/tarot/index.tsx (PREMIUM)');
console.log('  - app/modules/coffee/index.tsx (PREMIUM + kamera rehber)');
console.log('  - app/modules/dream/index.tsx (PREMIUM)');
console.log('  - app/modules/palmface/index.tsx (PREMIUM + kamera rehber)');
console.log('  - app/(tabs)/home.tsx (güncellenmiş — modüllere navigasyon)');
console.log('\\nŞimdi çalıştır: npx expo start --web\\n');
