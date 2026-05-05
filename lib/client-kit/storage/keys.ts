// Single source of truth for localStorage keys
export const STORAGE_KEYS = {
  CURRENCY: "site_currency",
  LANG: "site_lang",
  FAVORITES: "site_favs",
  FAVORITES_USER: (userId: string) => `site_favs_${userId}`,
  CART: "site_cart",
  CART_SAVED: "site_saved",
  CART_ACTIVITY: "site_cart_activity",
  CART_REMINDER: "site_cart_reminder",
  PROMOS: "site_promos",
  DARK_MODE: "site_dark_mode",
} as const

export const COOKIE_KEYS = {
  CURRENCY: "site_currency",
  LANG: "site_lang",
} as const
