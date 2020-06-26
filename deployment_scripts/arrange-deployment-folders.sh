#!/bin/bash 

# Remove if previous deployment folder exists
sudo rm -rf /var/www/ec2-user/prev-deployment

# Backup current deployment 
sudo mv /var/www/ec2-user/deployment /var/www/ec2-user/prev-deployment

# Create new deployment folder and make nginx owner
sudo mkdir /var/www/ec2-user/deployment

sudo chown ec2-user:ec2-user /var/www/pisirpaylas/deployment