# Start-Ollama.ps1
# Automates starting Ollama with the correct environment variables to allow CORS and fix the 403 Host Header error.

$env:OLLAMA_HOST="0.0.0.0"
$env:OLLAMA_ORIGINS="*"

Write-Host "Starting Ollama Server..." -ForegroundColor Cyan
Write-Host "CORS is allowed (*)" -ForegroundColor Green
Write-Host "Host Header strict checks are disabled (0.0.0.0)" -ForegroundColor Green
Write-Host "------------------------------------------------------" -ForegroundColor Gray

# Start the Ollama server
ollama serve
