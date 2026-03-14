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
