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

end
