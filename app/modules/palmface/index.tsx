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
import { getFaceReading, getPalmReading } from '../../../services/api';

export default function PalmFaceModule() {
  const router = useRouter();
  const { profile } = useProfile();
  const [mode, setMode] = useState<'palm' | 'face' | null>(null);
  const [phase, setPhase] = useState<'choose' | 'guide' | 'scanning' | 'result' | 'error'>('choose');
  const [result, setResult] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const startScan = (type: 'palm' | 'face') => { setMode(type); setPhase('guide'); };

  const startAnalysis = async () => {
    setPhase('scanning');
    setProgress(0);
    const iv = setInterval(() => setProgress(p => { if (p >= 95) { clearInterval(iv); return 95; } return p + 1; }), 60);

    const userProfile = profile ? {
      name: profile.name,
      zodiacSign: getZodiacSign(profile.birthDay, profile.birthMonth)[lang],
      gender: profile.gender,
      relation: profile.relation,
      focus: profile.focus,
    } : undefined;

    const response = mode === 'palm'
      ? await getPalmReading('', lang, userProfile)
      : await getFaceReading('', lang, userProfile);

    clearInterval(iv);
    setProgress(100);

    if (response.success && response.reading) {
      setTimeout(() => { setResult(response.reading!); setPhase('result'); }, 500);
    } else {
      setErrorMsg(response.error || 'Error');
      setPhase('error');
    }
  };

  const reset = () => { setMode(null); setPhase('choose'); setResult(''); setProgress(0); setErrorMsg(''); };

  const guideConfig = {
    palm: {
      steps: lang === 'tr'
        ? ['Sol elinizi açın, avuç içinizi kameraya döndürün', 'Parmaklarınızı hafifçe açın', 'İyi aydınlatılmış ortamda çekin']
        : ['Open your left hand, palm facing camera', 'Slightly spread your fingers', 'Take photo in good lighting'],
      tip: lang === 'tr' ? 'Çizgilerin net görünmesi için eli düz tutun' : 'Keep hand flat so lines are visible',
      icon: '🤚', title: lang === 'tr' ? 'El Falı' : 'Palm Reading',
    },
    face: {
      steps: lang === 'tr'
        ? ['Yüzünüzü kameraya doğru tutun', 'Saçınızı yüzünüzden uzak tutun', 'Doğal ışıkta, düz bakın']
        : ['Face the camera directly', 'Keep hair away from face', 'Use natural light, look straight'],
      tip: lang === 'tr' ? 'Makyajsız ve gözlüksüz en iyi sonucu verir' : 'Best results without makeup or glasses',
      icon: '😊', title: lang === 'tr' ? 'Yüz Analizi' : 'Face Analysis',
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
                  <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 14, color: Colors.star }}>
                    {type === 'palm' ? (lang === 'tr' ? 'El Falı' : 'Palm') : (lang === 'tr' ? 'Yüz Analizi' : 'Face')}
                  </Text>
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
            <KismetButton title={'📸 ' + (lang === 'tr' ? 'Fotoğraf Çek' : 'Take Photo')} onPress={startAnalysis} />
          </View>
        )}

        {phase === 'scanning' && (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>{mode === 'palm' ? '🤚' : '😊'}</Text>
            <Text style={{ color: Colors.goldLight, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 8 }}>
              {lang === 'tr' ? 'Taranıyor...' : 'Scanning...'}
            </Text>
            <View style={{ width: 200, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 8 }}>
              <View style={{ width: progress + '%', height: '100%', backgroundColor: Colors.gold, borderRadius: 2 }} />
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Claude AI Vision</Text>
          </View>
        )}

        {phase === 'result' && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>{mode === 'palm' ? '🖐️' : '😊'}</Text>
            <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 16 }}>
              {mode === 'palm' ? guideConfig.palm.title : guideConfig.face.title}
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