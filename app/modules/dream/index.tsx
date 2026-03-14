import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Badge from '../../../components/ui/Badge';
import KismetButton from '../../../components/ui/KismetButton';
import TypingText from '../../../components/ui/TypingText';
import { Colors } from '../../../constants/colors';
import { getZodiacSign } from '../../../constants/zodiac';
import { useProfile } from '../../../hooks/useProfile';
import i18n from '../../../i18n';
import { getDreamReading } from '../../../services/api';

export default function DreamModule() {
  const router = useRouter();
  const { profile } = useProfile();
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'input' | 'interpreting' | 'result' | 'error'>('input');
  const [result, setResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const interpret = async () => {
    if (!text.trim()) return;
    setPhase('interpreting');

    const userProfile = profile ? {
      name: profile.name,
      zodiacSign: getZodiacSign(profile.birthDay, profile.birthMonth)[lang],
      gender: profile.gender,
      relation: profile.relation,
      focus: profile.focus,
    } : undefined;

    const response = await getDreamReading(text, lang, userProfile);

    if (response.success && response.reading) {
      setResult(response.reading);
      setPhase('result');
    } else {
      setErrorMsg(response.error || (lang === 'tr' ? 'Bir hata oluştu' : 'An error occurred'));
      setPhase('error');
    }
  };

  const reset = () => { setText(''); setPhase('input'); setResult(''); setErrorMsg(''); };

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
            <TextInput value={text} onChangeText={setText}
              placeholder={i18n.t('common.enterDream')}
              placeholderTextColor="rgba(240,230,211,0.3)" multiline
              style={{ width: '100%', minHeight: 140, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212,165,116,0.2)', backgroundColor: 'rgba(255,255,255,0.04)', color: Colors.star, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular', lineHeight: 22, textAlignVertical: 'top', marginTop: 20 }} />
            <Text style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 8, marginBottom: 20, textAlign: 'center' }}>
              {lang === 'tr' ? '✨ Gerçek AI yorumu — Claude ile' : '✨ Real AI interpretation — powered by Claude'}
            </Text>
            <KismetButton title={i18n.t('common.interpret')} onPress={interpret} disabled={!text.trim()} />
          </View>
        )}

        {phase === 'interpreting' && (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>🌙</Text>
            <Text style={{ color: Colors.goldLight, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 8 }}>{i18n.t('common.interpreting')}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
              {lang === 'tr' ? 'Claude AI analiz ediyor...' : 'Claude AI analyzing...'}
            </Text>
          </View>
        )}

        {phase === 'result' && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>🔮</Text>
            <Text style={{ color: Colors.gold, fontSize: 13, fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: 2, marginBottom: 16 }}>
              {i18n.t('common.yourReading')}
            </Text>
            <View style={{ backgroundColor: 'rgba(212,165,116,0.07)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.18)', borderRadius: 20, padding: 20, width: '100%', marginBottom: 24 }}>
              <TypingText text={result} speed={12} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontSize: 15, fontFamily: 'PlayfairDisplay_400Regular' }} />
            </View>
            <KismetButton title={i18n.t('common.newReading')} onPress={reset} variant="outline" />
          </View>
        )}

        {phase === 'error' && (
          <View style={{ alignItems: 'center', maxWidth: 380 }}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>⚠️</Text>
            <Text style={{ color: Colors.star, fontSize: 16, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 8, textAlign: 'center' }}>
              {lang === 'tr' ? 'Bağlantı Hatası' : 'Connection Error'}
            </Text>
            <Text style={{ color: Colors.gray, fontSize: 13, textAlign: 'center', marginBottom: 24 }}>{errorMsg}</Text>
            <KismetButton title={lang === 'tr' ? 'Tekrar Dene' : 'Try Again'} onPress={reset} />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}