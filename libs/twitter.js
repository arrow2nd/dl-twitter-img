import "https://deno.land/x/dotenv@v3.1.0/load.ts";

/**
 * @typedef Variant
 * @property {number | undefined} bitrate
 * @property {string} url
 */

/**
 * @typedef Media
 * @property {{ variants: Variant[] }} video_info
 */

/**
 * @typedef TweetResponse
 * @property {{ media: Media[] }} extended_entities
 */

/**
 * 動画のURLを取得
 * @param {string[]} ids ツイートIDの配列
 * @returns 動画URLの配列
 */
export async function fetchVideoUrl(ids) {
  const limit = 100;

  /** @type {string[]} */
  let results = [];

  for (let i = 0; i < Math.ceil(ids.length % limit); i += limit) {
    // NOTE: API v2では動画のURLが取得できないのでv1.1のエンドポイントを使用
    const endpointUrl = new URL(
      "https://api.twitter.com/1.1/statuses/lookup.json"
    );

    endpointUrl.searchParams.append("tweet_mode", "extended");
    endpointUrl.searchParams.append("id", ids.slice(i, i + limit).join(","));

    const res = await fetch(endpointUrl.toString(), {
      headers: {
        Authorization: `Bearer ${Deno.env.get("BEARER_TOKEN")}`,
      },
    });

    /** @type {TweetResponse[]} */
    const json = await res.json();

    const urls = json.map((e) => {
      const variants = e.extended_entities.media[0].video_info.variants.filter(
        (e) => typeof e.bitrate !== "undefined"
      );

      // ビットレートで降順ソート
      variants.sort((a, b) => b.bitrate - a.bitrate);

      return variants[0].url;
    });

    results = results.concat(urls);
  }

  return results;
}
