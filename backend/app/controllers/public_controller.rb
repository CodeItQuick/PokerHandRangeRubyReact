# app/controllers/public_controller.rb

# frozen_string_literal: true
# require 'couchbase'
require 'json'
require 'rest-client'
# include Couchbase

class PublicController < ApplicationController

    # This route doesn't need authentication

    def get_all_scenario
      @userRangeCollection = RangeObjectCollection.where( "PokerUser = 'Evan'"  ).distinct.pluck(:Board)
      render json: @userRangeCollection
    end

    def get_scenario
      @boardCards = RangeCollectionMetum.joins(:range_object_collection, :range_object ).select("*").where("Board = '" + params[:boardcards] + "'")
      render json: @boardCards
    end


    private
  
      # Only allow a trusted parameter "white list" through.
      def public_params
        params.require(:board, :user).permit(:rangeRepoIP, :rangeRepoOOP, :boardcards)
      end
  end