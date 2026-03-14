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
