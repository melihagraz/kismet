import { View, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import ProgressDots from '../../components/ui/ProgressDots';
import i18n from '../../i18n';

export default function PromiseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const lang = i18n.locale as 'tr' | 'en';

  const relation = params.relation as string || '';
  const focus = (params.focus as string || '').split(',').filter(Boolean);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const isEligibleForMatching = relation === 'single' && focus.includes('love');

  const message = isEligibleForMatching
    ? {
        icon: '🤝',
        titleTr: 'Bağlantılar Açılıyor',
        titleEn: 'Connections Unlocked',
        descTr: 'İlgilerini paylaşan biriyle haftada bir karşılaşma fırsatı. İletişim kurmak veya atlamak tamamen sana kalmış. Bu bir kehanet değil — bir sohbet başlangıcı.',
        descEn: 'A weekly opportunity to meet someone who shares your interests. You decide whether to connect or skip. This is not a prediction — just a conversation starter.',
        bullet1Tr: '• Haftada 1 ortak ilgili bağlantı',
        bullet1En: '• 1 interest-matched connection per week',
        bullet2Tr: '• İstersen sohbet et, istemezsen atla',
        bullet2En: '• Chat if you want, skip if you don\'t',
        bullet3Tr: '• İstediğin zaman kapatabilirsin',
        bullet3En: '• You can turn this off anytime',
        color: '#8B5CF6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.3)',
      }
    : {
        icon: '🎯',
        titleTr: 'Haftalık Odak Alanın',
        titleEn: 'Your Weekly Focus',
        descTr: `${focus.includes('career') ? 'Kariyer' : focus.includes('health') ? 'Sağlık' : focus.includes('money') ? 'Finans' : focus.includes('family') ? 'Aile' : 'Gelişim'} odağını seçtin. Her hafta üzerinde düşünmeni sağlayacak kısa bir yansıma önerisi hazırlayacağız. AI çıktıları öneri niteliğindedir — karar senin.`,
        descEn: `You chose ${focus.includes('career') ? 'career' : focus.includes('health') ? 'health' : focus.includes('money') ? 'finances' : focus.includes('family') ? 'family' : 'growth'} as your focus. Each week we'll prepare a short reflection prompt. AI outputs are suggestions — the decisions are yours.`,
        bullet1Tr: '• Haftalık kişisel yansıma önerisi',
        bullet1En: '• Weekly personal reflection prompt',
        bullet2Tr: '• Hedeflerine göre uyarlanmış içerik',
        bullet2En: '• Tailored to your stated goals',
        bullet3Tr: '• Her zaman geri bildirebilirsin',
        bullet3En: '• You can adjust at any time',
        color: '#d4a574',
        bg: 'rgba(212,165,116,0.1)',
        border: 'rgba(212,165,116,0.3)',
      };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.deep }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, paddingTop: 60, paddingBottom: 40 }}
    >
      <Animated.View style={{ width: '100%', alignItems: 'center', opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <ProgressDots step={5} total={6} />

        <Text style={{ fontSize: 72, marginBottom: 20, marginTop: 20 }}>{message.icon}</Text>

        <Text style={{
          fontFamily: 'PlayfairDisplay_700Bold',
          fontSize: 24,
          color: Colors.star,
          textAlign: 'center',
          marginBottom: 12,
          maxWidth: 320,
        }}>
          {lang === 'tr' ? message.titleTr : message.titleEn}
        </Text>

        <Text style={{
          fontFamily: 'PlayfairDisplay_400Regular',
          fontSize: 14,
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'center',
          lineHeight: 22,
          maxWidth: 340,
          marginBottom: 24,
        }}>
          {lang === 'tr' ? message.descTr : message.descEn}
        </Text>

        {/* Feature bullets */}
        <View style={{
          backgroundColor: message.bg,
          borderRadius: 20,
          padding: 20,
          width: '100%',
          maxWidth: 340,
          borderWidth: 1,
          borderColor: message.border,
          marginBottom: 32,
          gap: 12,
        }}>
          <Text style={{ color: message.color, fontSize: 13, fontFamily: 'PlayfairDisplay_600SemiBold' }}>
            {lang === 'tr' ? message.bullet1Tr : message.bullet1En}
          </Text>
          <Text style={{ color: message.color, fontSize: 13, fontFamily: 'PlayfairDisplay_600SemiBold' }}>
            {lang === 'tr' ? message.bullet2Tr : message.bullet2En}
          </Text>
          <Text style={{ color: message.color, fontSize: 13, fontFamily: 'PlayfairDisplay_600SemiBold' }}>
            {lang === 'tr' ? message.bullet3Tr : message.bullet3En}
          </Text>
        </View>

        {/* Accept */}
        <KismetButton
          title={lang === 'tr' ? (isEligibleForMatching ? 'Evet, İstiyorum ✦' : 'Evet, Rehberlik Al ✦') : (isEligibleForMatching ? 'Yes, I Want This ✦' : 'Yes, Get Guidance ✦')}
          onPress={() => router.push({
            pathname: '/onboarding/interests',
            params: { ...params, [isEligibleForMatching ? 'matchingOptIn' : 'guidanceOptIn']: 'true' }
          })}
        />

        {/* Decline */}
        <TouchableOpacity
          onPress={() => router.push({
            pathname: '/onboarding/interests',
            params: { ...params, [isEligibleForMatching ? 'matchingOptIn' : 'guidanceOptIn']: 'false' }
          })}
          style={{ marginTop: 16, padding: 12 }}
        >
          <Text style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 13,
            fontFamily: 'PlayfairDisplay_400Regular',
            textAlign: 'center',
          }}>
            {lang === 'tr' ? 'Şimdi değil, atla' : 'Not now, skip'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}
