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
        <ChainIcon chainId={vault.chainId} size={20} />
      </ChainBadge>
      <Identity>
        <HeadTop>
          <MarqueeName text={punctuationWrap(vault.names.list)} />
          <HeadIcon>
            <VaultIdImage vaultId={vaultId} size={40} />
          </HeadIcon>
        </HeadTop>
        <MarqueeTags vaultId={vaultId} />
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
    paddingBlock: '24px 20px',
    paddingInline: '24px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'text.middle',
    background: 'background.cardBody',
    _hover: {
      '--featured-tags-fade-right-animation': 'featuredVaultMarqueeFade',
      '--featured-tags-fade-left-animation': 'featuredVaultMarqueeFadeLeft',
    },
  },
});

const ChainBadge = styled('div', {
  base: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    lineHeight: '0',
    backgroundColor: 'colorPalette.primary',
    borderBottomRightRadius: '12px',
    padding: '2px',
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
    rowGap: '8px',
    minWidth: '0',
  },
});

const HeadTop = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
    minWidth: '0',
    paddingRight: '48px',
  },
});

const HeadIcon = styled('div', {
  base: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    lineHeight: '0',
    pointerEvents: 'none',
  },
});

type MarqueeNameProps = { text: string };

// Scroll the looping name at a constant speed so longer names take proportionally
// longer (rather than every name sharing a fixed duration).
const MARQUEE_SCROLL_SPEED_PX_PER_S = 40;

const MarqueeName = memo(function MarqueeName({ text }: MarqueeNameProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { width: viewportWidth, ref: viewportRef } = useResizeDetector<HTMLDivElement>();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [duration, setDuration] = useState(0);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const viewport = viewportRef.current;
    if (!inner || !viewport) {
      setIsOverflowing(false);
      return;
    }
    setIsOverflowing(inner.scrollWidth > viewport.clientWidth);
  }, [text, viewportWidth, viewportRef]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !isOverflowing) {
      setDuration(0);
      return;
    }
    // The loop translates by -50% of the track, i.e. exactly one copy (text + its
    // trailing gap) = half the two-copy track width. duration = distance / speed.
    const distance = track.scrollWidth / 2;
    setDuration(distance / MARQUEE_SCROLL_SPEED_PX_PER_S);
  }, [isOverflowing, text, viewportWidth]);

  const style = { '--marquee-duration': `${duration}s` } as CSSProperties;

  return (
    <NameViewport ref={viewportRef} data-overflowing={isOverflowing || undefined} style={style}>
      <NameTrack ref={trackRef}>
        <NameInner ref={innerRef}>{text}</NameInner>
        {isOverflowing ?
          <NameInner aria-hidden="true">{text}</NameInner>
        : null}
      </NameTrack>
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
    },
  },
});

const NameTrack = styled('div', {
  base: {
    display: 'flex',
    width: 'max-content',
    willChange: 'transform',
    '[data-overflowing] > &': {
      animation: 'featuredVaultMarqueeLoop var(--marquee-duration, 10s) linear infinite',
    },
  },
});

const NameInner = styled('div', {
  base: {
    display: 'inline-block',
    textStyle: 'h3',
    color: 'text.light',
    whiteSpace: 'nowrap',
    '[data-overflowing] &': {
      paddingRight: '48px',
    },
  },
});

type MarqueeTagsProps = { vaultId: VaultEntity['id'] };

const MarqueeTags = memo(function MarqueeTags({ vaultId }: MarqueeTagsProps) {
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
  }, [vaultId, viewportWidth, viewportRef]);

  const isOverflowing = overflowPx > 0;
  const style = { '--marquee-shift': `-${overflowPx}px` } as CSSProperties;

  return (
    <TagsViewport ref={viewportRef} data-overflowing={isOverflowing || undefined} style={style}>
      <TagsInner ref={innerRef}>
        <VaultTags vaultId={vaultId} />
      </TagsInner>
    </TagsViewport>
  );
});

const TagsViewport = styled('div', {
  base: {
    position: 'relative',
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
      animation: 'var(--featured-tags-fade-right-animation, none) 6s ease-in-out infinite',
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
      animation: 'var(--featured-tags-fade-left-animation, none) 6s ease-in-out infinite',
    },
  },
});

const TagsInner = styled('div', {
  base: {
    display: 'block',
    width: 'max-content',
    willChange: 'transform',
    '& > *': {
      marginTop: '0',
      columnGap: '4px',
      rowGap: '4px',
    },
    'a:hover [data-overflowing] > &': {
      animation: 'featuredVaultMarquee 6s ease-in-out infinite',
    },
  },
});

const Stats = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    columnGap: '16px',
    flexShrink: 0,
    '& > *': {
      rowGap: '2px',
    },
  },
});

const StatColumn = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px 6px',
    minWidth: '0',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
});
