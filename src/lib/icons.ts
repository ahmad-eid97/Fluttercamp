/**
 * Semantic icon registry — a single house style (Solar duotone) for the redesign.
 * Reference icons by meaning (`icons.cart`) instead of scattering raw Iconify
 * strings, so the visual language stays consistent and is easy to swap.
 */
export const icons = {
  // brand / learning
  flutter: 'logos:flutter',
  dart: 'logos:dart',
  code: 'solar:code-bold-duotone',
  rocket: 'solar:rocket-2-bold-duotone',
  certificate: 'solar:diploma-verified-bold-duotone',
  book: 'solar:book-bookmark-bold-duotone',
  graduation: 'solar:square-academic-cap-2-bold-duotone',
  play: 'solar:play-circle-bold-duotone',
  widget: 'solar:widget-5-bold-duotone',

  // navigation / actions
  search: 'solar:magnifer-bold-duotone',
  cart: 'solar:cart-large-2-bold-duotone',
  user: 'solar:user-circle-bold-duotone',
  login: 'solar:login-3-bold-duotone',
  logout: 'solar:logout-3-bold-duotone',
  menu: 'solar:hamburger-menu-line-duotone',
  close: 'solar:close-circle-bold-duotone',
  arrowRight: 'solar:arrow-right-linear',
  arrowLeft: 'solar:arrow-left-linear',
  chevronDown: 'solar:alt-arrow-down-linear',
  chevronRight: 'solar:alt-arrow-right-linear',
  bell: 'solar:bell-bing-bold-duotone',
  settings: 'solar:settings-bold-duotone',
  dashboard: 'solar:widget-5-bold-duotone',

  // meta
  heart: 'solar:heart-bold',
  heartOutline: 'solar:heart-linear',
  star: 'solar:star-bold',
  clock: 'solar:clock-circle-bold-duotone',
  calendar: 'solar:calendar-bold-duotone',
  users: 'solar:users-group-rounded-bold-duotone',
  check: 'solar:check-circle-bold',
  checkSquare: 'solar:check-square-bold-duotone',
  verified: 'solar:verified-check-bold',
  globe: 'solar:global-bold-duotone',
  lightning: 'solar:bolt-bold-duotone',
  chat: 'solar:chat-round-dots-bold-duotone',
  money: 'solar:wallet-money-bold-duotone',
  chart: 'solar:chart-2-bold-duotone',
  trophy: 'solar:cup-star-bold-duotone',
  fire: 'solar:fire-bold-duotone',
  quote: 'solar:quote-up-bold',
  mail: 'solar:letter-bold-duotone',
  phone: 'solar:phone-bold-duotone',
  location: 'solar:map-point-bold-duotone',

  // socials
  facebook: 'mdi:facebook',
  twitter: 'mdi:twitter',
  instagram: 'mdi:instagram',
  linkedin: 'mdi:linkedin',
  whatsapp: 'mdi:whatsapp',
  youtube: 'mdi:youtube',
  github: 'mdi:github',
} as const;

export type IconName = keyof typeof icons;
