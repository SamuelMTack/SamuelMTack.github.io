# Start-Ollama.ps1
# Automates starting Ollama with the correct environment variables to allow CORS and fix the 403 Host Header error.

Write-Host "Stopping any existing Ollama to apply new CORS settings..." -ForegroundColor Yellow
Stop-Process -Name "ollama" -Force -ErrorAction SilentlyContinue
Stop-Process -Name "ollama app" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

$env:OLLAMA_HOST="0.0.0.0"
$env:OLLAMA_ORIGINS="*"

Write-Host "Starting Ollama Server..." -ForegroundColor Cyan
Write-Host "CORS is allowed (*)" -ForegroundColor Green
Write-Host "Host Header strict checks are disabled (0.0.0.0)" -ForegroundColor Green
Write-Host "Configured for model: Jamet-8B-MK.V-Blackroot-12.2B-V1" -ForegroundColor Yellow
Write-Host "------------------------------------------------------" -ForegroundColor Gray

# Start the Ollama server
ollama serve
