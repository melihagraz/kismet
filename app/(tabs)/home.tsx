import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { getZodiacSign } from '../../constants/zodiac';
import { usePremium } from '../../hooks/usePremium';
import { useProfile } from '../../hooks/useProfile';
import i18n from '../../i18n';

const matchingModule = { key: 'matching', icon: '🤝', route: '/modules/matching' };
const guidanceModule = { key: 'guidance', icon: '🎯', route: '/modules/guidance' };

// Insight Tools — visible, reflection-focused (no palm/face/biometric)
const insightTools = [
  { key: 'coffee', icon: '🖼️', route: '/modules/coffee' },
  { key: 'tarot', icon: '🎴', route: '/modules/tarot' },
  { key: 'dream', icon: '💭', route: '/modules/dream' },
  { key: 'horoscope', icon: '📊', route: '/modules/horoscope' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const { isPremium } = usePremium();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  const isEligibleForConnections = profile?.relation === 'single' && (profile?.focus || []).includes('love');
  const matchingOptIn = profile?.matchingOptIn !== false;
  const guidanceOptIn = profile?.guidanceOptIn !== false;
  const showConnections = isEligibleForConnections && matchingOptIn;
  const showFocus = !isEligibleForConnections && guidanceOptIn;
  const weeklyFeature = showConnections ? matchingModule : (showFocus ? guidanceModule : null);
  const zodiac = profile ? getZodiacSign(profile.birthDay, profile.birthMonth) : null;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  const handlePress = (route: string, needsPremium: boolean = true) => {
    if (needsPremium && !isPremium && route !== '/modules/horoscope') {
      router.push('/paywall');
    } else {
      router.push(route as any);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#080812' }} contentContainerStyle={{ paddingBottom: 100 }}>
      <Animated.View style={{ opacity: fadeAnim }}>

        {/* ============ TOP BAR ============ */}
        <View style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 4, fontWeight: '600' }}>
              COSMIC HELP
            </Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 26, color: '#fff', marginTop: 4 }}>
              {lang === 'tr' ? 'Merhaba' : 'Hello'}, {profile?.name || ''}
            </Text>
          </View>
          {zodiac && (
            <View style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: 'rgba(99,102,241,0.15)',
              borderWidth: 1.5, borderColor: 'rgba(99,102,241,0.3)',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 20 }}>{zodiac.symbol}</Text>
            </View>
          )}
        </View>

        {/* ============ HERO: WEEKLY FEATURE ============ */}
        {weeklyFeature && (
        <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 24 }}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handlePress(weeklyFeature.route)}
          >
            <View style={{
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: showConnections ? '#1a1035' : '#0f1a2e',
              borderWidth: 1,
              borderColor: showConnections ? 'rgba(99,102,241,0.3)' : 'rgba(59,130,246,0.3)',
              padding: 28,
            }}>
              {/* Status pill */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' }} />
                <Text style={{ fontSize: 10, color: '#22c55e', fontWeight: '700', letterSpacing: 2 }}>
                  {lang === 'tr' ? 'BU HAFTA' : 'THIS WEEK'}
                </Text>
              </View>

              <Text style={{ fontSize: 44, marginBottom: 12 }}>{weeklyFeature.icon}</Text>

              <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: '#fff', marginBottom: 6 }}>
                {i18n.t('modules.' + weeklyFeature.key)}
              </Text>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 22, marginBottom: 20, maxWidth: '85%' }}>
                {i18n.t('modules.' + weeklyFeature.key + 'Desc')}
              </Text>

              {/* CTA */}
              <View style={{
                alignSelf: 'flex-start',
                backgroundColor: showConnections ? 'rgba(99,102,241,0.25)' : 'rgba(59,130,246,0.25)',
                borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10,
                flexDirection: 'row', alignItems: 'center', gap: 8,
              }}>
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>
                  {lang === 'tr' ? 'Aç' : 'Open'}
                </Text>
                <Text style={{ color: '#fff', fontSize: 13 }}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        )}

        {/* ============ COSMIC INSIGHTS (Birth Chart) ============ */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handlePress('/modules/birthchart')}
            style={{
              borderRadius: 20,
              backgroundColor: '#111827',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <View style={{
              width: 56, height: 56, borderRadius: 16,
              backgroundColor: 'rgba(99,102,241,0.12)',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 28 }}>🪐</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, color: 'rgba(99,102,241,0.8)', letterSpacing: 2, fontWeight: '700', marginBottom: 4 }}>
                {lang === 'tr' ? 'SEMBOLİK İÇGÖRÜ' : 'SYMBOLIC INSIGHTS'}
              </Text>
              <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 17, color: '#fff' }}>
                {i18n.t('modules.birthchart')}
              </Text>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                {i18n.t('modules.birthchartDesc')}
              </Text>
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ============ INSIGHT TOOLS (visible, no hiding) ============ */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, paddingHorizontal: 4 }}>
            <Text style={{ fontSize: 14 }}>💡</Text>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: 2 }}>
              {i18n.t('modules.insightTools').toUpperCase()}
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            {insightTools.map(tool => (
              <TouchableOpacity
                key={tool.key}
                activeOpacity={0.8}
                onPress={() => handlePress(tool.route, tool.key !== 'horoscope')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: '#111827',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <View style={{
                  width: 38, height: 38, borderRadius: 10,
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: 18 }}>{tool.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 13, color: '#fff' }}>
                    {i18n.t('modules.' + tool.key)}
                  </Text>
                  <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                    {i18n.t('modules.' + tool.key + 'Desc')}
                  </Text>
                </View>
                {tool.key === 'horoscope' && (
                  <View style={{ backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                    <Text style={{ color: '#22c55e', fontSize: 9, fontWeight: '700' }}>FREE</Text>
                  </View>
                )}
                <Text style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ============ DISCLAIMER ============ */}
        <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
          <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 15 }}>
            {i18n.t('common.disclaimer')}
          </Text>
        </View>

        {/* ============ PREMIUM BANNER ============ */}
        {!isPremium && (
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <TouchableOpacity onPress={() => router.push('/paywall')} activeOpacity={0.85}
              style={{
                backgroundColor: 'rgba(99,102,241,0.08)',
                borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)',
                borderRadius: 16, padding: 16,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', fontSize: 14, color: '#818cf8', marginBottom: 2 }}>
                  {lang === 'tr' ? 'Premium\'a Geç' : 'Go Premium'}
                </Text>
                <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  {lang === 'tr' ? 'Tüm içgörü araçlarını aç' : 'Unlock all insight tools'}
                </Text>
              </View>
              <Text style={{ color: '#818cf8', fontSize: 18 }}>→</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}
