class Competition < ActiveRecord::Base
  validates :name, :location, :description, :competition_owner_id, presence: true
  belongs_to :owner,
    class_name: :User,
    foreign_key: :competition_owner_id,
    primary_key: :id

  has_many :events
  has_many :user_competitions, dependent: :destroy
  has_many :competition_interests, dependent: :destroy, inverse_of: :competition
  has_many :competition_photos
  has_many :users,
    through: :user_competitions,
    source: :user
  has_many :interests,
    through: :competition_interests,
    source: :interest

  def getCompetitionSuggestions
    Competition.find_by_sql([<<-SQL, id])
        SELECT
          c2.*
        FROM
          competitions as c1
        JOIN
          user_competitions as uc1 ON c1.id = uc1.competition_id
        JOIN
          users ON uc1.user_id = users.id
        JOIN
          user_competitions uc2 ON users.id = uc2.user_id
        JOIN
          competitions c2 ON uc2.competition_id = c2.id
        WHERE
          c2.id != c1.id AND c1.id = ?
        GROUP BY
          c2.id
        LIMIT
          6
      SQL
  end
end
