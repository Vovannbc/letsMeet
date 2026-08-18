import { useLayoutEffect, useRef, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const ref = useRef<HTMLElement | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const { height } = node.getBoundingClientRect();
    setHasHydrated(!!height);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
