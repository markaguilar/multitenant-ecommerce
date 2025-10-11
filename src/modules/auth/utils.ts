import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
    // sameSite: "lax",
    // secure: process.env.NODE_ENV !== "development",
    // ...(process.env.AUTH_COOKIE_DOMAIN
    //   ? { domain: process.env.AUTH_COOKIE_DOMAIN }
    //   : {}),
    // ...(value.exp ? { expires: new Date(value.exp * 1000) } : {}),
  });
};
