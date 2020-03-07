class HandRangeFoldersController < ApplicationController
    before_action :set_hand_range, only: [:show, :update, :destroy]
  
    # GET /hand_range_folders
    def index
      @hand_range_folders = HandRangeFolder.all
  
      render json: @hand_range_folders
    end
  
    # GET /hand_ranges_folders/1
    def show
      render json: @hand_range_folder
    end
    
    # GET /hand_ranges/user_id/1
    def show_user_id
      @hand_range_folder = HandRangeFolder.where("user_id = " + params[:user_id])
      render json: @hand_range_folder
    end
  
    # POST /hand_ranges
    def create
      @hand_range_folder = HandRangeFolder.new(FolderName: params[:FolderName], user_id: params[:user_id])
      if @hand_range_folder.save
        render json: @hand_range_folder, status: :created, location: @hand_range
      else
        render json: @hand_range_folder.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /hand_ranges/1
    def update
      if @hand_range_folder.update(hand_range_params)
        render json: @hand_range_folder
      else
        render json: @hand_range_folder.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /hand_ranges/1
    def destroy
      @hand_range_folder.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_hand_range
        @hand_range_folder = HandRangeFolder.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def hand_range_params
        params.require(:hand_range_folders).permit(:FolderName, :id, :user_id)
      end
  end
  