import { type CssStyles } from '@repo/styles/css';
import BigNumber from 'bignumber.js';
import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../data/store/hooks.ts';
import { transactSetInputAmount } from '../../../../../data/actions/transact.ts';
import type { TokenEntity } from '../../../../../data/entities/token.ts';
import type { VaultEntity } from '../../../../../data/entities/vault.ts';
import {
  selectUserBalanceOfToken,
  selectUserVaultBalanceInDepositToken,
  selectUserVaultBalanceInShareToken,
  selectVaultSharesToDepositTokenData,
} from '../../../../../data/selectors/balance.ts';
import { selectTokenPriceByTokenOracleId } from '../../../../../data/selectors/tokens.ts';
import {
  selectTransactDepositFromVaultId,
  selectTransactInputIndexAmount,
  selectTransactIsDepositFromVault,
} from '../../../../../data/selectors/transact.ts';
import { mooAmountToOracleAmount, oracleAmountToMooAmount } from '../../../../../data/utils/ppfs.ts';
import type { AmountInputProps } from '../AmountInput/AmountInput.tsx';
import { AmountInputWithSlider } from '../AmountInputWithSlider/AmountInputWithSlider.tsx';
import { TokenSelectButton } from '../TokenSelectButton/TokenSelectButton.tsx';

export type DepositTokenAmountInputProps = {
  index: number;
  token: TokenEntity;
  css?: CssStyles;
};

export const DepositTokenAmountInput = memo(function DepositTokenAmountInput({
  index,
  token,
  css: cssProp,
}: DepositTokenAmountInputProps) {
  const fromVaultId = useAppSelector(selectTransactDepositFromVaultId);
  const isFromVaultMode = useAppSelector(selectTransactIsDepositFromVault);
  if (isFromVaultMode && index === 0 && fromVaultId) {
    return <V2vDepositTokenAmountInput index={index} fromVaultId={fromVaultId} css={cssProp} />;
  }
  return <StandardDepositTokenAmountInput index={index} token={token} css={cssProp} />;
});

const StandardDepositTokenAmountInput = memo(function StandardDepositTokenAmountInput({
  index,
  token,
  css: cssProp,
}: DepositTokenAmountInputProps) {
  const dispatch = useAppDispatch();
  const userBalance = useAppSelector(state =>
    selectUserBalanceOfToken(state, token.chainId, token.address)
  );
  const value = useAppSelector(state => selectTransactInputIndexAmount(state, index));
  const price = useAppSelector(state => selectTokenPriceByTokenOracleId(state, token.oracleId));

  const handleChange = useCallback<NonNullable<AmountInputProps['onChange']>>(
    (value, isMax) => {
      dispatch(
        transactSetInputAmount({
          index,
          amount: value.decimalPlaces(token.decimals, BigNumber.ROUND_FLOOR),
          max: isMax,
        })
      );
    },
    [dispatch, token.decimals, index]
  );

  return (
    <AmountInputWithSlider
      css={cssProp}
      value={value}
      price={price}
      maxValue={userBalance}
      onChange={handleChange}
      tokenDecimals={token.decimals}
      endAdornment={<TokenSelectButton index={index} />}
    />
  );
});

type V2vProps = {
  index: number;
  fromVaultId: VaultEntity['id'];
  css?: CssStyles;
};

const V2vDepositTokenAmountInput = memo(function V2vDepositTokenAmountInput({
  index,
  fromVaultId,
  css: cssProp,
}: V2vProps) {
  const dispatch = useAppDispatch();
  const shareData = useAppSelector(state =>
    selectVaultSharesToDepositTokenData(state, fromVaultId)
  );
  const shareBalance = useAppSelector(state =>
    selectUserVaultBalanceInShareToken(state, fromVaultId)
  );
  const depositBalance = useAppSelector(state =>
    selectUserVaultBalanceInDepositToken(state, fromVaultId)
  );
  const storeAmount = useAppSelector(state => selectTransactInputIndexAmount(state, index));
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
      dispatch(transactSetInputAmount({ index, amount, max: isMax }));
    },
    [dispatch, shareData, shareBalance, index]
  );

  return (
    <AmountInputWithSlider
      css={cssProp}
      value={value}
      price={price}
      maxValue={depositBalance}
      onChange={handleChange}
      tokenDecimals={shareData.depositToken.decimals}
      endAdornment={<TokenSelectButton index={index} />}
    />
  );
});
