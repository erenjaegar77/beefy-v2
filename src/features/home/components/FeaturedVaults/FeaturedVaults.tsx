import { styled } from '@repo/styles/jsx';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../../../../hooks/useMediaQuery.ts';
import { FeaturedVaultCard } from '../FeaturedVaultCard/FeaturedVaultCard.tsx';
import { selectFeaturedVaultIds } from '../../../data/selectors/featured-vaults.ts';
import { useAppSelector } from '../../../data/store/hooks.ts';

const DRAG_THRESHOLD_PX = 5;

const PAGE_SIZE_DESKTOP = 4;
const PAGE_SIZE_TABLET = 3;
const PAGE_SIZE_SMALL = 2;
const PAGE_SIZE_STACKED = 1;

const MEDIA_SIDE_BY_SIDE = '(min-width: 600px)';
const MEDIA_TABLET = '(min-width: 768px)';
const MEDIA_DESKTOP = '(min-width: 960px)';

export const FeaturedVaults = memo(function FeaturedVaults() {
  const { t } = useTranslation();
  const ids = useAppSelector(selectFeaturedVaultIds);
  const isSideBySide = useMediaQuery(MEDIA_SIDE_BY_SIDE);
  const isTablet = useMediaQuery(MEDIA_TABLET);
  const isDesktop = useMediaQuery(MEDIA_DESKTOP);
  const pageSize =
    isDesktop ? PAGE_SIZE_DESKTOP
    : isTablet ? PAGE_SIZE_TABLET
    : isSideBySide ? PAGE_SIZE_SMALL
    : PAGE_SIZE_STACKED;

  const pages = useMemo(() => {
    const chunks: string[][] = [];
    for (let i = 0; i < ids.length; i += pageSize) {
      chunks.push(ids.slice(i, i + pageSize));
    }
    return chunks;
  }, [ids, pageSize]);

  const isListing = pages.length > 1;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (!isListing || !scrollerRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = pageRefs.current.indexOf(visible.target as HTMLDivElement);
        if (idx >= 0) setActivePage(idx);
      },
      { root: scrollerRef.current, threshold: [0.5, 0.75, 1] }
    );
    for (const el of pageRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isListing, pages.length]);

  const handleDotClick = useCallback((pageIdx: number) => {
    const target = pageRefs.current[pageIdx];
    if (target) target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!isListing || !scroller) return;

    let isDown = false;
    let didDrag = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      isDown = true;
      didDrag = false;
      startX = e.clientX;
      startScrollLeft = scroller.scrollLeft;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (!didDrag && Math.abs(dx) > DRAG_THRESHOLD_PX) {
        didDrag = true;
        scroller.setPointerCapture(e.pointerId);
        scroller.style.scrollSnapType = 'none';
        scroller.style.cursor = 'grabbing';
      }
      if (didDrag) {
        scroller.scrollLeft = startScrollLeft - dx;
      }
    };
    const endDrag = () => {
      if (didDrag) {
        scroller.style.scrollSnapType = '';
        scroller.style.cursor = '';
      }
      isDown = false;
    };
    const onClickCapture = (e: MouseEvent) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    };

    scroller.addEventListener('pointerdown', onPointerDown);
    scroller.addEventListener('pointermove', onPointerMove);
    scroller.addEventListener('pointerup', endDrag);
    scroller.addEventListener('pointercancel', endDrag);
    scroller.addEventListener('click', onClickCapture, true);
    return () => {
      scroller.removeEventListener('pointerdown', onPointerDown);
      scroller.removeEventListener('pointermove', onPointerMove);
      scroller.removeEventListener('pointerup', endDrag);
      scroller.removeEventListener('pointercancel', endDrag);
      scroller.removeEventListener('click', onClickCapture, true);
    };
  }, [isListing]);

  if (ids.length === 0) return null;

  return (
    <Section>
      <Header>
        <Title>{t(isSideBySide ? 'FeaturedVaults-Title' : 'FeaturedVaults-Title-Short')}</Title>
        {isListing && (
          <Dots>
            {pages.map((_, i) => (
              <Dot
                key={i}
                type="button"
                data-active={i === activePage || undefined}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </Dots>
        )}
      </Header>
      <Scroller ref={scrollerRef} data-listing={isListing || undefined}>
        {pages.map((pageIds, pageIdx) => (
          <Page
            key={pageIdx}
            ref={el => {
              pageRefs.current[pageIdx] = el;
            }}
            data-listing={isListing || undefined}
            data-stacked={!isSideBySide || undefined}
            style={{
              gridTemplateColumns: `repeat(${isSideBySide ? pageSize : 1}, minmax(0, 1fr))`,
            }}
          >
            {pageIds.map(id => (
              <FeaturedVaultCard key={id} vaultId={id} />
            ))}
          </Page>
        ))}
      </Scroller>
    </Section>
  );
});

const Section = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
    paddingTop: '12px',
    marginBottom: '14px',
    borderRadius: '16px',
    background: 'background.content.dark',
  },
});

const Header = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: '24px',
    minHeight: '24px',
  },
});

const Title = styled('div', {
  base: {
    textStyle: 'body.medium',
    fontWeight: 'semiBold',
    color: 'text.middle',
  },
});

const Dots = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Dot = styled('button', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14px',
    height: '14px',
    padding: '0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      display: 'block',
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: 'text.dark',
      opacity: 0.4,
      transition: 'opacity 120ms ease, background 120ms ease',
    },
    '&[data-active]::before': {
      opacity: 1,
      background: 'text.light',
    },
  },
});

const Scroller = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '0',
    width: '100%',
    '&[data-listing]': {
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      scrollbarWidth: 'none',
      columnGap: '2px',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
});

const Page = styled('div', {
  base: {
    display: 'grid',
    width: '100%',
    columnGap: '2px',
    rowGap: '2px',
    '&:not([data-stacked]) > *': {
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    },
    '&:not([data-stacked]) > *:first-child': {
      borderBottomLeftRadius: '12px',
    },
    '&:not([data-stacked]) > *:last-child': {
      borderBottomRightRadius: '12px',
    },
    '&[data-listing]': {
      flex: '0 0 100%',
      minWidth: '0',
      scrollSnapAlign: 'start',
    },
  },
});
