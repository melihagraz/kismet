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
