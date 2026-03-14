export interface DailyHoroscope {
  tr: string;
  en: string;
}

// Pre-generated günlük yorumlar — batch üretilip DB'ye yazılacak
// Şimdilik 12 burç x 5 yorum havuzu (rotasyon)
export const horoscopePool: Record<string, DailyHoroscope[]> = {
  aries: [
    { tr: 'Bugün enerjin dorukta. Mars\'ın etkisiyle cesur adımlar atabilirsin. İş hayatında beklenmedik bir fırsat kapını çalabilir. Akşam saatlerinde sosyal çevren canlanacak.', en: 'Your energy peaks today. Mars empowers bold moves. An unexpected career opportunity may knock. Your social circle comes alive in the evening.' },
    { tr: 'Sabırlı ol, bugün her şey planladığın gibi gitmeyebilir. Ama akşama doğru güzel sürprizler seni bekliyor. Finansal konularda temkinli davran.', en: 'Be patient, things may not go as planned today. But pleasant surprises await by evening. Exercise caution with finances.' },
    { tr: 'Venüs aşk hayatını aydınlatıyor. Bekarsan yeni biriyle tanışabilirsin. İlişkideysen romantik bir akşam planla. Yaratıcılığın yüksek.', en: 'Venus illuminates your love life. Singles may meet someone new. Plan a romantic evening if partnered. Creativity runs high.' },
    { tr: 'Jüpiter transit sana şans getiriyor. Eğitim ve seyahat konularında güzel haberler alabilirsin. Yeni bir beceri öğrenmek için harika bir gün.', en: 'Jupiter transit brings luck. Good news about education or travel possible. A great day to learn a new skill.' },
    { tr: 'Bugün iç sesin güçlü. Sezgilerine güven ve büyük kararları ertele. Meditasyon veya doğa yürüyüşü sana iyi gelecek.', en: 'Your inner voice is strong today. Trust your intuition and postpone big decisions. Meditation or a nature walk will do you good.' },
  ],
  taurus: [
    { tr: 'Finansal konularda olumlu gelişmeler var. Uzun süredir beklediğin bir ödeme gelebilir. Akşam sevdiklerinle güzel vakit geçireceksin.', en: 'Positive financial developments ahead. A long-awaited payment may arrive. You\'ll spend quality time with loved ones tonight.' },
    { tr: 'Bugün pratik zekan ön planda. Karmaşık sorunlara basit çözümler bulacaksın. İş arkadaşlarınla uyumun artıyor.', en: 'Your practical mind shines today. You\'ll find simple solutions to complex problems. Harmony with colleagues increases.' },
    { tr: 'Sağlığına dikkat et, özellikle beslenme konusunda. Yeni bir diyet veya egzersiz programı başlatmak için iyi bir gün.', en: 'Pay attention to health, especially nutrition. A good day to start a new diet or exercise program.' },
    { tr: 'Ay burucunda ve duygusal derinliğin artıyor. Sanatsal faaliyetler seni mutlu edecek. Müzik dinle, resim yap.', en: 'The Moon is in your sign, deepening emotions. Artistic activities will bring joy. Listen to music, create art.' },
    { tr: 'Kariyer hedeflerinde önemli bir adım atabilirsin. Üstlerinin gözüne giriyorsun. Terfi veya zam haberi gelebilir.', en: 'You may take an important career step. You\'re impressing superiors. News of promotion or raise possible.' },
  ],
  gemini: [
    { tr: 'İletişim yeteneklerin dorukta. Önemli bir sunum veya görüşme varsa bugün tam günü. Sosyal medyada paylaşımların ilgi görecek.', en: 'Communication skills peak. Perfect day for an important presentation. Your social media posts will get attention.' },
    { tr: 'Merkür\'ün etkisiyle zihinsel enerjin yüksek. Yeni fikirler üretecek, yaratıcı projeler başlatabileceksin.', en: 'Mercury boosts mental energy. You\'ll generate new ideas and may start creative projects.' },
    { tr: 'İkili ilişkilerde denge arayışındasın. Partner veya yakın arkadaşınla açık bir konuşma yapmanın zamanı geldi.', en: 'Seeking balance in relationships. Time for an open conversation with your partner or close friend.' },
    { tr: 'Bugün öğrenme kapasiten çok yüksek. Yeni bir kurs, kitap veya podcast keşfet. Bilgi seni güçlendirecek.', en: 'Learning capacity is very high today. Discover a new course, book, or podcast. Knowledge will empower you.' },
    { tr: 'Kısa mesafeli seyahatler şansını artırıyor. Beklenmedik bir davet alabilirsin. Evet de!', en: 'Short trips boost your luck. You may receive an unexpected invitation. Say yes!' },
  ],
  cancer: [
    { tr: 'Ev ve aile konuları ön planda. Evinizde küçük değişiklikler büyük mutluluk getirecek. Annenle veya bir kadın akrabanla güzel haberler.', en: 'Home and family matters take priority. Small changes at home bring great joy. Good news from mother or a female relative.' },
    { tr: 'Duygusal zekan bugün çok güçlü. Başkalarının hislerini kolayca okuyabileceksin. Bu yeteneğini iş hayatında da kullan.', en: 'Emotional intelligence is very strong today. You can easily read others\' feelings. Use this talent in business too.' },
    { tr: 'Ay\'ın etkisiyle nostaljik hissedebilirsin. Eski fotoğraflara bak, güzel anıları hatırla. Ama geçmişte takılma, ileri bak.', en: 'The Moon may make you nostalgic. Look at old photos, remember good times. But don\'t dwell — look forward.' },
    { tr: 'Finansal güvenliğin artıyor. Biriktirme planın meyvelerini vermeye başlıyor. Yatırım fırsatlarını değerlendir.', en: 'Financial security grows. Your savings plan starts bearing fruit. Evaluate investment opportunities.' },
    { tr: 'Bugün şefkatli enerjin çevreni ısıtacak. Yardım ettiğin biri sana beklenmedik bir şekilde karşılık verecek.', en: 'Your compassionate energy warms those around you. Someone you helped will reciprocate unexpectedly.' },
  ],
  leo: [
    { tr: 'Sahne senin! Bugün dikkat çekecek ve takdir toplayacaksın. Liderlik özelliklerini göster, insanlar seni dinleyecek.', en: 'The stage is yours! You\'ll attract attention and appreciation today. Show leadership — people will listen.' },
    { tr: 'Güneş\'in gücüyle özgüvenin tavan. Ertelediğin projeleri bugün başlat. Başarı garantili.', en: 'The Sun supercharges your confidence. Start postponed projects today. Success is guaranteed.' },
    { tr: 'Aşk hayatında tutkulu bir dönem başlıyor. Bekarsan etkileyici biriyle karşılaşabilirsin. İlişkideysen ateş yeniden yanıyor.', en: 'A passionate period begins in love. Singles may meet someone impressive. Couples reignite the flame.' },
    { tr: 'Yaratıcı enerjin akıyor. Sanat, müzik, yazarlık — ne ilham veriyorsa ona yönel. Sonuçlar seni şaşırtacak.', en: 'Creative energy flows. Art, music, writing — follow whatever inspires. Results will surprise you.' },
    { tr: 'Cömertliğin takdir görüyor ama sınırlarını koru. Herkese evet demek zorunda değilsin. Önce kendin.', en: 'Your generosity is appreciated but set boundaries. You don\'t have to say yes to everyone. Yourself first.' },
  ],
  virgo: [
    { tr: 'Detaylara dikkat ettiğin bir gün. Başkalarının kaçırdığı hataları sen bulacaksın. Bu yeteneğin bugün çok değerli.', en: 'A detail-oriented day. You\'ll catch mistakes others miss. This talent is very valuable today.' },
    { tr: 'Sağlık ve wellness konuları ön planda. Yeni bir rutin başlatmak için mükemmel zamanlama. Vücudunu dinle.', en: 'Health and wellness take priority. Perfect timing to start a new routine. Listen to your body.' },
    { tr: 'İş hayatında verimlilik rekor seviyede. Yapılacaklar listeni hızla tamamlayacaksın. Organizasyon yeteneğin parlıyor.', en: 'Workplace productivity hits record levels. You\'ll breeze through your to-do list. Organizational skills shine.' },
    { tr: 'Merkür analitik düşünceni güçlendiriyor. Karmaşık verileri anlamlandırabilir, stratejik kararlar alabilirsin.', en: 'Mercury strengthens analytical thinking. You can make sense of complex data and take strategic decisions.' },
    { tr: 'Bugün mütevazı kalmanın ödüllerini göreceksin. Sessizce yaptığın iyilikler fark ediliyor.', en: 'Today you\'ll see rewards of humility. Your quiet good deeds are being noticed.' },
  ],
  libra: [
    { tr: 'Denge ve uyum bugünün teması. İlişkilerinde adalet duygun ön plana çıkıyor. Arabuluculuk yapabilirsin.', en: 'Balance and harmony are today\'s theme. Your sense of justice shines in relationships. You may mediate.' },
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
    { tr: 'Gizli bir bilgi ortaya çıkabilir. Şaşırma, bu seni güçlendirecek. Bilgi güçtür.', en: 'Hidden information may surface. Don\'t be surprised — it will empower you. Knowledge is power.' },
  ],
  sagittarius: [
    { tr: 'Macera ruhu çağırıyor! Yeni yerler keşfet, farklı mutfakları dene. Comfort zone\'undan çık.', en: 'Adventure calls! Discover new places, try different cuisines. Step out of your comfort zone.' },
    { tr: 'Jüpiter şansını artırıyor. Risk almaktan korkma ama hesaplı ol. Büyük ödüller cesurları bekliyor.', en: 'Jupiter boosts luck. Don\'t fear risks but be calculated. Big rewards await the brave.' },
    { tr: 'Felsefi düşünceler zihninı meşgul ediyor. Hayatın anlamı üzerine derin sohbetler seni besleyecek.', en: 'Philosophical thoughts occupy your mind. Deep conversations about life\'s meaning will nourish you.' },
    { tr: 'Eğitim ve öğretim konuları parlıyor. Öğretmen veya öğrenci olarak bugün çok verimli olacaksın.', en: 'Education and teaching shine. Whether teacher or student, you\'ll be very productive today.' },
    { tr: 'Uluslararası bağlantılar güçleniyor. Yurtdışından bir haber veya fırsat gelebilir.', en: 'International connections strengthen. News or opportunity from abroad may come.' },
  ],
  capricorn: [
    { tr: 'Kariyer hedeflerinde kararlı adımlar atıyorsun. Disiplinin meyvelerini vermeye başlıyor. Devam et.', en: 'Taking determined career steps. Your discipline starts bearing fruit. Keep going.' },
    { tr: 'Satürn yapını güçlendiriyor. Uzun vadeli planların sağlam temeller üzerine kurulu. Sabır anahtar.', en: 'Saturn strengthens your structure. Long-term plans are built on solid foundations. Patience is key.' },
    { tr: 'Bugün otorite figürleriyle iyi ilişkiler kurabilirsin. Mentor veya üstlerinden destek alabilirsin.', en: 'Good relations with authority figures today. You may receive support from mentors or superiors.' },
    { tr: 'Maddi konularda tutumlu yaklaşımın doğru. Gereksiz harcamalardan kaçın, biriktirmeye devam et.', en: 'Your frugal approach to finances is right. Avoid unnecessary spending, keep saving.' },
    { tr: 'Sorumluluklarını yerine getirdikçe içsel huzurun artıyor. Kendine de zaman ayırmayı unutma.', en: 'Inner peace grows as you fulfill responsibilities. Don\'t forget to make time for yourself.' },
  ],
  aquarius: [
    { tr: 'Yenilikçi fikirlerin bugün dikkat çekecek. Teknoloji ve bilim konularında ilham alıyorsun.', en: 'Innovative ideas attract attention today. You\'re inspired by technology and science.' },
    { tr: 'Uranüs beklenmedik değişimler getiriyor. Esnekliğini koru, sürprizlere açık ol. İyi şeyler geliyor.', en: 'Uranus brings unexpected changes. Stay flexible, be open to surprises. Good things are coming.' },
    { tr: 'Sosyal sorumluluk projeleri seni çekiyor. Topluma katkıda bulunmak ruhunu besleyecek.', en: 'Social responsibility projects attract you. Contributing to community will nourish your soul.' },
    { tr: 'Arkadaş grubunda lider pozisyonundasın. Organize et, bir araya getir. Enerjin bulaşıcı.', en: 'You\'re in a leadership position among friends. Organize, bring together. Your energy is contagious.' },
    { tr: 'Bağımsızlığın önemli ama yakınlarını ihmal etme. Sevgi göstermek zayıflık değil, güçtür.', en: 'Independence matters but don\'t neglect loved ones. Showing love isn\'t weakness — it\'s strength.' },
  ],
  pisces: [
    { tr: 'Sezgilerin çok güçlü. Rüyalarına dikkat et, önemli mesajlar içerebilir. Günlük tut.', en: 'Intuition is very strong. Pay attention to dreams — they may contain important messages. Keep a journal.' },
    { tr: 'Neptün yaratıcılığını ateşliyor. Sanat, müzik, şiir — duygularını ifade et. İçindeki sanatçıyı serbest bırak.', en: 'Neptune fires creativity. Art, music, poetry — express emotions. Free the artist within.' },
    { tr: 'Empatik enerjin çevreni iyileştiriyor. Ama başkalarının enerjisini çok emme, kendini koru.', en: 'Empathic energy heals those around you. But don\'t absorb too much — protect yourself.' },
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
