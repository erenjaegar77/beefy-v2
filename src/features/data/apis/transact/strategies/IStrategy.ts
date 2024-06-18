import type {
  DepositOption,
  DepositQuote,
  InputTokenAmount,
  TransactQuote,
  WithdrawOption,
  WithdrawQuote,
  ZapStrategyIdToDepositOption,
  ZapStrategyIdToDepositQuote,
  ZapStrategyIdToWithdrawOption,
  ZapStrategyIdToWithdrawQuote,
} from '../transact-types';
import type { VaultTypeFromVault } from '../vaults/IVaultType';
import type { ISwapAggregator } from '../swap/ISwapAggregator';
import type { VaultEntity } from '../../../entities/vault';
import type { BeefyState } from '../../../../../redux-types';
import type { ZapEntity } from '../../../entities/zap';
import type { Step } from '../../../reducers/wallet/stepper';
import type { Namespace, TFunction } from 'react-i18next';
import type { UserlessZapRequest } from '../zap/types';
import type { TokenEntity } from '../../../entities/token';
import type { Balances } from '../helpers/Balances';
import type { AnyStrategyId, StrategyIdToConfig, ZapStrategyId } from './strategy-configs';

export interface IStrategy<TId extends AnyStrategyId = AnyStrategyId> {
  readonly id: TId;

  beforeQuote?(): Promise<void>;

  beforeStep?(): Promise<void>;

  fetchDepositOptions(): Promise<DepositOption[]>;

  fetchDepositQuote(inputs: InputTokenAmount[], option: DepositOption): Promise<DepositQuote>;

  fetchDepositStep(quote: TransactQuote, t: TFunction<Namespace>): Promise<Step>;

  fetchWithdrawOptions(): Promise<WithdrawOption[]>;

  fetchWithdrawQuote(inputs: InputTokenAmount[], option: WithdrawOption): Promise<WithdrawQuote>;

  fetchWithdrawStep(quote: TransactQuote, t: TFunction<Namespace>): Promise<Step>;
}

export interface IZapStrategy<TId extends ZapStrategyId = ZapStrategyId> extends IStrategy<TId> {
  fetchDepositOptions(): Promise<ZapStrategyIdToDepositOption<TId>[]>;

  fetchDepositQuote(
    inputs: InputTokenAmount[],
    option: ZapStrategyIdToDepositOption<TId>
  ): Promise<ZapStrategyIdToDepositQuote<TId>>;

  fetchDepositStep(quote: ZapStrategyIdToDepositQuote<TId>, t: TFunction<Namespace>): Promise<Step>;

  fetchWithdrawOptions(): Promise<ZapStrategyIdToWithdrawOption<TId>[]>;

  fetchWithdrawQuote(
    inputs: InputTokenAmount[],
    option: ZapStrategyIdToWithdrawOption<TId>
  ): Promise<ZapStrategyIdToWithdrawQuote<TId>>;

  fetchWithdrawStep(
    quote: ZapStrategyIdToWithdrawQuote<TId>,
    t: TFunction<Namespace>
  ): Promise<Step>;
}

export type IComposerStrategy<TId extends ZapStrategyId = ZapStrategyId> = IZapStrategy<TId>;

export type UserlessZapBreakdown = {
  zapRequest: UserlessZapRequest;
  expectedTokens: TokenEntity[];
  minBalances: Balances;
};

export interface IComposableStrategy<TId extends ZapStrategyId = ZapStrategyId>
  extends IZapStrategy<TId> {
  getHelpers(): TransactHelpers;
  fetchDepositUserlessZapBreakdown(
    quote: ZapStrategyIdToDepositQuote<TId>
  ): Promise<UserlessZapBreakdown>;
}

export type AnyComposableStrategy<TId extends ZapStrategyId = ZapStrategyId> = {
  [K in TId]: IComposableStrategy<K>;
}[TId];

export interface IZapStrategyStatic<TId extends ZapStrategyId = ZapStrategyId> {
  readonly id: TId;

  new (options: StrategyIdToConfig<TId>, helpers: TransactHelpers): IZapStrategy<TId>;
}

export interface IComposableStrategyStatic<TId extends ZapStrategyId = ZapStrategyId> {
  readonly id: TId;
  readonly composable: true;

  new (options: StrategyIdToConfig<TId>, helpers: TransactHelpers): IComposableStrategy<TId>;
}

export type AnyComposableStrategyStatic<TId extends ZapStrategyId = ZapStrategyId> = {
  [K in TId]: IComposableStrategyStatic<K>;
}[TId];

export interface IComposerStrategyStatic<TId extends ZapStrategyId = ZapStrategyId> {
  readonly id: TId;
  readonly composer: true;

  new (
    options: StrategyIdToConfig<TId>,
    helpers: TransactHelpers,
    underlying: AnyComposableStrategy
  ): IComposerStrategy<TId>;
}

export type IAnyStrategyStatic<TId extends ZapStrategyId = ZapStrategyId> =
  | IZapStrategyStatic<TId>
  | IComposableStrategyStatic<TId>
  | IComposerStrategyStatic<TId>;

type BaseTransactHelpers<T extends VaultEntity = VaultEntity> = {
  swapAggregator: ISwapAggregator;
  vault: T;
  vaultType: VaultTypeFromVault<T>;
  getState: () => BeefyState;
};

export type ZaplessTransactHelpers = BaseTransactHelpers & {
  zap: undefined;
};

export type ZapTransactHelpers = BaseTransactHelpers & {
  zap: ZapEntity;
};

export type TransactHelpers = ZaplessTransactHelpers | ZapTransactHelpers;

export function isZapTransactHelpers(helpers: TransactHelpers): helpers is ZapTransactHelpers {
  return helpers.zap !== undefined;
}
