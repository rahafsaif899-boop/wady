# Places background-removed product PNGs on a clean white card with a soft shadow.
# Input : raw-photos/cutouts/<name>.png   (transparent background, e.g. from Paint > Remove background)
# Output: assets/img/products/<name>-white.jpg  (1000 x 1250, 4:5 like the product cards)
# Usage : powershell -ExecutionPolicy Bypass -File alwadi-clay-site/tools/white-bg.ps1
# ASCII-only on purpose (Windows PowerShell 5.1 reads scripts in the ANSI codepage).

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$site = Split-Path $PSScriptRoot -Parent
$in   = Join-Path $site 'raw-photos\cutouts'
$out  = Join-Path $site 'assets\img\products'
$W = 1000; $H = 1250; $pad = 90

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 88L

Get-ChildItem $in -Filter *.png | ForEach-Object {
  $src = [System.Drawing.Bitmap]::FromFile($_.FullName)

  # Trim fully transparent margins so every product is centred the same way.
  $minX = $src.Width; $minY = $src.Height; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $src.Height; $y += 2) {
    for ($x = 0; $x -lt $src.Width; $x += 2) {
      if ($src.GetPixel($x, $y).A -gt 20) {
        if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt 0) { Write-Output "skip $($_.Name): empty"; $src.Dispose(); return }
  $cw = $maxX - $minX + 1; $ch = $maxY - $minY + 1

  $scale = [Math]::Min(($W - 2 * $pad) / $cw, ($H - 2 * $pad - 40) / $ch)
  $dw = [int]($cw * $scale); $dh = [int]($ch * $scale)
  $dx = [int](($W - $dw) / 2); $dy = [int]($H - $pad - 40 - $dh)

  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'
  $g.Clear([System.Drawing.Color]::White)

  # soft floor shadow: a few stacked translucent ellipses
  for ($i = 6; $i -ge 1; $i--) {
    $alpha = [int](10 + (7 - $i) * 4)
    $sw = $dw * (0.55 + $i * 0.07); $sh = 18 + $i * 6
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, 59, 36, 20))
    $g.FillEllipse($brush, [float](($W - $sw) / 2), [float]($dy + $dh - $sh / 2), [float]$sw, [float]$sh)
    $brush.Dispose()
  }

  $g.DrawImage($src, (New-Object System.Drawing.Rectangle $dx, $dy, $dw, $dh), (New-Object System.Drawing.Rectangle $minX, $minY, $cw, $ch), 'Pixel')
  $name = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  $bmp.Save((Join-Path $out "$name-white.jpg"), $codec, $ep)
  $g.Dispose(); $bmp.Dispose(); $src.Dispose()
  Write-Output "ok $name-white.jpg"
}
