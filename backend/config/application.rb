require "action_controller/railtie"
require "action_mailer/railtie"
# require "active_resource/railtie"
# require "rails/test_unit/railtie"
require "sprockets/railtie"
require "action_cable/engine"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
# Bundler.require(*Rails.groups)
Bundler.require :default, Rails.env


module RangeSharingReactRubyAPI
  class Application < Rails::Application
    config.load_defaults 6.0
    config.autoload_paths += %W(#{config.root}/app/channels)
    config.api_only = true
    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use ActionDispatch::Cookies # Required for all session management
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options
    Dir["lib/**/*.rb"].each do |path|
      require_dependency path
    end 
  end
end

