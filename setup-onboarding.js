// Kismet Onboarding Screens Setup
// D:\uygulamalar\kismet klasöründe çalıştır:
// node setup-onboarding.js

const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✅ ' + filePath);
}

// ============================================
// Shared UI Components
// ============================================

writeFile('components/ui/TypingText.tsx', `
import { useState, useEffect, useRef } from 'react';
import { Text, TextStyle } from 'react-native';

interface Props {
  text: string;
  speed?: number;
  style?: TextStyle;
  onDone?: () => void;
}

export default function TypingText({ text, speed = 22, style, onDone }: Props) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <Text style={style}>
      {displayed}
      <Text style={{ opacity: displayed.length < text.length ? 1 : 0 }}>|</Text>
    </Text>
  );
}
`);

writeFile('components/ui/ProgressDots.tsx', `
import { View } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  step: number;
  total: number;
}

export default function ProgressDots({ step, total }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{
            width: i === step ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i <= step ? Colors.gold : 'rgba(255,255,255,0.1)',
          }}
        />
      ))}
    </View>
  );
}
`);

writeFile('components/ui/KismetButton.tsx', `
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function KismetButton({ title, onPress, variant = 'primary', disabled, style }: Props) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        {
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        isPrimary && {
          backgroundColor: Colors.gold,
          shadowColor: Colors.gold,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 6,
        },
        isOutline && {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.gold,
        },
        variant === 'ghost' && {
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.1)',
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: 'PlayfairDisplay_700Bold',
          fontSize: 16,
          color: isPrimary ? Colors.deep : Colors.star,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
`);

writeFile('components/ui/Chip.tsx', `
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
}

export default function Chip({ label, selected, onPress, icon }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: selected ? Colors.gold : 'rgba(255,255,255,0.05)',
        borderWidth: selected ? 0 : 1,
        borderColor: 'rgba(212,165,116,0.2)',
      }}
    >
      <Text
        style={{
          fontFamily: 'PlayfairDisplay_600SemiBold',
          fontSize: 13,
          color: selected ? Colors.deep : Colors.star,
        }}
      >
        {icon ? icon + ' ' : ''}{label}
      </Text>
    </TouchableOpacity>
  );
}
`);

writeFile('components/ui/Badge.tsx', `
import { View, Text } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  type: 'free' | 'premium' | 'instant' | 'ai';
}

export default function Badge({ type }: Props) {
  const config = {
    free: { bg: 'rgba(46,204,113,0.2)', color: Colors.success, border: 'rgba(46,204,113,0.3)', label: 'FREE' },
    premium: { bg: 'rgba(83,52,131,0.3)', color: Colors.premium, border: 'transparent', label: 'PREMIUM' },
    instant: { bg: Colors.gold, color: Colors.deep, border: 'transparent', label: '⚡ INSTANT' },
    ai: { bg: 'rgba(83,52,131,0.3)', color: Colors.premium, border: 'transparent', label: 'AI' },
  };
  const c = config[type];

  return (
    <View style={{ backgroundColor: c.bg, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6, borderWidth: c.border !== 'transparent' ? 1 : 0, borderColor: c.border }}>
      <Text style={{ fontSize: 9, fontWeight: '800', letterSpacing: 1, color: c.color }}>{c.label}</Text>
    </View>
  );
}
`);

// ============================================
// Onboarding Layout
// ============================================

writeFile('app/onboarding/_layout.tsx', `
import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.deep },
        animation: 'slide_from_right',
      }}
    />
  );
}
`);

// ============================================
// Screen 1: Welcome
// ============================================

writeFile('app/onboarding/welcome.tsx', `
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
      <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.gray, textAlign: 'center', marginBottom: 48, lineHeight: 22 }}>
        {i18n.t('onboarding.welcomeSub')}
      </Text>
      <KismetButton title={i18n.t('onboarding.start')} onPress={() => router.push('/onboarding/name')} />
    </Animated.View>
  );
}
`);

// ============================================
// Screen 2: Name
// ============================================

writeFile('app/onboarding/name.tsx', `
import { View, Text, TextInput, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import ProgressDots from '../../components/ui/ProgressDots';
import i18n from '../../i18n';

export default function NameScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, padding: 24, paddingTop: 60, opacity: fadeAnim }}>
      <ProgressDots step={0} total={6} />
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>👋</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, textAlign: 'center', marginBottom: 28 }}>
          {i18n.t('onboarding.nameQ')}
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={i18n.t('onboarding.namePlaceholder')}
          placeholderTextColor="rgba(240,230,211,0.3)"
          style={{
            width: '100%',
            maxWidth: 340,
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(212,165,116,0.2)',
            backgroundColor: 'rgba(255,255,255,0.04)',
            color: Colors.star,
            fontSize: 18,
            fontFamily: 'PlayfairDisplay_400Regular',
            textAlign: 'center',
          }}
        />
        <View style={{ marginTop: 28 }}>
          <KismetButton
            title={i18n.t('onboarding.next')}
            onPress={() => router.push({ pathname: '/onboarding/birthdate', params: { name } })}
            disabled={!name.trim()}
          />
        </View>
      </View>
    </Animated.View>
  );
}
`);

// ============================================
// Screen 3: Birth Date
// ============================================

writeFile('app/onboarding/birthdate.tsx', `
import { View, Text, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import ProgressDots from '../../components/ui/ProgressDots';
import Chip from '../../components/ui/Chip';
import { getZodiacSign } from '../../constants/zodiac';
import i18n from '../../i18n';

export default function BirthDateScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(1995);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const zodiac = getZodiacSign(day, month);
  const lang = i18n.locale as 'tr' | 'en';
  const months = lang === 'tr'
    ? ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <Animated.View style={{ flex: 1, padding: 24, paddingTop: 60, opacity: fadeAnim }}>
      <ProgressDots step={1} total={6} />
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>🎂</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, textAlign: 'center', marginBottom: 24 }}>
          {i18n.t('onboarding.birthQ')}
        </Text>

        {/* Day selector */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 16, maxWidth: 360 }}>
          {[1,5,10,15,20,25,28].map(d => (
            <Chip key={d} label={String(d)} selected={day === d} onPress={() => setDay(d)} />
          ))}
        </View>

        {/* Month selector */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 16, maxWidth: 360 }}>
          {months.map((m, i) => (
            <Chip key={i} label={m} selected={month === i + 1} onPress={() => setMonth(i + 1)} />
          ))}
        </View>

        {/* Year selector - simplified */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 20, maxWidth: 360 }}>
          {[1985, 1990, 1995, 2000, 2005].map(y => (
            <Chip key={y} label={String(y)} selected={year === y} onPress={() => setYear(y)} />
          ))}
        </View>

        {/* Zodiac result */}
        <View style={{ backgroundColor: 'rgba(212,165,116,0.1)', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <Text style={{ fontSize: 36 }}>{zodiac.symbol}</Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 18, color: Colors.star }}>
            {i18n.t('onboarding.youAre')} {zodiac[lang]}!
          </Text>
        </View>

        <KismetButton
          title={i18n.t('onboarding.next')}
          onPress={() => router.push({ pathname: '/onboarding/birthplace', params: { name, day: String(day), month: String(month), year: String(year) } })}
        />
      </View>
    </Animated.View>
  );
}
`);

// ============================================
// Screen 4: Birth Place
// ============================================

writeFile('app/onboarding/birthplace.tsx', `
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
`);

// ============================================
// Screen 5: Gender
// ============================================

writeFile('app/onboarding/gender.tsx', `
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
`);

// ============================================
// Screen 6: Lifestyle (Relation + Focus)
// ============================================

writeFile('app/onboarding/lifestyle.tsx', `
import { View, Text, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import ProgressDots from '../../components/ui/ProgressDots';
import Chip from '../../components/ui/Chip';
import i18n from '../../i18n';

export default function LifestyleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [relation, setRelation] = useState('');
  const [focus, setFocus] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const toggleFocus = (f: string) => {
    setFocus(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const relations = [
    { key: 'single', label: i18n.t('onboarding.single') },
    { key: 'relation', label: i18n.t('onboarding.inRelation') },
    { key: 'married', label: i18n.t('onboarding.married') },
    { key: 'complicated', label: i18n.t('onboarding.complicated') },
  ];

  const focusOptions = [
    { key: 'love', label: i18n.t('onboarding.love'), icon: '💕' },
    { key: 'career', label: i18n.t('onboarding.career'), icon: '💼' },
    { key: 'money', label: i18n.t('onboarding.money'), icon: '💰' },
    { key: 'health', label: i18n.t('onboarding.health'), icon: '🏃' },
    { key: 'family', label: i18n.t('onboarding.family'), icon: '👨‍👩‍👧' },
    { key: 'growth', label: i18n.t('onboarding.growth'), icon: '🌱' },
  ];

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, alignItems: 'center' }}>
        <ProgressDots step={4} total={6} />

        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, textAlign: 'center', marginBottom: 16 }}>
          {i18n.t('onboarding.relationQ')}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {relations.map(r => (
            <Chip key={r.key} label={r.label} selected={relation === r.key} onPress={() => setRelation(r.key)} />
          ))}
        </View>

        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: Colors.star, textAlign: 'center', marginBottom: 16 }}>
          {i18n.t('onboarding.lifeQ')}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {focusOptions.map(f => (
            <Chip key={f.key} label={f.label} icon={f.icon} selected={focus.includes(f.key)} onPress={() => toggleFocus(f.key)} />
          ))}
        </View>

        <KismetButton
          title={i18n.t('onboarding.next')}
          onPress={() => router.push({ pathname: '/onboarding/interests', params: { ...params, relation, focus: focus.join(',') } })}
          disabled={!relation || focus.length === 0}
        />
      </ScrollView>
    </Animated.View>
  );
}
`);

// ============================================
// Screen 7: Interests + Experience
// ============================================

writeFile('app/onboarding/interests.tsx', `
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
`);

// ============================================
// Screen 8: Ready!
// ============================================

writeFile('app/onboarding/ready.tsx', `
import { View, Text, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Colors } from '../../constants/colors';
import KismetButton from '../../components/ui/KismetButton';
import { getZodiacSign } from '../../constants/zodiac';
import { useProfile } from '../../hooks/useProfile';
import i18n from '../../i18n';

export default function ReadyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveProfile } = useProfile();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const name = params.name as string || '';
  const day = parseInt(params.day as string) || 15;
  const month = parseInt(params.month as string) || 6;
  const year = parseInt(params.year as string) || 1995;
  const city = params.city as string || '';
  const gender = params.gender as string || '';
  const relation = params.relation as string || '';
  const focus = (params.focus as string || '').split(',').filter(Boolean);
  const interests = (params.interests as string || '').split(',').filter(Boolean);
  const experience = params.experience as string || '';

  const zodiac = getZodiacSign(day, month);
  const lang = i18n.locale as 'tr' | 'en';

  const handleComplete = async () => {
    await saveProfile({
      name,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      city,
      gender,
      relation,
      focus,
      interests,
      experience,
    });
    router.replace('/(tabs)/home');
  };

  const interestIcons: Record<string, string> = {
    coffee: '☕', tarot: '🃏', horoscope: '✨', dream: '🌙', palmface: '🖐️',
  };

  return (
    <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, opacity: fadeAnim }}>
      <Text style={{ fontSize: 64, marginBottom: 16 }}>{zodiac.symbol}</Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: Colors.star, marginBottom: 8 }}>
        {i18n.t('onboarding.ready')}
      </Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 20, color: Colors.gold, marginBottom: 24 }}>
        {name}
      </Text>

      <View style={{
        backgroundColor: 'rgba(212,165,116,0.08)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxWidth: 320,
        borderWidth: 1,
        borderColor: 'rgba(212,165,116,0.15)',
        marginBottom: 32,
        alignItems: 'center',
      }}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15, color: Colors.star, marginBottom: 12 }}>
          {zodiac[lang]} {zodiac.symbol} • {city || '—'}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {interests.map(i => (
            <View key={i} style={{ backgroundColor: 'rgba(212,165,116,0.15)', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.gold }}>
                {interestIcons[i] || '✦'} {i18n.t('modules.' + i) || i}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <KismetButton title={i18n.t('onboarding.readyCta')} onPress={handleComplete} />
    </Animated.View>
  );
}
`);

// ============================================
// Tabs Layout + Home (placeholder)
// ============================================

writeFile('app/(tabs)/_layout.tsx', `
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.deep,
          borderTopColor: 'rgba(212,165,116,0.1)',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: {
          fontFamily: 'PlayfairDisplay_600SemiBold',
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Kismet',
          tabBarIcon: ({ color }) => <TabIcon icon="✦" color={color} />,
        }}
      />
      <Tabs.Screen
        name="readings"
        options={{
          title: 'Readings',
          tabBarIcon: ({ color }) => <TabIcon icon="📜" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: 20 }}>{icon}</Text>;
}
`);

writeFile('app/(tabs)/home.tsx', `
import { View, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useProfile } from '../../hooks/useProfile';
import i18n from '../../i18n';

export default function HomeScreen() {
  const { profile } = useProfile();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.deep, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>✦</Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: Colors.star, marginBottom: 8 }}>
        {i18n.t('common.welcome')}, {profile?.name || 'User'}!
      </Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 14, color: Colors.gray, textAlign: 'center' }}>
        {i18n.t('app.tagline')}
      </Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 12, color: Colors.gold, marginTop: 24 }}>
        🚧 Ana ekran Faz 2'de tamamlanacak
      </Text>
    </View>
  );
}
`);

writeFile('app/(tabs)/readings.tsx', `
import { View, Text } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ReadingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.deep, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>📜</Text>
      <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: Colors.star }}>Okuma Geçmişi</Text>
      <Text style={{ color: Colors.gray, marginTop: 8, fontSize: 13 }}>Premium özellik — yakında</Text>
    </View>
  );
}
`);

writeFile('app/(tabs)/profile.tsx', `
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
`);

console.log('\\n🔮 Onboarding + UI bileşenleri oluşturuldu!');
console.log('\\nŞimdi çalıştır: npx expo start --web');
console.log('Tarayıcıda 8 ekranlık onboarding akışını göreceksin!\\n');
