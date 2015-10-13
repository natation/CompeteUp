class Competition < ActiveRecord::Base
  validates :name, :location, :description, :competition_owner_id, presence: true
  belongs_to :owner,
    class_name: :User,
    foreign_key: :competition_owner_id,
    primary_key: :id

  has_many :events
  has_many :user_competitions
  has_many :competition_interests
  has_many :competition_photos
end
