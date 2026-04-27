import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ToggleButtons,
  type ToggleButtonItem,
} from '../../../../../../components/ToggleButtons/ToggleButtons.tsx';
import { transactSwitchDepositSource } from '../../../../../data/actions/transact.ts';
import { DepositSource } from '../../../../../data/reducers/wallet/transact-types.ts';
import {
  selectTransactDepositSource,
  selectTransactUserHasOtherDepositedVaults,
} from '../../../../../data/selectors/transact.ts';
import { useAppDispatch, useAppSelector } from '../../../../../data/store/hooks.ts';

export const DepositSourceToggle = memo(function DepositSourceToggle() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const source = useAppSelector(selectTransactDepositSource);
  const hasOtherDeposits = useAppSelector(selectTransactUserHasOtherDepositedVaults);

  const handleChange = useCallback(
    (next: DepositSource) => {
      if (next !== source) {
        dispatch(transactSwitchDepositSource(next));
      }
    },
    [dispatch, source]
  );

  const options = useMemo<Array<ToggleButtonItem<DepositSource>>>(
    () => [
      {
        value: DepositSource.Wallet,
        label: t('Transact-DepositSource-Wallet-Title'),
        subtitle: t('Transact-DepositSource-Wallet-Subtitle'),
      },
      {
        value: DepositSource.Vault,
        label: t('Transact-DepositSource-Vault-Title'),
        subtitle: t('Transact-DepositSource-Vault-Subtitle'),
      },
    ],
    [t]
  );

  if (!hasOtherDeposits) {
    return null;
  }

  return (
    <ToggleButtons
      value={source}
      options={options}
      onChange={handleChange}
      variant="card"
      fullWidth={true}
    />
  );
});
