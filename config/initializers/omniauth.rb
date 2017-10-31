Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, "247560397540-aotsaam36on21hcpjevlitqh0cr9be60.apps.googleusercontent.com", "roVHMOZlP1YKw-Em9p2JtwaZ", {
    :name => "google",
    :scope => ['contacts','plus.login','plus.me','email','profile'],
    :prompt => "select_account",
    :image_aspect_ratio => "square",
    :image_size => 50,
    :access_type => 'offline'
  }
end
