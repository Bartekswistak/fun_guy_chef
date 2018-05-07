class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_secure_password
  has_many :recipes
  has_many :ingredients, through: :recipes

  def self.find_or_create_from_omniauth(auth_hash)
    user = self.find_by(uid: auth_hash['info']['uid'], provider: auth_hash['provider'])
      if !user.nil?
        return user
      else
        user = User.new
        user.provider = auth_hash.provider
        user.uid = auth_hash.uid
        user.username = auth_hash.info.username
        user.password = SecureRandom.urlsafe_base64
        user.oauth_token = auth_hash.credentials.token
        user.oauth_expires_at = Time.at(auth_hash.credentials.expires_at)
        user.save!

       if user.save
         return user
       else
         return nil
       end
     end

   end

end
