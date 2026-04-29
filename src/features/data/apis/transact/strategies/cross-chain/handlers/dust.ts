import { uniqBy } from 'lodash-es';
import type { TokenEntity } from '../../../../../entities/token.ts';
import { pickTokens, uniqueTokens } from '../../../helpers/tokens.ts';
import { getTokenAddress } from '../../../helpers/zap.ts';
import {
  isZapQuoteStepSwap,
  type InputTokenAmount,
  type TokenAmount,
  type ZapQuoteStep,
} from '../../../transact-types.ts';
import type { OrderOutput } from '../../../zap/types.ts';

// ===== Dust Output Helper Types and Functions =====

/**
 * Configuration for `collectIntermediateTokens`.
 *
 * Each handler passes the tokens it touched. Only `bridgeToken` is required
 * (every cross-chain flow transits the router with the bridge token); the
 * rest are optional, contributed per-handler:
 * - `inputs`: user inputs feeding the handler.
 * - `picks`: outputs/inputs/returned from a composable strategy breakdown.
 * - `swapSteps`: swap steps whose from/to tokens may be intermediate-only.
 */
export type IntermediateTokenConfig = {
  bridgeToken: TokenEntity;
  inputs?: InputTokenAmount[];
  picks?: { outputs: TokenAmount[]; inputs: InputTokenAmount[]; returned: TokenAmount[] };
  swapSteps?: ZapQuoteStep[];
};

/**
 * Collects all tokens that should be returned as dust outputs (min=0 router
 * refunds). Bridge token is always included; everything else is optional.
 *
 * @returns Array of unique TokenEntity objects (deduplicated by chainId + address)
 */
export function collectIntermediateTokens(config: IntermediateTokenConfig): TokenEntity[] {
  const tokens: TokenEntity[] = [config.bridgeToken];

  if (config.inputs) {
    tokens.push(...config.inputs.map(i => i.token));
  }

  if (config.picks) {
    tokens.push(...pickTokens(config.picks.outputs, config.picks.inputs, config.picks.returned));
  }

  if (config.swapSteps) {
    config.swapSteps.filter(isZapQuoteStepSwap).forEach(swapStep => {
      tokens.push(swapStep.fromToken);
      tokens.push(swapStep.toToken);
    });
  }

  return uniqueTokens(tokens);
}

/**
 * Converts token entities to dust outputs (minOutputAmount='0').
 * Deduplicates by token address.
 *
 * @param tokens - Array of token entities
 * @returns Array of OrderOutput with minOutputAmount='0'
 */
export function buildDustOutputs(tokens: TokenEntity[]): OrderOutput[] {
  // Convert to OrderOutput with minOutputAmount='0'
  const outputs = tokens.map(token => ({
    token: getTokenAddress(token),
    minOutputAmount: '0',
  }));

  // Deduplicate by token address (uniqBy keeps first occurrence)
  return uniqBy(outputs, output => output.token);
}

/**
 * Merges required outputs and dust outputs, ensuring required outputs take precedence.
 * Deduplicates by token address, keeping the first occurrence (required outputs come first).
 *
 * @param required - Required outputs with proper slippage settings
 * @param dust - Dust outputs with minOutputAmount='0'
 * @returns Merged and deduplicated OrderOutput array
 */
export function mergeOutputs(required: OrderOutput[], dust: OrderOutput[]): OrderOutput[] {
  // Concatenate required first, then dust
  // uniqBy keeps first occurrence, so required outputs take precedence
  return uniqBy(required.concat(dust), output => output.token);
}
