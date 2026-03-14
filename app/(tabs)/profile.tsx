import { View, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useProfile } from '../../hooks/useProfile';

export default function ProfileScreen() {
  const { profile } = useProfile();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.deep, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>👤</Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: Colors.star }}>{profile?.name || 'Profil'}</Text>
      <Text style={{ color: Colors.gray, marginTop: 8, fontSize: 13 }}>Ayarlar — yakında</Text>
    </View>
  );
}
