import { cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "@/modules/auth/constants";

export async function setAuthCookie(token: string, exp?: number) {
  const cookies = await getCookies();
  cookies.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    ...(process.env.AUTH_COOKIE_DOMAIN
      ? { domain: process.env.AUTH_COOKIE_DOMAIN }
      : {}),
    ...(exp ? { expires: new Date(exp * 1000) } : {}),
  });
}

export async function clearAuthCookie() {
  const cookies = await getCookies();
  cookies.delete(AUTH_COOKIE);
  cookies.set({
    name: AUTH_COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    ...(process.env.AUTH_COOKIE_DOMAIN
      ? { domain: process.env.AUTH_COOKIE_DOMAIN }
      : {}),
    expires: new Date(0),
    maxAge: 0,
  });
}
