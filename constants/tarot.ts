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
