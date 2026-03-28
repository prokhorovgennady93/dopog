#!/bin/bash

# ADR Platform Hourly Backup Script
# Place this in /root/dopog/scripts/backup.sh and chmod +x

# Configuration
DB_SOURCE="/root/dopog/data/prod.db"
BACKUP_DIR="/root/dopog_backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
MAX_BACKUPS=48 # Keep 2 days of hourly backups

# Ensure backup directory exists
mkdir -p $BACKUP_DIR

# Run backup
if [ -f "$DB_SOURCE" ]; then
    cp "$DB_SOURCE" "$BACKUP_DIR/prod_$TIMESTAMP.db"
    echo "[$(date)] Backup successful: prod_$TIMESTAMP.db"
    
    # Prune old backups
    cd $BACKUP_DIR
    ls -tp | grep -v '/$' | tail -n +$(($MAX_BACKUPS + 1)) | xargs -I {} rm -- {}
else
    echo "[$(date)] ERROR: Source database not found at $DB_SOURCE"
    exit 1
fi
