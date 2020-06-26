#!/bin/bash

# Load environment variables
source /etc/profile

# Print deployment info
DEPLOYMENT_TIME=$( date -u "+%Y/%m/%d %H:%M:%S" )
echo "Deployment finished at: "$DEPLOYMENT_TIME" UTC" > /var/www/ec2-user/deployment/public/deployment_time.txt

# Arrange folder permissions
chown -R ec2-user:ec2-user /var/www/ec2-user/deployment
chmod -R 775 /var/www/ec2-user/deployment

passenger stop
passenger start -p 3000 -d -e production