import type { OnRampConfig } from '../features/data/apis/config-types';

export const onRampConfig: OnRampConfig = {
  blockedTokens: {
    mtpelerin: {
      ethereum: ['jEUR', 'jCHF', 'jGBP', 'UST'],
      polygon: ['jEUR', 'jCHF', 'jCAD', 'jSGD', 'jSEK', 'jAUD', 'jJPY', 'UST'],
      bsc: ['jEUR', 'jCHF', 'jGBP', 'jZAR'],
      optimism: ['jEUR', 'jEUR'],
      fantom: ['UST'],
      arbitrum: [],
      avax: ['jEUR', 'jCHF', 'UST'],
      cronos: [],
      moonbeam: [],
      moonriver: [],
      metis: [],
      fuse: [],
      kava: [],
      canto: [],
      zksync: [],
      zkevm: [],
      base: [],
      gnosis: ['jEUR', 'jCHF'],
      linea: [],
      mantle: [],
      aurora: [],
      emerald: [],
      celo: [],
      heco: [],
      harmony: [],
    },
    transak: {
      bsc: ['BIFI'], // old BIFI
    },
  },
};
