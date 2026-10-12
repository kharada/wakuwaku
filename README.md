# Pep Up わくわくマイレージ CSV 一括入力

CSVに記録した日付をもとに、Pep Up「わくわくマイレージ 一括入力」へ1日ずつ入力するPythonスクリプトです。

## 準備

Pythonをインストールしたうえで、PlaywrightとChromiumを準備します。

```sh
pip install playwright
playwright install chromium
```

## 使い方

CSVの記録を入力して送信する場合:

```sh
python pepup_csv_input.py records.csv
```

送信せず入力内容を確認する場合:

```sh
python pepup_csv_input.py records.csv --dry-run
```

スクリプトを起動するとブラウザが開きます。Pep Upに手動でログインし、ターミナルでEnterを押すと処理が始まります。各日付の入力・送信結果はターミナルに表示されます。処理が終わったら、Enterを押してブラウザを閉じてください。

## CSV形式

UTF-8形式で保存し、1行目を見出しにします。`date`列に`YYYY-MM-DD`形式の日付を指定してください。

```csv
date
2026-10-03
2026-10-02
```

`records_template.csv`を入力用CSVの例として利用できます。実際の記録を入れた`records.csv`は`.gitignore`に登録されており、ソース管理の対象外です。

## ライセンス

MIT

## なぜこのスクリプトを作ったのか

日次の入力項目を増やし、従業員の作業時間を奪おうとする人やシステムのことを、私は「時間泥棒」とみなしています。
時間泥棒への対抗処置としてこのスクリプトを作っています。
従業員の時間を奪わないよう、自動連携するデバイスが全社員に配布されたときに、このスクリプト及びリポジトリを削除します。
