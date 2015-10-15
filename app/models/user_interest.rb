class UserInterest < ActiveRecord::Base
  validates :user, :interest, presence: true
  validates :user_id, uniqueness: {scope: :interest_id}

  belongs_to :user
  belongs_to :interest
end
