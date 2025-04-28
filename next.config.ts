import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import type { NextConfig } from 'next';

export default (phase: string, { defaultConfig }: {defaultConfig: NextConfig}) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const config: NextConfig = {
    // …common settings
    webpack: (cfg) => {
      if (isDev) {
        cfg.watchOptions = { poll: 1000, aggregateTimeout: 300 };
      }
      return cfg;
    },
  };
  return config;
};
