import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    { name: "username", required: true, unique: true, type: "text" },
    { name: "email", required: true, unique: true, type: "email", index: true },
  ],
};
