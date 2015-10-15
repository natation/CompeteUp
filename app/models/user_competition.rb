class UserCompetition < ActiveRecord::Base
  validates :user, :competition, presence: true
  validates :user_id, uniqueness: {scope: :competition_id}
  belongs_to :user
  belongs_to :competition
end
