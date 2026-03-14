import { useState, useEffect, useCallback } from 'react';
import { storage, UserProfile } from '../services/storage';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const p = await storage.getProfile();
      setProfile(p);
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = useCallback(async (p: UserProfile) => {
    await storage.saveProfile(p);
    setProfile(p);
    await storage.setOnboardingDone();
  }, []);

  return { profile, loading, saveProfile };
}
