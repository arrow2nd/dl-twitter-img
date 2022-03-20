import { fetchVideoUrl } from "./twitter.js";

/**
 * @typedef Tweet
 * @property {string} conversation_id
 * @property {string} date
 * @property {string} time
 * @property {string[]} photos
 * @property {string[]} videos
 */

/**
 * 保存先のディレクトリを作成
 * @param {string} readFilePath 読み込むファイルのパス
 * @returns ディレクトリのパス
 */
function createOutDir(readFilePath) {
  const dirName = readFilePath.match(/([^/]+)\..{3,4}$/)[1];
  const outDirPath = `./out/${dirName}`;

  Deno.mkdirSync(outDirPath, { recursive: true });

  return outDirPath;
}

/**
 * URLからファイルを保存
 * @param {string} outDirPath 保存先ディレクトリパス
 * @param {string} outFileName 保存ファイル名
 * @param {string} url URL
 */
async function saveFileFromUrl(outDirPath, outFileName, url) {
  const parsedUrl = new URL(url);

  const res = await fetch(parsedUrl.href);
  const bytes = new Uint8Array(await res.arrayBuffer());

  const ext = parsedUrl.pathname.match(/\.([a-z0-9]{3,4})$/i)[1];
  const outPath = `${outDirPath}/${outFileName}.${ext}`;

  Deno.writeFileSync(outPath, bytes);
  console.log(`[SAVE] ${outPath}`);

  await new Promise((e) => setTimeout(e, 2000));
}

/**
 * 画像を一括保存
 * @param {string} readFilePath 読み込むファイルのパス
 */
export async function downloadImages(readFilePath) {
  const outDirPath = createOutDir(readFilePath);

  /** @type {Tweet[]} */
  const tweets = JSON.parse(Deno.readTextFileSync(readFilePath));
  const max = tweets.length;

  for (let i = 0; i < max; i++) {
    const { date, photos } = tweets[i];

    for (let j = 0; j < photos.length; j++) {
      await saveFileFromUrl(outDirPath, `${date}_${j}`, photos[j]);
    }

    console.log(`-- ${i} / ${max} --`);
  }
}

/**
 * 動画を一括保存
 * @param {string} readFilePath 読み込むファイルのパス
 */
export async function downloadVideos(readFilePath) {
  const outDirPath = createOutDir(readFilePath);

  /** @type {Tweet[]} */
  const tweets = JSON.parse(Deno.readTextFileSync(readFilePath));

  const ids = tweets.map(({ conversation_id }) => conversation_id);
  const videoUrls = await fetchVideoUrl(ids);

  for (let i = 0; i < tweets.length; i++) {
    const { date } = tweets[i];
    await saveFileFromUrl(outDirPath, date, videoUrls[i]);
  }
}
