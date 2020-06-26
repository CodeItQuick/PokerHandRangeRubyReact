#!/bin/bash 

# Remove if previous deployment folder exists
rm -rf /var/www/ec2-user/prev-deployment

# Backup current deployment 
mv /var/www/ec2-user/deployment /var/www/ec2-user/prev-deployment

# Create new deployment folder and make nginx owner
mkdir /var/www/ec2-user/deployment

chown ec2-user:ec2-user /var/www/pisirpaylas/deployment