// Kismet — Premium & Paywall Setup
// D:\uygulamalar\kismet klasöründe çalıştır:
// node setup-premium.js

const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✅ ' + filePath);
}

// ============================================
// 1. Premium Service — RevenueCat integration
// ============================================

writeFile('services/premium.ts', `
import { Platform } from 'react-native';

// RevenueCat API Key
const REVENUECAT_API_KEY = 'test_GpJHZUIsReqqnYyHReLZdGqxFxI';

// Premium entitlement identifier (RevenueCat dashboard'da ayarlanacak)
const ENTITLEMENT_ID = 'premium';

let Purchases: any = null;
let isInitialized = false;

// RevenueCat'i initialize et
export async function initializePurchases(): Promise<void> {
  try {
    // Web'de veya Expo Go'da mock mod çalışır
    const RNPurchases = require('react-native-purchases');
    Purchases = RNPurchases.default || RNPurchases;

    if (!isInitialized) {
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
      isInitialized = true;
      console.log('RevenueCat initialized');
    }
  } catch (error) {
    console.log('RevenueCat not available (web/Expo Go mode):', error);
  }
}

// Premium durumu kontrol et
export async function checkPremiumStatus(): Promise<boolean> {
  try {
    if (!Purchases) return false;
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo?.entitlements?.active?.[ENTITLEMENT_ID] !== undefined;
  } catch (error) {
    console.log('Premium check error:', error);
    return false;
  }
}

// Mevcut paketleri (offerings) getir
export async function getOfferings(): Promise<any> {
  try {
    if (!Purchases) return null;
    const offerings = await Purchases.getOfferings();
    return offerings?.current;
  } catch (error) {
    console.log('Offerings error:', error);
    return null;
  }
}

// Satın alma işlemi
export async function purchasePackage(pkg: any): Promise<boolean> {
  try {
    if (!Purchases) return false;
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo?.entitlements?.active?.[ENTITLEMENT_ID] !== undefined;
  } catch (error: any) {
    if (error.userCancelled) {
      console.log('User cancelled purchase');
    } else {
      console.error('Purchase error:', error);
    }
    return false;
  }
}

// Satın alma geri yükle (restore)
export async function restorePurchases(): Promise<boolean> {
  try {
    if (!Purchases) return false;
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo?.entitlements?.active?.[ENTITLEMENT_ID] !== undefined;
  } catch (error) {
    console.error('Restore error:', error);
    return false;
  }
}
`);

// ============================================
// 2. usePremium hook
// ============================================

writeFile('hooks/usePremium.ts', `
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializePurchases,
  checkPremiumStatus,
  getOfferings,
  purchasePackage,
  restorePurchases,
} from '../services/premium';

const PREMIUM_KEY = '@kismet_premium';

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offerings, setOfferings] = useState<any>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      // Önce local cache kontrol et (hızlı)
      const cached = await AsyncStorage.getItem(PREMIUM_KEY);
      if (cached === 'true') setIsPremium(true);

      // RevenueCat'i başlat
      await initializePurchases();

      // Gerçek durumu kontrol et
      const status = await checkPremiumStatus();
      setIsPremium(status);
      await AsyncStorage.setItem(PREMIUM_KEY, String(status));

      // Offerings'i yükle
      const offers = await getOfferings();
      setOfferings(offers);
    } catch (error) {
      console.log('Premium init error:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchase = useCallback(async (pkg: any): Promise<boolean> => {
    const success = await purchasePackage(pkg);
    if (success) {
      setIsPremium(true);
      await AsyncStorage.setItem(PREMIUM_KEY, 'true');
    }
    return success;
  }, []);

  const restore = useCallback(async (): Promise<boolean> => {
    const success = await restorePurchases();
    if (success) {
      setIsPremium(true);
      await AsyncStorage.setItem(PREMIUM_KEY, 'true');
    }
    return success;
  }, []);

  // DEV: Test için premium toggle (production'da kaldır)
  const togglePremiumDev = useCallback(async () => {
    const newState = !isPremium;
    setIsPremium(newState);
    await AsyncStorage.setItem(PREMIUM_KEY, String(newState));
  }, [isPremium]);

  return { isPremium, loading, offerings, purchase, restore, togglePremiumDev };
}
`);

// ============================================
// 3. Paywall Screen
// ============================================

writeFile('app/paywall.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Colors } from '../constants/colors';
import { usePremium } from '../hooks/usePremium';
import KismetButton from '../components/ui/KismetButton';
import i18n from '../i18n';

export default function PaywallScreen() {
  const router = useRouter();
  const { offerings, purchase, restore } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [purchasing, setPurchasing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lang = i18n.locale as 'tr' | 'en';

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const features = lang === 'tr' ? [
    { icon: '☕', text: 'Sınırsız Kahve Falı — AI Vision ile' },
    { icon: '🃏', text: 'Kişiselleştirilmiş Tarot Yorumları' },
    { icon: '🌙', text: 'Derin Rüya Tabiri — Claude AI' },
    { icon: '🖐️', text: 'El & Yüz Analizi — Kamera ile' },
    { icon: '📜', text: 'Okuma Geçmişi & Arşiv' },
    { icon: '🚫', text: 'Reklamsız Deneyim' },
    { icon: '⚡', text: 'Öncelikli AI İşleme' },
  ] : [
    { icon: '☕', text: 'Unlimited Coffee Cup Readings — AI Vision' },
    { icon: '🃏', text: 'Personalized Tarot Interpretations' },
    { icon: '🌙', text: 'Deep Dream Interpretation — Claude AI' },
    { icon: '🖐️', text: 'Palm & Face Analysis — Camera powered' },
    { icon: '📜', text: 'Reading History & Archive' },
    { icon: '🚫', text: 'Ad-free Experience' },
    { icon: '⚡', text: 'Priority AI Processing' },
  ];

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      // RevenueCat offerings'den paket seç
      const pkg = selectedPlan === 'yearly'
        ? offerings?.annual
        : offerings?.monthly;

      if (pkg) {
        const success = await purchase(pkg);
        if (success) router.back();
      } else {
        // Mock mode (web/test) — direkt geri dön
        console.log('Mock purchase — no real offerings available');
        router.back();
      }
    } catch (e) {
      console.error('Purchase failed:', e);
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    const success = await restore();
    if (success) router.back();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.deep }} contentContainerStyle={{ padding: 24, paddingTop: 50, paddingBottom: 40 }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Close button */}
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-end', marginBottom: 8 }}>
          <Text style={{ color: Colors.gray, fontSize: 28 }}>✕</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <Text style={{ fontSize: 48, marginBottom: 8 }}>✦</Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, textAlign: 'center', marginBottom: 4 }}>
            Kismet Premium
          </Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.gold, textAlign: 'center' }}>
            {lang === 'tr' ? 'Geleceğin sınırları kaldır' : 'Unlock the full cosmic experience'}
          </Text>
        </View>

        {/* Features */}
        <View style={{ marginBottom: 28 }}>
          {features.map((f, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14, paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 24 }}>{f.icon}</Text>
              <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.star, flex: 1, lineHeight: 20 }}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* Plan Selection */}
        <View style={{ gap: 12, marginBottom: 28 }}>
          {/* Yearly */}
          <TouchableOpacity
            onPress={() => setSelectedPlan('yearly')}
            activeOpacity={0.8}
            style={{
              borderRadius: 20, padding: 18, borderWidth: 2,
              borderColor: selectedPlan === 'yearly' ? Colors.gold : 'rgba(212,165,116,0.15)',
              backgroundColor: selectedPlan === 'yearly' ? 'rgba(212,165,116,0.1)' : 'rgba(255,255,255,0.02)',
              position: 'relative',
            }}
          >
            {/* Best value badge */}
            <View style={{ position: 'absolute', top: -10, right: 16, backgroundColor: Colors.gold, paddingVertical: 3, paddingHorizontal: 10, borderRadius: 8 }}>
              <Text style={{ color: Colors.deep, fontSize: 10, fontWeight: '800' }}>
                {lang === 'tr' ? 'EN AVANTAJLI' : 'BEST VALUE'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 17, color: Colors.star }}>
                  {lang === 'tr' ? 'Yıllık Plan' : 'Annual Plan'}
                </Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 13, color: Colors.gray, marginTop: 2 }}>
                  {lang === 'tr' ? '₺499.99/yıl — ₺41.67/ay' : '$39.99/year — $3.33/mo'}
                </Text>
              </View>
              <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedPlan === 'yearly' ? Colors.gold : Colors.gray, alignItems: 'center', justifyContent: 'center' }}>
                {selectedPlan === 'yearly' && <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.gold }} />}
              </View>
            </View>
            <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 12, color: Colors.gold, marginTop: 6 }}>
              {lang === 'tr' ? '🎉 %33 tasarruf' : '🎉 Save 33%'}
            </Text>
          </TouchableOpacity>

          {/* Monthly */}
          <TouchableOpacity
            onPress={() => setSelectedPlan('monthly')}
            activeOpacity={0.8}
            style={{
              borderRadius: 20, padding: 18, borderWidth: 2,
              borderColor: selectedPlan === 'monthly' ? Colors.gold : 'rgba(212,165,116,0.15)',
              backgroundColor: selectedPlan === 'monthly' ? 'rgba(212,165,116,0.1)' : 'rgba(255,255,255,0.02)',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 17, color: Colors.star }}>
                  {lang === 'tr' ? 'Aylık Plan' : 'Monthly Plan'}
                </Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 13, color: Colors.gray, marginTop: 2 }}>
                  {lang === 'tr' ? '₺49.99/ay' : '$4.99/month'}
                </Text>
              </View>
              <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedPlan === 'monthly' ? Colors.gold : Colors.gray, alignItems: 'center', justifyContent: 'center' }}>
                {selectedPlan === 'monthly' && <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.gold }} />}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* CTA Button */}
        <KismetButton
          title={purchasing
            ? (lang === 'tr' ? 'İşleniyor...' : 'Processing...')
            : (lang === 'tr' ? 'Premium\'a Geç ✦' : 'Go Premium ✦')
          }
          onPress={handlePurchase}
          disabled={purchasing}
          style={{ marginBottom: 16 }}
        />

        {/* Restore + Terms */}
        <TouchableOpacity onPress={handleRestore} style={{ alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 13, color: Colors.gold, textDecorationLine: 'underline' }}>
            {lang === 'tr' ? 'Satın alımı geri yükle' : 'Restore purchases'}
          </Text>
        </TouchableOpacity>

        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 16 }}>
          {lang === 'tr'
            ? 'Abonelik otomatik olarak yenilenir. İstediğin zaman App Store ayarlarından iptal edebilirsin. Ödeme Apple ID hesabına faturalanır.'
            : 'Subscription auto-renews. Cancel anytime in App Store settings. Payment charged to Apple ID account.'
          }
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
`);

// ============================================
// 4. Premium Gate Component
// ============================================

writeFile('components/ui/PremiumGate.tsx', `
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
          {lang === 'tr' ? 'Premium\'a Geç ✦' : 'Go Premium ✦'}
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
`);

// ============================================
// 5. Updated Home with Premium badge + paywall nav
// ============================================

writeFile('app/(tabs)/home.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import { useProfile } from '../../hooks/useProfile';
import { usePremium } from '../../hooks/usePremium';
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
                  {lang === 'tr' ? 'Premium\'a Geç' : 'Go Premium'}
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
`);

// ============================================
// 6. Updated Profile with Premium status
// ============================================

writeFile('app/(tabs)/profile.tsx', `
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useProfile } from '../../hooks/useProfile';
import { usePremium } from '../../hooks/usePremium';
import { getZodiacSign } from '../../constants/zodiac';
import { storage } from '../../services/storage';
import KismetButton from '../../components/ui/KismetButton';
import i18n from '../../i18n';

export default function ProfileScreen() {
  const { profile } = useProfile();
  const { isPremium, restore } = usePremium();
  const router = useRouter();
  const lang = i18n.locale as 'tr' | 'en';

  const zodiac = profile ? getZodiacSign(profile.birthDay, profile.birthMonth) : null;

  const handleReset = async () => {
    await storage.clearAll();
    router.replace('/onboarding/welcome');
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
              {lang === 'tr' ? 'Premium\'a yükselt ✦' : 'Upgrade to Premium ✦'}
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
            🌍 {lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReset} style={{ padding: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(231,76,60,0.2)', marginTop: 10 }}>
          <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: '#e74c3c', textAlign: 'center' }}>
            {lang === 'tr' ? '🗑️ Profili sıfırla (onboarding tekrar)' : '🗑️ Reset profile (restart onboarding)'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 32 }}>
        Kismet v1.0.0 • Powered by Claude AI
      </Text>
    </ScrollView>
  );
}
`);

console.log('\\n🔮 Premium & Paywall sistemi oluşturuldu!');
console.log('\\n📦 Oluşturulan dosyalar:');
console.log('  - services/premium.ts (RevenueCat entegrasyonu)');
console.log('  - hooks/usePremium.ts (Premium state yönetimi)');
console.log('  - app/paywall.tsx (Paywall ekranı — plan seçimi, özellik listesi)');
console.log('  - components/ui/PremiumGate.tsx (Premium kontrol bileşeni)');
console.log('  - app/(tabs)/home.tsx (Premium banner + kilitli modüller)');
console.log('  - app/(tabs)/profile.tsx (Premium durum, dil değiştirme, reset)');
console.log('\\n🧪 Test:');
console.log('  - npx expo start --web');
console.log('  - Ana ekranda Premium banner görünecek');
console.log('  - Kilitli modüle tıklayınca paywall açılacak');
console.log('  - DEV toggle ile premium aç/kapa test edilebilir');
console.log('  - Profil ekranında dil değiştirme ve reset var\\n');
