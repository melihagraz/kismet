import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../../../components/ui/Badge';
import KismetButton from '../../../components/ui/KismetButton';
import TypingText from '../../../components/ui/TypingText';
import { Colors } from '../../../constants/colors';
import { getZodiacSign } from '../../../constants/zodiac';
import { useProfile } from '../../../hooks/useProfile';
import i18n from '../../../i18n';
import { getCoffeeReading } from '../../../services/api';

export default function CoffeeModule() {
  const router = useRouter();
  const { profile } = useProfile();
  const [phase, setPhase] = useState<'guide' | 'analyzing' | 'result' | 'error'>('guide');
  const [result, setResult] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const startReading = async () => {
    setPhase('analyzing');
    setProgress(0);
    const iv = setInterval(() => setProgress(p => { if (p >= 95) { clearInterval(iv); return 95; } return p + 1; }), 80);

    const userProfile = profile ? {
      name: profile.name,
      zodiacSign: getZodiacSign(profile.birthDay, profile.birthMonth)[lang],
      gender: profile.gender,
      relation: profile.relation,
      focus: profile.focus,
    } : undefined;

    // Şimdilik text-based (web demo), gerçek cihazda kamera fotoğrafı gidecek
    const response = await getCoffeeReading('', lang, userProfile);

    clearInterval(iv);
    setProgress(100);

    if (response.success && response.reading) {
      setTimeout(() => { setResult(response.reading!); setPhase('result'); }, 500);
    } else {
      setErrorMsg(response.error || 'Error');
      setPhase('error');
    }
  };

  const reset = () => { setPhase('guide'); setResult(''); setProgress(0); setErrorMsg(''); };

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
              <Text style={{ color: Colors.gold, fontSize: 13 }}>💡 {guideTip}</Text>
            </View>
            <KismetButton title={'📸 ' + (lang === 'tr' ? 'Fotoğraf Çek' : 'Take Photo')} onPress={startReading} />
            <Text style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 12 }}>
              ✨ {lang === 'tr' ? 'Gerçek AI yorumu — Claude ile' : 'Real AI reading — powered by Claude'}
            </Text>
          </View>
        )}

        {phase === 'analyzing' && (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>☕</Text>
            <Text style={{ color: Colors.goldLight, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 8 }}>
              {lang === 'tr' ? 'Fincanın okunuyor...' : 'Reading your cup...'}
            </Text>
            <View style={{ width: 200, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 8 }}>
              <View style={{ width: progress + '%', height: '100%', backgroundColor: Colors.gold, borderRadius: 2 }} />
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Claude AI</Text>
          </View>
        )}

        {phase === 'result' && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>☕</Text>
            <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 16 }}>
              {i18n.t('common.yourReading')}
            </Text>
            <View style={{ backgroundColor: 'rgba(212,165,116,0.07)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', marginBottom: 24 }}>
              <TypingText text={result} speed={10} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
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