param(
  [string]$MarkdownPath = "_resume/CV_Yonghao Tan.md",
  [string]$OutputPdfPath = "files/CV_Yonghao_Tan.pdf",
  [string]$BackupDir = "files/backups",
  [string]$DocumentTitle = "Yonghao Tan CV"
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$scriptPath = Join-Path $repoRoot "scripts\build_cv_pdf.mjs"
if (-not (Test-Path $scriptPath)) {
  throw "Cannot find Node CV builder: $scriptPath"
}

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  throw "Cannot find node executable in PATH."
}

& $node.Source $scriptPath `
  --markdown $MarkdownPath `
  --output $OutputPdfPath `
  --backup-dir $BackupDir `
  --title $DocumentTitle

if ($LASTEXITCODE -ne 0) {
  throw "Node CV PDF build failed with exit code $LASTEXITCODE."
}
