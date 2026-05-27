import { css } from '@repo/styles/css';
import { styled } from '@repo/styles/jsx';
import { memo, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Link } from 'react-router';
import { ChainIcon } from '../../../../components/ChainIcon/ChainIcon.tsx';
import { VaultIdImage } from '../../../../components/TokenImage/TokenImage.tsx';
import { VaultTags } from '../../../../components/VaultIdentity/components/VaultTags/VaultTags.tsx';
import { VaultApyStat } from '../../../../components/VaultStats/VaultApyStat.tsx';
import { VaultTvlStat } from '../../../../components/VaultStats/VaultTvlStat.tsx';
import { punctuationWrap } from '../../../../helpers/string.ts';
import { FeaturedVaultApyLabel } from './FeaturedVaultApyLabel.tsx';
import type { VaultEntity } from '../../../data/entities/vault.ts';
import { selectChainById } from '../../../data/selectors/chains.ts';
import { selectVaultById } from '../../../data/selectors/vaults.ts';
import { useAppSelector } from '../../../data/store/hooks.ts';

export type FeaturedVaultCardProps = {
  vaultId: VaultEntity['id'];
};

export const FeaturedVaultCard = memo(function FeaturedVaultCard({
  vaultId,
}: FeaturedVaultCardProps) {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const chain = useAppSelector(state => selectChainById(state, vault.chainId));
  const isGradient = chain?.brand?.icon === 'gradient';

  return (
    <Card to={`/vault/${vaultId}`}>
      <ChainBadge
        className={css(
          { colorPalette: `network.${vault.chainId}` },
          isGradient && chainBadgeGradient
        )}
      >
        <ChainIcon chainId={vault.chainId} size={22} />
      </ChainBadge>
      <Identity>
        <HeadTop>
          <MarqueeName text={punctuationWrap(vault.names.list)} />
          <VaultIdImage vaultId={vaultId} size={40} />
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
    padding: '24px 20px',
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
    backgroundColor: 'colorPalette.primary',
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

const chainBadgeGradient = css.raw({
  backgroundImage:
    'linear-gradient(90deg, var(--colors-color-palette-primary) 0%, var(--colors-color-palette-secondary, var(--colors-color-palette-primary)) 100%)',
});

const Identity = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2px',
    minWidth: '0',
    flexGrow: 1,
  },
});

const HeadTop = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
    minWidth: '0',
  },
});

type MarqueeNameProps = { text: string };

const MarqueeName = memo(function MarqueeName({ text }: MarqueeNameProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { width: viewportWidth, ref: viewportRef } = useResizeDetector<HTMLDivElement>();
  const [overflowPx, setOverflowPx] = useState(0);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const viewport = viewportRef.current;
    if (!inner || !viewport) {
      setOverflowPx(0);
      return;
    }
    const diff = inner.scrollWidth - viewport.clientWidth;
    setOverflowPx(diff > 0 ? diff : 0);
  }, [text, viewportWidth, viewportRef]);

  const isOverflowing = overflowPx > 0;
  const style = { '--marquee-shift': `-${overflowPx}px` } as CSSProperties;

  return (
    <NameViewport ref={viewportRef} data-overflowing={isOverflowing || undefined} style={style}>
      <NameInner ref={innerRef}>{text}</NameInner>
    </NameViewport>
  );
});

const NameViewport = styled('div', {
  base: {
    position: 'relative',
    flex: '1 1 auto',
    minWidth: '0',
    overflow: 'hidden',
    '&[data-overflowing]::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      width: '32px',
      pointerEvents: 'none',
      zIndex: '[1]',
      background:
        'linear-gradient(to right, rgba(36, 40, 66, 0) 0%, {colors.background.cardBody} 100%)',
      animation: 'featuredVaultMarqueeFade 6s ease-in-out infinite',
    },
    '&[data-overflowing]::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      width: '32px',
      pointerEvents: 'none',
      zIndex: '[1]',
      background:
        'linear-gradient(to right, {colors.background.cardBody} 0%, rgba(36, 40, 66, 0) 100%)',
      opacity: '0',
      animation: 'featuredVaultMarqueeFadeLeft 6s ease-in-out infinite',
    },
  },
});

const NameInner = styled('div', {
  base: {
    display: 'inline-block',
    textStyle: 'h3',
    color: 'text.light',
    whiteSpace: 'nowrap',
    willChange: 'transform',
    '[data-overflowing] > &': {
      animation: 'featuredVaultMarquee 6s ease-in-out infinite',
    },
  },
});

const Tags = styled('div', {
  base: {
    display: 'flex',
    minWidth: '0',
    '& > *': {
      columnGap: '4px',
      rowGap: '4px',
    },
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
