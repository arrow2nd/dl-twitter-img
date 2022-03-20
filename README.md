# dl-twitter-img

ツイートの画像・動画を一括保存するやつ

## 使い方

1. [twinit](https://github.com/twintproject/twint) でいい感じにツイートを収集して JSON にまとめる
2. 画像なら `deno run -A main.js <ファイル名.json>`<br>動画なら `deno run -A main.js <ファイル名.json> --video`
3. 待つ
4. `out/ファイル名` 以下に保存される
