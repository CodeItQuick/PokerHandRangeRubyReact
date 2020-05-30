class HandRange
  include Mongoid::Document

  key :RangeName, String
  key :RangeScope, String
  key :created_at, Time
  key :updated_at, Time

end
