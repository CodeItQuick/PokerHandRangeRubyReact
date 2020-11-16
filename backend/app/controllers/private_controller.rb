# app/controllers/private_controller.rb

# frozen_string_literal: true
class PrivateController < ActionController::API
    include Secured

    def couchbase_insert()
      board = params[:deadcards]
      # user = params[:user]
      rangeRepoIP = params[:rangeRepoIP]
      rangeRepoOOP = params[:rangeRepoOOP]
      positionOpener = params[:positionOpener]
      positionDefender = params[:positionDefender]
      filename = params[:Filename]
        
      # Enable below in server
      @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      responses, header = JsonWebToken.verify(@auth_payload) 
      user = responses['sub'].split('|')[1]
      # user = 'default'

      @newRangeObjectCollection = RangeObjectCollection.new(ScenarioName: filename, Board: board, HandName: :rangeRepoIP, PokerUser: user, positionOpener: positionOpener, positionDefender: positionDefender)
      @newRangeObjectCollection.save

      for index in 0..rangeRepoIP.length() - 1 do
        @newRangeObject = RangeObject.new(Street: rangeRepoIP[index]['Street'], BetType: rangeRepoIP[index]['BetType'], PokerHands: "#{rangeRepoIP[index]['hands'].join(", ")}" || '')
        @newRangeObject.save
        @newRangeObjectMeta = RangeCollectionMetum.new(range_object_id: @newRangeObject.id, range_object_collection_id: @newRangeObjectCollection.id) 
        @newRangeObjectMeta.save
      end
      
      @newRangeObjectCollection2 = RangeObjectCollection.new(ScenarioName: filename, Board: board, HandName: :rangeRepoOOP, PokerUser: user, positionOpener: positionOpener, positionDefender: positionDefender)
      @newRangeObjectCollection2.save

      for index in 0..rangeRepoOOP.length() - 1 do
        @newRangeObject2 = RangeObject.new(Street: rangeRepoOOP[index]['Street'], BetType: rangeRepoOOP[index]['BetType'], PokerHands: "#{rangeRepoOOP[index]['hands'].join(", ")}" || '')
        @newRangeObject2.save
        @newRangeObjectMeta2 = RangeCollectionMetum.new(range_object_id: @newRangeObject2.id, range_object_collection_id: @newRangeObjectCollection2.id) 
        @newRangeObjectMeta2.save
      end

      render json: @newHands
  
    end

    def get_scenarios()

      @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      responses, header = JsonWebToken.verify(@auth_payload) 
      user = responses['sub'].split('|')[1]
       
      # user = 'default'

      @boardCards = RangeCollectionMetum.joins(:range_object_collection, :range_object ).select("*").where("Board = '" + params[:boardcards] + "' AND PokerUser = '" + user + "'")
      render json: @boardCards
  
    end

    def get_all_scenarios()
    
      bucket_name = "PokerRangeAppalyzer"
      scope_name = "myapp"
      
      @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      responses, header = JsonWebToken.verify(@auth_payload) 
      user = responses['sub'].split('|')[1]
      
      # user = 'default'

      @userRangeCollection = RangeObjectCollection.where( "PokerUser = '" + user + "'").distinct.pluck(:Board, :ScenarioName, :positionOpener, :positionDefender)
      render json: @userRangeCollection
      
    end

    def get_scenario
      get_scenarios
    end

    def get_all_scenario
      get_all_scenarios
    end
  
    
    def private
      couchbase_insert
    end
    def private_scoped
      render json: { message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' }
    end
  end