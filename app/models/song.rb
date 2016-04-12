class Song < ActiveRecord::Base
  def name
    definition['name']
  end
end
