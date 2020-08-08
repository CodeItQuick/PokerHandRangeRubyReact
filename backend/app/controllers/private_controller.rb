# app/controllers/private_controller.rb

# frozen_string_literal: true
class PrivateController < ActionController::API
    include Secured

    def couchbase_insert()
      board = params[:deadcards]
      # user = params[:user]
      rangeRepoIP = params[:rangeRepoIP]
      rangeRepoOOP = params[:rangeRepoOOP]
            
      @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      responses, header = JsonWebToken.verify(@auth_payload) 
      user = responses['sub'].split('|')[1]
      
      qry = "UPSERT INTO `PokerRangeAppalyzer` (KEY,VALUE) VALUES (  \"" + user + board + "\",{ \"user\":\"" + 
            user + "\", \"board\":\"" + board + "\", \"rangeRepo\": [" + rangeRepoIP.to_json + ", " + 
            rangeRepoOOP.to_json + "]} )"
      
      response = RestClient::Request.execute(method: :post, url: 'http://15.223.60.46:8093/query/service',
        payload: {statement: qry}, user: ENV['MAIN_USER_USERNAME'], password: ENV['MAIN_USER_PASSWORD'])

      
      render json: JSON.parse(response)
  
    end

    def get_scenarios()

      @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      responses, header = JsonWebToken.verify(@auth_payload) 
      user = responses['sub'].split('|')[1]
       
      qry = "SELECT * FROM `PokerRangeAppalyzer` t WHERE board = \"" + params[:boardcards] + "\" AND t.`user` = \"" + user + "\";"
      response = RestClient::Request.execute(method: :post, url: 'http://15.223.60.46:8093/query/service',
        payload: {statement: qry}, user: ENV['MAIN_USER_USERNAME'], password: ENV['MAIN_USER_PASSWORD'])

      render json: JSON.parse(response)
  
    end

    def get_all_scenarios()
    
      bucket_name = "PokerRangeAppalyzer"
      scope_name = "myapp"
      
      @auth_payload, @auth_header = request.headers['Authorization'].split(' ').last
      
      responses, header = JsonWebToken.verify(@auth_payload) 
      user = responses['sub'].split('|')[1]
        
      qry = "SELECT * FROM `PokerRangeAppalyzer` t WHERE t.`user` = \"" + user + "\";"
      
      response = RestClient::Request.execute(method: :post, url: 'http://15.223.60.46:8093/query/service',
        payload: {statement: qry}, user: ENV['MAIN_USER_USERNAME'], password: ENV['MAIN_USER_PASSWORD'])

      responseObj = JSON.parse(response)
      responseObj = responseObj["results"]
      render json: responseObj
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