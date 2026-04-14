param(
  [string]$MarkdownPath = "_pages/CV.md",
  [string]$OutputPdfPath = "files/CV_Yonghao Tan.pdf",
  [string]$BackupDir = "files/backups",
  [string]$DocumentTitle = "Yonghao Tan CV"
)

$ErrorActionPreference = "Stop"

function Resolve-RepoPath {
  param([string]$PathText)
  if ([System.IO.Path]::IsPathRooted($PathText)) {
    return $PathText
  }
  return (Join-Path (Get-Location).Path $PathText)
}

function Get-BrowserPath {
  $candidates = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Google\Chrome\Application\chrome.exe"
  )
  foreach ($candidate in $candidates) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }
  throw "Cannot find Edge/Chrome executable for PDF printing."
}

function Get-PandocPath {
  try {
    return (Get-Command pandoc.exe -ErrorAction Stop).Source
  } catch {
    $fallback = "D:\Anaconda3\Scripts\pandoc.exe"
    if (Test-Path $fallback) {
      return $fallback
    }
    throw "Cannot find pandoc.exe in PATH."
  }
}

$markdownAbs = Resolve-RepoPath $MarkdownPath
$outputPdfAbs = Resolve-RepoPath $OutputPdfPath
$backupDirAbs = Resolve-RepoPath $BackupDir
$repoRoot = Split-Path -Parent $PSScriptRoot
$cssAbs = Join-Path $repoRoot "assets\css\cv-pdf.css"
$outputDir = Split-Path -Parent $outputPdfAbs
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}
if (-not (Test-Path $cssAbs)) {
  throw "Cannot find CV PDF stylesheet: $cssAbs"
}

$raw = Get-Content -Raw -Encoding UTF8 -Path $markdownAbs
$body = [regex]::Replace(
  $raw,
  "^---\s*`r?`n.*?`r?`n---\s*`r?`n",
  "",
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

$tmpDir = Join-Path $env:TEMP ("cv-build-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmpDir | Out-Null

$tmpMd = Join-Path $tmpDir "cv.md"
$tmpHtml = Join-Path $tmpDir "cv.html"

Set-Content -Path $tmpMd -Value $body -Encoding UTF8

$pandoc = Get-PandocPath
& $pandoc $tmpMd -f markdown -t html5 --standalone --self-contained "--resource-path=$repoRoot" --metadata "title=$DocumentTitle" --css $cssAbs -o $tmpHtml

if (Test-Path $outputPdfAbs) {
  if (-not (Test-Path $backupDirAbs)) {
    New-Item -ItemType Directory -Path $backupDirAbs | Out-Null
  }
  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $backupName = "CV_Yonghao Tan_backup_$timestamp.pdf"
  $backupPath = Join-Path $backupDirAbs $backupName
  Copy-Item -Path $outputPdfAbs -Destination $backupPath -Force
  Write-Output "Backup created: $backupPath"
}

$browser = Get-BrowserPath
$fileUrl = "file:///" + ($tmpHtml -replace "\\", "/")
& $browser --headless --disable-gpu --no-first-run --no-default-browser-check --no-pdf-header-footer "--print-to-pdf=$outputPdfAbs" $fileUrl | Out-Null

$ok = $false
for ($i = 0; $i -lt 60; $i++) {
  if (Test-Path $outputPdfAbs) {
    $ok = $true
    break
  }
  Start-Sleep -Milliseconds 250
}

if (-not $ok) {
  throw "Failed to generate PDF: $outputPdfAbs"
}

Write-Output "PDF generated: $outputPdfAbs"
Remove-Item -Recurse -Force $tmpDir
