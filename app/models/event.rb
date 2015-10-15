class Event < ActiveRecord::Base
  validates :description, :competition, presence: true

  belongs_to :competition

  has_many :user_events, dependent: :destroy
  has_many :users,
    through: :user_events,
    source: :user
end
