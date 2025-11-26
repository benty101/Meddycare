$envContent = Get-Content .env -Raw
Write-Host "=== DATABASE_URL ===" -ForegroundColor Green
$envContent -split "`n" | Where-Object { $_ -match "^DATABASE_URL" } | ForEach-Object { Write-Host $_ }
Write-Host ""
Write-Host "=== DIRECT_URL ===" -ForegroundColor Green
$envContent -split "`n" | Where-Object { $_ -match "^DIRECT_URL" } | ForEach-Object { Write-Host $_ }
