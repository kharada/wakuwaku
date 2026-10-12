"""
Pep Up「わくわくマイレージ 一括入力」に、CSVの記録を1日ずつ入力するスクリプト

使い方:
  pip install playwright
  playwright install chromium
  python pepup_csv_input.py records.csv            # 入力して送信
  python pepup_csv_input.py records.csv --dry-run  # 入力だけして送信しない（確認用）

  起動するとブラウザが開きます。Pep Up に自分でログインしてから、
  ターミナルで Enter を押すと処理が始まります。

CSV形式（1行目は見出し。UTF-8）:
    date  日付（例: 2026-10-03）
"""

import csv
import random
import sys
from datetime import date

from playwright.sync_api import sync_playwright

BASE_URL = "https://pepup.life/scsk_mileage_campaigns/{y}/{m}/{d}"
CHECK_COLUMNS = ["sleep_habit", "breakfast", "gratitude", "alcohol", "handwash", "monthly_event"]


def load_rows(path):
    with open(path, encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        r["_date"] = date.fromisoformat(r["date"].strip())
    return rows


def fill_day(page, row, dry_run):
    d = row["_date"]
    page.goto(BASE_URL.format(y=d.year, m=d.month, d=d.day))
    page.wait_for_load_state("networkidle")

    form = page.locator("form").filter(has=page.get_by_role("button", name="一括入力"))
    numbers = form.locator("input[type=number]")

    numbers.nth(0).fill(str(random.randint(8999, 10999)))
    numbers.nth(1).fill("7")

    boxes = form.locator("input[type=checkbox]")
    for idx in range(len(CHECK_COLUMNS)):
        box = boxes.nth(idx)
        if not box.is_checked():
            box.click()  # クリックで切り替え（サイト側に確実に反映させるため）

    radios = form.locator("input[type=radio]")
    if radios.count() > 0:
        # 画面上の並びは 5,4,3,2,1 の順
        radios.nth(1).click()
    else:
        print(f"{d}  sleep_quality の設問がないためスキップしました")

    if dry_run:
        print(f"{d}  入力のみ（送信なし）")
        page.wait_for_timeout(1500)
        return

    form.get_by_role("button", name="一括入力").click()
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    print(f"{d}  送信しました")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    path = sys.argv[1]
    dry_run = "--dry-run" in sys.argv[2:]
    rows = load_rows(path)
    print(f"{len(rows)} 日分を読み込みました（{'確認モード' if dry_run else '送信モード'}）")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("https://pepup.life/")
        input("ブラウザで Pep Up にログインしたら Enter を押してください...")

        for row in rows:
            try:
                fill_day(page, row, dry_run)
            except Exception as e:
                print(f"{row['_date']}  エラー: {e}")
                if input("続けますか？ [y/N] ").strip().lower() != "y":
                    break

        input("終わりました。Enter でブラウザを閉じます。")
        browser.close()


if __name__ == "__main__":
    main()
