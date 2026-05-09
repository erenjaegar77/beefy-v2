import { isTokenEqual, type TokenEntity } from '../../../entities/token.ts';
import type { ZapTransactHelpers } from './IStrategy.ts';
import type { StrategySwapConfig } from './strategy-configs.ts';

async function canRouteTokenAcrossPool(
  helpers: ZapTransactHelpers,
  swapConfig: StrategySwapConfig | undefined,
  poolTokens: TokenEntity[],
  token: TokenEntity
): Promise<boolean> {
  if (poolTokens.some(t => isTokenEqual(t, token))) return true;

  const { swapAggregator, vault, getState } = helpers;
  const state = getState();
  const results = await Promise.all(
    poolTokens.map(pt =>
      swapAggregator.canSwapTokenPair(token, pt, vault.id, vault.chainId, state, swapConfig)
    )
  );
  return results.every(Boolean);
}

export async function canRouteTokenToAllOfAsDeposit(
  helpers: ZapTransactHelpers,
  swapConfig: StrategySwapConfig | undefined,
  depositTokens: TokenEntity[],
  token: TokenEntity
): Promise<boolean> {
  return canRouteTokenAcrossPool(helpers, swapConfig, depositTokens, token);
}

export async function canRouteTokenFromAllOfAsWithdraw(
  helpers: ZapTransactHelpers,
  swapConfig: StrategySwapConfig | undefined,
  depositTokens: TokenEntity[],
  token: TokenEntity
): Promise<boolean> {
  return canRouteTokenAcrossPool(helpers, swapConfig, depositTokens, token);
}
