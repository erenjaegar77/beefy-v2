import React, { memo, useCallback, useMemo, useState } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useAppSelector } from '../../../../store';
import { selectEns, selectWalletAddress } from '../../../data/selectors/wallet';
import { formatAddressShort, formatEns } from '../../../../helpers/format';
import { Tooltip } from '../../../../components/Tooltip';
import type { Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  shortAddress: {
    ...theme.typography['h3'],
    color: theme.palette.text.disabled,
  },
  longAddress: {
    ...theme.typography['body-sm'],
  },
}));

export const ShortAddress = memo(function ShortAddress() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [clipboard, setClipboard] = useState<boolean>(false);
  const walletAddress = useAppSelector(state => selectWalletAddress(state));

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), { noSsr: true });
  const ens = useAppSelector(state => selectEns(state, walletAddress));

  const handleCopyAddressToClipboard = useCallback(() => {
    setClipboard(true);
    navigator.clipboard.writeText(walletAddress);
    setTimeout(() => setClipboard(false), 3000);
  }, [walletAddress]);

  const formatedEns = useMemo(() => {
    if (mdUp) {
      return formatEns(ens, 20);
    }
    return formatEns(ens);
  }, [ens, mdUp]);

  if (walletAddress) {
    return (
      <Tooltip
        onClick={handleCopyAddressToClipboard}
        contentClass={classes.longAddress}
        children={
          <div className={classes.shortAddress}>
            {`(${ens ? formatedEns : formatAddressShort(walletAddress)})`}
          </div>
        }
        content={clipboard ? t('Copied to clipboard') : walletAddress}
      />
    );
  }

  return null;
});