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
