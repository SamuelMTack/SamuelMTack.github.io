# Launch-TackChat.ps1
# Automates starting Cloudflare Tunnel, extracting the random trycloudflare.com URL, and opening Tack Chat.

Write-Host "Starting Cloudflared Tunnel..." -ForegroundColor Cyan

# 1. Start cloudflare in the background and pipe output to a file
$LogFile = "cloudflared.log"

# Kill any existing cloudflared process to release the file lock
Get-Process | Where-Object { $_.Name -match "cloudflared" } | Stop-Process -Force -ErrorAction SilentlyContinue

if (Test-Path $LogFile) { Remove-Item $LogFile }

$Process = Start-Process -FilePath ".\cloudflared-windows-amd64.exe" -ArgumentList "tunnel --url http://127.0.0.1:11434 --http-host-header localhost" -RedirectStandardError $LogFile -PassThru -NoNewWindow

Write-Host "Waiting for TryCloudflare to generate a random URL..."
$Url = $null
$RetryCount = 0

# 2. Wait and read the log file until we find the trycloudflare URL
while ($null -eq $Url -and $RetryCount -lt 60) {
    Start-Sleep -Seconds 1
    if (Test-Path $LogFile) {
        try {
            # Copy to temp file to avoid file lock issues when reading
            Copy-Item $LogFile "cloudflared_temp.log" -ErrorAction SilentlyContinue
            if (Test-Path "cloudflared_temp.log") {
                $LogContent = Get-Content "cloudflared_temp.log" -Raw -ErrorAction SilentlyContinue
                if ($LogContent -match "(https://[a-zA-Z0-9-]+\.trycloudflare\.com)") {
                    $Url = $matches[1]
                }
            }
        } catch {
            # Ignore errors and try again next loop
        }
    }
    $RetryCount++
}

if ($Url) {
    Write-Host "Success! Found Tunnel URL: $Url" -ForegroundColor Green
    
    # 3. Open Tack Chat in the browser with the URL parameter
    $CodeHtmlPath = "..\Tack Chat\code.html"
    $TunnelJsPath = "..\Tack Chat\tunnel.js"
    $AbsolutePath = (Resolve-Path $CodeHtmlPath).Path
    
    # Write the URL to a local JS file to reliably pass it without query string issues
    Set-Content -Path $TunnelJsPath -Value "window.DYNAMIC_TUNNEL = '$Url';"
    
    # We url-encode the absolute path to handle spaces safely
    $EncodedPath = $AbsolutePath -replace "\\", "/" -replace " ", "%20"
    $BrowserUrl = "file:///$EncodedPath"
    
    Write-Host "Opening Tack Chat in Google Chrome..."
    Start-Process chrome.exe -ArgumentList "`"$BrowserUrl`""
} else {
    Write-Host "Error: Could not find the trycloudflare URL in time. Check $LogFile for details." -ForegroundColor Red
}

Write-Host "Press any key to stop the tunnel and exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
Stop-Process -Id $Process.Id -Force
Write-Host "Tunnel stopped."
