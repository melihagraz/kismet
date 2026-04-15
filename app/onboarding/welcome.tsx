import { View, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import i18n from '../../i18n';

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 1500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, opacity: fadeAnim }}>
      <Animated.Text style={{ fontSize: 64, marginBottom: 24, transform: [{ translateY: floatAnim }] }}>
        ✦
      </Animated.Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, textAlign: 'center', marginBottom: 12, lineHeight: 36 }}>
        {i18n.t('onboarding.welcomeTitle')}
      </Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.gray, textAlign: 'center', marginBottom: 32, lineHeight: 22 }}>
        {i18n.t('onboarding.welcomeSub')}
      </Text>

      <View style={{ backgroundColor: 'rgba(99,102,241,0.08)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)', borderRadius: 14, padding: 16, marginBottom: 32, maxWidth: 360 }}>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 18 }}>
          {i18n.t('disclaimer.onboardingBody')}
        </Text>
      </View>

      <KismetButton title={i18n.t('onboarding.start')} onPress={() => router.push('/onboarding/name')} />
    </Animated.View>
  );
}
