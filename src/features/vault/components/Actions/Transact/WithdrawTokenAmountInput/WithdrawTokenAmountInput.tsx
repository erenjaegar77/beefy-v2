import { type CssStyles } from '@repo/styles/css';
import BigNumber from 'bignumber.js';
import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../data/store/hooks.ts';
import { transactSetInputAmount } from '../../../../../data/actions/transact.ts';
import type { VaultEntity } from '../../../../../data/entities/vault.ts';
import {
  selectUserVaultBalanceInDepositToken,
  selectUserVaultBalanceInDepositTokenWithToken,
  selectUserVaultBalanceInShareToken,
  selectVaultSharesToDepositTokenData,
} from '../../../../../data/selectors/balance.ts';
import { selectTokenPriceByTokenOracleId } from '../../../../../data/selectors/tokens.ts';
import {
  selectTransactInputIndexAmount,
  selectTransactIsActiveSelectionVaultSourceWithdraw,
  selectTransactVaultId,
} from '../../../../../data/selectors/transact.ts';
import { mooAmountToOracleAmount, oracleAmountToMooAmount } from '../../../../../data/utils/ppfs.ts';
import type { AmountInputProps } from '../AmountInput/AmountInput.tsx';
import { AmountInputWithSlider } from '../AmountInputWithSlider/AmountInputWithSlider.tsx';
import { TokenSelectButton } from '../TokenSelectButton/TokenSelectButton.tsx';

export type WithdrawTokenAmountInputProps = {
  css?: CssStyles;
};

export const WithdrawTokenAmountInput = memo(function WithdrawTokenAmountInput({
  css: cssProp,
}: WithdrawTokenAmountInputProps) {
  const vaultId = useAppSelector(selectTransactVaultId);
  const isVaultSourceWithdraw = useAppSelector(selectTransactIsActiveSelectionVaultSourceWithdraw);
  if (vaultId && isVaultSourceWithdraw) {
    return <VaultSourceWithdrawTokenAmountInput vaultId={vaultId} css={cssProp} />;
  }
  return <StandardWithdrawTokenAmountInput css={cssProp} />;
});

const StandardWithdrawTokenAmountInput = memo(function StandardWithdrawTokenAmountInput({
  css: cssProp,
}: WithdrawTokenAmountInputProps) {
  const dispatch = useAppDispatch();
  const vaultId = useAppSelector(selectTransactVaultId);
  const { token: depositToken, amount: userBalance } = useAppSelector(state =>
    selectUserVaultBalanceInDepositTokenWithToken(state, vaultId)
  );
  const value = useAppSelector(state => selectTransactInputIndexAmount(state, 0));
  const price = useAppSelector(state =>
    selectTokenPriceByTokenOracleId(state, depositToken.oracleId)
  );

  const handleChange = useCallback<NonNullable<AmountInputProps['onChange']>>(
    (value, isMax) => {
      dispatch(
        transactSetInputAmount({
          index: 0,
          amount: value.decimalPlaces(depositToken.decimals, BigNumber.ROUND_FLOOR),
          max: isMax,
        })
      );
    },
    [dispatch, depositToken.decimals]
  );

  return (
    <AmountInputWithSlider
      css={cssProp}
      maxValue={userBalance}
      onChange={handleChange}
      value={value}
      price={price}
      tokenDecimals={depositToken.decimals}
      endAdornment={<TokenSelectButton index={0} />}
    />
  );
});

type VaultSourceProps = {
  vaultId: VaultEntity['id'];
  css?: CssStyles;
};

const VaultSourceWithdrawTokenAmountInput = memo(function VaultSourceWithdrawTokenAmountInput({
  vaultId,
  css: cssProp,
}: VaultSourceProps) {
  const dispatch = useAppDispatch();
  const shareData = useAppSelector(state => selectVaultSharesToDepositTokenData(state, vaultId));
  const shareBalance = useAppSelector(state => selectUserVaultBalanceInShareToken(state, vaultId));
  const depositBalance = useAppSelector(state =>
    selectUserVaultBalanceInDepositToken(state, vaultId)
  );
  const storeAmount = useAppSelector(state => selectTransactInputIndexAmount(state, 0));
  const price = useAppSelector(state =>
    selectTokenPriceByTokenOracleId(state, shareData.depositToken.oracleId)
  );

  const value = useMemo(() => {
    if (!shareData.shareToken) return storeAmount;
    return mooAmountToOracleAmount(
      shareData.shareToken,
      shareData.depositToken,
      shareData.ppfs,
      storeAmount
    );
  }, [shareData, storeAmount]);

  const handleChange = useCallback<NonNullable<AmountInputProps['onChange']>>(
    (typedValue, isMax) => {
      // store-of-record is share-math; at max dispatch exact share-balance to avoid round-trip wei loss
      const amount =
        isMax || !shareData.shareToken ?
          shareBalance
        : oracleAmountToMooAmount(
            shareData.shareToken,
            shareData.depositToken,
            shareData.ppfs,
            typedValue
          );
      dispatch(transactSetInputAmount({ index: 0, amount, max: isMax }));
    },
    [dispatch, shareData, shareBalance]
  );

  return (
    <AmountInputWithSlider
      css={cssProp}
      maxValue={depositBalance}
      onChange={handleChange}
      value={value}
      price={price}
      tokenDecimals={shareData.depositToken.decimals}
      endAdornment={<TokenSelectButton index={0} />}
    />
  );
});
