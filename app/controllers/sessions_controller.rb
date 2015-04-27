class SessionsController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email].downcase)

    if user && user.authenticate(user_params[:password])
      sign_in(user)
      redirect_back_or_to(root_path)
    else
      flash.now.alert = "Your email and password do not match"
      render :new
    end
  end

  def destroy
    sign_out_user
    redirect_to :root
  end

  private
  def user_params
    params[:user].permit(:email, :password)
  end
end
