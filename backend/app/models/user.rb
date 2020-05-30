class User
  include MongoMapper::Document

  key :name, String
  t.string "name"
  key :email, String
  key :created_at, Time,
  key :updated_at, Time, 
  key :password, password_digest

end
