import { memo, useCallback, useState, type ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../../../../components/Button/Button.tsx';
// import { TokenAmountFromEntity } from '../../../../components/TokenAmount/TokenAmount.tsx';
import { formatPercent } from '../../../../helpers/format.ts';
import { legacyMakeStyles } from '../../../../helpers/mui.ts';
import { getPlatformSrc } from '../../../../helpers/platformsSrc.ts';
import { BIG_ONE } from '../../../../helpers/big-number.ts';
import {
  executeReplacementMigration,
  fetchReplacementMigrationQuote,
} from '../../../data/actions/migrator-replacement.ts';
import type { VaultEntity } from '../../../data/entities/vault.ts';
import {
  isZapFeeDiscounted,
  type VaultToVaultSingleTokenDepositQuote,
} from '../../../data/apis/transact/transact-types.ts';
import {
  selectUserVaultBalanceInShareTokenIncludingDisplaced,
  selectUserVaultBalanceInUsdIncludingDisplaced,
} from '../../../data/selectors/balance.ts';
import { selectIsStepperStepping } from '../../../data/selectors/stepper.ts';
import {
  selectVaultById,
  selectVaultReplacementMigration,
} from '../../../data/selectors/vaults.ts';
import { selectWalletAddressIfKnown } from '../../../data/selectors/wallet.ts';
import { useAppDispatch, useAppSelector } from '../../../data/store/hooks.ts';
import { ActionConnectSwitch } from '../Actions/Transact/CommonActions/CommonActions.tsx';
import { ZapRoute, ZapRoutePlaceholder } from '../Actions/Transact/ZapRoute/ZapRoute.tsx';
import { IconWithTooltip } from '../../../../components/Tooltip/IconWithTooltip.tsx';
import { BasicTooltipContent } from '../../../../components/Tooltip/BasicTooltipContent.tsx';
import InfoIcon from '../../../../images/icons/info-rounded-square.svg?react';
import { styles } from './styles.ts';
import { styled } from '@repo/styles/jsx';

const useStyles = legacyMakeStyles(styles);

interface ReplacementVaultCardProps {
  vaultId: VaultEntity['id'];
}

/**
 * Self-contained card that migrates a user from an old vault into its replacement using the
 * same-chain vault-to-vault (v2v) zap. It owns its own quote + execution flow (two CTAs:
 * "Start migration" -> quote, then "Migrate now" -> approve + zap) and does NOT touch the shared
 * transact form/reducer.
 *
 * `replacementVaultId` lives on the naked (hidden) CLM, but users hold a wrapper (gov "-rp" pool or
 * standard "-vault"); {@link selectVaultReplacementMigration} maps the page wrapper to the
 * same-kind wrapper on the other side of the replacement.
 */
export const ReplacementVaultCard = memo(function ReplacementVaultCard({
  vaultId,
}: ReplacementVaultCardProps) {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const migration = useAppSelector(state => selectVaultReplacementMigration(state, vaultId));

  if (!walletAddress || !migration) {
    return null;
  }

  return (
    <Migrate
      walletAddress={walletAddress}
      oldVaultId={migration.oldVaultId}
      newVaultId={migration.newVaultId}
    />
  );
});

type MigrateProps = {
  walletAddress: string;
  oldVaultId: VaultEntity['id'];
  newVaultId: VaultEntity['id'];
};

const Migrate = memo(function Migrate({ walletAddress, oldVaultId, newVaultId }: MigrateProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const newVault = useAppSelector(state => selectVaultById(state, newVaultId));
  // share-token balance + USD value gate whether the user actually has a meaningful position
  const shareBalance = useAppSelector(state =>
    selectUserVaultBalanceInShareTokenIncludingDisplaced(state, oldVaultId, walletAddress)
  );
  const balanceUsd = useAppSelector(state =>
    selectUserVaultBalanceInUsdIncludingDisplaced(state, oldVaultId, walletAddress)
  );
  const isStepping = useAppSelector(selectIsStepperStepping);

  const [quote, setQuote] = useState<VaultToVaultSingleTokenDepositQuote | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleStart = useCallback(() => {
    setLoading(true);
    setError(false);
    dispatch(fetchReplacementMigrationQuote(oldVaultId, newVaultId))
      .then(setQuote)
      .catch(e => {
        console.error('Failed to fetch replacement migration quote', e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [dispatch, oldVaultId, newVaultId]);

  const handleMigrate = useCallback(() => {
    if (quote) {
      dispatch(executeReplacementMigration(quote, t));
    }
  }, [dispatch, quote, t]);

  // cheap sync gate: must have meaningful balance in the old vault (same-chain + routing-token
  // viability is enforced by the v2v option fetch in the "Start migration" step)
  if (balanceUsd.lt(BIG_ONE) || !shareBalance.gt(0)) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.replacementHeader}>
        <div className={classes.replacementTitle}>{t('ReplacementVault-Title')}</div>
        <img
          className={classes.replacementIcon}
          alt=""
          aria-hidden={true}
          src={getPlatformSrc(newVault.platformId)}
        />
      </div>
      <div className={classes.replacementContent}>
        <div className={classes.text}>
          <Trans
            t={t}
            i18nKey="ReplacementVault-Text"
            components={{ Highlight: <Highlight />, br: <br /> }}
          />
        </div>

        {quote ?
          <>
            <ZapRoute quote={quote} expandable={true} />
            {/* <div className={classes.output}>
              <span>{t('ReplacementVault-YouReceive')}</span>
              <span className={classes.outputValue}>
                {quote.outputs.map(output => (
                  <span key={output.token.address}>
                    <TokenAmountFromEntity amount={output.amount} token={output.token} />{' '}
                    {output.token.symbol}
                  </span>
                ))}
              </span>
            </div> */}
            <ActionsContainer>
              <ActionConnectSwitch chainId={newVault.chainId}>
                <Button
                  onClick={handleMigrate}
                  variant="cta"
                  fullWidth={true}
                  borderless={true}
                  disabled={isStepping}
                >
                  {t('ReplacementVault-Action')}
                </Button>
              </ActionConnectSwitch>
              <ZapFee fee={quote.fee.value} original={getOriginalFee(quote)} />
            </ActionsContainer>
          </>
        : <>
            <ZapRoutePlaceholder />
            <ActionsContainer>
              <ActionConnectSwitch chainId={newVault.chainId}>
                <Button
                  onClick={handleStart}
                  variant="cta"
                  fullWidth={true}
                  borderless={true}
                  disabled={loading}
                >
                  {loading ? t('ReplacementVault-Loading') : t('ReplacementVault-Start')}
                </Button>
              </ActionConnectSwitch>
              <ZapFee fee={0} original={0.0005} />
            </ActionsContainer>
          </>
        }
        {error ?
          <div className={classes.errorText}>{t('ReplacementVault-Error')}</div>
        : null}
      </div>
    </div>
  );
});

function getOriginalFee(quote: VaultToVaultSingleTokenDepositQuote): number | undefined {
  return isZapFeeDiscounted(quote.fee) ? quote.fee.original : undefined;
}

const ZapFee = memo(function ZapFee({
  fee,
  original,
}: {
  fee: number;
  original: number | undefined;
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.feeContainer}>
      <span className={classes.feeLabel}>
        {t('Transact-Fee-Zap')}
        <IconWithTooltip
          Icon={InfoIcon}
          iconSize={16}
          iconCss={styles.feeInfoIcon}
          tooltip={
            <BasicTooltipContent
              title={t('Transact-Fee-Zap')}
              content={t('ReplacementVault-Fee-Explainer')}
            />
          }
        />
      </span>
      <span className={classes.feeValue}>
        {original !== undefined && original !== fee ?
          <>
            <span className={classes.feeOriginal}>{formatPercent(original, 2)}</span>
            <span aria-hidden={true}>→</span>
          </>
        : null}
        {formatPercent(fee, 2)}
      </span>
    </div>
  );
});

const ActionsContainer = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.content.light',
    borderRadius: '8px',
  },
});

function Highlight({ children }: { children?: ReactNode }) {
  const classes = useStyles();
  return <span className={classes.highlight}>{children}</span>;
}
