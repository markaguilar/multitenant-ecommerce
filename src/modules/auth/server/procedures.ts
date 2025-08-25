import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { TRPCError } from "@trpc/server";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { AUTH_COOKIE } from "@/modules/auth/constants";
import { LoginSchema, RegisterSchema } from "@/modules/auth/schemas";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    return session;
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
    // Hard-expire as a fallback to cover path/attr mismatches
    cookies.set({
      name: AUTH_COOKIE,
      value: "",
      maxAge: 0,
      path: "/",
      httpOnly: true,
    });
  }),
  register: baseProcedure
    .input(RegisterSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.payload.find({
        collection: "users",
        limit: 1,
        where: {
          or: [
            { username: { equals: input.username } },
            { email: { equals: input.email.toLowerCase() } },
          ],
        },
      });

      const existingUser = existingData.docs[0];

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists",
        });
      }

      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email.toLowerCase(),
          username: input.username,
          password: input.password,
        },
      });

      // user login after register
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      // save cookies
      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: Ensure cross-domain cookie sharing

        // samesite: "none",
        // domain: "",
        // funroad.com // initial cookie
        // antonio.funroad,com // cookies does not exist here
      });
    }),
  login: baseProcedure.input(LoginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.payload.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    // save cookies
    const cookies = await getCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: "/",
      // TODO: Ensure cross-domain cookie sharing

      // samesite: "none",
      // domain: "",
      // funroad.com // initial cookie
      // antonio.funroad,com // cookies does not exist here
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
      ...(process.env.AUTH_COOKIE_DOMAIN
        ? { domain: process.env.AUTH_COOKIE_DOMAIN }
        : {}),
      ...(data.exp ? { expires: new Date(data.exp * 1000) } : {}),
    });

    const { token, ...rest } = data;
    return rest;
  }),
});
