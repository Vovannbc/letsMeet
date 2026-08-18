import { TextInput, type TextInputProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedTextInput({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <TextInput style={[{
    backgroundColor: theme[type ?? 'background'],
    color: theme[type ?? 'color']
  }, style]} {...otherProps} />;
}
