import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CustomCategory } from "@/app/(app)/(home)/types";

import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, // populate subcategories, subCategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData: CustomCategory[] = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc?.subcategories?.docs ?? []).map((doc) => ({
        // Because of depth: 1 we are confident "doc" will be a type of "Category"
        ...(doc as Category),
        subcategories: undefined,
      })),
    }));

    return formattedData;
  }),
});
