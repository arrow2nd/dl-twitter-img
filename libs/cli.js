/**
 * エラーを出力して終了
 * @param {string} msg エラーメッセージ
 */
export function showErrorAndExit(msg) {
  const help = `
 Use:
 deno run -A main.js [<fileName>] [options]
 
 Example:
 deno run -A main.js tweets.json --video
 
 Options:
 video ... 動画を保存する
 `;

  console.error(`[Error] ${msg}`);
  console.log(help);

  Deno.exit(1);
}
