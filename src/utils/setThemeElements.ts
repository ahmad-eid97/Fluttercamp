import getImageUrl from './getImageUrl';
import hexToRgb from './hexToRgb';
import { getFilters } from './hexToCssFilters';
//= Types
import type { GeneralDataResponse } from '@/types';

export function setThemeFonts(fonts: GeneralDataResponse['theme_fonts']) {
  const rtlFonts = fonts.rtl;
  const ltrFonts = fonts.main;

  var style = document.createElement('style');
  style.appendChild(document.createTextNode(`
    @font-face {
        font-family: 'rtl-font';
        src: url('${getImageUrl(rtlFonts.regular.slice(1))}');
        font-weight: 400;
        font-display: swap;
    }
    @font-face {
        font-family: 'rtl-font';
        src: url('${getImageUrl(rtlFonts.medium.slice(1))}');
        font-weight: 500;
        font-display: swap;
    }
    @font-face {
        font-family: 'rtl-font';
        src: url('${getImageUrl(rtlFonts.bold.slice(1))}');
        font-weight: 600;
        font-display: swap;
    }
    @font-face {
        font-family: 'ltr-font';
        src: url('${getImageUrl(ltrFonts.regular.slice(1))}');
        font-weight: 400;
        font-display: swap;
    }
    @font-face {
        font-family: 'ltr-font';
        src: url('${getImageUrl(ltrFonts.medium.slice(1))}');
        font-weight: 500;
        font-display: swap;
    }
    @font-face {
        font-family: 'ltr-font';
        src: url('${getImageUrl(ltrFonts.bold.slice(1))}');
        font-weight: 600;
        font-display: swap;
    }
  `));

  document.head.appendChild(style);
}

export function setThemeColors(colors: GeneralDataResponse['theme_colors']) {
  if (colors.primary) {
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--main-color", colors.primary);
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--main-color-rgb", `${hexToRgb(colors.primary).join()}`);
  }

  if (colors['primary-hover']) {
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--main-color-dark", colors['primary-hover']);
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--main-color-dark-rgb", `${hexToRgb(colors['primary-hover']).join()}`);
  }

  if (colors.secondary) {
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--secondary-color", colors.secondary);
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--secondary-color-rgb", `${hexToRgb(colors.secondary).join()}`);
  }

  if (colors['primary-bg']) {
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--bg-main", colors['primary-bg']);
    document.querySelector<HTMLDivElement>(":root")!.style.setProperty("--bg-main-rgb", `${hexToRgb(colors['primary-bg']).join()}`);

    document.querySelectorAll<HTMLImageElement>('.illustrationImage').forEach((element: HTMLImageElement) => {
      element.style.cssText = getFilters(colors['primary-bg']).filter;
    })
  }
}