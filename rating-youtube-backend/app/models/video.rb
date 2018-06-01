class Video < ApplicationRecord
  has_many :emotions
  has_many :users, through: :emotions

  def likes
    self.emotions.select{|emotion| emotion.emotion == "like"}
  end

  def dislikes
    self.emotions.select{|emotion| emotion.emotion == "dislike"}
  end

  def surprises
    self.emotions.select{|emotion| emotion.emotion == "surprise"}
  end
end
