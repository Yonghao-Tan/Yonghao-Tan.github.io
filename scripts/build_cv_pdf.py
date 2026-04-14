#!/usr/bin/env python3
"""Build CV PDF from markdown and backup the previous PDF."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


def strip_front_matter(markdown_text: str) -> str:
    pattern = re.compile(r"^---\s*\r?\n.*?\r?\n---\s*\r?\n", re.DOTALL)
    return re.sub(pattern, "", markdown_text, count=1)


def run_command(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(
            f"Command failed ({proc.returncode}): {' '.join(cmd)}\n"
            f"stdout:\n{proc.stdout}\n"
            f"stderr:\n{proc.stderr}"
        )


def find_executable(name: str) -> str:
    path = shutil.which(name)
    if not path:
        raise RuntimeError(f"Missing required executable: {name}")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="Build CV PDF from markdown.")
    parser.add_argument("--markdown", default="_pages/CV.md", help="Path to markdown CV source.")
    parser.add_argument("--output", default="files/CV_Yonghao Tan.pdf", help="Path to output PDF.")
    parser.add_argument("--backup-dir", default="files/backups", help="Directory for PDF backups.")
    parser.add_argument("--title", default="Yonghao Tan CV", help="Document title metadata.")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    markdown_path = (repo_root / args.markdown).resolve()
    output_pdf = (repo_root / args.output).resolve()
    backup_dir = (repo_root / args.backup_dir).resolve()
    css_path = (repo_root / "assets/css/cv-pdf.css").resolve()

    if not markdown_path.exists():
        raise RuntimeError(f"Markdown file not found: {markdown_path}")
    if not css_path.exists():
        raise RuntimeError(f"CSS file not found: {css_path}")

    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    backup_dir.mkdir(parents=True, exist_ok=True)

    markdown_raw = markdown_path.read_text(encoding="utf-8")
    markdown_body = strip_front_matter(markdown_raw)

    pandoc = find_executable("pandoc")
    wkhtmltopdf = find_executable("wkhtmltopdf")

    with tempfile.TemporaryDirectory(prefix="cv-build-") as temp_dir:
        temp_path = Path(temp_dir)
        temp_md = temp_path / "cv.md"
        temp_html = temp_path / "cv.html"

        temp_md.write_text(markdown_body, encoding="utf-8")

        run_command(
            [
                pandoc,
                str(temp_md),
                "-f",
                "markdown",
                "-t",
                "html5",
                "--standalone",
                "--self-contained",
                "--resource-path",
                str(repo_root),
                "--metadata",
                f"title={args.title}",
                "--css",
                str(css_path),
                "-o",
                str(temp_html),
            ]
        )

        if output_pdf.exists():
            ts = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
            backup_name = f"CV_Yonghao Tan_backup_{ts}.pdf"
            shutil.copy2(output_pdf, backup_dir / backup_name)
            print(f"Backup created: {backup_dir / backup_name}")

        run_command(
            [
                wkhtmltopdf,
                "--quiet",
                "--enable-local-file-access",
                str(temp_html),
                str(output_pdf),
            ]
        )

    print(f"PDF generated: {output_pdf}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"build_cv_pdf.py failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
