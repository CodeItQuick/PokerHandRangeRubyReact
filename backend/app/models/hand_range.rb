class HandRange
  include MongoMapper::Document

  key :RangeName, String
  key :RangeScope, String
  key :created_at, Time
  key :updated_at, Time

end
