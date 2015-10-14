class Event < ActiveRecord::Base
  validates :description, :competition_id, presence: true

  belongs_to :competition

  has_many :user_events
  has_many :users,
    through: :user_events,
    source: :user
end
