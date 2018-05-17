class Video < ApplicationRecord
  has_many :emotions
  has_many :users, through: :emotions
end
