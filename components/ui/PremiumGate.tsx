import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { usePremium } from '../../hooks/usePremium';
import i18n from '../../i18n';

interface Props {
  children: React.ReactNode;
  feature?: string;
}

// Premium gerektiren modülleri saran bileşen
// Eğer kullanıcı premium değilse paywall'a yönlendirir
export default function PremiumGate({ children, feature }: Props) {
  const { isPremium } = usePremium();
  const router = useRouter();
  const lang = i18n.locale as 'tr' | 'en';

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.deep, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <Text style={{ fontSize: 56, marginBottom: 16 }}>🔒</Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, textAlign: 'center', marginBottom: 8 }}>
        {lang === 'tr' ? 'Premium Özellik' : 'Premium Feature'}
      </Text>
      {feature && (
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.gray, textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
          {feature}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => router.push('/paywall')}
        activeOpacity={0.8}
        style={{ backgroundColor: Colors.gold, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30, shadowColor: Colors.gold, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 }}
      >
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 16, color: Colors.deep }}>
          {lang === 'tr' ? 'Premium'a Geç ✦' : 'Go Premium ✦'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: Colors.gray }}>
          {lang === 'tr' ? 'Geri dön' : 'Go back'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
