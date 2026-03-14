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
