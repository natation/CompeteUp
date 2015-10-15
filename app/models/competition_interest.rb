class CompetitionInterest < ActiveRecord::Base
  validates :competition, :interest, presence: true
  validates :competition_id, uniqueness: {scope: :interest_id}

  belongs_to :competition
  belongs_to :interest
end
