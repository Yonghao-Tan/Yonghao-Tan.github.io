#!/usr/bin/env python3
"""Compatibility wrapper that forwards CV PDF builds to the Node generator."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    node = shutil.which("node")
    if not node:
        raise RuntimeError("Missing required executable: node")

    script_path = (repo_root / "scripts" / "build_cv_pdf.mjs").resolve()
    if not script_path.exists():
        raise RuntimeError(f"Node CV builder not found: {script_path}")

    cmd = [node, str(script_path), *sys.argv[1:]]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.stdout:
        print(proc.stdout, end="")
    if proc.returncode != 0:
        raise RuntimeError(
            f"Command failed ({proc.returncode}): {' '.join(cmd)}\n"
            f"stderr:\n{proc.stderr}"
        )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"build_cv_pdf.py failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
