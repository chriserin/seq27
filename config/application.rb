require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module Seq27
  class Application < Rails::Application
    config.active_record.raise_in_transactional_callbacks = true
    config.action_dispatch.perform_deep_munge = false
    config.active_record.schema_format = :sql

    config.before_configuration do
      dev = Rails.root.join 'config/application.yml'
      YAML.load_file(dev.to_s).each do |key, value|
        ENV[key.to_s] = value.to_s unless ENV[key.to_s]
      end if dev.exist?
    end
  end
end
