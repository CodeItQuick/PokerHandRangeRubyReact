class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def new
  end

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    user = User.find(params[:id])
    render json: @user
  end

  # POST /users
  def create
    user = User.new()
    user.name = params[:name]
    user.password = params[:password]
    user.email = params[:email]

    if user.save
      token = JWT.encode({user_id: user.id}, ENV['AUTH_SECRET'], 'HS256')
      render json: @user, status: :created, location: @user, token: :token
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
