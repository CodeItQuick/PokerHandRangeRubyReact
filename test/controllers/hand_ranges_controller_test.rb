require 'test_helper'

class HandRangesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @hand_range = hand_ranges(:one)
  end

  test "should get index" do
    get hand_ranges_url, as: :json
    assert_response :success
  end

  test "should create hand_range" do
    assert_difference('HandRange.count') do
      post hand_ranges_url, params: { hand_range: { RangeName: @hand_range.RangeName, RangeScope0: @hand_range.RangeScope0, RangeScope1: @hand_range.RangeScope1, RangeScope2: @hand_range.RangeScope2, RangeScope3: @hand_range.RangeScope3, RangeScope4: @hand_range.RangeScope4, UserID: @hand_range.UserID } }, as: :json
    end

    assert_response 201
  end

  test "should show hand_range" do
    get hand_range_url(@hand_range), as: :json
    assert_response :success
  end

  test "should update hand_range" do
    patch hand_range_url(@hand_range), params: { hand_range: { RangeName: @hand_range.RangeName, RangeScope0: @hand_range.RangeScope0, RangeScope1: @hand_range.RangeScope1, RangeScope2: @hand_range.RangeScope2, RangeScope3: @hand_range.RangeScope3, RangeScope4: @hand_range.RangeScope4, UserID: @hand_range.UserID } }, as: :json
    assert_response 200
  end

  test "should destroy hand_range" do
    assert_difference('HandRange.count', -1) do
      delete hand_range_url(@hand_range), as: :json
    end

    assert_response 204
  end
end
