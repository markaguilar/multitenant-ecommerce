"use client";

// import { getQueryClient, trpc } from "@/trpc/server";

// <-- hooks can only be used in client components
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions());
  // const queryClient = getQueryClient();
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions(),
  // );
  return (
    <div>
      Home page <p>is Loading: {`${categories.isLoading}`}</p>
      {JSON.stringify(categories.data, null, 2)}
    </div>
  );
}
