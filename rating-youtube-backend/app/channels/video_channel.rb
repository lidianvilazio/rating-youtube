class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    video = Video.find(params[:video_id])
    stream_for video
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
