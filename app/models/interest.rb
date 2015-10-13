class Interest < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :user_interests
  has_many :competition_interests
end
