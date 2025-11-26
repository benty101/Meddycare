# The issue is that we're using the pooler URL with pgbouncer=true
# But the username format might be incorrect for Supabase pooler

# For Supabase, when using pgbouncer pooler:
# - Use port 6543 with pgbouncer=true for transaction pooling
# - Use port 5432 for direct connection OR session pooling

# The username should be: postgres.<project-ref>
# But we need to ensure we're using the correct password

# Let's update the .env to use the correct direct connection format

$envPath = ".env"
$projectRef = "ujoxiztgsszwtcwclgbr"

# Read current content
$envContent = Get-Content $envPath -Raw

# Update DATABASE_URL to use direct connection (port 5432)
$envContent = $envContent -replace 'DATABASE_URL="postgresql://[^"]*"', 'DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:[password]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'

# DIRECT_URL should point to the actual direct endpoint
$envContent = $envContent -replace 'DIRECT_URL="postgresql://[^"]*"', 'DIRECT_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:[password]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'

Write-Host "Please update [password] in the .env file manually"
Write-Host "The format should be:"
Write-Host 'DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:YOUR_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'
