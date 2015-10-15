class Interest < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :user_interests, dependent: :destroy
  has_many :competition_interests, dependent: :destroy
  has_many :users,
    through: :user_interests,
    source: :user
  has_many :competitions,
    through: :competition_interests,
    source: :competition
end
