import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  /** Accessible label. When omitted the mark is treated as decorative. */
  title?: string;
};

/**
 * FlutterCamp brand mark — a custom duotone "layered panels" glyph.
 *
 * An original mark (not the stock multicolor Flutter logo) that nods to
 * Flutter's stacked-panel motif. It is monochrome and paints with
 * `currentColor`, so it adopts whatever context it sits in: crisp white on the
 * brand blue→navy gradient chip (navbar / footer / auth), brand blue on the
 * light panel-sidebar chip. The two trailing layers use reduced opacity to read
 * as depth on any background.
 */
export function LogoMark({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      width="1em"
      height="1em"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {/* top panel */}
      <path d="M16 3.5 28.5 10.75 16 18 3.5 10.75Z" fill="currentColor" />
      {/* middle layer */}
      <path
        d="M3.5 14 16 21.25 28.5 14 28.5 16.25 16 23.5 3.5 16.25Z"
        fill="currentColor"
        opacity="0.62"
      />
      {/* back layer */}
      <path
        d="M3.5 18.25 16 25.5 28.5 18.25 28.5 20.5 16 27.75 3.5 20.5Z"
        fill="currentColor"
        opacity="0.34"
      />
    </svg>
  );
}

export default LogoMark;
