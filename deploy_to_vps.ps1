# Auto deploy script to VPS 72.56.234.58
Write-Host "Starting deployment to VPS 72.56.234.58..." -ForegroundColor Yellow

# Command for the server
$remoteCommand = "apt update && apt install -y docker.io docker-compose-v2 git && rm -rf /root/dopog && git clone https://github.com/prokhorovgennady93/dopog.git /root/dopog && cd /root/dopog && echo 'AUTH_SECRET=9f8e7d6c5b4a32109f8e7d6c5b4a3210`nNEXTAUTH_URL=http://72.56.234.58:3000`nAUTH_TRUST_HOST=true' > .env && mkdir -p data && docker compose up -d --build"

# Run SSH. Use password: bpiLBLNp?+Ug5@
ssh root@72.56.234.58 $remoteCommand

Write-Host "Success! Website should be at http://72.56.234.58:3000" -ForegroundColor Green
