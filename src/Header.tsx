import { useEffect, useState } from 'react';
import {
  DexButton,
  DexInline,
  DexDropdownMenu,
  DexDropdownMenuItem,
  DexThryvLogo,
  DexText,
} from '@thryvlabs/dex-react';

function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(false);
  function handler(event: MediaQueryListEvent) {
    setMatches(event.matches);
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);
  return matches;
}

export function Header() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('dex-theme') ||
      document.body.dataset.theme ||
      'keap',
  );
  const [colorScheme, setColorScheme] = useState(
    () =>
      localStorage.getItem('dex-color-scheme') ||
      document.body.dataset.colorScheme ||
      'system',
  );
  const isPrefersDarkMode = useMatchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('dex-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dex-color-scheme', colorScheme);
    if (colorScheme === 'system') {
      document.body.dataset.colorScheme = isPrefersDarkMode ? 'dark' : 'light';
    } else {
      document.body.dataset.colorScheme = colorScheme;
    }
  }, [isPrefersDarkMode, colorScheme]);

  function setThemeAndColorScheme(theme: string, colorScheme: string) {
    setTheme(theme);
    setColorScheme(colorScheme);
  }

  return (
    <header className="header">
      <DexInline alignX="spread" alignY="center" stretch>
        <DexInline alignY="center" gap="200">
          <DexThryvLogo style={{ width: '100px' }} />

          <DexText as="h1" variant="display-2">
            DEX Sandbox
          </DexText>
        </DexInline>

        <DexDropdownMenu
          align="end"
          content={
            <>
              <DexDropdownMenuItem
                onSelect={() => setThemeAndColorScheme('keap', 'light')}
              >
                Keap Light
              </DexDropdownMenuItem>
              <DexDropdownMenuItem
                onSelect={() => setThemeAndColorScheme('keap', 'dark')}
              >
                Keap Dark
              </DexDropdownMenuItem>
              <DexDropdownMenuItem
                onSelect={() => setThemeAndColorScheme('keap', 'system')}
              >
                Keap System
              </DexDropdownMenuItem>
              <DexDropdownMenuItem
                onSelect={() => setThemeAndColorScheme('maverick', 'light')}
              >
                Maverick Light
              </DexDropdownMenuItem>
              <DexDropdownMenuItem
                onSelect={() => setThemeAndColorScheme('maverick', 'dark')}
              >
                Maverick Dark
              </DexDropdownMenuItem>
              <DexDropdownMenuItem
                onSelect={() => setThemeAndColorScheme('maverick', 'system')}
              >
                Maverick System
              </DexDropdownMenuItem>
            </>
          }
        >
          <DexButton variant="outline">Theme</DexButton>
        </DexDropdownMenu>
      </DexInline>
    </header>
  );
}

export default Header;
