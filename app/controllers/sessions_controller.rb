class SessionsController < ApplicationController

  def home
  end

  def new
    @user = User.new
  end

  def create
    if request.env["omniauth.auth"].present?
      user = User.find_or_initialize_by(name: request.env["omniauth.auth"]['info']['name'])
      if user.id.present?
        session[:user_id] = user.id
        redirect_to user_path(user), notice: "You have successfully logged in"
      else
        user.password = SecureRandom.hex
        user.save
        session[:user_id] = user.id
        redirect_to user_path(user), notice: "You have successfully logged in"
      end
    end

    if params[:name].present?
      user = User.find_by_name(params[:name])
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        redirect_to user_path(user), notice: "You have successfully logged in"
      else
       if user
          flash[:alert] = "Your password is not correct"
        else
          flash[:alert] = "The username is invalid"
       end
        render 'new'
      end
    end
  end





  #  @user = User.find_or_create_from_omniauth(request.env["omniauth.auth"])
  #  first_name = request.env['omniauth.auth']['info']['first_name']
  #  @user.first_name = first_name
  #  session[:user_id] = @user.id
  #  redirect_to '/users/show'
  #end

  def destroy
    session[:user_id] = nil
    redirect_to '/', notice: "You have successfully logged out"
  end

end
