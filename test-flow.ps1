# Test script for Faith Journey automation
$base = 'http://localhost:3000'

Write-Host "Testing lead-capture to $base"
Write-Host "Testing quiz-complete to $base"

# Example payloads - descomente quando o servidor estiver rodando
# $leadBody = @{email='test@faithjourney.com'; first_name='Test'; utm_source='meta'; utm_medium='cpc'; utm_campaign='quiz_top'; utm_content='varA'} | ConvertTo-Json
# Invoke-RestMethod -Uri "$base/api/webhook/lead-capture" -Method Post -Body $leadBody -ContentType 'application/json'
