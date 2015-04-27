class User < ActiveRecord::Base
  include Authem::User

  has_many :songs
end
