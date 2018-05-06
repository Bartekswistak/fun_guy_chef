OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '610525491763-tp8es5flef2tc3jhcbhc5kssk3orlgpo.apps.googleusercontent.com', 'hlQF2gMdLq45bNDpZS3rftn4'
end
