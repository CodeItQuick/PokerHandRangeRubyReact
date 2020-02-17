class HandRangesController < ApplicationController
  before_action :set_hand_range, only: [:show, :update, :destroy]

  # GET /hand_ranges
  def index
    @hand_ranges = HandRange.all

    render json: @hand_ranges
  end

  # GET /hand_ranges/1
  def show
    render json: @hand_range
  end

  # POST /hand_ranges
  def create
    @hand_range = HandRange.new(hand_range_params)

    if @hand_range.save
      render json: @hand_range, status: :created, location: @hand_range
    else
      render json: @hand_range.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /hand_ranges/1
  def update
    if @hand_range.update(hand_range_params)
      render json: @hand_range
    else
      render json: @hand_range.errors, status: :unprocessable_entity
    end
  end

  # DELETE /hand_ranges/1
  def destroy
    @hand_range.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hand_range
      @hand_range = HandRange.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def hand_range_params
      params.require(:hand_range).permit(:RangeName, :RangeScope0, :RangeScope1, :RangeScope2, :RangeScope3, :RangeScope4, :user_id)
    end
end
