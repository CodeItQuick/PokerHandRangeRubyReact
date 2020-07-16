#!/bin/bash 

# Load environment variables
source /etc/profile

# Go to the deployment directory
cd /var/www/ec2-user/deployment

# Run migrations in production
RAILS_ENV=production bundle exec rake db:migrate