#!/usr/bin/env ruby

require 'rubygems'
require 'aws-sdk'

project_name = 'poker-range-app'

if ARGV.length != 1
  puts 'You must supply the name of the project to build'
  exit 1
else
  project_name = ARGV[0]
end

credentials = Aws::Credentials.new(ENV["AWS_ACCESS_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"])
client = Aws::Amplify::Client.new(region: 'us-east-2', credentials: credentials)

begin
    resp = client.create_app({
        name: "poker-range-app", # required
        platform: "WEB", # accepts WEB
        auto_branch_creation_patterns: ["AutoBranchCreationPattern"],
        auto_branch_creation_config: {
          stage: "DEVELOPMENT", # accepts PRODUCTION, BETA, DEVELOPMENT, EXPERIMENTAL, PULL_REQUEST
        },
      })
  puts 'Building project ' + project_name
rescue StandardError => ex
  puts 'Error building project: ' + ex.message
end