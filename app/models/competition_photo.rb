class CompetitionPhoto < ActiveRecord::Base
  validates :url, :competition_id, presence: true

  belongs_to :competition
end
