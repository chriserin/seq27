class ApplicationController < ActionController::Base
  authem_for :user
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: :json_request?

  protected
  def json_request?
    request.format.json?
  end
end
