import { isTokenEqual, type TokenEntity } from '../../../entities/token.ts';
import type { ZapTransactHelpers } from './IStrategy.ts';
import type { StrategySwapConfig } from './strategy-configs.ts';

// Shared body for the LP-style canAcceptTokenAsDeposit/canEmitTokenAsWithdraw predicates.
// Mirrors aggregatorTokenSupport's filter: identity on any pool token, or aggregator routes
// between token and EVERY pool token. Direction-symmetric (swap aggregator is symmetric).
async function canRouteTokenAcrossPool(
  helpers: ZapTransactHelpers,
  swapConfig: StrategySwapConfig | undefined,
  poolTokens: TokenEntity[],
  token: TokenEntity
): Promise<boolean> {
  if (poolTokens.some(t => isTokenEqual(t, token))) return true;

  const { swapAggregator, vault, getState } = helpers;
  const support = await swapAggregator.fetchTokenSupport(
    poolTokens,
    vault.id,
    vault.chainId,
    getState(),
    swapConfig
  );

  return poolTokens.every(
    (pt, i) =>
      isTokenEqual(token, pt) || support.tokens[i].some(supported => isTokenEqual(supported, token))
  );
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
