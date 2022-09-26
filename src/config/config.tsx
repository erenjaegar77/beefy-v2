export const config = {
  bsc: {
    name: 'BNB Chain',
    chainId: 56,
    rpc: [
      'https://rpc.ankr.com/bsc',
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
    ],
    explorerUrl: 'https://bscscan.com',
    multicallAddress: '0xB94858b0bB5437498F5453A16039337e5Fdc269C',
    appMulticallContractAddress: '0x72580937d2B5563792793e72200fC8942a4045D6',
    providerName: 'binance',
    walletSettings: {
      chainId: `0x${parseInt('56', 10).toString(16)}`,
      chainName: 'BSC Mainnet',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
    stableCoins: [
      'BUSD',
      'USDT',
      'USDC',
      'DAI',
      'VAI',
      'QUSD',
      'UST',
      'VENUS BLP',
      '3EPS',
      'fUSDT',
      '4BELT',
      'IRON',
      'DOLLY',
      'TUSD',
      'USDN',
      'WUSD',
      'USDO',
      'sbBUSD',
      'sbUSDT',
      'FRAX',
      'USDD',
      'MAI',
      'jBRL',
      'BRZ',
      'BRZw',
      'USD+',
      'HAY',
      'jCHF',
    ],
  },
  heco: {
    name: 'HECO',
    chainId: 128,
    rpc: ['https://http-mainnet.hecochain.com'],
    explorerUrl: 'https://hecoinfo.com',
    multicallAddress: '0x2776CF9B6E2Fa7B33A37139C3CB1ee362Ff0356e',
    appMulticallContractAddress: '0xeCD68D935Fd331EbA27381929845737346577943',
    providerName: 'heco',
    walletSettings: {
      chainId: `0x${parseInt('128', 10).toString(16)}`,
      chainName: 'HECO Mainnet',
      nativeCurrency: {
        name: 'Huobi Token',
        symbol: 'HT',
        decimals: 18,
      },
      rpcUrls: ['https://http-mainnet.hecochain.com'],
      blockExplorerUrls: ['https://scan.hecochain.com/'],
    },
    stableCoins: ['USDT', 'HUSD'],
  },
  avax: {
    name: 'Avalanche',
    chainId: 43114,
    rpc: ['https://api.avax.network/ext/bc/C/rpc'],
    explorerUrl: 'https://cchain.explorer.avax.network',
    multicallAddress: '0x6FfF95AC47b586bDDEea244b3c2fe9c4B07b9F76',
    appMulticallContractAddress: '0x911E556Afd49468429072A3677f895B3cE0AcCcB',
    providerName: 'avalanche',
    walletSettings: {
      chainId: `0x${parseInt('43114', 10).toString(16)}`,
      chainName: 'Avalanche C-Chain',
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
    },
    stableCoins: [
      'USDT',
      'DAI',
      'BUSD',
      'zDAI',
      'zUSDT',
      'USDTe',
      'BUSDe',
      'USDC',
      'USDCe',
      'DAIe',
      'MAI',
      'FRAX',
      'nUSD',
      'MIM',
      'USDC',
      'UST',
      'saUSDT',
      'saUSDC',
      'USTw',
    ],
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    rpc: ['https://polygon-rpc.com'],
    explorerUrl: 'https://polygonscan.com',
    multicallAddress: '0xC3821F0b56FA4F4794d5d760f94B812DE261361B',
    appMulticallContractAddress: '0x244908D9A21B143911D531cD1D37575D63da4D87',
    providerName: 'polygon',
    walletSettings: {
      chainId: `0x${parseInt('137', 10).toString(16)}`,
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    stableCoins: [
      'USDC',
      'USDT',
      'maUSDC',
      'DAI',
      'IRON',
      'MAI',
      'FRAX',
      'rUSD',
      'UST',
      'WUSD',
      'jEUR',
      'jGBP',
      'jCHF',
      'EURt',
      'TUSD',
      'PAR',
      'EURS',
      '4EUR',
      'agEUR',
      'jJPY',
      'JPYC',
      'jCAD',
      'CADC',
      'jSGD',
      'XSGD',
      'EURe',
      'USD+',
    ],
  },
  fantom: {
    name: 'Fantom',
    chainId: 250,
    rpc: ['https://rpc.ankr.com/fantom'],
    explorerUrl: 'https://ftmscan.com',
    multicallAddress: '0xC9F6b1B53E056fd04bE5a197ce4B2423d456B982',
    appMulticallContractAddress: '0xdd54c53d169aCFC53cAf08F1778A492Ff5Aea258',
    providerName: 'fantom',
    walletSettings: {
      chainId: `0x${parseInt('250', 10).toString(16)}`,
      chainName: 'Fantom Opera',
      nativeCurrency: {
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.ankr.com/fantom'],
      blockExplorerUrls: ['https://ftmscan.com/'],
    },
    stableCoins: [
      'USDC',
      'USDT',
      'DAI',
      'fUSDT',
      'MIM',
      'FRAX',
      'MAI',
      'DOLA',
      'TUSD',
      'UST',
      'asUSDC',
      'LAMBDA',
      'sfUSDC',
      'USTw',
      'USTaxl',
      'USDL',
      'TOR',
    ],
  },
  harmony: {
    name: 'Harmony',
    chainId: 1666600000,
    rpc: ['https://api.s0.t.hmny.io'],
    explorerUrl: 'https://explorer.harmony.one',
    multicallAddress: '0xBa5041B1c06e8c9cFb5dDB4b82BdC52E41EA5FC5',
    appMulticallContractAddress: '0xe8EeDE3a063AdF991096E317e916d9AF56cb11B2',
    providerName: 'harmony',
    walletSettings: {
      chainId: `0x${parseInt('1666600000', 10).toString(16)}`,
      chainName: 'Harmony One',
      nativeCurrency: {
        name: 'HARMONY',
        symbol: 'ONE',
        decimals: 18,
      },
      rpcUrls: ['https://api.s0.t.hmny.io/'],
      blockExplorerUrls: ['https://explorer.harmony.one/'],
    },
    stableCoins: ['BUSD', 'bscBUSD', 'USDC', 'USDT', 'UST', 'DAI', 'FRAX'],
  },
  arbitrum: {
    name: 'Arbitrum',
    chainId: 42161,
    rpc: ['https://arb1.arbitrum.io/rpc'],
    explorerUrl: 'https://arbiscan.io',
    multicallAddress: '0x13aD51a6664973EbD0749a7c84939d973F247921',
    appMulticallContractAddress: '0x332f4079E042A5764060E24C72DE765c8Ea1BC95',
    providerName: 'Arbitrum',
    walletSettings: {
      chainId: `0x${parseInt('42161', 10).toString(16)}`,
      chainName: 'Arbitrum One',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      blockExplorerUrls: ['https://arbiscan.io/'],
    },
    stableCoins: ['USDC', 'USDT', 'MIM', 'VST', 'DAI', 'sarUSDC', 'sarUSDT'],
  },
  celo: {
    name: 'Celo',
    chainId: 42220,
    rpc: ['https://forno.celo.org'],
    explorerUrl: 'https://explorer.celo.org',
    multicallAddress: '0xa9E6E271b27b20F65394914f8784B3B860dBd259',
    appMulticallContractAddress: '0x0bF5F48d8F761efAe0f187eCce60784e5d3E87E6',
    providerName: 'Celo',
    walletSettings: {
      chainId: `0x${parseInt('42220', 10).toString(16)}`,
      chainName: 'Celo',
      nativeCurrency: {
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18,
      },
      rpcUrls: ['https://forno.celo.org'],
      blockExplorerUrls: ['https://explorer.celo.org/'],
    },
    stableCoins: ['cUSD', 'cEUR', 'DAI', 'USDC', 'USDT'],
  },
  moonriver: {
    name: 'Moonriver',
    chainId: 1285,
    rpc: ['https://rpc.api.moonriver.moonbeam.network/'],
    explorerUrl: 'https://moonriver.moonscan.io/',
    multicallAddress: '0x7f6fE34C51d5352A0CF375C0Fbe03bD19eCD8460',
    appMulticallContractAddress: '0xe8EeDE3a063AdF991096E317e916d9AF56cb11B2',
    providerName: 'Moonriver',
    walletSettings: {
      chainId: `0x${parseInt('1285', 10).toString(16)}`,
      chainName: 'Moonriver',
      nativeCurrency: {
        name: 'Moonriver',
        symbol: 'MOVR',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.api.moonriver.moonbeam.network/'],
      blockExplorerUrls: ['https://moonriver.moonscan.io/'],
    },
    stableCoins: ['USDC', 'USDT', 'DAI', 'BUSD', 'MAI', 'MIM', 'FRAX'],
  },
  cronos: {
    name: 'Cronos',
    chainId: 25,
    rpc: ['https://evm.cronos.org'],
    explorerUrl: 'https://cronoscan.com/',
    multicallAddress: '0x13aD51a6664973EbD0749a7c84939d973F247921',
    appMulticallContractAddress: '0xc8872773ADcC8264eEBe5E40D97943434264e973',
    providerName: 'Cronos',
    walletSettings: {
      chainId: `0x${parseInt('25', 10).toString(16)}`,
      chainName: 'Cronos',
      nativeCurrency: {
        name: 'CRO',
        symbol: 'CRO',
        decimals: 18,
      },
      rpcUrls: ['https://evm.cronos.org'],
      blockExplorerUrls: ['https://cronoscan.com/'],
    },
    stableCoins: ['USDC', 'USDT', 'DAI', 'BUSD'],
  },
  fuse: {
    name: 'Fuse',
    chainId: 122,
    rpc: ['https://rpc.fuse.io'],
    explorerUrl: 'https://explorer.fuse.io',
    multicallAddress: '0x4f22BD7CE44b0e0B2681A28e300A7285319de3a0',
    appMulticallContractAddress: '0x504A5F167BE8014b1d5CBDd993f3Bb34F95E70B2',
    providerName: 'Fuse',
    walletSettings: {
      chainId: `0x${parseInt('122', 10).toString(16)}`,
      chainName: 'Fuse',
      nativeCurrency: {
        name: 'FUSE',
        symbol: 'FUSE',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.fuse.io'],
      blockExplorerUrls: ['https://explorer.fuse.io/'],
    },
    stableCoins: ['fUSD', 'BUSD', 'USDC', 'USDT'],
  },
  metis: {
    name: 'Metis',
    chainId: 1088,
    rpc: ['https://andromeda.metis.io/?owner=1088'],
    explorerUrl: 'https://andromeda-explorer.metis.io',
    multicallAddress: '0x4fd2e1c2395dc088F36cab06DCe47F88A912fC85',
    appMulticallContractAddress: '0xDc34b7e0f1F1512f088D1854a54EAFfD4dCaC7Bd',
    providerName: 'Metis',
    walletSettings: {
      chainId: `0x${parseInt('1088', 10).toString(16)}`,
      chainName: 'Metis',
      nativeCurrency: {
        name: 'METIS',
        symbol: 'METIS',
        decimals: 18,
      },
      rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
      blockExplorerUrls: ['https://andromeda-explorer.metis.io/'],
    },
    stableCoins: ['mUSDT', 'mUSDC'],
  },
  aurora: {
    name: 'Aurora',
    chainId: 1313161554,
    rpc: ['https://mainnet.aurora.dev'],
    explorerUrl: 'https://aurorascan.dev',
    multicallAddress: '0x55f46144bC62e9Af4bAdB71842B62162e2194E90',
    appMulticallContractAddress: '0x88D537a86e09B753361D70448d60D3dC2D75883d',
    providerName: 'Aurora',
    walletSettings: {
      chainId: `0x${parseInt('1313161554', 10).toString(16)}`,
      chainName: 'Aurora Mainnet',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.aurora.dev'],
      blockExplorerUrls: ['https://aurorascan.dev/'],
    },
    stableCoins: ['USDC', 'USDT', 'MAI', 'DAI', 'UST', 'aUSDO', 'USN'],
  },
  moonbeam: {
    name: 'Moonbeam',
    chainId: 1284,
    rpc: ['https://rpc.api.moonbeam.network'],
    explorerUrl: 'https://moonscan.io',
    multicallAddress: '0xC9F6b1B53E056fd04bE5a197ce4B2423d456B982',
    appMulticallContractAddress: '0xA4afDf57663951C6204E5110EE1741e8dfb0F3ec',
    providerName: 'Moonbeam',
    walletSettings: {
      chainId: `0x${parseInt('1284', 10).toString(16)}`,
      chainName: 'Moonbeam',
      nativeCurrency: {
        name: 'GLMR',
        symbol: 'GLMR',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.api.moonbeam.network'],
      blockExplorerUrls: ['https://moonscan.io/'],
    },
    stableCoins: ['USDC', 'USDT', 'DAI', 'BUSD', 'MAI', 'FRAX', 'USDTs', 'USDCs', 'DAIs'],
  },
  emerald: {
    name: 'Emerald',
    chainId: 42262,
    rpc: ['https://emerald.oasis.dev'],
    explorerUrl: 'https://explorer.emerald.oasis.dev',
    multicallAddress: '0xFE40f6eAD11099D91D51a945c145CFaD1DD15Bb8',
    appMulticallContractAddress: '0xd3C0A4AB6F68e3c12DEc753255b9f769E0bA615b',
    providerName: 'Oasis Emerald',
    walletSettings: {
      chainId: `0x${parseInt('42262', 10).toString(16)}`,
      chainName: 'Oasis Emerald',
      nativeCurrency: {
        name: 'Oasis Protocol',
        symbol: 'ROSE',
        decimals: 18,
      },
      rpcUrls: ['https://emerald.oasis.dev'],
      blockExplorerUrls: ['https://explorer.emerald.oasis.dev/'],
    },
    stableCoins: ['ceUSDC', 'USDT'],
  },
  optimism: {
    name: 'Optimism',
    chainId: 10,
    rpc: ['https://mainnet.optimism.io'],
    explorerUrl: 'https://optimistic.etherscan.io',
    multicallAddress: '0x820ae7bf39792d7ce7befc70b0172f4d267f1938',
    appMulticallContractAddress: '0x88D537a86e09B753361D70448d60D3dC2D75883d',
    providerName: 'Optimism',
    walletSettings: {
      chainId: `0x${parseInt('10', 10).toString(16)}`,
      chainName: 'Optimism',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.optimism.io'],
      blockExplorerUrls: ['https://optimistic.etherscan.io/'],
    },
    stableCoins: [
      'USDC',
      'sUSD',
      'DAI',
      'USDT',
      'MAI',
      'FRAX',
      'LUSD',
      'alUSD',
      'DOLA',
      'soUSDC',
      'USD+',
    ],
  },
};

/*
 BOILERPLATE NEW CHAIN
name: '',
chainId:0 ,
rpc: [''],
explorerUrl: '',
multicallAddress: '',
providerName: '',
walletSettings: {
chainId: `0x${parseInt('', 10).toString(16)}`,
chainName: '',
nativeCurrency: {
name: '',
symbol: '',
decimals: 0,
},
rpcUrls: [''],
blockExplorerUrls: [''],
},
stableCoins: [''],
 */
export const chains: string[] = Object.keys(config);
