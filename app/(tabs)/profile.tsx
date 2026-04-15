import { useRouter } from 'expo-router';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { getZodiacSign } from '../../constants/zodiac';
import { useAuth } from '../../contexts/AuthContext';
import { usePremium } from '../../hooks/usePremium';
import { useProfile } from '../../hooks/useProfile';
import i18n from '../../i18n';
import { storage } from '../../services/storage';
import { supabase } from '../../services/supabase';

export default function ProfileScreen() {
  const { profile } = useProfile();
  const { isPremium, restore } = usePremium();
  const { isAuthenticated, signOut, user } = useAuth();
  const router = useRouter();
  const lang = i18n.locale as 'tr' | 'en';

  const zodiac = profile ? getZodiacSign(profile.birthDay, profile.birthMonth) : null;

  const handleReset = async () => {
    await storage.clearAll();
    router.replace('/onboarding/welcome');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      lang === 'tr' ? 'Hesabı Sil' : 'Delete Account',
      lang === 'tr'
        ? 'Hesabınız ve tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.'
        : 'Your account and all data will be permanently deleted. This action cannot be undone.',
      [
        { text: lang === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
        {
          text: lang === 'tr' ? 'Hesabı Sil' : 'Delete Account',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete user data from Supabase
              if (user?.id) {
                await supabase.from('profiles').delete().eq('id', user.id);
                await supabase.from('messages').delete().or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);
                await supabase.from('weekly_matches').delete().or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);
              }
              // Sign out from Supabase
              await signOut();
              // Clear local storage
              await storage.clearAll();
              // Navigate to welcome
              router.replace('/onboarding/welcome');
            } catch (error) {
              console.error('Delete account error:', error);
              Alert.alert(
                lang === 'tr' ? 'Hata' : 'Error',
                lang === 'tr' ? 'Hesap silinirken bir hata oluştu.' : 'An error occurred while deleting your account.'
              );
            }
          },
        },
      ]
    );
  };

  const handleRestore = async () => {
    const success = await restore();
    if (success) {
      Alert.alert(
        lang === 'tr' ? 'Başarılı' : 'Success',
        lang === 'tr' ? 'Premium geri yüklendi!' : 'Premium restored!'
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 24, paddingTop: 60, alignItems: 'center' }}>
      {/* Avatar */}
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(212,165,116,0.15)', borderWidth: 2, borderColor: Colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 36 }}>{zodiac?.symbol || '✦'}</Text>
      </View>

      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, marginBottom: 4 }}>
        {profile?.name || 'User'}
      </Text>

      {zodiac && (
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: Colors.gold, marginBottom: 4 }}>
          {zodiac[lang]} {zodiac.symbol}
        </Text>
      )}

      {profile?.city && (
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 13, color: Colors.gray, marginBottom: 16 }}>
          📍 {profile.city}
        </Text>
      )}

      {/* Premium Status */}
      <View style={{
        backgroundColor: isPremium ? 'rgba(212,165,116,0.12)' : 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: isPremium ? Colors.gold : 'rgba(255,255,255,0.08)',
        borderRadius: 16, padding: 16, width: '100%', maxWidth: 340, marginBottom: 24, alignItems: 'center',
      }}>
        <Text style={{ fontSize: 24, marginBottom: 6 }}>{isPremium ? '👑' : '🔒'}</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 16, color: isPremium ? Colors.gold : Colors.star }}>
          {isPremium
            ? (lang === 'tr' ? 'Premium Üye' : 'Premium Member')
            : (lang === 'tr' ? 'Ücretsiz Plan' : 'Free Plan')
          }
        </Text>
        {!isPremium && (
          <TouchableOpacity onPress={() => router.push('/paywall')} style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 13, color: Colors.gold, textDecorationLine: 'underline' }}>
              {lang === 'tr' ? "Premium'a yükselt ✦" : 'Upgrade to Premium ✦'}
              
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Actions */}
      <View style={{ width: '100%', maxWidth: 340, gap: 10 }}>
        <TouchableOpacity onPress={handleRestore} style={{ padding: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
          <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: Colors.star, textAlign: 'center' }}>
            {lang === 'tr' ? '🔄 Satın alımı geri yükle' : '🔄 Restore purchases'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          const newLang = lang === 'tr' ? 'en' : 'tr';
          i18n.locale = newLang;
          storage.setLanguage(newLang);
          router.replace('/(tabs)/home');
        }} style={{ padding: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
          <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: Colors.star, textAlign: 'center' }}>
            🌍 {lang === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReset} style={{ padding: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(231,76,60,0.2)', marginTop: 10 }}>
          <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: '#e74c3c', textAlign: 'center' }}>
            {lang === 'tr' ? '🗑️ Profili sıfırla (onboarding tekrar)' : '🗑️ Reset profile (restart onboarding)'}
          </Text>
        </TouchableOpacity>

        {isAuthenticated && (
          <TouchableOpacity onPress={handleDeleteAccount} style={{ padding: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(231,76,60,0.3)', marginTop: 10 }}>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: '#e74c3c', textAlign: 'center' }}>
              {lang === 'tr' ? '⚠️ Hesabı kalıcı olarak sil' : '⚠️ Permanently delete account'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 28, paddingHorizontal: 20, lineHeight: 15 }}>
        {i18n.t('disclaimer.long')}
      </Text>

      <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 16 }}>
        Cosmic Help v1.0.0 • Powered by Claude AI
      </Text>
    </ScrollView>
  );
}
