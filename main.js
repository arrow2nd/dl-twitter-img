import { downloadImages } from "./dl.js";

for (const dir of Deno.readDirSync("./json")) {
  const fileName = dir.name;
  if (!fileName.endsWith(".json")) continue;

  await downloadImages(fileName);
}
