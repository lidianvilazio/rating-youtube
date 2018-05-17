class User < ApplicationRecord
  has_secure_password
  validates :name, :username, :email, presence: { strict: true }, uniqueness: true
  has_many :emotions
  has_many :videos, through: :emotions
end
