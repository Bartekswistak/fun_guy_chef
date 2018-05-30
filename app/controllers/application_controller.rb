class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def logged_in?
    !!current_user
  end
  helper_method :logged_in?

  def first_name
    @first_name = request.env['omniauth.auth']['info']['first_name']
  end
  helper_method :first_name

  def require_logged_in
    return redirect_to(controller: 'users', action: 'new') unless logged_in?
  end

end
