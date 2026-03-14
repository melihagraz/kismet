import { View, Text, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import ProgressDots from '../../components/ui/ProgressDots';
import Chip from '../../components/ui/Chip';
import i18n from '../../i18n';

export default function GenderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const select = (gender: string) => {
    setTimeout(() => {
      router.push({ pathname: '/onboarding/lifestyle', params: { ...params, gender } });
    }, 300);
  };

  const options = [
    { key: 'female', label: i18n.t('onboarding.female'), icon: '♀️' },
    { key: 'male', label: i18n.t('onboarding.male'), icon: '♂️' },
    { key: 'other', label: i18n.t('onboarding.notSay'), icon: '✦' },
  ];

  return (
    <Animated.View style={{ flex: 1, padding: 24, paddingTop: 60, opacity: fadeAnim }}>
      <ProgressDots step={3} total={6} />
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>🌟</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, textAlign: 'center', marginBottom: 28 }}>
          {i18n.t('onboarding.genderQ')}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {options.map(o => (
            <Chip key={o.key} label={o.label} icon={o.icon} selected={false} onPress={() => select(o.key)} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}
