class Api::V1::UsersController < ApplicationController

  def create
  		@user = User.new(email: params[:email], name: params[:name], username: params[:username], password: params[:password])

  		if @user.save
  			token = encode({user_id: @user.id})
  			render json: {user: @user,
  										jwt: token
  									}
  		else
  			render json: {error: "error"}
  		end


    end
end
