class Api::V1::VideosController < ApplicationController
  def index
    @videos = Video.all
    render json: @videos
  end

  def show
    @video = Video.find(params[:id])
    render json: @video
  end

  def create
    @video = Video.find_or_create_by(etag: params[:etag])
    render json: @video
  end

  def add_emotion
		video = Video.find(params[:chatroom_id])
		user = User.find(params[:user_id])

		if video && user
      byebug
			emotion = Emotion.create(video: video, user: user, time: params[:time])

			ChatroomChannel.broadcast_to(chatroom, {
				type: 'ADD_EMOTION',
				payload: prepare_emotion(emotion)
			})

			render json: prepare_emotion(emotion)
		else
			render json: {error: "You dun goofed!"}
		end

	end

  def prepare_emotion(emotion)
    emotion_hash = {
      id: emotion.id,
      video: emotion.video,
      content: emotion.content,
      username: emotion.user.username
    }
  end

end
