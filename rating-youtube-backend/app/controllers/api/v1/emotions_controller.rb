class Api::V1::EmotionsController < ApplicationController

  def index
    @emotions = Emotion.all
    render json: @emotions
  end

  def show
    @Emotion = Emotion.find(params["id"])

  end

  def create
    @video = Video.find_by(etag:  params[:etag])
    @emotion = Emotion.find_or_create_by(video_id: @video.id, user_id: params[:user_id], time: params[:time])
    render json: @emotion
  end
end
