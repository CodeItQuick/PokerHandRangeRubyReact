
require 'couchbase'
include Couchbase

class HandRangesController < ApplicationController
  before_action :set_hand_range, only: [:show, :update, :destroy]

  # GET /hand_ranges
  def index
    
    couchbase_search

    @hand_ranges = HandRange.all

    # render json: @hand_ranges
  end

  def couchbase_search()
    
    bucket_name = "travel-sample"
    scope_name = "myapp"
    
    options = Cluster::ClusterOptions.new
    options.authenticate("Administrator", "RtR_07555")
    cluster = Cluster.connect("couchbase://localhost", options)
    bucket = cluster.bucket("travel-sample")

    result = cluster.query("SELECT r.airlineid, a.name FROM `travel-sample` as r INNER JOIN `travel-sample` as a ON r.airlineid = meta(a).id WHERE r.type=\"route\" LIMIT 10")

    render json: result.rows

  end


  # GET /hand_ranges/1
  def show
    render json: @hand_range
  end
  
  # GET /hand_ranges/user_id/1
  def show_user_id
    @hand_range = HandRangeGroup.select("*").joins(:hand_range, :hand_range_folder)
    .where("hand_range_groups.hand_range_folder_id = hand_range_folders.id AND hand_range_groups.hand_range_id = hand_ranges.id AND hand_range_folders.user_id = " + params[:user_id] )
                  
    render json: @hand_range
  end

  # POST /hand_ranges
  def create

    @hand_range_folder = HandRangeFolder.new(FolderName: params[:folder_name], user_id: params[:user_id])
    @hand_range_folder.save

    #Create the Opening Ranges with all positions (UTG, MP, CO, BU, SB)
    
    @hand_range0 = HandRange.new(RangeName: 'UTG', RangeScope: '')
    @hand_range0.save
    @hand_range1 = HandRange.new(RangeName: 'MP', RangeScope: '')
    @hand_range1.save
    @hand_range2 = HandRange.new(RangeName: 'CO', RangeScope: '')
    @hand_range2.save
    @hand_range3 = HandRange.new(RangeName: 'BU', RangeScope: '')
    @hand_range3.save
    @hand_range4 = HandRange.new(RangeName: 'SB', RangeScope: '')
    @hand_range4.save

    @hand_range_group0 = HandRangeGroup.new(GroupName: "Opening Ranges", hand_range_id: @hand_range0.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group1 = HandRangeGroup.new(GroupName: "Opening Ranges", hand_range_id: @hand_range1.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group2 = HandRangeGroup.new(GroupName: "Opening Ranges", hand_range_id: @hand_range2.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group3 = HandRangeGroup.new(GroupName: "Opening Ranges", hand_range_id: @hand_range3.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group4 = HandRangeGroup.new(GroupName: "Opening Ranges", hand_range_id: @hand_range4.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group0.save
    @hand_range_group1.save
    @hand_range_group2.save
    @hand_range_group3.save
    @hand_range_group4.save
  
    #Create the Defending Ranges with all positions (MP, CO, BU, SB, BB)
    
    @hand_range00 = HandRange.new(RangeName: 'UTG', RangeScope: '')
    @hand_range00.save
    @hand_range01 = HandRange.new(RangeName: 'MP', RangeScope: '')
    @hand_range01.save
    @hand_range02 = HandRange.new(RangeName: 'CO', RangeScope: '')
    @hand_range02.save
    @hand_range03 = HandRange.new(RangeName: 'BU', RangeScope: '')
    @hand_range03.save
    @hand_range04 = HandRange.new(RangeName: 'SB', RangeScope: '')
    @hand_range04.save

    @hand_range_group00 = HandRangeGroup.new(GroupName: "Defending Ranges", hand_range_id: @hand_range00.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group01 = HandRangeGroup.new(GroupName: "Defending Ranges", hand_range_id: @hand_range01.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group02 = HandRangeGroup.new(GroupName: "Defending Ranges", hand_range_id: @hand_range02.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group03 = HandRangeGroup.new(GroupName: "Defending Ranges", hand_range_id: @hand_range03.id, hand_range_folder_id: @hand_range_folder.id)
    @hand_range_group04 = HandRangeGroup.new(GroupName: "Defending Ranges", hand_range_id: @hand_range04.id, hand_range_folder_id: @hand_range_folder.id)
    
    @hand_range_group00.save
    @hand_range_group01.save
    @hand_range_group02.save
    @hand_range_group03.save
    @hand_range_group04.save

    if @hand_range_group3.save

      @result_hand_ranges = HandRangeGroup.select("*").joins(:hand_range, :hand_range_folder).where(:hand_range_folders => { id: @hand_range_folder.id } )
      render json: @result_hand_ranges, status: :created, location: @hand_range
    else
      render json: @hand_range_group.errors, status: :unprocessable_entity
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
      params.require(:hand_range).permit(:RangeName, :RangeScope0, :RangeScope1, :RangeScope2, :RangeScope3, :user_id)
    end
end
