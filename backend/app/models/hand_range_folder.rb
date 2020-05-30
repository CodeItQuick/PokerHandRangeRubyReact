class HandRangeFolder
  include MongoMapper::Document

  key :FolderName, String
  key :user_id, Integer

end
