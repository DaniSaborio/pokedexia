import { config as defaultConfig } from '@tamagui/config';
import { createTamagui } from 'tamagui';

const config = createTamagui(defaultConfig);

export type Conf = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
