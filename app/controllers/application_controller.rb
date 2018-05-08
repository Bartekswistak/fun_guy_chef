class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :first_name

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def first_name
    @first_name = request.env['omniauth.auth']['info']['first_name']
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    return redirect_to(controller: 'users', action: 'new') unless logged_in?
  end

end
