import type { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";

import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

import { caller } from "@/trpc/server";

export const metadata: Metadata = {
  title: "Sign in | Funroad",
  robots: { index: false },
};

const Page = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return <SignInView />;
};

export default Page;
