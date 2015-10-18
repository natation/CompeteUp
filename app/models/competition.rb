class Competition < ActiveRecord::Base
  validates :name, :location, :description, :competition_owner_id, presence: true
  belongs_to :owner,
    class_name: :User,
    foreign_key: :competition_owner_id,
    primary_key: :id

  has_many :events
  has_many :user_competitions, dependent: :destroy
  has_many :competition_interests, dependent: :destroy, inverse_of: :competition
  has_many :competition_photos
  has_many :users,
    through: :user_competitions,
    source: :user
  has_many :interests,
    through: :competition_interests,
    source: :interest
end
