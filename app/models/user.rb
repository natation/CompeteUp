# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  profile_pic_url :string
#  bio             :text
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  name            :string           not null
#

class User < ActiveRecord::Base
  after_initialize :ensure_session_token
  validates :name, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :owned_competitions,
    class_name: :Competition,
    foreign_key: :competition_owner_id,
    primary_key: :id
  has_many :user_competitions, dependent: :destroy
  has_many :user_events, dependent: :destroy
  has_many :user_interests, dependent: :destroy, inverse_of: :user
  has_many :competitions,
    through: :user_competitions,
    source: :competition
  has_many :events,
    through: :user_events,
    source: :event
  has_many :interests,
    through: :user_interests,
    source: :interest


  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return user if user && user.is_password?(password)
    nil
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
