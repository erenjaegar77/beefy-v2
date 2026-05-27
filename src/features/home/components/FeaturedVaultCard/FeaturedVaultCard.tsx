import { styled } from '@repo/styles/jsx';
import { memo } from 'react';
import { Link } from 'react-router';
import { ChainIcon } from '../../../../components/ChainIcon/ChainIcon.tsx';
import { VaultIdImage } from '../../../../components/TokenImage/TokenImage.tsx';
import { VaultTags } from '../../../../components/VaultIdentity/components/VaultTags/VaultTags.tsx';
import { VaultApyStat } from '../../../../components/VaultStats/VaultApyStat.tsx';
import { VaultTvlStat } from '../../../../components/VaultStats/VaultTvlStat.tsx';
import { punctuationWrap } from '../../../../helpers/string.ts';
import { FeaturedVaultApyLabel } from './FeaturedVaultApyLabel.tsx';
import type { VaultEntity } from '../../../data/entities/vault.ts';
import { selectVaultById } from '../../../data/selectors/vaults.ts';
import { useAppSelector } from '../../../data/store/hooks.ts';

export type FeaturedVaultCardProps = {
  vaultId: VaultEntity['id'];
};

export const FeaturedVaultCard = memo(function FeaturedVaultCard({
  vaultId,
}: FeaturedVaultCardProps) {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  return (
    <Card to={`/vault/${vaultId}`}>
      <ChainBadge>
        <ChainIcon chainId={vault.chainId} size={22} />
      </ChainBadge>
      <Identity>
        <HeadTop>
          <Name>{punctuationWrap(vault.names.list)}</Name>
          <VaultIdImage vaultId={vaultId} size={36} />
        </HeadTop>
        <Tags>
          <VaultTags vaultId={vaultId} />
        </Tags>
      </Identity>
      <Stats>
        <StatColumn>
          <FeaturedVaultApyLabel />
          <VaultApyStat vaultId={vaultId} type="yearly" hideLabel align="left" />
        </StatColumn>
        <VaultTvlStat vaultId={vaultId} keepLabel align="left" hideSubValue />
      </Stats>
    </Card>
  );
});

const Card = styled(Link, {
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    width: '100%',
    minWidth: '0',
    padding: '20px 24px',
    borderRadius: '12px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'text.middle',
    background: 'background.cardBody',
  },
});

const ChainBadge = styled('div', {
  base: {
    position: 'absolute',
    top: '0',
    right: '0',
    lineHeight: '0',
    background: 'background.content.dark',
    borderRadius: '0 0 0 8px',
    padding: '2px',
    sm: {
      top: '0',
      left: '0',
      right: 'auto',
      borderRadius: '0 0 8px 0',
    },
  },
});

const Identity = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    minWidth: '0',
    flexGrow: 1,
  },
});

const HeadTop = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: '8px',
    minWidth: '0',
  },
});

const Name = styled('div', {
  base: {
    flex: '1 1 auto',
    minWidth: '0',
    textStyle: 'h3',
    color: 'text.light',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const Tags = styled('div', {
  base: {
    display: 'flex',
    minWidth: '0',
  },
});

const Stats = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    columnGap: '16px',
    flexShrink: 0,
  },
});

const StatColumn = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0 6px',
    minWidth: '0',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
});
