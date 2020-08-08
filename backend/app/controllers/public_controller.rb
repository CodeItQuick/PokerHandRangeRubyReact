# app/controllers/public_controller.rb

# frozen_string_literal: true
# require 'couchbase'
require 'json'
require 'rest-client'
# include Couchbase

class PublicController < ActionController::API

    # This route doesn't need authentication

    private
  
      # Only allow a trusted parameter "white list" through.
      def public_params
        params.require(:board, :user).permit(:rangeRepoIP, :rangeRepoOOP)
      end
  end