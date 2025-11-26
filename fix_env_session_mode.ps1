$envContent = @"
NEXT_PUBLIC_SUPABASE_URL="https://ujoxiztgsszwtcwclgbr.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb3hpenRnc3N6d3Rjd2NsZ2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTE5OTUsImV4cCI6MjA3OTM4Nzk5NX0.aoUSZ_k4ek6Ds-t4_dYM3Wj5_Dbt0Jn2bxJlAM2rew4"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb3hpenRnc3N6d3Rjd2NsZ2JyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzgxMTk5NSwiZXhwIjoyMDc5Mzg3OTk1fQ.Xzyhw1T65FhmegfV12PCLEMH_qZRFdHyT6guwOC36PE"
DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:MeddyCareDB001%40@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:MeddyCareDB001%40@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
"@

$envContent | Set-Content -Path ".env" -NoNewline
Write-Host "✅ Updated to SESSION MODE pooling (port 5432) for both URLs" -ForegroundColor Green
Write-Host "✅ Removed pgbouncer=true parameter (not needed for session mode)" -ForegroundColor Green
