import { css, type CssStyles } from '@repo/styles/css';
import { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AlertWarning } from '../../../../../../components/Alerts/Alerts.tsx';
import { InternalLink } from '../../../../../../components/Banners/Links/InternalLink.tsx';
import {
  selectUserVaultBalanceInDepositToken,
  selectUserVaultBalanceInDepositTokenIncludingDisplaced,
} from '../../../../../data/selectors/balance.ts';
import { selectTransactDepositFromVaultId } from '../../../../../data/selectors/transact.ts';
import { selectVaultById } from '../../../../../data/selectors/vaults.ts';
import { useAppSelector } from '../../../../../data/store/hooks.ts';

const noticeStyle = css.raw({
  textStyle: 'body.medium',
  '& a': {
    color: 'text.boosted',
    textDecoration: 'none',
  },
});

export type DepositFromVaultDisplacedNoticeProps = {
  css?: CssStyles;
};

export const DepositFromVaultDisplacedNotice = memo(function DepositFromVaultDisplacedNotice({
  css: cssProp,
}: DepositFromVaultDisplacedNoticeProps) {
  const { t } = useTranslation();
  const fromVaultId = useAppSelector(selectTransactDepositFromVaultId);
  const hasDisplacedDeposit = useAppSelector(state => {
    if (!fromVaultId) return false;
    const deposit = selectUserVaultBalanceInDepositTokenIncludingDisplaced(state, fromVaultId);
    const baseDeposit = selectUserVaultBalanceInDepositToken(state, fromVaultId);
    return deposit.gt(0) && deposit.gt(baseDeposit);
  });
  const vault = useAppSelector(state =>
    fromVaultId ? selectVaultById(state, fromVaultId) : undefined
  );

  if (!fromVaultId || !vault || !hasDisplacedDeposit) {
    return null;
  }

  return (
    <AlertWarning css={css.raw(noticeStyle, cssProp)}>
      <Trans
        t={t}
        i18nKey="Transact-Notice-DepositFromVaultDisplaced"
        values={{ vaultName: vault.names.list }}
        components={{
          VaultLink: <InternalLink to={`/vault/${fromVaultId}`} />,
        }}
      />
    </AlertWarning>
  );
});
