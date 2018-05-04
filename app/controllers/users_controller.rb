class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def show
    @user = current_user
  end

  def create
    @user = User.create(user_params)
      return redirect_to controller: 'users', action: 'new' unless @user.save
      session[:user_id] = @user.id
      redirect_to controller: 'users', action: 'show'
    end

    private

    def user_params
      params.require(:user).permit(:username, :password)
    end
  end
