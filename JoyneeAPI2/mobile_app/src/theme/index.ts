import { type Theme } from '@react-navigation/native';

import { COLORS } from './colors';

const NAV_THEME: { light: Theme; dark: Theme } = {
  light: {
    dark: false,
    fonts: {
      regular: {
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Inter-Heavy',
        fontWeight: '800',
      },
    },
    colors: {
      background: COLORS.light.background,
      border: COLORS.light.grey5,
      card: COLORS.light.card,
      notification: COLORS.light.destructive,
      primary: COLORS.light.primary,
      text: COLORS.black,
    },
  },
  dark: {
    dark: true,
    fonts: {
      regular: {
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Inter-Heavy',
        fontWeight: '800',
      },
    },
    colors: {
      background: COLORS.dark.background,
      border: COLORS.dark.grey5,
      card: COLORS.dark.grey6,
      notification: COLORS.dark.destructive,
      primary: COLORS.dark.primary,
      text: COLORS.white,
    },
  },
};

export { NAV_THEME };
