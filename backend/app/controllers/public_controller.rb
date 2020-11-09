# app/controllers/public_controller.rb

# frozen_string_literal: true
# require 'couchbase'
require 'json'
require 'rest-client'
# include Couchbase

class PublicController < ApplicationController

    # This route doesn't need authentication


    def couchbase_insert()
      board = params[:deadcards]
      # user = params[:user]
      rangeRepoIP = params[:rangeRepoIP]
      rangeRepoOOP = params[:rangeRepoOOP]
        
      # Enable below in server
      # @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      # responses, header = JsonWebToken.verify(@auth_payload) 
      # user = responses['sub'].split('|')[1]
      user = 'Evan'

      @newRangeObjectCollection = RangeObjectCollection.new(Board: board, HandName: :rangeRepoIP, PokerUser: user)
      @newRangeObjectCollection.save

      for index in 0..rangeRepoIP.length() - 1 do
        @newRangeObject = RangeObject.new(Street: rangeRepoIP[index]['Street'], BetType: rangeRepoIP[index]['BetType'], PokerHands: "#{rangeRepoIP[index]['hands'].join(", ")}" || '')
        @newRangeObject.save
        @newRangeObjectMeta = RangeCollectionMetum.new(range_object_id: @newRangeObject.id, range_object_collection_id: @newRangeObjectCollection.id) 
        @newRangeObjectMeta.save
      end
      
      @newRangeObjectCollection2 = RangeObjectCollection.new(Board: board, HandName: :rangeRepoOOP, PokerUser: user)
      @newRangeObjectCollection2.save

      for index in 0..rangeRepoOOP.length() - 1 do
        @newRangeObject2 = RangeObject.new(Street: rangeRepoOOP[index]['Street'], BetType: rangeRepoOOP[index]['BetType'], PokerHands: "#{rangeRepoOOP[index]['hands'].join(", ")}" || '')
        @newRangeObject2.save
        @newRangeObjectMeta2 = RangeCollectionMetum.new(range_object_id: @newRangeObject2.id, range_object_collection_id: @newRangeObjectCollection2.id) 
        @newRangeObjectMeta2.save
      end

      # puts rangeRepoOOP

      # qry = "UPSERT INTO `PokerRangeAppalyzer` (KEY,VALUE) VALUES (  \"" + user + board + "\",{ \"user\":\"" + 
      #       user + "\", \"board\":\"" + board + "\", \"rangeRepo\": [" + rangeRepoIP.to_json + ", " + 
      #       rangeRepoOOP.to_json + "]} )"
      
      # response = RestClient::Request.execute(method: :post, url: 'http://15.223.60.46:8093/query/service',
      #   payload: {statement: qry}, user: ENV['MAIN_USER_USERNAME'], password: ENV['MAIN_USER_PASSWORD'])

      
      render json: @newHands
  
    end

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