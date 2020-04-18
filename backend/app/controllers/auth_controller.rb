class AuthController < ApplicationController
    
    def login
        @user = User.find_by(name: params[:name])
        if @user && @user.authenticate(params[:password])
            @token = JWT.encode({user_id: @user.id}, ENV['AUTH_SECRET'], 'HS256')
            render json: {user: @user, token: @token}
        else
            render json: {errors: @user.errors.full_messages}
        end
    end

    def auto_login
        if session_user
            render json: session_user
        else
            render json: {errors: "No User Logged In"}
        end
    end

    def persist
        if request.headers['Authorization']
            encoded_token = request.headers['Authorization'].split(' ')[1]
            token = JWT.decode(encoded_token, secret)
            user_id = token[0]['user_id']
            user = User.find(user_id)
            render json: user
        end
    end


    # before_action :require_login

    # def logged_in?
    #     !!session_user
    # end

    # def require_login
    #     render json: {message: 'Please Login'}, status: :unauthorized unless logged_in?
    # end

    private

    def login_params
        params.permit(:name, :password)
    end

end