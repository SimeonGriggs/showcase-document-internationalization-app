import { createClient, groq } from "next-sanity";
import { cache } from "react";

const projectId = "6h1mv88x";
const dataset = "production-v3";
const apiVersion = `2023-05-22`;

const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

// Wrap the cache function in a way that reuses the TypeScript definitions
export const clientFetch = cache(client.fetch.bind(client));