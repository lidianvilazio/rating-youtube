class VideoSerializer < ActiveModel::Serializer
  attributes :id, :likes, :dislikes, :surprises
end
