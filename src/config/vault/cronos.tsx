export const pools = [
  {
    id: "cronos-bifi-gov",
    logo: "single-assets/BIFI.png",
    name: "BIFI Earnings Pool",
    token: "BIFI",
    tokenDescription: "Beefy.Finance",
    tokenAddress: "0xe6801928061CDbE32AC5AD0634427E140EFd05F9",
    tokenDecimals: 18,
    tokenDescriptionUrl: "https://docs.beefy.finance/moo/ecosystem/bifi-token/tokenomics-and-governance",
    earnedToken: "WCRO",
    earnedTokenAddress: "0x107Dbf9c9C0EF2Df114159e5C7DC2baf7C444cFF",
    earnContractAddress: "0x107Dbf9c9C0EF2Df114159e5C7DC2baf7C444cFF",
    poolAddress: "0x107Dbf9c9C0EF2Df114159e5C7DC2baf7C444cFF",
    pricePerFullShare: 1,
    isGovVault: true,
    tvl: 0,
    oracle: "tokens",
    oracleId: "BIFI",
    oraclePrice: 0,
    status: "active",
    platform: "Beefy.Finance",
    assets: [
      "BIFI"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_NONE",
      "MCAP_SMALL",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "SingleStake",
    callFee: 0.5,
    withdrawalFee: "0%",
    createdAt: 1623706144,
    network: "cronos"
  },
  {
    id: "vvs-vvs",
    logo: "single-assets/VVS.svg",
    name: "VVS",
    token: "VVS",
    tokenDescription: "VVS",
    tokenAddress: "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvs",
    earnedTokenAddress: "0xb29cCE04365400409d476e95410547275D1F86Cf",
    earnContractAddress: "0xb29cCE04365400409d476e95410547275D1F86Cf",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "tokens",
    oracleId: "VVS",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "VVS"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_SMALL",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "SingleStake",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
    network: "cronos",
    withdrawalFee: "0%"
  },
  {
    id: "vvs-vvs-usdc",
    name: "VVS-USDC",
    token: "VVS-USDC LP",
    tokenDescription: "VVS",
    tokenAddress: "0x814920D1b8007207db6cB5a2dD92bF0b082BDBa1",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsVVS-USDC",
    earnedTokenAddress: "0x78757cdC2124A34aC5382602a95B4776D6111549",
    earnContractAddress: "0x78757cdC2124A34aC5382602a95B4776D6111549",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-vvs-usdc",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "VVS",
      "USDC"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_SMALL",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
    addLiquidityUrl: "https://vvs.finance/add/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59/0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
    network: "cronos",
    withdrawalFee: "0%"
  },
  {
    id: "vvs-vvs-cro",
    name: "VVS-CRO",
    token: "VVS-CRO LP",
    tokenDescription: "VVS",
    tokenAddress: "0xbf62c67eA509E86F07c8c69d0286C0636C50270b",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsVVS-CRO",
    earnedTokenAddress: "0x2fbB1caF6271A14b13F3432f3aB2D6aF102560fA",
    earnContractAddress: "0x2fbB1caF6271A14b13F3432f3aB2D6aF102560fA",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-vvs-cro",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "VVS",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_SMALL",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
    addLiquidityUrl: "https://vvs.finance/add/CRO/0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
    network: "cronos",
    withdrawalFee: "0%"
  },
  {
    id: "vvs-cro-eth",
    name: "CRO-ETH",
    token: "CRO-ETH LP",
    tokenDescription: "VVS",
    tokenAddress: "0xA111C17f8B8303280d3EB01BBcd61000AA7F39F9",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsCRO-ETH",
    earnedTokenAddress: "0xB5F0fF997BEc850b11792ed07b2B5AbDEa869B84",
    earnContractAddress: "0xB5F0fF997BEc850b11792ed07b2B5AbDEa869B84",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-cro-eth",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "CRO",
      "ETH"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
    addLiquidityUrl: "https://vvs.finance/add/CRO/0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
    network: "cronos",
    withdrawalFee: "0%"
  },
  {
    id: "vvs-cro-btc",
    name: "CRO-BTC",
    token: "CRO-BTC LP",
    tokenDescription: "VVS",
    tokenAddress: "0x8F09fFf247B8fDB80461E5Cf5E82dD1aE2EBd6d7",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsCRO-BTC",
    earnedTokenAddress: "0x25DE69dA4469A96974FaE79d0C41366A63317FDC",
    earnContractAddress: "0x25DE69dA4469A96974FaE79d0C41366A63317FDC",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-cro-btc",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "CRO",
      "WBTC"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0x062E66477Faf219F25D27dCED647BF57C3107d52",
    addLiquidityUrl: "https://vvs.finance/add/CRO/0x062E66477Faf219F25D27dCED647BF57C3107d52",
    network: "cronos",
    withdrawalFee: "0%"
  },
  {
    id: "vvs-cro-shib",
    name: "SHIB-CRO",
    token: "SHIB-CRO LP",
    tokenDescription: "VVS",
    tokenAddress: "0xc9eA98736dbC94FAA91AbF9F4aD1eb41e7fb40f4",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsCRO-SHIB",
    earnedTokenAddress: "0x65BF4169Df9De114c7222cf23cCF012305e58bd0",
    earnContractAddress: "0x65BF4169Df9De114c7222cf23cCF012305e58bd0",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-cro-shib",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "SHIB",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    withdrawalFee: "0%",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee",
    addLiquidityUrl: "https://vvs.finance/add/CRO/0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee",
    network: "cronos"
  },
  {
    id: "vvs-vvs-usdt",
    name: "VVS-USDT",
    token: "VVS-USDT LP",
    tokenDescription: "VVS",
    tokenAddress: "0x280aCAD550B2d3Ba63C8cbff51b503Ea41a1c61B",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsVVS-USDT",
    earnedTokenAddress: "0x2425d707a5C63ff5De83eB78f63e06c3f6eEaA1c",
    earnContractAddress: "0x2425d707a5C63ff5De83eB78f63e06c3f6eEaA1c",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-vvs-usdt",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "VVS",
      "USDT"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    withdrawalFee: "0%",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770",
    addLiquidityUrl: "https://vvs.finance/add/0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03/0x66e428c3f67a68878562e79A0234c1F83c208770",
    network: "cronos"
  },
  {
    id: "vvs-usdt-usdc",
    name: "USDT-USDC",
    token: "USDT-USDC LP",
    tokenDescription: "VVS",
    tokenAddress: "0x39cC0E14795A8e6e9D02A21091b81FE0d61D82f9",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooVvsUSDT-USDC",
    earnedTokenAddress: "0xB38D32336538559Ce6680952B0Be4917ed015c39",
    earnContractAddress: "0xB38D32336538559Ce6680952B0Be4917ed015c39",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "vvs-usdt-usdc",
    oraclePrice: 0,
    status: "active",
    platform: "VVS",
    assets: [
      "USDT",
      "USDC"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_NONE",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    withdrawalFee: "0%",
    buyTokenUrl: "https://vvs.finance/swap?outputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770",
    addLiquidityUrl: "https://vvs.finance/add/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59/0x66e428c3f67a68878562e79A0234c1F83c208770",
    network: "cronos"
  },
  {
    id: "crona-crona",
    logo: "single-assets/CRONA.svg",
    name: "CRONA",
    token: "CRONA",
    tokenDescription: "CronaSwap",
    tokenAddress: "0xadbd1231fb360047525BEdF962581F3eee7b49fe",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCrona",
    earnedTokenAddress: "0x0a2289a7eE8A1f2A6B0E2320f47D8d0ff143f436",
    earnContractAddress: "0x0a2289a7eE8A1f2A6B0E2320f47D8d0ff143f436",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "tokens",
    oracleId: "CRONA",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "CRONA"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_NONE",
      "MCAP_MICRO",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "SingleStake",
    withdrawalFee: "0%",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0xadbd1231fb360047525BEdF962581F3eee7b49fe",
    network: "cronos"
  },
  {
    id: "crona-cro-crona",
    name: "CRONA-CRO",
    token: "CRONA-CRO LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0xeD75347fFBe08d5cce4858C70Df4dB4Bbe8532a0",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaCRO-CRONA",
    earnedTokenAddress: "0x8a3030e494a9c0FF12F46D0ce3F1a610dCe9B2eD",
    earnContractAddress: "0x8a3030e494a9c0FF12F46D0ce3F1a610dCe9B2eD",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-cro-crona",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "CRONA",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_HIGH",
      "MCAP_MICRO",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0xadbd1231fb360047525BEdF962581F3eee7b49fe",
    addLiquidityUrl: "https://app.cronaswap.org/add/CRO/0xadbd1231fb360047525BEdF962581F3eee7b49fe",
    network: "cronos"
  },
  {
    id: "crona-cro-usdc",
    name: "USDC-CRO",
    token: "USDC-CRO LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x0625A68D25d304aed698c806267a4e369e8Eb12a",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaCRO-USDC",
    earnedTokenAddress: "0x8920E4d28Cd2DF033a18803d2081662b3b30B40b",
    earnContractAddress: "0x8920E4d28Cd2DF033a18803d2081662b3b30B40b",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-cro-usdc",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "USDC",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    addLiquidityUrl: "https://app.cronaswap.org/add/CRO/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    network: "cronos"
  },
  {
    id: "crona-cro-usdt",
    name: "USDT-CRO",
    token: "USDT-CRO LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x19Dd1683e8c5F6Cc338C1438f2D25EBb4e0b0b08",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaCRO-USDT",
    earnedTokenAddress: "0xdc036Ab31d2f105E15c1896f88D13B7bcF3e9292",
    earnContractAddress: "0xdc036Ab31d2f105E15c1896f88D13B7bcF3e9292",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-cro-usdt",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "USDT",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    addLiquidityUrl: "https://app.cronaswap.org/add/CRO/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    network: "cronos"
  },
  {
    id: "crona-cro-eth",
    name: "ETH-CRO",
    token: "ETH-CRO LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x8232aA9C3EFf79cd845FcDa109B461849Bf1Be83",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaCRO-ETH",
    earnedTokenAddress: "0x40324434a0b53dd1ED167Ba30dcB6B4bd7a9536d",
    earnContractAddress: "0x40324434a0b53dd1ED167Ba30dcB6B4bd7a9536d",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-cro-eth",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "ETH",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
    addLiquidityUrl: "https://app.cronaswap.org/add/CRO/0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
    network: "cronos"
  },
  {
    id: "crona-wbtc-cro",
    name: "WBTC-CRO",
    token: "WBTC-CRO LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0xb4684F52867dC0dDe6F931fBf6eA66Ce94666860",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaWBTC-CRO",
    earnedTokenAddress: "0xc7024B02a3C3893C482F5DD03193CFD1DBEC604f",
    earnContractAddress: "0xc7024B02a3C3893C482F5DD03193CFD1DBEC604f",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-wbtc-cro",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "WBTC",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0x062E66477Faf219F25D27dCED647BF57C3107d52",
    addLiquidityUrl: "https://app.cronaswap.org/add/CRO/0x062E66477Faf219F25D27dCED647BF57C3107d52",
    network: "cronos"
  },
  {
    id: "crona-cro-dai",
    name: "DAI-CRO",
    token: "DAI-CRO LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0xDA2FC0fE4B03deFf09Fd8CFb92d14e7ebC1F9690",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaCRO-DAI",
    earnedTokenAddress: "0x38002A6456D995AAc598bf59049151631D37689F",
    earnContractAddress: "0x38002A6456D995AAc598bf59049151631D37689F",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-cro-dai",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "DAI",
      "CRO"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?outputCurrency=0xF2001B145b43032AAF5Ee2884e456CCd805F677D",
    addLiquidityUrl: "https://app.cronaswap.org/add/CRO/0xF2001B145b43032AAF5Ee2884e456CCd805F677D",
    network: "cronos"
  },
  {
    id: "crona-usdt-busd",
    name: "BUSD-USDT",
    token: "BUSD-USDT LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x503d56B2f535784B7f2bcD6581F7e1b46DC0e60c",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaUSDT-BUSD",
    earnedTokenAddress: "0x26be7875EE1738d8ae77ae6Bf1603beA11D525E2",
    earnContractAddress: "0x26be7875EE1738d8ae77ae6Bf1603beA11D525E2",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-usdt-busd",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "BUSD",
      "USDT"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_NONE",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?inputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770&outputCurrency=0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8",
    addLiquidityUrl: "https://app.cronaswap.org/add/0x66e428c3f67a68878562e79A0234c1F83c208770/0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8",
    network: "cronos"
  },
  {
    id: "crona-usdt-matic",
    name: "MATIC-USDT",
    token: "MATIC-USDT LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x394080F7c770771B6EE4f4649bC477F0676ceA5C",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaUSDT-MATIC",
    earnedTokenAddress: "0xbFBF98294243ff91e6B8dDcAD5eeB107e3677481",
    earnContractAddress: "0xbFBF98294243ff91e6B8dDcAD5eeB107e3677481",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-usdt-matic",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "MATIC",
      "USDT"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?inputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770&outputCurrency=0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055",
    addLiquidityUrl: "https://app.cronaswap.org/add/0x66e428c3f67a68878562e79A0234c1F83c208770/0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055",
    network: "cronos"
  },
  {
    id: "crona-usdt-avax",
    name: "AVAX-USDT",
    token: "AVAX-USDT LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x193add22b0a333956C2Cb13F4D574aF129629c5f",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaUSDT-AVAX",
    earnedTokenAddress: "0x0b3d82ef5b3De82F12899eB85a65CeE2617f4198",
    earnContractAddress: "0x0b3d82ef5b3De82F12899eB85a65CeE2617f4198",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-usdt-avax",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "AVAX",
      "USDT"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?inputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770&outputCurrency=0x765277EebeCA2e31912C9946eAe1021199B39C61",
    addLiquidityUrl: "https://app.cronaswap.org/add/0x66e428c3f67a68878562e79A0234c1F83c208770/0x765277EebeCA2e31912C9946eAe1021199B39C61",
    network: "cronos"
  },
  {
    id: "crona-usdt-ftm",
    name: "FTM-USDT",
    token: "FTM-USDT LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0xDee7A79bb414FFB248EF4d4c5560AdC91F547F41",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaUSDT-FTM",
    earnedTokenAddress: "0xc07E03eE5E7c61F7EeCB5FF6FaBE2eA307433bD7",
    earnContractAddress: "0xc07E03eE5E7c61F7EeCB5FF6FaBE2eA307433bD7",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-usdt-ftm",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "FTM",
      "USDT"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_LOW",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?inputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770&outputCurrency=0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
    addLiquidityUrl: "https://app.cronaswap.org/add/0x66e428c3f67a68878562e79A0234c1F83c208770/0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
    network: "cronos"
  },
  {
    id: "crona-usdt-usdc",
    name: "USDC-USDT",
    token: "USDC-USDT LP",
    tokenDescription: "CronaSwap",
    tokenAddress: "0x968fE4C06fdD503E278d89d5dFe29935A111476C",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "mooCronaUSDT-USDC",
    earnedTokenAddress: "0x3586DaCe267C48436ED12BFdF665C2E63DEeb199",
    earnContractAddress: "0x3586DaCe267C48436ED12BFdF665C2E63DEeb199",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "crona-usdt-usdc",
    oraclePrice: 0,
    status: "active",
    platform: "CronaSwap",
    assets: [
      "USDC",
      "USDT"
    ],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_NONE",
      "MCAP_LARGE",
      "AUDIT",
      "CONTRACTS_VERIFIED"
    ],
    stratType: "StratLP",
    buyTokenUrl: "https://app.cronaswap.org/swap?inputCurrency=0x66e428c3f67a68878562e79A0234c1F83c208770&outputCurrency=0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    addLiquidityUrl: "https://app.cronaswap.org/add/0x66e428c3f67a68878562e79A0234c1F83c208770/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    network: "cronos"
  }
];