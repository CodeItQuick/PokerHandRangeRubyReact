# app/controllers/public_controller.rb

# frozen_string_literal: true
class PublicController < ActionController::API
    # This route doesn't need authentication
    def public
      render json: { message: "Hello from a public endpoint! You don't need to be authenticated to see this." }
    end
  end