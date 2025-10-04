import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: 'rgb(249, 249, 249)',
    grey5: 'rgb(240, 239, 238)',
    grey4: 'rgb(230, 228, 227)',
    grey3: 'rgb(215, 213, 211)',
    grey2: 'rgb(186, 182, 179)',
    grey: 'rgb(167, 161, 158)',
    background: 'rgb(250, 248, 247)',
    foreground: 'rgb(4, 3, 2)',
    root: 'rgb(250, 248, 247)',
    card: 'rgb(250, 248, 247)',
    destructive: 'rgb(255, 56, 43)',
    primary: 'rgb(255, 122, 34)',
  },
  dark: {
    grey6: 'rgb(29, 28, 27)',
    grey5: 'rgb(49, 46, 44)',
    grey4: 'rgb(62, 59, 56)',
    grey3: 'rgb(84, 79, 76)',
    grey2: 'rgb(129, 122, 117)',
    grey: 'rgb(166, 160, 157)',
    background: 'rgb(3, 1, 0)',
    foreground: 'rgb(255, 251, 249)',
    root: 'rgb(3, 1, 0)',
    card: 'rgb(3, 1, 0)',
    destructive: 'rgb(254, 67, 54)',
    primary: 'rgb(255, 122, 34)',
  },
} as const;

const ANDROID_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: 'rgb(249, 249, 249)',
    grey5: 'rgb(239, 239, 238)',
    grey4: 'rgb(229, 228, 228)',
    grey3: 'rgb(214, 213, 212)',
    grey2: 'rgb(185, 182, 181)',
    grey: 'rgb(165, 162, 160)',
    background: 'rgb(249, 248, 247)',
    foreground: 'rgb(3, 3, 3)',
    root: 'rgb(249, 248, 247)',
    card: 'rgb(249, 248, 247)',
    destructive: 'rgb(186, 26, 26)',
    primary: 'rgb(210, 147, 111)',
  },
  dark: {
    grey6: 'rgb(29, 28, 27)',
    grey5: 'rgb(48, 46, 45)',
    grey4: 'rgb(61, 59, 58)',
    grey3: 'rgb(82, 79, 78)',
    grey2: 'rgb(126, 122, 120)',
    grey: 'rgb(164, 161, 159)',
    background: 'rgb(2, 1, 1)',
    foreground: 'rgb(254, 252, 250)',
    root: 'rgb(2, 1, 1)',
    card: 'rgb(2, 1, 1)',
    destructive: 'rgb(147, 0, 10)',
    primary: 'rgb(210, 147, 111)',
  },
} as const;

const WEB_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: 'rgb(249, 249, 249)',
    grey5: 'rgb(239, 239, 238)',
    grey4: 'rgb(229, 228, 228)',
    grey3: 'rgb(214, 213, 212)',
    grey2: 'rgb(185, 182, 181)',
    grey: 'rgb(165, 162, 160)',
    background: 'rgb(249, 248, 247)',
    foreground: 'rgb(3, 3, 3)',
    root: 'rgb(249, 248, 247)',
    card: 'rgb(249, 248, 247)',
    destructive: 'rgb(186, 26, 26)',
    primary: 'rgb(210, 147, 111)',
  },
  dark: {
    grey6: 'rgb(29, 28, 27)',
    grey5: 'rgb(48, 46, 45)',
    grey4: 'rgb(61, 59, 58)',
    grey3: 'rgb(82, 79, 78)',
    grey2: 'rgb(126, 122, 120)',
    grey: 'rgb(164, 161, 159)',
    background: 'rgb(2, 1, 1)',
    foreground: 'rgb(254, 252, 250)',
    root: 'rgb(2, 1, 1)',
    card: 'rgb(2, 1, 1)',
    destructive: 'rgb(147, 0, 10)',
    primary: 'rgb(210, 147, 111)',
  },
} as const;

const COLORS =
  Platform.OS === 'ios'
    ? IOS_SYSTEM_COLORS
    : Platform.OS === 'android'
      ? ANDROID_COLORS
      : WEB_COLORS;

export { COLORS };
