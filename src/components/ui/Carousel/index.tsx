'use client';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '@iconify/react';
import { icons } from '@/lib/icons';
import { cn } from '@/lib/utils';
import cls from './carousel.module.scss';

type PerView = { base?: number; sm?: number; md?: number; lg?: number; xl?: number };

type Props = {
  children: React.ReactNode;
  /** Slides per view at each breakpoint (cascades upward from `base`). */
  perView?: PerView;
  /** Gap between slides, in px. */
  gap?: number;
  dir?: 'rtl' | 'ltr';
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
  arrows?: boolean;
  dots?: boolean;
  className?: string;
  slideClassName?: string;
};

/**
 * Lightweight carousel built on embla-carousel-react (replaces Swiper).
 * Slide sizing is pure CSS (responsive `perView`), so it renders correctly
 * before hydration with no layout shift.
 */
export function Carousel({
  children,
  perView = {},
  gap = 20,
  dir = 'ltr',
  loop = false,
  align = 'start',
  arrows = false,
  dots = false,
  className,
  slideClassName,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align,
    direction: dir,
    containScroll: 'trimSnaps',
  });

  const slides = React.Children.toArray(children);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [selected, setSelected] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
    };
    sync();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', sync);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', sync);
    };
  }, [emblaApi, onSelect]);

  const { base = 1, sm = base, md = sm, lg = md, xl = lg } = perView;
  const styleVars = {
    '--pv-base': base,
    '--pv-sm': sm,
    '--pv-md': md,
    '--pv-lg': lg,
    '--pv-xl': xl,
    '--cgap': `${gap}px`,
  } as React.CSSProperties;

  const prevIcon = dir === 'rtl' ? icons.arrowRight : icons.arrowLeft;
  const nextIcon = dir === 'rtl' ? icons.arrowLeft : icons.arrowRight;

  return (
    <div className={cn(cls.embla, className)}>
      <div className={cls.viewport} ref={emblaRef}>
        <div className={cls.container} style={styleVars}>
          {slides.map((child, i) => (
            <div className={cn(cls.slide, slideClassName)} key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {arrows && (
        <div className={cls.arrows}>
          <button
            type="button"
            className={cls.arrow}
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!loop && !canPrev}
            aria-label="Previous"
          >
            <Icon icon={prevIcon} />
          </button>
          <button
            type="button"
            className={cls.arrow}
            onClick={() => emblaApi?.scrollNext()}
            disabled={!loop && !canNext}
            aria-label="Next"
          >
            <Icon icon={nextIcon} />
          </button>
        </div>
      )}

      {dots && snaps.length > 1 && (
        <div className={cls.dots}>
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn(cls.dot, i === selected && cls.dotActive)}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
