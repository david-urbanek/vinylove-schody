import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dgknp4mt",
  dataset: "production",
  apiVersion: "2026-01-20",
  useCdn: true,
  perspective: "published",
});
