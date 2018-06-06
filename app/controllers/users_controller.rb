class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    @user = current_user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: "You have successfully signed in"
    else
      render 'new'
    end
  end

    def destroy
      session.delete :user_id
      redirect_to '/'
    end

    private

    def user_params
      params.require(:user).permit(:name, :password)
    end
  end
