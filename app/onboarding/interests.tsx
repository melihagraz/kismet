import { View, Text, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import ProgressDots from '../../components/ui/ProgressDots';
import Chip from '../../components/ui/Chip';
import i18n from '../../i18n';

export default function InterestsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [interests, setInterests] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const toggleInterest = (i: string) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const interestOptions = [
    { key: 'coffee', label: i18n.t('modules.coffee'), icon: '☕' },
    { key: 'tarot', label: i18n.t('modules.tarot'), icon: '🃏' },
    { key: 'horoscope', label: i18n.t('modules.horoscope'), icon: '✨' },
    { key: 'dream', label: i18n.t('modules.dream'), icon: '🌙' },
    { key: 'palmface', label: i18n.t('modules.palmface'), icon: '🖐️' },
  ];

  const expOptions = [
    { key: 'new', label: i18n.t('onboarding.newbie') },
    { key: 'some', label: i18n.t('onboarding.some') },
    { key: 'adv', label: i18n.t('onboarding.advanced') },
  ];

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, alignItems: 'center' }}>
        <ProgressDots step={5} total={6} />

        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, textAlign: 'center', marginBottom: 16 }}>
          {i18n.t('onboarding.interestQ')}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {interestOptions.map(o => (
            <Chip key={o.key} label={o.label} icon={o.icon} selected={interests.includes(o.key)} onPress={() => toggleInterest(o.key)} />
          ))}
        </View>

        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, textAlign: 'center', marginBottom: 16 }}>
          {i18n.t('onboarding.expQ')}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {expOptions.map(e => (
            <Chip key={e.key} label={e.label} selected={experience === e.key} onPress={() => setExperience(e.key)} />
          ))}
        </View>

        <KismetButton
          title={i18n.t('onboarding.next')}
          onPress={() => router.push({ pathname: '/onboarding/ready', params: { ...params, interests: interests.join(','), experience } })}
          disabled={interests.length === 0 || !experience}
        />
      </ScrollView>
    </Animated.View>
  );
}
