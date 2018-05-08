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
    @user = User.find_or_create_from_omniauth(request.env["omniauth.auth"])
    first_name = request.env['omniauth.auth']['info']['first_name']
    @user.first_name = first_name
    session[:user_id] = @user.id
    redirect_to '/users/show'

    #  @user = User.create(user_params)
    #  return redirect_to controller: 'users', action: 'new' unless @user.save
    #  session[:user_id] = @user.id
    #  redirect_to controller: 'users', action: 'show'
    end

    def destroy
      session.delete :user_id
      redirect_to '/'
    end

    private

    def user_params
      params.require(:user).permit(:username, :password, :first_name)
    end
  end
