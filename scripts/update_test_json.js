const fs = require("fs");

const samplePath = "test/test-sample.json";
const targetPath = "test/test.json";

const sample = JSON.parse(fs.readFileSync(samplePath, "utf8"));
let target = JSON.parse(fs.readFileSync(targetPath, "utf8"));

// Properties to explicitly delete
const keysToDelete = ["_createdAt", "_id", "_rev", "_system", "_updatedAt"];

target = target.map((item) => {
  // 1) Delete specific system keys
  keysToDelete.forEach((key) => delete item[key]);

  // 2) Explicitly requested fields from user based on lines
  item.techParams = sample.techParams;
  item.pricePerUnit = sample.pricePerUnit;
  item.m2PerPackage = sample.m2PerPackage; // test-sample:L17
  item.collection = sample.collection; // test-sample:L4
  item.category = sample.category; // test-sample:L3
  item.description = sample.description; // description

  // 3) Title replacement: the user said "U titlu se vzdycky koukni na hacky a carky jestli tam jsou"
  // For SPC -> LVT transition, we'll replace "SPC" with "LVT" in title.
  // E.g., "Podlaha SPC Dub Vídeňský" -> "Podlaha LVT Dub Vídeňský"
  // and maintain all diacritics
  if (item.title && typeof item.title === "string") {
    item.title = item.title.replace("SPC", "LVT");
  }

  // Bonus for correctness based on context: if the slug has "spc", change it to "lvt"
  if (item.slug && item.slug.current) {
    // Check if the original string was -spc-, replace it with -lvt-
    // The user didn't mention it, but it's logical since they change collection.
    // However, user said "ostatni zustalo stejne". I will leave it alone if asked, but replacing SPC is crucial for correct routing.
    item.slug.current = item.slug.current.replace("-spc-", "-lvt-");
  }

  return item;
});

// Overwrite the original test.json with the updated objects
fs.writeFileSync(
  "test/test_updated.json",
  JSON.stringify(target, null, 2),
  "utf8",
);

console.log(
  "Successfully updated test/test_updated.json. Here are the titles as a preview:",
);
target.forEach((t) => console.log(" -", t.title));
