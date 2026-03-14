import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../../components/ui/Badge';
import { Colors } from '../../constants/colors';
import { usePremium } from '../../hooks/usePremium';
import { useProfile } from '../../hooks/useProfile';
import i18n from '../../i18n';

const modules = [
  { key: 'coffee', icon: '☕', route: '/modules/coffee', tier: 'premium' as const },
  { key: 'tarot', icon: '🃏', route: '/modules/tarot', tier: 'premium' as const },
  { key: 'horoscope', icon: '✨', route: '/modules/horoscope', tier: 'free' as const },
  { key: 'dream', icon: '🌙', route: '/modules/dream', tier: 'premium' as const },
  { key: 'palmface', icon: '🖐️', route: '/modules/palmface', tier: 'premium' as const },
];

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const { isPremium, togglePremiumDev } = usePremium();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(Animated.sequence([
      Animated.timing(floatAnim, { toValue: -8, duration: 2000, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
    ])).start();
  }, []);

  const handleModulePress = (mod: typeof modules[0]) => {
    if (mod.tier === 'premium' && !isPremium) {
      router.push('/paywall');
    } else {
      router.push(mod.route as any);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Premium banner */}
        {!isPremium && (
          <TouchableOpacity onPress={() => router.push('/paywall')} activeOpacity={0.8}
            style={{ backgroundColor: 'rgba(212,165,116,0.1)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.2)', borderRadius: 16, padding: 14, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 20 }}>✦</Text>
              <View>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 14, color: Colors.gold }}>
                  {lang === 'tr' ? "Premium'a Geç" : 'Go Premium'}
                </Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 11, color: Colors.gray }}>
                  {lang === 'tr' ? 'Tüm AI özelliklerini aç' : 'Unlock all AI features'}
                </Text>
              </View>
            </View>
            <Text style={{ color: Colors.gold, fontSize: 18 }}>→</Text>
          </TouchableOpacity>
        )}

        {/* Hero */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <Animated.Text style={{ fontSize: 42, marginBottom: 10, transform: [{ translateY: floatAnim }] }}>✦</Animated.Text>
          {profile && (
            <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 15, color: Colors.gold, marginBottom: 6 }}>
              {i18n.t('common.welcome')}, {profile.name}!
              {isPremium ? ' 👑' : ''}
            </Text>
          )}
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, textAlign: 'center', lineHeight: 36 }}>
            {lang === 'tr' ? 'Fincandan geleceğe,' : 'From cup to cosmos,'}
          </Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.gold, textAlign: 'center', lineHeight: 36 }}>
            {lang === 'tr' ? 'yapay zeka ile.' : 'powered by AI.'}
          </Text>
        </View>

        {/* Module Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {modules.map((mod, idx) => {
            const isLocked = mod.tier === 'premium' && !isPremium;
            const isWide = idx === modules.length - 1 && modules.length % 2 !== 0;
            return (
              <TouchableOpacity key={mod.key} activeOpacity={0.7}
                onPress={() => handleModulePress(mod)}
                style={{
                  width: isWide ? '100%' : '47%',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderWidth: 1,
                  borderColor: isLocked ? 'rgba(255,255,255,0.05)' : 'rgba(212,165,116,0.1)',
                  borderRadius: 20, padding: 24, alignItems: 'center', position: 'relative',
                  opacity: isLocked ? 0.7 : 1,
                }}>
                <Text style={{ fontSize: 36, marginBottom: 10 }}>{mod.icon}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 15, color: Colors.star, marginBottom: 4 }}>
                  {i18n.t('modules.' + mod.key)}
                </Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 11, color: Colors.gray, textAlign: 'center', lineHeight: 16 }}>
                  {i18n.t('modules.' + mod.key + 'Desc')}
                </Text>
                <View style={{ position: 'absolute', top: 8, right: 8 }}>
                  <Badge type={mod.tier} />
                </View>
                {isLocked && (
                  <View style={{ position: 'absolute', top: 8, left: 8 }}>
                    <Text style={{ fontSize: 14 }}>🔒</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DEV: Premium Toggle (production'da kaldır) */}
        <TouchableOpacity onPress={togglePremiumDev} style={{ marginTop: 24, alignItems: 'center', padding: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
          <Text style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
            🔧 DEV: Premium {isPremium ? 'ON 👑' : 'OFF 🔒'} (tap to toggle)
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}
