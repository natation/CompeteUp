class CompetitionPhoto < ActiveRecord::Base
  validates :url, :competition, presence: true

  belongs_to :competition
end
