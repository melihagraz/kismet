import { View, Text, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import { getZodiacSign } from '../../constants/zodiac';
import { useProfile } from '../../hooks/useProfile';
import i18n from '../../i18n';

export default function ReadyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveProfile } = useProfile();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const name = params.name as string || '';
  const day = parseInt(params.day as string) || 15;
  const month = parseInt(params.month as string) || 6;
  const year = parseInt(params.year as string) || 1995;
  const city = params.city as string || '';
  const gender = params.gender as string || '';
  const relation = params.relation as string || '';
  const focus = (params.focus as string || '').split(',').filter(Boolean);
  const interests = (params.interests as string || '').split(',').filter(Boolean);
  const experience = params.experience as string || '';

  const zodiac = getZodiacSign(day, month);
  const lang = i18n.locale as 'tr' | 'en';

  const handleComplete = async () => {
    await saveProfile({
      name,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      city,
      gender,
      relation,
      focus,
      interests,
      experience,
    });
    router.replace('/(tabs)/home');
  };

  const interestIcons: Record<string, string> = {
    coffee: '☕', tarot: '🃏', horoscope: '✨', dream: '🌙', palmface: '🖐️',
  };

  return (
    <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, opacity: fadeAnim }}>
      <Text style={{ fontSize: 64, marginBottom: 16 }}>{zodiac.symbol}</Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, marginBottom: 8 }}>
        {i18n.t('onboarding.ready')}
      </Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 20, color: Colors.gold, marginBottom: 24 }}>
        {name}
      </Text>

      <View style={{
        backgroundColor: 'rgba(212,165,116,0.08)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxWidth: 320,
        borderWidth: 1,
        borderColor: 'rgba(212,165,116,0.15)',
        marginBottom: 32,
        alignItems: 'center',
      }}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.star, marginBottom: 12 }}>
          {zodiac[lang]} {zodiac.symbol} • {city || '—'}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {interests.map(i => (
            <View key={i} style={{ backgroundColor: 'rgba(212,165,116,0.15)', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.gold }}>
                {interestIcons[i] || '✦'} {i18n.t('modules.' + i) || i}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <KismetButton title={i18n.t('onboarding.readyCta')} onPress={handleComplete} />
    </Animated.View>
  );
}
