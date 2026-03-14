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
