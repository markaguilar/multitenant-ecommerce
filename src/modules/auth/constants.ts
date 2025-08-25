export const AUTH_COOKIE = "payload-token" as const;
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  // Consider setting maxAge/expires for "remember me"
} as const;

export const STORE_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_STORE_BASE_DOMAIN ?? "example.local";
