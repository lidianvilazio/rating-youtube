class ApplicationController < ActionController::API


  def encode(payload)
  		JWT.encode(payload, "saudade")
  	end

  	def decode
  		jwt = request.headers["Authorization"]
  		JWT.decode(jwt, "saudade")[0]
  	end

  	def user_in_session
  		id = decode["user_id"]
  		User.find(id)
  	end
end
