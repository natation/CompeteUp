class UserInterest < ActiveRecord::Base
  validates :user, :interest_id, presence: true
  validates :user_id, uniqueness: {scope: :interest_id}

  belongs_to :user, inverse_of: :user_interests
  belongs_to :interest
end
