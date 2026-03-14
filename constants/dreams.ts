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
  { keywords: { tr: ['araba', 'tren', 'otobüs', 'uçak'], en: ['car', 'train', 'bus', 'plane'] }, meaning: { tr: 'Taşıtlar hayat yolculuğunuzu simgeler. Sürücü koltuğundaysanız kontroldesiniz; yolcuysanız başkalarının yönlendirmesine açıksınız.', en: 'Vehicles symbolize your life journey. In the driver seat means control; as passenger, you are open to others\' direction.' }, icon: '🚗' },
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
