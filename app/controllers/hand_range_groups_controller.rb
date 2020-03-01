class HandRangeGroupsController < ApplicationController
    before_action :set_hand_range, only: [:show, :update, :destroy]
  
    # GET /hand_range_groups
    def index
      @hand_range_groups = HandRangeGroup.all
  
      render json: @hand_range_groups
    end
  
    # GET /hand_ranges_groups/1
    def show
      render json: @hand_range_group
    end
    
    # GET /hand_ranges/user_id/1
    def show_user_id
      @hand_range_group = HandRangeGroup.where("user_id = " + params[:user_id])
      render json: @hand_range_group
    end
  
    # POST /hand_ranges
    def create
      @hand_range_group = HandRangeGroup.new(FolderName: "Evans Folder", user_id: params[:user_id])
      if @hand_range_group.save
        render json: @hand_range_group, status: :created, location: @hand_range
      else
        render json: @hand_range_group.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /hand_groups/1
    def update
      if @hand_range_groups.update(hand_range_params)
        render json: @hand_range_groups
      else
        render json: @hand_range_groups.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /hand_groups/1
    def destroy
      @hand_range_group.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_hand_range
        @hand_range_group = HandRangeGroup.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def hand_range_params
        params.require(:hand_range_groups).permit(:id, :user_id)
      end
  end
  