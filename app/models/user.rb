class User < ApplicationRecord
    has_many :hand_ranges

    validates :username, presence: true, length: {minimum: 3, maximum: 25}

end
