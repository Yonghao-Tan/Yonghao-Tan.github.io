#!/usr/bin/env python3
"""Collect daily visitor snapshots from Busuanzi and persist as JSON."""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

BUSUANZI_ENDPOINT = "https://busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback"


def fetch_busuanzi_snapshot(site_url: str) -> Dict[str, int]:
    request = Request(
        BUSUANZI_ENDPOINT,
        headers={
            "Referer": site_url,
            "User-Agent": "Mozilla/5.0 (compatible; visitor-stats-bot/1.0)",
        },
    )
    try:
        with urlopen(request, timeout=20) as response:
            body = response.read().decode("utf-8", errors="replace")
    except HTTPError as exc:
        raise RuntimeError(f"HTTP error from Busuanzi: {exc.code}") from exc
    except URLError as exc:
        raise RuntimeError(f"Network error from Busuanzi: {exc.reason}") from exc

    match = re.search(r"BusuanziCallback\((\{.*?\})\)", body)
    if not match:
        raise RuntimeError("Failed to parse Busuanzi response payload")

    payload = json.loads(match.group(1))
    return {
        "site_pv": int(payload.get("site_pv", 0)),
        "site_uv": int(payload.get("site_uv", 0)),
        "page_pv": int(payload.get("page_pv", 0)),
    }


def load_existing_records(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {"source": "busuanzi", "records": []}

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        data = {"source": "busuanzi", "records": []}

    if not isinstance(data, dict):
        data = {"source": "busuanzi", "records": []}
    if not isinstance(data.get("records"), list):
        data["records"] = []
    if "source" not in data:
        data["source"] = "busuanzi"
    return data


def upsert_record(records: List[Dict[str, Any]], snapshot: Dict[str, Any], keep_days: int) -> List[Dict[str, Any]]:
    by_date = {}
    for item in records:
        if isinstance(item, dict) and item.get("date"):
            by_date[str(item["date"])] = item
    by_date[snapshot["date"]] = snapshot

    ordered = [by_date[key] for key in sorted(by_date.keys())]
    if keep_days > 0:
        ordered = ordered[-keep_days:]
    return ordered


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    output_rel = os.environ.get("VISITOR_STATS_OUTPUT", "files/visitor-stats.json")
    output_path = (repo_root / output_rel).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    site_url = os.environ.get("VISITOR_STATS_SITE_URL", "https://yonghao-tan.github.io/")
    snapshot_date = os.environ.get(
        "VISITOR_STATS_DATE", datetime.now(timezone.utc).strftime("%Y-%m-%d")
    )
    keep_days = int(os.environ.get("VISITOR_STATS_MAX_DAYS", "365"))

    values = fetch_busuanzi_snapshot(site_url)
    snapshot = {
        "date": snapshot_date,
        "site_pv": values["site_pv"],
        "site_uv": values["site_uv"],
        "page_pv": values["page_pv"],
    }

    data = load_existing_records(output_path)
    data["records"] = upsert_record(data["records"], snapshot, keep_days)
    data["updated_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    data["site_url"] = site_url

    output_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"Saved {len(data['records'])} record(s) to {output_path} | "
        f"date={snapshot['date']} site_pv={snapshot['site_pv']} site_uv={snapshot['site_uv']}"
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover
        print(f"collect_visitor_stats.py failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
