param(
  [string]$MarkdownPath = "_pages/CV.md",
  [string]$OutputPdfPath = "files/CV_Yonghao Tan.pdf",
  [string]$BackupDir = "files/backups"
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
$outputDir = Split-Path -Parent $outputPdfAbs
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
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
$tmpCss = Join-Path $tmpDir "cv.css"
$tmpHtml = Join-Path $tmpDir "cv.html"

$css = @"
body {
  font-family: "Segoe UI", Arial, sans-serif;
  line-height: 1.45;
  color: #222;
  margin: 32px 38px;
  font-size: 12pt;
}
h1, h2, h3 {
  color: #111;
  margin-top: 0.9em;
  margin-bottom: 0.35em;
}
h2 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
}
ul {
  margin-top: 0.25em;
  margin-bottom: 0.5em;
}
li {
  margin-bottom: 0.2em;
}
p {
  margin: 0.3em 0;
}
a {
  color: #145ea8;
}
"@

Set-Content -Path $tmpMd -Value $body -Encoding UTF8
Set-Content -Path $tmpCss -Value $css -Encoding UTF8

$pandoc = Get-PandocPath
& $pandoc $tmpMd -f markdown -t html5 --standalone --metadata title="Yonghao Tan CV" --css $tmpCss -o $tmpHtml

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
& $browser --headless --disable-gpu --no-first-run --no-default-browser-check "--print-to-pdf=$outputPdfAbs" $fileUrl | Out-Null

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
