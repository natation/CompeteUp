class UserEvent < ActiveRecord::Base
  validates :user, :event, presence: true
  validates :user_id, uniqueness: {scope: :event_id}

  belongs_to :user
  belongs_to :event
end
