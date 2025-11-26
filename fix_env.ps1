$envPath = ".env"
$content = Get-Content $envPath
$projectRef = "ujoxiztgsszwtcwclgbr"
$poolerHost = "aws-0-eu-west-1.pooler.supabase.com"
$userPattern = "postgres\." + $projectRef + ":"

$newContent = $content | ForEach-Object {
    $line = $_
    if ($line -match "DATABASE_URL" -or $line -match "DIRECT_URL") {
        # Replace host
        $line = $line -replace "ujoxiztgsszwtcwclgbr\.pooler\.supabase\.com", $poolerHost
        $line = $line -replace "db\.ujoxiztgsszwtcwclgbr\.supabase\.co", $poolerHost
        
        # Fix username if needed
        # If it contains "postgres:" and NOT "postgres.ujoxiztgsszwtcwclgbr:"
        if ($line -match "postgres:" -and -not ($line -match $userPattern)) {
            $line = $line -replace "postgres:", ("postgres." + $projectRef + ":")
        }
    }
    $line
}

$newContent | Set-Content $envPath
Write-Host "Updated .env file"
