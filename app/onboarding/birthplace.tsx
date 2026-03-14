import { View, Text, TextInput, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import ProgressDots from '../../components/ui/ProgressDots';
import i18n from '../../i18n';

export default function BirthPlaceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [city, setCity] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const goNext = () => {
    router.push({ pathname: '/onboarding/gender', params: { ...params, city } });
  };

  return (
    <Animated.View style={{ flex: 1, padding: 24, paddingTop: 60, opacity: fadeAnim }}>
      <ProgressDots step={2} total={6} />
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>📍</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, textAlign: 'center', marginBottom: 28 }}>
          {i18n.t('onboarding.birthPlaceQ')}
        </Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder={i18n.t('onboarding.cityPlaceholder')}
          placeholderTextColor="rgba(240,230,211,0.3)"
          style={{
            width: '100%', maxWidth: 340, padding: 16, borderRadius: 16, borderWidth: 1,
            borderColor: 'rgba(212,165,116,0.2)', backgroundColor: 'rgba(255,255,255,0.04)',
            color: Colors.star, fontSize: 18, fontFamily: 'PlayfairDisplay_400Regular', textAlign: 'center',
          }}
        />
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 28 }}>
          <KismetButton title={i18n.t('onboarding.next')} onPress={goNext} disabled={!city.trim()} />
          <KismetButton title={i18n.t('onboarding.skip')} onPress={goNext} variant="ghost" />
        </View>
      </View>
    </Animated.View>
  );
}
