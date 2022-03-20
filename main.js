import { parse } from "https://deno.land/std@0.130.0/flags/mod.ts";

import { showErrorAndExit } from "./libs/cli.js";
import { downloadImages, downloadVideos } from "./libs/dl.js";

const args = parse(Deno.args);
if (args._.length !== 1) {
  showErrorAndExit("引数が間違っています");
}

const readFilePath = args._[0];
if (!readFilePath.endsWith(".json")) {
  showErrorAndExit("JSONファイルを指定してください");
}

console.log(`[START]`);

if (args.video) {
  await downloadVideos(readFilePath);
} else {
  await downloadImages(readFilePath);
}

console.log(`[END]`);
