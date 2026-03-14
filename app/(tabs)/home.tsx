import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import { useProfile } from '../../hooks/useProfile';
import Badge from '../../components/ui/Badge';
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Animated.Text style={{ fontSize: 42, marginBottom: 10, transform: [{ translateY: floatAnim }] }}>✦</Animated.Text>
          {profile && (
            <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 15, color: Colors.gold, marginBottom: 6 }}>
              {i18n.t('common.welcome')}, {profile.name}!
            </Text>
          )}
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, textAlign: 'center', lineHeight: 36 }}>
            {lang === 'tr' ? 'Fincandan geleceğe,' : 'From cup to cosmos,'}
          </Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.gold, textAlign: 'center', lineHeight: 36 }}>
            {lang === 'tr' ? 'yapay zeka ile.' : 'powered by AI.'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {modules.map((mod, idx) => {
            const isWide = idx === modules.length - 1 && modules.length % 2 !== 0;
            return (
              <TouchableOpacity key={mod.key} activeOpacity={0.7}
                onPress={() => router.push(mod.route as any)}
                style={{ width: isWide ? '100%' : '47%', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(212,165,116,0.1)', borderRadius: 20, padding: 24, alignItems: 'center', position: 'relative' }}>
                <Text style={{ fontSize: 36, marginBottom: 10 }}>{mod.icon}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 15, color: Colors.star, marginBottom: 4 }}>{i18n.t('modules.' + mod.key)}</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 11, color: Colors.gray, textAlign: 'center', lineHeight: 16 }}>{i18n.t('modules.' + mod.key + 'Desc')}</Text>
                <View style={{ position: 'absolute', top: 8, right: 8 }}><Badge type={mod.tier} /></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
