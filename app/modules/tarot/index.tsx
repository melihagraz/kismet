import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../../../components/ui/Badge';
import KismetButton from '../../../components/ui/KismetButton';
import TypingText from '../../../components/ui/TypingText';
import { Colors } from '../../../constants/colors';
import { tarotCards } from '../../../constants/tarot';
import { getZodiacSign } from '../../../constants/zodiac';
import { useProfile } from '../../../hooks/useProfile';
import i18n from '../../../i18n';
import { getTarotReading } from '../../../services/api';

export default function TarotModule() {
  const router = useRouter();
  const { profile } = useProfile();
  const [selected, setSelected] = useState<number[]>([]);
  const [phase, setPhase] = useState<'select' | 'reading' | 'result' | 'error'>('select');
  const [revealedIdx, setRevealedIdx] = useState(-1);
  const [aiReading, setAiReading] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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

  const reveal = async () => {
    setPhase('reading');

    // Kart açılma animasyonu
    let idx = 0;
    const iv = setInterval(() => {
      setRevealedIdx(idx);
      idx++;
      if (idx >= 3) clearInterval(iv);
    }, 800);

    // Aynı anda AI'dan yorum al
    const cardNames = selected.map(i => shuffled.current[i].name[lang]);
    const userProfile = profile ? {
      name: profile.name,
      zodiacSign: getZodiacSign(profile.birthDay, profile.birthMonth)[lang],
      gender: profile.gender,
      relation: profile.relation,
      focus: profile.focus,
    } : undefined;

    const response = await getTarotReading(cardNames, positions, lang, userProfile);

    // Animasyon bitmesini bekle
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (response.success && response.reading) {
      setAiReading(response.reading);
      setPhase('result');
    } else {
      setErrorMsg(response.error || 'Error');
      setPhase('error');
    }
  };

  const reset = () => {
    setSelected([]); setPhase('select'); setRevealedIdx(-1); setAiReading(''); setErrorMsg('');
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

        {phase === 'reading' && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
              {selected.map((cardIdx, i) => {
                const card = shuffled.current[cardIdx];
                const shown = i <= revealedIdx;
                return (
                  <View key={i} style={{ width: 85, alignItems: 'center' }}>
                    <View style={{ width: 85, height: 120, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 6,
                      backgroundColor: shown ? Colors.purple : 'rgba(255,255,255,0.03)',
                      borderWidth: 1, borderColor: shown ? Colors.gold : 'rgba(255,255,255,0.08)', opacity: shown ? 1 : 0.4 }}>
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
            <Text style={{ color: Colors.goldLight, fontSize: 14, fontFamily: 'PlayfairDisplay_600SemiBold' }}>
              {lang === 'tr' ? 'Kartların okunuyor...' : 'Reading your cards...'}
            </Text>
          </View>
        )}

        {phase === 'result' && (
          <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
            {/* Açılan kartları göster */}
            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 20 }}>
              {selected.map((cardIdx, i) => {
                const card = shuffled.current[cardIdx];
                return (
                  <View key={i} style={{ width: 85, alignItems: 'center' }}>
                    <View style={{ width: 85, height: 120, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 6, backgroundColor: Colors.purple, borderWidth: 1, borderColor: Colors.gold }}>
                      <Text style={{ fontSize: 12, color: Colors.gold, fontFamily: 'PlayfairDisplay_700Bold' }}>{card.numeral}</Text>
                      <Text style={{ fontSize: 10, color: Colors.star, textAlign: 'center', marginTop: 4 }}>{card.name[lang]}</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: Colors.gold, fontFamily: 'PlayfairDisplay_600SemiBold', marginTop: 6 }}>{positions[i]}</Text>
                  </View>
                );
              })}
            </View>

            {/* AI Yorum */}
            <View style={{ backgroundColor: 'rgba(212,165,116,0.07)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', maxWidth: 380, marginBottom: 24 }}>
              <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 12, textAlign: 'center' }}>
                {i18n.t('common.yourReading')}
              </Text>
              <TypingText text={aiReading} speed={10} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
            </View>
            <KismetButton title={i18n.t('common.newReading')} onPress={reset} variant="outline" />
          </View>
        )}

        {phase === 'error' && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>⚠️</Text>
            <Text style={{ color: Colors.gray, fontSize: 13, marginBottom: 24 }}>{errorMsg}</Text>
            <KismetButton title={lang === 'tr' ? 'Tekrar Dene' : 'Try Again'} onPress={reset} />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}