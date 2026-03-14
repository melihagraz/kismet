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
