import { createClient } from "next-sanity";

const projectId = "dgknp4mt";
const dataset = "production";
const apiVersion = "2026-01-20";

// Ensure a token is provided
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "Error: SANITY_API_TOKEN is missing. Please run with SANITY_API_TOKEN=your_token_here",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We are writing data
  token,
});

async function deleteFloors() {
  client
    .delete({ query: '*[_type == "stair"][0...999]' })
    .then((result) => console.log("Deleted stairs", result))
    .catch(console.error);
}

deleteFloors();
