# Database upload script
Write-Host "Copying dev.db to the server (prod.db)..." -ForegroundColor Yellow

# SCP command. Password: bpiLBLNp?+Ug5@
scp dev.db root@72.56.234.58:/root/dopog/data/prod.db

Write-Host "Database uploaded successfully!" -ForegroundColor Green
