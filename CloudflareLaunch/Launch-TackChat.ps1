# Launch-TackChat.ps1
# Automates starting Cloudflare Tunnel, extracting the random trycloudflare.com URL, and opening Tack Chat.

Write-Host "Starting Cloudflared Tunnel..." -ForegroundColor Cyan

# 1. Start cloudflare in the background and pipe output to a file
$LogFile = "cloudflared.log"
if (Test-Path $LogFile) { Remove-Item $LogFile }

$Process = Start-Process -FilePath ".\cloudflared-windows-amd64.exe" -ArgumentList "tunnel --url http://127.0.0.1:11434 --http-host-header localhost" -RedirectStandardError $LogFile -PassThru -NoNewWindow

Write-Host "Waiting for TryCloudflare to generate a random URL..."
$Url = $null
$RetryCount = 0

# 2. Wait and read the log file until we find the trycloudflare URL
while ($null -eq $Url -and $RetryCount -lt 20) {
    Start-Sleep -Seconds 1
    if (Test-Path $LogFile) {
        $LogContent = Get-Content $LogFile -Raw
        if ($LogContent -match "(https://[a-zA-Z0-9-]+\.trycloudflare\.com)") {
            $Url = $matches[1]
        }
    }
    $RetryCount++
}

if ($Url) {
    Write-Host "Success! Found Tunnel URL: $Url" -ForegroundColor Green
    
    # 3. Open Tack Chat in the browser with the URL parameter
    $CodeHtmlPath = "..\Tack Chat\code.html"
    $AbsolutePath = (Resolve-Path $CodeHtmlPath).Path
    
    # We add the ?tunnel= parameter so code.html saves it automatically
    $BrowserUrl = "file:///$AbsolutePath`?tunnel=$Url"
    
    Write-Host "Opening Tack Chat in your default browser..."
    Start-Process $BrowserUrl
} else {
    Write-Host "Error: Could not find the trycloudflare URL in time. Check $LogFile for details." -ForegroundColor Red
}

Write-Host "Press any key to stop the tunnel and exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
Stop-Process -Id $Process.Id -Force
Write-Host "Tunnel stopped."
