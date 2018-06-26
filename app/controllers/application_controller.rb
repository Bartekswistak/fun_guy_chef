class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def find_by_id(class_name)
    class_name.find_by(id: params[:id])
  end

  def find_by_recipe_id
    Recipe.find_by(id: params[:recipe_id])
  end

  def find_by_user_id
    User.find_by(id: params[:user_id])
  end
end
