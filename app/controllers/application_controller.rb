class ApplicationController < ActionController::Base

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_user_name
    @current_user[:username]
  end

  def logged_in?
    @current_user.id != nil
  end

  def require_logged_in
    return redirect_to(controller: 'users', action: 'new') unless logged_in?
  end

end
