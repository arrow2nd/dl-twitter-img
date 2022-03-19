/**
 * @typedef Tweet
 * @property {string} date
 * @property {string} time
 * @property {string[]} photos
 */

/**
 * 画像を一括保存する
 * @param {string} fileName ファイル名
 */
export async function downloadImages(fileName) {
  console.log(`[START] ${fileName}`);

  const outDirPath = `./out/${fileName.replace(/\..+$/, "")}`;
  Deno.mkdirSync(outDirPath, { recursive: true });

  /** @type {Tweet[]} */
  const tweets = JSON.parse(Deno.readTextFileSync(`./json/${fileName}`));
  const max = tweets.length;

  for (let i = 0; i < max; i++) {
    const { date, time, photos } = tweets[i];
    const outImageName = `${date}_${time.replace(/:/g, "-")}`;

    for (const url of photos) {
      const res = await fetch(url);
      const bytes = new Uint8Array(await res.arrayBuffer());

      const ext = url.match(/\.([A-Za-z]+)$/)[1];
      const outPath = `${outDirPath}/${outImageName}.${ext}`;

      Deno.writeFileSync(outPath, bytes);
      console.log(`[SAVE] ${outPath}`);

      await new Promise((e) => setTimeout(e, 2000));
    }

    console.log(`-- ${i} / ${max} --`);
  }

  console.log(`[END] ${fileName}`);
}
