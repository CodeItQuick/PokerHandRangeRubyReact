#!/bin/bash
# Set ownership for all folders
sudo chown -R ec2-user:ec2-user /var/www/
# chown -R root:root /var/www/protected

# set files to 644 [except *.pl *.cgi *.sh]
find /var/www/ -type f -not -name ".pl" -not -name ".cgi" -not -name "*.sh" -print0 | sudo xargs -0 chmod 0644

# set folders to 755
find /var/www/ -type d -print0 | sudo xargs -0 chmod 0755