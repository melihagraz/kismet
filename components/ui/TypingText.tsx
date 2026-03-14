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
