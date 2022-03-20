# dl-twitter-img

ツイートの画像・動画を一括保存するやつ

## 準備

1. Twitter API のベアラートークンを取得
2. `.env` を作成
3. `BEARER_TOKEN=ベアラートークン` を記述して保存

## 使い方

1. [twinit](https://github.com/twintproject/twint) でいい感じにツイートを収集して JSON 形式 で出力
2. 画像なら `deno run -A main.js <ファイル名.json>`<br>動画なら `deno run -A main.js <ファイル名.json> --video`
3. 待つ
4. `out/ファイル名` 以下に保存される
