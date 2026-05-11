import type { Address } from 'viem';
import type { ChainEntity } from '../../features/data/entities/chain.ts';
import type { TokenEntity } from '../../features/data/entities/token.ts';
import { selectTokenByAddress } from '../../features/data/selectors/tokens.ts';
import type { BeefyState } from '../../features/data/store/types.ts';

/**
 * Per-chain list of tokens that can serve as the routing handoff in a same-chain
 * vault-to-vault zap (`VaultToVaultSingleTokenStrategy`).
 */
export type V2VRoutingTokenConfig = Partial<Record<ChainEntity['id'], readonly Address[]>>;

export const V2V_ROUTING_TOKENS: V2VRoutingTokenConfig = {
  arbitrum: ['0xaf88d065e77c8cC2239327C5EDb3A432268e5831'], // USDC
  avax: ['0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E'], // USDC
  base: ['0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'], // USDC
  ethereum: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'], // USDC
  hyperevm: ['0xb88339CB7199b77E23DB6E890353E22632Ba630f'], // USDC
  linea: ['0x176211869cA2b568f2A7D4EE941E073a821EE1ff'], // USDC
  monad: ['0x754704Bc059F8C67012fEd69BC8A327a5aafb603'], // USDC
  optimism: ['0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'], // USDC
  polygon: ['0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'], // USDC
  sonic: ['0x29219dd400f2Bf60E5a23d13Be72B486D4038894'], // USDC
};

export function hasRoutingTokensForChain(chainId: ChainEntity['id']): boolean {
  const addresses = V2V_ROUTING_TOKENS[chainId];
  return addresses !== undefined && addresses.length > 0;
}

export function getRoutingTokensForChain(
  chainId: ChainEntity['id'],
  state: BeefyState
): TokenEntity[] {
  const addresses = V2V_ROUTING_TOKENS[chainId];
  if (!addresses?.length) return [];
  const tokens: TokenEntity[] = [];
  for (const address of addresses) {
    try {
      tokens.push(selectTokenByAddress(state, chainId, address));
    } catch (err) {
      console.warn(
        `[v2v] Configured routing token ${address} not found in state for chain ${chainId}`,
        err
      );
    }
  }
  return tokens;
}
