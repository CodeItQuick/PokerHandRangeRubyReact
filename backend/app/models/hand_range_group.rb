class HandRangeGroup
  include MongoMapper::Document

  key :GroupName, String
  key :hand_range_id, Integer
  key :hand_range_folder_id, Integer

end
