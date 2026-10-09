# Builds assets/img/og-image.jpg (1200x630) - the preview card shown when the site link is shared.
# ASCII-only on purpose; Arabic text is built from char codes for Windows PowerShell 5.1.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$site = Split-Path $PSScriptRoot -Parent
function U([int[]]$codes) { -join ($codes | ForEach-Object { [char]$_ }) }

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
$g.Clear([System.Drawing.Color]::FromArgb(247, 241, 232))

# product photo on the right half
$photo = [System.Drawing.Image]::FromFile((Join-Path $site 'assets\img\products\ghaith-15.jpg'))
$pw = 560; $srcH = [int]($photo.Width * $H / $pw)
$sy = [int](($photo.Height - $srcH) * 0.55)
$g.DrawImage($photo, (New-Object System.Drawing.Rectangle ($W - $pw), 0, $pw, $H), (New-Object System.Drawing.Rectangle 0, $sy, $photo.Width, $srcH), 'Pixel')
$photo.Dispose()

# gold divider
$gold = [System.Drawing.Color]::FromArgb(201, 160, 74)
$g.FillRectangle((New-Object System.Drawing.SolidBrush $gold), ($W - $pw - 6), 0, 6, $H)

# logo
$logo = [System.Drawing.Image]::FromFile((Join-Path $site 'assets\img\logo.png'))
$g.DrawImage($logo, 235, 30, 170, 170)
$logo.Dispose()

$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(59, 36, 20))
$clay = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(169, 83, 42))
$soft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(106, 74, 51))
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = 'Center'
$fmt.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionRightToLeft
$box = { param($y, $h) New-Object System.Drawing.RectangleF 20, $y, 600, $h }

# "وادي كلاي"
$name = U @(0x0648,0x0627,0x062F,0x064A,0x0020,0x0643,0x0644,0x0627,0x064A)
# "فخار صحي لتبريد وتنقية الماء"
$line = U @(0x0641,0x062E,0x0627,0x0631,0x0020,0x0635,0x062D,0x064A,0x0020,0x0644,0x062A,0x0628,0x0631,0x064A,0x062F,0x0020,0x0648,0x062A,0x0646,0x0642,0x064A,0x0629,0x0020,0x0627,0x0644,0x0645,0x0627,0x0621)
# "تيراكوتا أوروبية + زيولايت أردني"
$blend = U @(0x062A,0x064A,0x0631,0x0627,0x0643,0x0648,0x062A,0x0627,0x0020,0x0623,0x0648,0x0631,0x0648,0x0628,0x064A,0x0629,0x0020,0x002B,0x0020,0x0632,0x064A,0x0648,0x0644,0x0627,0x064A,0x062A,0x0020,0x0623,0x0631,0x062F,0x0646,0x064A)
# "توصيل لكل الأردن · الدفع عند الاستلام"
$deliv = U @(0x062A,0x0648,0x0635,0x064A,0x0644,0x0020,0x0644,0x0643,0x0644,0x0020,0x0627,0x0644,0x0623,0x0631,0x062F,0x0646,0x0020,0x00B7,0x0020,0x0627,0x0644,0x062F,0x0641,0x0639,0x0020,0x0639,0x0646,0x062F,0x0020,0x0627,0x0644,0x0627,0x0633,0x062A,0x0644,0x0627,0x0645)

$g.DrawString($name,  (New-Object System.Drawing.Font 'Segoe UI', 54, ([System.Drawing.FontStyle]::Bold)), $ink,  (& $box 215 90), $fmt)
$g.DrawString($line,  (New-Object System.Drawing.Font 'Segoe UI', 28), $clay, (& $box 310 50), $fmt)
$g.DrawString($blend, (New-Object System.Drawing.Font 'Segoe UI', 21), $soft, (& $box 372 40), $fmt)
$g.FillRectangle((New-Object System.Drawing.SolidBrush $gold), 270, 432, 100, 2)
$g.DrawString($deliv, (New-Object System.Drawing.Font 'Segoe UI', 20), $ink,  (& $box 452 40), $fmt)
$fmtL = New-Object System.Drawing.StringFormat; $fmtL.Alignment = 'Center'
$g.DrawString('WADI CLAY  -  CRAFTED BY NATURE', (New-Object System.Drawing.Font 'Segoe UI', 14, ([System.Drawing.FontStyle]::Bold)), (New-Object System.Drawing.SolidBrush $gold), (& $box 548 30), $fmtL)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 88L
$bmp.Save((Join-Path $site 'assets\img\og-image.jpg'), $codec, $ep)
$g.Dispose(); $bmp.Dispose()
Write-Output 'ok og-image.jpg'
